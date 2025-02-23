import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { X } from 'lucide-react';
import Swal from 'sweetalert2';
import { useAuth } from '@/Context/Authcontext';

const Login = () => {
  const { login } = useAuth();
  const [organizationId, setOrganizationId] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(organizationId);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg relative p-6">
        <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <h1 className="text-xl font-semibold text-gray-700 text-center mb-6">
          Organization Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              Organization ID
            </label>
            <input
              type="text"
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring focus:ring-red-300"
              placeholder="Enter your organization ID"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition-colors font-medium"
          >
            Login <span className="ml-2">→</span>
          </button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="/auth/register" className="text-red-500 hover:text-red-600 font-medium">
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
