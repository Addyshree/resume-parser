const ResumeCard = ({ resume, onEdit }) => {
  return (
    <div className="p-4 border rounded-md shadow mb-3">
      <h2 className="text-lg font-bold">{resume.name}</h2>
      <p><b>Email:</b> {resume.email}</p>
      <p><b>Skills:</b> {resume.skills.join(", ")}</p>
      <p><b>Experience:</b> {resume.experience}</p>
      <button className="bg-yellow-500 text-white px-3 py-1 mt-2" onClick={() => onEdit(resume)}>
        Edit
      </button>
    </div>
  );
};

export default ResumeCard;
