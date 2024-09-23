import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { getUserById } from "../../services/UserService";

const AdminProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("authToken"));
    if (userData) {
      setCurrentUserId(userData.id); // Assuming the ID is in userData
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUserId) {
        try {
          const response = await getUserById(currentUserId);
          setUserData(response.data);
        } catch (error) {
          setErrorMessage("ไม่สามารถดึงข้อมูลแอดมินได้");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // Set loading to false if no currentUserId
      }
    };

    fetchUserData();
  }, [currentUserId]);

  if (loading) {
    return <p>กำลังโหลดข้อมูล...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }
  return (
    <>
    {currentUserId ? (
    <Card className='mx-auto mt-4 shadow-sm p-4' style={{ width: '75rem', height: '13rem', }}>
            <Card.Body className='ms-5'>

                <h3 className='prompt-semibold text-primary mb-4'>ข้อมูลผู้ดูแล</h3>

                <div className='d-block mt-4'>
                    <p className="prompt-semibold me-4  d-inline">ชื่อ</p>
                    <p className="prompt-regular d-inline me-5">{userData?.firstName}</p>

                    <p className="prompt-semibold ms-5 me-4 d-inline ">นามสกุล</p>
                    <p className="prompt-regular d-inline me-5">{userData?.lastName}</p>

                    <p className="prompt-semibold ms-5 me-4 d-inline">อีเมล</p>
                    <p className="prompt-regular d-inline ">{userData?.email}</p>
                </div>
            </Card.Body>

        </Card>
  ): (
    <p>กรุณาเข้าสู่ระบบ</p>
  )}
  </>
  );
};
export default AdminProfile;