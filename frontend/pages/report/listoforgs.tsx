import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type OrganizationType = {
  _id: string;
  id: string;
  name: string;
  officephoneno: string;
  organizationName: string;
  department: string;
  desg: string;
  officeAddress: string;
  role: string;
  createdAt: string;
};

const ListOfOrgs = () => {
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      console.log("Fetching from API:", API_URL);

      try {
        const response = await fetch(`${API_URL}/auth/getorg`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        if (!data.success) {
          throw new Error("API returned an error");
        }

        setOrganizations(data.data);
      } catch (err: any) {
        console.error("Error fetching organizations:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);
  

  if (loading) {
    return <p className="text-center text-lg">Loading organizations...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-textcolor">List of Organizations</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org) => (
            <div key={org._id} className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2 text-textblack">{org.organizationName}</h2>
              <p className="text-textblack">Name:{org.name}</p>
              <p className="text-textblack">Department: {org.department}</p>
              <p className="text-textblack">Designation: {org.desg}</p>
              <p className="text-textblack">Office Phone: {org.officephoneno}</p>
              <p className="text-textblack">Address: {org.officeAddress}</p>
              <Link href={`/report/${org._id}`} className="text-blue-500 hover:underline mt-2 inline-block">
                File Report
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListOfOrgs;
