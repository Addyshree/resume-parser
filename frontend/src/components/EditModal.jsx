import { useState } from "react";
import axios from "../api";

const EditModal = ({ resume, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...resume });

  const handleSubmit = async () => {
    const res = await axios.put(`/resumes/${resume._id}`, { ...formData, manualCorrections: true });
    onSave(res.data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Edit Resume</h2>
        <input
          className="border p-2 mb-2 w-full"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          className="border p-2 mb-2 w-full"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          className="border p-2 mb-2 w-full"
          value={formData.skills.join(", ")}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(",").map(s => s.trim()) })}
        />
        <textarea
          className="border p-2 mb-2 w-full"
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 bg-gray-400 text-white">Cancel</button>
          <button onClick={handleSubmit} className="px-3 py-1 bg-green-500 text-white">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
