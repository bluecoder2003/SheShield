import React, { useState } from "react";
import { useRouter } from "next/router";
import { X } from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from '@/Context/Authcontext';
const Signup = () => {
  const {register} = useAuth();
  const [id, setId] = useState('');
  const [officePhoneNo, setOfficePhoneNo] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [department, setDepartment] = useState('');
  const [desg, setDesg] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [role, setRole] = useState('org');
  

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(id, officePhoneNo, organizationName, department, desg, officeAddress, role);
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg relative">
        <button className="absolute right-4 top-4 text-textblack hover:text-gray-600">
          <X size={20} />
        </button>

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-textblack hover:text-gray-600 ">
            Organization Sign Up
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md text-textblack"
              placeholder="Enter Organization ID"
            />

            

            

            <input
              type="text"
              name="officephoneno"
              value={officePhoneNo}
              onChange={(e) => setOfficePhoneNo(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md text-textblack"
              placeholder="Enter Office Phone Number"
            />

            <input
              type="text"
              name="organizationName"
              value={organizationName}
              onChange={(e)=>setOrganizationName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md text-textblack"
              placeholder="Enter Organization Name"
            />

            <input
              type="text"
              name="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md text-textblack"
              placeholder="Enter Department"
            />

            <input
              type="text"
              name="desg"
              value={desg}
              onChange={(e) => setDesg(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md text-textblack"
              placeholder="Enter Designation"
            />

            <textarea
              name="officeAddress"
              value={officeAddress}
              onChange={(e)=>setOfficeAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-md h-24 resize-none text-textblack"
              placeholder="Enter Office Address"
            />

            <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md">
              Sign Up <span className="ml-2">»</span>
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/auth/login")}
                className="text-red-500 hover:underline"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
