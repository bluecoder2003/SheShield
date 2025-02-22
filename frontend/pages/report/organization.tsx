import React, { useEffect, useState } from 'react';

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

const OrganizationReport: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  useEffect(() => {
    // Simulate fetching data from an API
    setReports(dummyReports);
  }, []);

  const handleViewEvidence = (report: Report) => {
    setSelectedReport(report);
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto flex justify-center items-center flex-col pt-10">
        <h1 className="text-4xl md:text-5xl font-normal mb-12">
          <span className="text-gray-400">Verify.</span>
          <span className="text-gray-400">Protect.</span>
          <span className="text-red-500">Deliver Justice.</span>
        </h1>

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
                  <button
                    onClick={() => handleViewEvidence(report)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    View Evidence
                  </button>
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

      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Evidence for Report #{selectedReport.id}</h2>
            <div className="space-y-4">
              {selectedReport.evidence.map((item, index) => {
                const fileExtension = item.split('.').pop();
                if (fileExtension === 'jpg' || fileExtension === 'png') {
                  return <img key={index} src={item} alt={`Evidence ${index + 1}`} className="w-full h-auto" />;
                } else if (fileExtension === 'mp3') {
                  return <audio key={index} controls src={item} className="w-full" />;
                } else if (fileExtension === 'mp4') {
                  return <video key={index} controls src={item} className="w-full" />;
                } else {
                  return <p key={index} className="text-gray-700">{item}</p>;
                }
              })}
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationReport;