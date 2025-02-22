import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { X } from 'lucide-react';

const Login = () => {
  const [userType, setUserType] = useState('');
  const [identifier, setIdentifier] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType === 'employee') {
      localStorage.setItem('employeeId', identifier);
      router.push('/report/records-employee');
    } else if (userType === 'organization') {
      localStorage.setItem('organizationName', identifier);
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
          <h1 className="text-xl font-normal mb-6 text-gray-500 hover:text-gray-600">Login to your account</h1>

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

            <div className="space-y-2">
              <label className="block text-sm text-gray-600">
                {userType === 'employee' ? 'Employee ID' : 'Organization Name'}
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-gray-600"
                placeholder={
                  userType === 'employee'
                    ? 'Enter your employee ID'
                    : 'Enter your organization name'
                }
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition-colors"
            >
              Login <span className="ml-2">»</span>
            </button>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <a
                href="/auth/signup"
                className="text-red-500 hover:text-red-600 font-medium"
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;