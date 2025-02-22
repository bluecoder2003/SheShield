import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

type OrganizationType = {
  id: string;
  name: string;
  details: string;
};

const ListOfOrgs = () => {
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const dummyOrganizations = [
      { id: '1', name: 'Organization One', details: 'Details about Organization One' },
      { id: '2', name: 'Organization Two', details: 'Details about Organization Two' },
      { id: '3', name: 'Organization Three', details: 'Details about Organization Three' },
    ];

    setOrganizations(dummyOrganizations);
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