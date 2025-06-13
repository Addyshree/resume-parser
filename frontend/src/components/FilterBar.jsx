const FilterBar = ({ keyword, setKeyword, skill, setSkill }) => (
  <div className="mb-4">
    <input
      type="text"
      placeholder="Search keyword"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      className="border p-2 mr-2"
    />
    <input
      type="text"
      placeholder="Filter by skill"
      value={skill}
      onChange={(e) => setSkill(e.target.value)}
      className="border p-2"
    />
  </div>
);

export default FilterBar;
