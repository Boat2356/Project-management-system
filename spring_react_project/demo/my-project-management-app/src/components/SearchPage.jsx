import { useState } from "react";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useState({
    courseName: "",
    projectCode: "",
    academicYear: "",
    semester: "",
    advisorName: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search params:", searchParams);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="card-title mb-0">Advanced Search</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSearch}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="courseName" className="form-label">Course Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="courseName"
                      name="courseName"
                      value={searchParams.courseName}
                      onChange={handleInputChange}
                      placeholder="Enter course name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="projectCode" className="form-label">Project Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="projectCode"
                      name="projectCode"
                      value={searchParams.projectCode}
                      onChange={handleInputChange}
                      placeholder="Enter project code"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="academicYear" className="form-label">Academic Year</label>
                    <select
                      className="form-select"
                      id="academicYear"
                      name="academicYear"
                      value={searchParams.academicYear}
                      onChange={handleInputChange}
                    >
                      <option value="">Select academic year</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="semester" className="form-label">Semester</label>
                    <select
                      className="form-select"
                      id="semester"
                      name="semester"
                      value={searchParams.semester}
                      onChange={handleInputChange}
                    >
                      <option value="">Select semester</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="summer">Summer</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label htmlFor="advisorName" className="form-label">Advisor Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="advisorName"
                      name="advisorName"
                      value={searchParams.advisorName}
                      onChange={handleInputChange}
                      placeholder="Enter advisor name"
                    />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100">
                      <i className="bi bi-search me-2"></i>
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;