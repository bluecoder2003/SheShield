import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg relative">
        <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <div className="p-6">
          <h1 className="text-xl font-normal mb-6 text-gray-500 hover:text-gray-600">List of Organizations</h1>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search organizations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="space-y-6 h-96 overflow-y-auto">
            {filteredOrganizations.map((org) => (
              <div key={org.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-medium mb-2 text-gray-700">{org.name}</h2>
                <p className="text-gray-500 mb-4">{org.details}</p>
                <Link href={`/report/${org.id}`}>
                  <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition-colors">
                    File Report
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOfOrgs;
