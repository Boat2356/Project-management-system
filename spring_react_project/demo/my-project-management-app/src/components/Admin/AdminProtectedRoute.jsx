import React from 'react'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
      const role = localStorage.getItem("userRole");
  
      // ถ้า role ไม่ใช่ ADMIN ให้ redirect ไปหน้าอื่น
      if (role !== "ADMIN") {
        navigate("/");
      }
    }, [navigate]);
  
    return children; // ถ้า role เป็น ADMIN แสดงเนื้อหาของ admin ได้
  };

export default AdminProtectedRoute
