import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';

//รับค่า parameters
const SearchProjectForm = () => {

    const [searchParams, setSearchParams] = useState({
        projectName : "",
        courseName : "",
        courseCode : "",
        academicYear : ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Navigate to results page with query params
        const query = new URLSearchParams(searchParams).toString();
        navigate(`/results?${query}`);
    };

    return(
        <Card className="container d-flex flex-column gap-4">
            <h3 className="prompt-semibold fs-3 text-center">ค้นหาโปรเจค</h3>
            <form onSubmit={handleSearch} className="d-flex flex-column gap-4" align="center">
                <div>
                    <label className='prompt-regular'>ชื่อโปรเจค</label>
                    <input
                        type="text"
                        name="projectName"
                        value={searchParams.projectName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className='prompt-regular'>รหัสวิชา</label>
                    <input
                        type="text"
                        name="courseCode"
                        value={searchParams.courseCode}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className='prompt-regular'>ชื่อวิชา</label>
                    <input
                        type="text"
                        name="courseName"
                        value={searchParams.courseName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className='prompt-regular'>ปีการศึกษา</label>
                    <input
                        type="text"
                        name="academicYear"
                        value={searchParams.academicYear}
                        onChange={handleChange}
                    />
                </div>
                <Button className='mt-4 prompt-regular' variant="primary" type="submit">ค้นหา</Button>
            </form>
        </Card>
    )
}

export default SearchProjectForm;