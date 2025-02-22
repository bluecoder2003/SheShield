import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Report {
  id: string;
  employeeId: string;
  harasserName: string;
  details: string;
  description: string;
  harassmentType: string;
  evidence: string[];
}

const dummyReports: Report[] = [
  {
    id: '1',
    employeeId: 'E123',
    harasserName: 'John Doe',
    details: 'Harassment in the workplace',
    description: 'John Doe has been making inappropriate comments.',
    harassmentType: 'Verbal',
    evidence: ['photo1.jpg', 'audio1.mp3'],
  },
  {
    id: '2',
    employeeId: 'E456',
    harasserName: 'Jane Smith',
    details: 'Online harassment',
    description: 'Jane Smith has been sending threatening emails.',
    harassmentType: 'Online',
    evidence: ['screenshot1.png', 'video1.mp4'],
  },
];

const EmployeeRecord: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching data from an API
    setReports(dummyReports);
  }, []);

  const handleReportButtonClick = () => {
    router.push('/report/employee');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto flex jusitfy-center items-center flex-col pt-10">
        <h1 className="text-4xl md:text-5xl font-normal mb-12 ">
          <span className="text-gray-400">Verify.</span>
          <span className="text-gray-400">Protect.</span>
          <span className="text-red-500">Deliver Justice.</span>
        </h1>

        <button
          onClick={handleReportButtonClick}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors mb-6"
        >
          Report
        </button>

        {reports.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500">No reports available.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-red-500">#{report.id}</span>
                    <span className="text-gray-700">{report.harassmentType}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">Harasser Name - </span>
                      <span className="text-gray-700">{report.harasserName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">Harassment Details - </span>
                      <span className="text-gray-700">{report.details}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">Incident Description - </span>
                      <span className="text-gray-700">{report.description}</span>
                    </div>
                  </div>
                </div>

                {report.evidence.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h3 className="text-sm text-gray-500 mb-2">Evidence:</h3>
                    <div className="flex flex-wrap gap-2">
                      {report.evidence.map((item, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeRecord;