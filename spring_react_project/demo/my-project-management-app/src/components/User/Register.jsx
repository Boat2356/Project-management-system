import React, { useState } from 'react'
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    //const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const apiURL = "http://localhost:8080/api/users/register";

    const [formData, setFormData] = useState({
        studenId : "",
        firstName : "",
        lastName : "",
        email : "",
        password : ""
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');
       
        try {
            // Sending a POST request to the registration endpoint
            await axios.post(apiURL, formData);
            setLoading(false);
            navigate('/login-page'); // Navigate to the login page after successful registration
        } catch (error) {
            setLoading(false);
            setErrorMessage('การลงทะเบียนล้มเหลว โปรดลองใหม่');
        }
    };

    return (
        <div
            className='mx-auto p-4' style={{ width: '40rem', height: '30rem', }}
        >

            <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <div className="h4 mb-4 prompt-semibold text-primary">สร้างบัญชี</div>
                <Form.Group className="prompt-semibold  mb-2" controlId="username">
                    <Form.Label>รหัสนักศึกษา</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="xxxxxxxxx-x"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <div className='row mt-4 prompt-semibold'>
                    <Form.Group className="mb-3 col-6" >
                        <Form.Label className='prompt-semibold'>ชื่อ</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="ชื่อ"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    </Form.Group>

                    <Form.Group className="mb-3 col-6" >
                        <Form.Label className='prompt-semibold'>นามสกุล</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="นามสกุล"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    </Form.Group>
                </div>

                <Form.Group className="prompt-semibold mb-2 mt-2" controlId="username">
                    <Form.Label>อีเมล</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="name@email.com"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="prompt-semibold mb-4 mt-4" controlId="password">
                    <Form.Label c>รหัสผ่าน</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="รหัสผ่าน"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {!loading ? (
                    <Button className="prompt-regular w-100 mt-4" variant="primary" type="submit">
                        สร้างบัญชี
                    </Button>
                ) : (
                    <Button className="prompt-regular w-100" variant="primary" type="submit" disabled>
                        กำลังสร้างบัญชี...
                    </Button>
                )}

                <div className="prompt-regular text-center mt-3">
                    <span>มีบัญชีผู้ใช้แล้ว?</span>{' '}
                    <a href='/login-page' className="link-opacity-75-hover">
                        เข้าสู่ระบบ
                    </a>
                </div>
            </Form>
        </div>
    )
}

export default Register;
