import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
interface Report {
  id: string;
  employeeId: string;
  harassername: string;
  details: string;
  description: string;
  harassmentType: string;
  evidence: string[];
  harrasserdetails: string;
}

const OrganizationReport: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const router = useRouter();
  const { id } = router.query; // Extract ID from URL
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem("token"); // Retrieve the token
      if (!token) {
        console.error(" No auth token found, user may not be logged in.");
        return;
      }
  
      fetch(`${API_URL}/report/getorgReport/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      })
        .then(async (res) => {
          console.log("🔄 Fetching reports...");
  
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(` HTTP ${res.status} - ${errorData.message || "Unknown error"}`);
          }
  
          return res.json();
        })
        .then((data) => {
          console.log(" Reports fetched:", data);
          setReports(data.reports || []);
        })
        .catch((error) => {
          console.error(" Error fetching reports:", error);
        });
    }
  }, [id]);
  

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
                      <span className="text-black">{report.harassername}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">Harasser Desg - </span>
                      <span className="text-black">{report.harrasserdetails}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">Incident Description - </span>
                      <span className="text-gray-700">{report.details}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">
              Evidence for Report #{selectedReport.id}
            </h2>
            <div className="space-y-4">
              {selectedReport.evidence.map((item, index) => {
                const fileExtension = item.split(".").pop();
                if (fileExtension === "jpg" || fileExtension === "png") {
                  return (
                    <div key={index}>
                    <Image
                      width={500}
                      height={500}
                      src={item}
                      alt={`Evidence ${index + 1}`}
                      className="w-full h-auto"
                    />
                    </div>
                  );
                } else if (fileExtension === "mp3") {
                  return (
                    <audio key={index} controls src={item} className="w-full" />
                  );
                } else if (fileExtension === "mp4") {
                  return (
                    <video key={index} controls src={item} className="w-full" />
                  );
                } else {
                  return (
                    <p key={index} className="text-gray-700">{item}</p>
                  );
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
