import React, { useState } from 'react'
import { Form, Button, Alert } from "react-bootstrap";

const Register = () => {

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await delay(500);

        setLoading(false);
    };


    return (
        <div
            className='mx-auto p-4' style={{ width: '40rem', height: '30rem', }}
        >

            <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>

                <div className="h4 mb-4 prompt-semibold text-primary">สร้างบัญชี</div>
                <Form.Group className="prompt-semibold  mb-2" controlId="username">
                    <Form.Label>รหัสนักศึกษา</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="xxxxxxxxx-x"
                        required
                    />
                </Form.Group>

                <div className='row mt-4 prompt-semibold'>
                    <Form.Group className="mb-3 col-6" >
                        <Form.Label className='prompt-semibold'>ชื่อ</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="ชื่อ"
                        required
                    />
                    </Form.Group>

                    <Form.Group className="mb-3 col-6" >
                        <Form.Label className='prompt-semibold'>นามสกุล</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="นามสกุล"
                        required
                    />
                    </Form.Group>
                </div>

                <Form.Group className="prompt-semibold mb-2 mt-2" controlId="username">
                    <Form.Label>อีเมล</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="name@email.com"
                        required
                    />
                </Form.Group>

                <Form.Group className="prompt-semibold mb-4 mt-4" controlId="password">
                    <Form.Label c>รหัสผ่าน</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="รหัสผ่าน"
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

export default Register
