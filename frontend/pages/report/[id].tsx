import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { X, Upload } from 'lucide-react';
import Swal from 'sweetalert2';

const EmployeeReport = () => {
  const router = useRouter();
  const { id: orgid } = router.query;

  const [harassername, setHarasserName] = useState('');
  const [harrasserdetails, setHarrasserDetails] = useState('');
  const [harassernumber, setHarasserNumber] = useState('');
  const [harassmentType, setHarassmentType] = useState('');
  const [platname, setPlatName] = useState('');
  const [details, setDetails] = useState('');
  const [evidence, setEvidence] = useState<FileList | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // const uploadFile = async (file: File) => {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary preset

  //   try {
  //     const res = await fetch(`https://api.cloudinary.com/v1_1/your_cloudinary_name/upload`, {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     const data = await res.json();
  //     return data.secure_url; // Get the uploaded file URL
  //   } catch (error) {
  //     console.error('Upload Error:', error);
  //     return null;
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // let uploadedFiles: string[] = [];

    // if (evidence) {
    //   const fileUploadPromises = Array.from(evidence).map(uploadFile);
    //   uploadedFiles = (await Promise.all(fileUploadPromises)).filter(Boolean) as string[];
    // }

    const reportData = {
      orgid,
      harassername,
      harrasserdetails,
      harassernumber: harassernumber ? parseInt(harassernumber) : undefined,
      type: harassmentType,
      platname: harassmentType === "Online Threat" ? platname : undefined,
      details,
      // evidence: uploadedFiles,
    };

    try {
      const response = await fetch(`${API_URL}/report/createreport/${orgid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Report Submitted!',
          text: 'Your report has been submitted successfully.',
          confirmButtonColor: '#d33',
        }).then(() => {
          router.push('/');
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed!',
          text: errorData.message || 'An error occurred. Please try again.',
          confirmButtonColor: '#d33',
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while submitting your report. Please try again.',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg relative">
        <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <div className="p-6">
          <h1 className="text-xl font-normal mb-6 text-gray-500 hover:text-gray-600">
            Don't be scared, we got you.
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">Organization ID</label>
              <input
                type="text"
                value={orgid as string}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-600"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-600">Harasser Name</label>
              <input
                type="text"
                value={harassername}
                onChange={(e) => setHarasserName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-gray-600"
                placeholder="Enter name of harasser"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-600">Department or Designation</label>
              <input
                type="text"
                value={harrasserdetails}
                onChange={(e) => setHarrasserDetails(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-gray-600"
                placeholder="Enter department or designation"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-600">Harasser Contact Number (Optional)</label>
              <input
                type="text"
                value={harassernumber}
                onChange={(e) => setHarasserNumber(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-gray-600"
                placeholder="Enter harasser's contact number"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-600">Type of Harassment</label>
              <select
                value={harassmentType}
                onChange={(e) => setHarassmentType(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-white text-gray-600"
                required
              >
                <option value="">Select type</option>
                <option value="Online Threat">Online Threat</option>
                <option value="Sexual Abuse">Sexual Abuse</option>
                <option value="Censored photograph">Censored photograph</option>
                <option value="Private Video Leak">Private Video Leak</option>
              </select>
            </div>

            {harassmentType === "Online Threat" && (
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">Platform Name</label>
                <input
                  type="text"
                  value={platname}
                  onChange={(e) => setPlatName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-gray-600"
                  placeholder="Enter platform name (e.g., Facebook, Instagram)"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm text-gray-600">Harassment Details</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-3 py-2 border rounded-md h-24 resize-none text-gray-600"
                placeholder="Describe the incident in detail"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition-colors"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeReport;
