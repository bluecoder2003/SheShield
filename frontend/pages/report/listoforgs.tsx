import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type OrganizationType = {
  id: string;
  name: string;
  details: string;
};

const ListOfOrgs = () => {
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);

  useEffect(() => {
    const dummyOrganizations = [
      { id: '1', name: 'Organization One', details: 'Details about Organization One' },
      { id: '2', name: 'Organization Two', details: 'Details about Organization Two' },
      { id: '3', name: 'Organization Three', details: 'Details about Organization Three' },
    ];

    setOrganizations(dummyOrganizations);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">List of Organizations</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org) => (
            <div key={org.id} className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">{org.name}</h2>
              <p className="text-gray-600 mb-4">{org.details}</p>
              <Link href={`/report/${org.id}`} className="text-blue-500 hover:underline">
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