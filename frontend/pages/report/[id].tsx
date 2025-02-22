import React, { useState } from "react";
import { useRouter } from "next/router";
import { X, Upload, Trash, Image, Video, FileAudio } from "lucide-react";
import Swal from "sweetalert2";

const EmployeeReport = () => {
  const router = useRouter();
  const { id: orgid } = router.query;

  const [harassername, setHarasserName] = useState("");
  const [harrasserdetails, setHarrasserDetails] = useState("");
  const [harassernumber, setHarasserNumber] = useState("");
  const [harassmentType, setHarassmentType] = useState("");
  const [details, setDetails] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [audioFiles, setAudioFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ url: string; type: string }[]>([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video" | "audio") => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      if (type === "image") setImageFiles(selectedFiles);
      if (type === "video") setVideoFiles(selectedFiles);
      if (type === "audio") setAudioFiles(selectedFiles);

      // Generate file previews
      const newPreviews = selectedFiles.map((file) => ({
        url: URL.createObjectURL(file),
        type,
      }));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  // Upload file to Cloudinary
  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET || "");

    try {
      const res = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || "Upload failed");
      return data.secure_url;
    } catch (error) {
      console.error("Upload Error:", error);
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    Swal.fire({ title: "Uploading Evidence...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    // Upload all files
    const allFiles = [...imageFiles, ...videoFiles, ...audioFiles];
    let uploadedFiles: string[] = [];
    if (allFiles.length > 0) {
      uploadedFiles = (await Promise.all(allFiles.map(uploadFile))).filter(Boolean) as string[];
    }

    Swal.close();

    if (!uploadedFiles.length && allFiles.length) {
      Swal.fire({ icon: "error", title: "Upload Failed", text: "Please try again" });
      return;
    }

    const reportData = {
      orgid,
      harassername,
      harrasserdetails,
      harassernumber: harassernumber ? parseInt(harassernumber) : undefined,
      type: harassmentType,
      details,
      evidence: uploadedFiles,
    };

    try {
      const response = await fetch(`${API_URL}/report/createreport/${orgid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        Swal.fire({ icon: "success", title: "Report Submitted!", confirmButtonColor: "#d33" }).then(() =>
          router.push("/")
        );
      } else {
        const errorData = await response.json();
        Swal.fire({ icon: "error", title: "Submission Failed!", text: errorData.message || "An error occurred." });
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "An error occurred while submitting your report." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
        <button className="absolute right-4 top-4 text-textblack hover:text-textblack">
          <X size={20} />
        </button>
        <h1 className="text-xl font-normal mb-6 text-textblack hover:text-textblack">Don't be scared, we got you.</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" value={orgid as string} readOnly className="w-full px-3 py-2 border rounded-md bg-gray-50 text-textblack" />
          <input type="text" placeholder="Harasser Name" value={harassername} onChange={(e) => setHarasserName(e.target.value)} className="w-full px-3 py-2 border rounded-md text-textblack" required />
          <input type="text" placeholder="Department/Designation" value={harrasserdetails} onChange={(e) => setHarrasserDetails(e.target.value)} className="w-full px-3 py-2 border rounded-md text-textblack" required />
          <input type="text" placeholder="Harasser Contact Number (Optional)" value={harassernumber} onChange={(e) => setHarasserNumber(e.target.value)} className="w-full px-3 py-2 border rounded-md text-textblack" />
          
          <select value={harassmentType} onChange={(e) => setHarassmentType(e.target.value)} className="w-full px-3 py-2 border rounded-md text-textblack" required>
            <option value="">Select Harassment Type</option>
            <option value="Online Threat">Online Threat</option>
            <option value="Sexual Abuse">Sexual Abuse</option>
            <option value="Censored photograph">Censored Photograph</option>
            <option value="Private Video Leak">Private Video Leak</option>
          </select>

          <input type="text" placeholder="Harassment Details" value={details} onChange={(e) => setDetails(e.target.value)} className="w-full px-3 py-2 border rounded-md text-textblack" required />

          {/* Separate Uploads */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-textblack">Upload Images</label>
            <input type="file" accept="image/*" multiple onChange={(e) => handleFileChange(e, "image")} className="w-full px-3 py-2 border rounded-md text-textblack" />

            <label className="block text-sm font-medium text-textblack">Upload Videos</label>
            <input type="file" accept="video/*" multiple onChange={(e) => handleFileChange(e, "video")} className="w-full px-3 py-2 border rounded-md text-textblack" />

            <label className="block text-sm font-medium text-textblack">Upload Audio</label>
            <input type="file" accept="audio/*" multiple onChange={(e) => handleFileChange(e, "audio")} className="w-full px-3 py-2 border rounded-md text-textblack" />
          </div>

          <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition-colors">Submit Report</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeReport;
