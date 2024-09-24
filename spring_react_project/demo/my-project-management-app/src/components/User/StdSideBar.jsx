import React from 'react'
import { NavLink, useLocation } from "react-router-dom";

import { Nav } from "react-bootstrap";
const StdSideBar = () => {
    const location = useLocation(); // ใช้ hook เพื่อดู path ปัจจุบัน

    const isActive = (path) => location.pathname === path; // ตรวจสอบว่า path นั้น active หรือไม่
    return (
        <div className="sidebar me-3">
        <div className="sidebar-wrapper bg-white shadow p-3 " style={{  height: '125vh', }}>
            <Nav className='d-flex flex-column'>
                <NavLink 
                    to="/user/std-profile" 
                    className={`text-black s-link nav-link d-flex align-items-center mb-4 ${isActive('/user/std-profile') ? 'active' : ''}`}>
                    <i className="bi bi-person-fill fs-5 me-2 mb-2" ></i>
                    <span className="prompt-semibold text-black fs-6">บัญชีผู้ใช้</span>
                </NavLink>
                <NavLink 
                    to="/user/std-edit-profile" 
                    className={`text-black s-link nav-link d-flex align-items-center mb-4 ${isActive('/user/std-edit-profile') ? 'active' : ''}`}>
                    <i className="bi bi-pencil-fill fs-5 me-2 mb-2"></i>
                    <span className="prompt-semibold fs-6">แก้ไขบัญชี</span>
                </NavLink>
                <NavLink 
                    to="/user/std-add-project" 
                    className={`text-black s-link nav-link d-flex align-items-center mb-4 ${isActive('/user/std-add-project') ? 'active' : ''}`}>
                    <i className="bi bi-plus-circle-fill fs-5 me-2 mb-2"></i>
                    <span className="prompt-semibold text-black fs-6">เพิ่มโปรเจค</span>
                </NavLink>
                <NavLink 
                    to="/user/std-manage-project" 
                    className={`text-black s-link nav-link d-flex align-items-center mb-4 ${isActive('/user/std-manage-project') ? 'active' : ''}`}>
                    <i className="bi bi-book-half fs-5 me-2 mb-2"></i>
                    <span className="prompt-semibold text-black fs-6">จัดการโปรเจค</span>
                </NavLink>
            </Nav>
        </div>
    </div>
    );
}
export default StdSideBar;