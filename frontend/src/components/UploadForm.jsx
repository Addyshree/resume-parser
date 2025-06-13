import { useState } from "react";
import axios from "../api";

const UploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("uploadedBy", "recruiter@example.com");

    const res = await axios.post("/upload", formData);
    onUpload(res.data.data);
  };

  return (
    <div className="p-4 border rounded-md">
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-3 py-1 ml-2 rounded">Upload</button>
    </div>
  );
};

export default UploadForm;
