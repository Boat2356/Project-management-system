import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Form,Alert } from 'react-bootstrap';

//รับค่า parameters
const SearchProjectForm = () => {
    const [noResults, setNoResults] = useState(false); // สำหรับเก็บสถานะไม่พบโปรเจค
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useState({
        projectName: "",
        courseName: "",
        courseCode: "",
        academicYear: ""
    });


    const handleChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        });
        setNoResults(false); // รีเซ็ตสถานะเมื่อมีการเปลี่ยนแปลงข้อมูล
    };

    useEffect(() => {
        // ถ้ามีการแสดงข้อความ "ไม่พบโปรเจค" จะตั้งเวลาซ่อนหลังจาก 5 วินาที
        if (noResults) {
            const timer = setTimeout(() => {
                setNoResults(false); // ซ่อนข้อความหลังจาก 5 วินาที
            }, 5000); // 5000 มิลลิวินาที (5 วินาที)

            // เคลียร์ timer เมื่อ component ถูก unmount หรือเมื่อมีการแสดงข้อความใหม่
            return () => clearTimeout(timer);
        }
    }, [noResults]);

    const handleSearch = (e) => {
        e.preventDefault();

        // ตรวจสอบว่าไม่มีข้อมูลในฟอร์มถูกกรอก
        const isEmpty = Object.values(searchParams).every(value => value === "");

        // ถ้าไม่มีข้อมูลกรอก แสดงข้อความ "ไม่พบโปรเจค"
        if (isEmpty) {
            setNoResults(true);
        } else {
            // สมมติว่า fetch ผลลัพธ์การค้นหา และไม่มีผลลัพธ์
            // ตัวอย่างการใช้เงื่อนไขนี้ในระบบจริง คุณจะต้องทำการ fetch ข้อมูลจาก API 
            const hasResults = true; // จำลองสถานะไม่พบข้อมูล

            if (hasResults) {
                // ถ้ามีผลลัพธ์ นำทางไปยังหน้าผลลัพธ์
                const query = new URLSearchParams(searchParams).toString();
                navigate(`/results?${query}`);
            } else {
                // ถ้าไม่มีผลลัพธ์ แสดง "ไม่พบโปรเจค"
                setNoResults(true);
            }
        }
    };
    return (

        <Card className='mx-auto mt-4 shadow-sm p-4' style={{ width: '50rem', height: '32rem', }}>
            <Card.Body className='ms-5'>

                <h3 className='prompt-semibold text-primary mb-4'>ค้นหาโปรเจคนักศึกษา</h3>

                <Form onSubmit={handleSearch}>
                    <Form.Group className="mb-3 row mb-3">
                        <Form.Label className='prompt-semibold col-sm-2 col-form-label'>ชื่อโปรเจค</Form.Label>
                        <div className="col-sm-10">
                            <Form.Control
                                className='prompt-regular'
                                type="text"
                                name="projectName"
                                value={searchParams.projectName}
                                onChange={handleChange}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3 row mb-3">
                        <Form.Label className='prompt-semibold col-sm-2 col-form-label'>รหัสวิชา</Form.Label>
                        <div className="col-sm-10">
                            <Form.Control
                                className='prompt-regular'
                                type="text"
                                name="courseCode"
                                value={searchParams.courseCode}
                                onChange={handleChange}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3 row mb-3">
                        <Form.Label className='prompt-semibold col-sm-2 col-form-label'>ชื่อวิชา</Form.Label>
                        <div className="col-sm-10">
                            <Form.Control
                                className='prompt-regular'
                                type="text"
                                name="courseName"
                                value={searchParams.courseName}
                                onChange={handleChange} />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3 row mb-3">
                        <Form.Label className='prompt-semibold col-sm-2 col-form-label'>ปีการศึกษา</Form.Label>
                        <div className="col-sm-10">
                            <Form.Control
                                className='prompt-regular'
                                type="text"
                                name="academicYear"
                                value={searchParams.academicYear}
                                onChange={handleChange} />
                        </div>
                    </Form.Group>

                    <Button className='prompt-regular mt-4' variant="primary" type="submit">
                        ค้นหา
                    </Button>
                </Form>
                {/* แสดงข้อความถ้าไม่พบโปรเจค */}
                {noResults && (
                    <Alert className="mt-3 prompt-regular" key='danger' variant='danger'>
                ไม่พบโปรเจค
                </Alert>
                )}
            </Card.Body>

        </Card>
    )
}

export default SearchProjectForm;