import React from "react";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { getUserById } from "../../services/UserService";

//บัญชีผู้ใช้ของนักศึกษา
const StdProfile = () => {
  const [studentData, setStudentData] = useState(null);
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
          setStudentData(response.data);
        } catch (error) {
          setErrorMessage("ไม่สามารถดึงข้อมูลนักศึกษาได้");
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
        <Card
          className="mx-auto mt-4 shadow-sm p-4"
          style={{ width: "80rem", height: "13rem" }}
        >
          <Card.Body className="ms-5">
            <h3 className="prompt-semibold text-primary mb-4">
              ข้อมูลนักศึกษา
            </h3>

            <p className="prompt-semibold me-4 d-inline">รหัสนักศึกษา</p>
            <p className="prompt-regular d-inline">{studentData?.student_id}</p>

            <div className="d-block mt-4">
              <p className="prompt-semibold me-4 d-inline">ชื่อ</p>
              <p className="prompt-regular d-inline me-5">
                {studentData?.firstName}
              </p>

              <p className="prompt-semibold ms-5 me-4 d-inline">นามสกุล</p>
              <p className="prompt-regular d-inline me-5">
                {studentData?.lastName}
              </p>

              <p className="prompt-semibold ms-5 me-4 d-inline">อีเมล</p>
              <p className="prompt-regular d-inline">{studentData?.email}</p>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <p>กรุณาเข้าสู่ระบบ</p>
      )}
    </>
  );
};

export default StdProfile;
