import { useEffect, useState } from "react";
import axios from '../api'
import UploadForm from "../components/UploadForm";
import ResumeCard from "../components/ResumeCard";
import EditModal from "../components/EditModal";
import FilterBar from "../components/FilterBar";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [skill, setSkill] = useState("");
  const [editTarget, setEditTarget] = useState(null);

  const fetchResumes = async () => {
    const res = await axios.get(`/resumes?keyword=${keyword}&skill=${skill}`);
    setResumes(res.data);
  };

  useEffect(() => {
    fetchResumes();
  }, [keyword, skill]);

  const handleUpload = (newResume) => setResumes([newResume, ...resumes]);
  const handleEditSave = (updated) =>
    setResumes(resumes.map((r) => (r._id === updated._id ? updated : r)));

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Resume Parser Dashboard</h1>
      <UploadForm onUpload={handleUpload} />
      <FilterBar keyword={keyword} setKeyword={setKeyword} skill={skill} setSkill={setSkill} />
      {resumes.map((r) => (
        <ResumeCard key={r._id} resume={r} onEdit={setEditTarget} />
      ))}
      {editTarget && (
        <EditModal resume={editTarget} onClose={() => setEditTarget(null)} onSave={handleEditSave} />
      )}
    </div>
  );
};

export default Dashboard;
