import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { X } from 'lucide-react';

const Signup = () => {
  const [userType, setUserType] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [organizationDetails, setOrganizationDetails] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType === 'employee') {
      localStorage.setItem('employeeId', employeeId);
      localStorage.setItem('organizationName', organizationName);
      router.push('/auth/login');
    } else if (userType === 'organization') {
      localStorage.setItem('organizationName', organizationName);
      localStorage.setItem('organizationDetails', organizationDetails);
      router.push('/report/organization');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg relative">
        <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <div className="p-6">
          <h1 className="text-xl font-normal mb-6 text-gray-500 hover:text-gray-600">Sign Up</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-6 mb-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="employee"
                  checked={userType === 'employee'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="w-4 h-4 text-red-500"
                />
                <span className="text-sm text-gray-600">Employee</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="organization"
                  checked={userType === 'organization'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="w-4 h-4 text-red-500"
                />
                <span className="text-sm text-gray-600">Organization</span>
              </label>
            </div>

            {userType === 'employee' && (
              <>
                <div className="space-y-2">
                  <label htmlFor="employeeId" className="block text-sm text-gray-600">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    id="employeeId"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter employee ID"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="organizationName" className="block text-sm text-gray-600">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    id="organizationName"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter organization name"
                  />
                </div>
              </>
            )}

            {userType === 'organization' && (
              <>
                <div className="space-y-2">
                  <label htmlFor="organizationName" className="block text-sm text-gray-600">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    id="organizationName"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter organization name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="organizationDetails" className="block text-sm text-gray-600">
                    Organization Details
                  </label>
                  <textarea
                    id="organizationDetails"
                    value={organizationDetails}
                    onChange={(e) => setOrganizationDetails(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-md h-24 resize-none"
                    placeholder="Enter organization details"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
            >
              Sign Up <span className="ml-2">»</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;