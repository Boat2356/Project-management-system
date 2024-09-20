import React, { useState } from 'react'
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogIn = () => {
    
    const [inputUsername, setInputUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    //ยังใช้ไม่ได้
    const apiURL = "http://localhost:8080/api/users/login";

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await axios.post(apiURL, {
                email: inputUsername,
                password: inputPassword
            });

            // Assuming the backend responds with a token or user details
            const data = response.data;

            // Save authentication details (e.g., token) to localStorage or state management
            localStorage.setItem("authToken", data.token); // Example: save token

            setLoading(false);
            navigate('/home-page'); // Navigate to home page on successful login
        } catch (error) {
            setLoading(false);
            setErrorMessage('อีเมลหรือรหัสผ่านไม่ถูกต้อง โปรดลองใหม่');
        }
    };

  return (
    <div
    className='mx-auto mt-4  p-4' style={{ width: '40rem', height: '32rem', }}
    >
    
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        
        <div className="h4 mb-4 prompt-semibold text-primary">เข้าสู่ระบบ</div>
         {/* Display error message */}
         {errorMessage && (
            <Alert className="mb-2" variant="danger" onClose={() => setErrorMessage('')} dismissible>
              {errorMessage}
            </Alert>
          )}
        {/* ALert */}
        {/* {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Incorrect username or password.
          </Alert>
        ) : (
          <div />
        )} */}

        <Form.Group className="prompt-semibold  mb-2" controlId="username">
          <Form.Label>อีเมล</Form.Label>
          <Form.Control
            type="email"
            value={inputUsername}
            placeholder="name@email.com"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="prompt-semibold mb-4 mt-4" controlId="password">
          <Form.Label c>รหัสผ่าน</Form.Label>
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="รหัสผ่าน"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>
        
        {!loading ? (
          <Button className="prompt-regular w-100 mt-4" variant="primary" type="submit">
            เข้าสู่ระบบ
          </Button>
        ) : (
          <Button className="prompt-regular w-100" variant="primary" type="submit" disabled>
            กำลังเข้าสู่ระบบ...
          </Button>
        )}
        
        <div className="prompt-regular text-center mt-3">
            <span>ยังไม่มีบัญชีผู้ใช้?</span>{' '}
            <a href='/register-page' className="link-opacity-75-hover">
                สร้างบัญชี
            </a>
        </div>
      </Form>
    </div>
  )
}

export default LogIn
