import React from 'react'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StdProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
      const role = localStorage.getItem("userRole");
  
      // ถ้า role ไม่ใช่ STUDENT ให้ redirect ไปหน้าอื่น
      if (role !== "USER") {
        navigate("/home-page");
      }
    }, [navigate]);
  
    return children; // ถ้า role เป็น USER แสดงเนื้อหาของ student ได้
  };

export default StdProtectedRoute
