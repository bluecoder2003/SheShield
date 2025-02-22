import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { X, Upload } from 'lucide-react';

const EmployeeReport = () => {
  const router = useRouter();
  const { id: orgId } = router.query;

  const [employeeId, setEmployeeId] = useState('');
  const [harasserName, setHarasserName] = useState('');
  const [details, setDetails] = useState('');
  const [description, setDescription] = useState('');
  const [harassmentType, setHarassmentType] = useState('');
  const [evidence, setEvidence] = useState<FileList | null>(null);

  useEffect(() => {
    const storedEmployeeId = localStorage.getItem('employeeId');
    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      orgId,
      employeeId,
      harasserName,
      details,
      description,
      harassmentType,
      evidence,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg relative">
        <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <div className="p-6">
          <h1 className="text-xl font-normal mb-6 text-gray-500 hover:text-gray-600">Don't be scared, we got you.</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">
                Organization ID
              </label>
              <input
                type="text"
                value={orgId as string}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-600"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-600">
                Harasser Name
              </label>
              <input
                type="text"
                value={harasserName}
                onChange={(e) => setHarasserName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-gray-600"
                placeholder="Enter name of harasser"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-600">
                Harassment Details
              </label>
              <input
                type="text"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-gray-600"
                placeholder="Enter details of harassment"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-600">
                Describe what happened to you
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-md h-24 resize-none text-gray-600"
                placeholder="Describe the incident in detail"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-600">
                Type of Harassment
              </label>
              <select
                value={harassmentType}
                onChange={(e) => setHarassmentType(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-white text-gray-600"
                required
              >
                <option value="">Select type</option>
                <option value="online">Online</option>
                <option value="threats">Threats</option>
                <option value="verbal">Verbal</option>
                <option value="physical">Physical</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-600">
                Evidence
              </label>
              <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:border-red-500 transition-colors">
                <input
                  type="file"
                  id="evidence"
                  multiple
                  onChange={(e) => setEvidence(e.target.files)}
                  className="hidden"
                />
                <label htmlFor="evidence" className="cursor-pointer">
                  <Upload className="mx-auto text-red-500 mb-2" size={24} />
                  <p className="text-sm text-gray-500">
                    Upload image or video or audio as your evidence
                  </p>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeReport;