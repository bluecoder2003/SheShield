import React, { useState } from "react";
import { useRouter } from "next/router";
import { X } from "lucide-react";
import Swal from "sweetalert2";

const Signup = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    name: "",
    officephoneno: "",
    organizationName: "",
    department: "",
    desg: "",
    officeAddress: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: "org" }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Signup Successful!",
          text: "Your account has been created successfully.",
          confirmButtonColor: "#d33",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/report/organization");
          }
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Signup Failed!",
          text: errorData.message || "Something went wrong. Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
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
              value={formData.id}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md text-textblack"
              placeholder="Enter Organization ID"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md text-textblack"
              placeholder="Enter Password"
            />

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md text-textblack"
              placeholder="Enter Your Name"
            />

            <input
              type="text"
              name="officephoneno"
              value={formData.officephoneno}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md text-textblack"
              placeholder="Enter Office Phone Number"
            />

            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md text-textblack"
              placeholder="Enter Organization Name"
            />

            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md text-textblack"
              placeholder="Enter Department"
            />

            <input
              type="text"
              name="desg"
              value={formData.desg}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md text-textblack"
              placeholder="Enter Designation"
            />

            <textarea
              name="officeAddress"
              value={formData.officeAddress}
              onChange={handleChange}
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
