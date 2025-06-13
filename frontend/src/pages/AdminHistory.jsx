import { useEffect, useState } from "react";
import axios from "../api";

const AdminHistory = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    axios.get("/admin/history").then((res) => setResumes(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upload History</h1>
      {resumes.map((r) => (
        <div key={r._id} className="border-b py-2">
          {r.name} — uploaded by {r.uploadedBy} on {new Date(r.uploadDate).toLocaleString()}
        </div>
      ))}
    </div>
  );
};

export default AdminHistory;
