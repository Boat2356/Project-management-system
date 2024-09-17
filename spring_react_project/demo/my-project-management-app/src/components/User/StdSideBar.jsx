import React from 'react'
import { BsPersonFill,BsFillPencilFill,BsPlusCircleFill,BsBoxArrowRight  } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

import { Nav } from "react-bootstrap";
const StdSideBar = () => {
    const location = useLocation(); // ใช้ hook เพื่อดู path ปัจจุบัน

    const isActive = (path) => location.pathname === path; // ตรวจสอบว่า path นั้น active หรือไม่
    return (
        <div className="sidebar">
        <div className="sidebar-wrapper bg-white shadow p-3 " style={{  height: '120vh', }}>
            <Nav className='d-flex flex-column'>
                <NavLink 
                    to="/user/std-profile" 
                    className={`text-black s-link nav-link d-flex align-items-center mb-4 ${isActive('/user/std-profile') ? 'active' : ''}`}>
                    <BsPersonFill className="fs-3 me-2" />
                    <span className="prompt-semibold text-black fs-6">บัญชีผู้ใช้</span>
                </NavLink>
                <NavLink 
                    to="/user/edit-profile" 
                    className={`text-black s-link nav-link d-flex align-items-center mb-4 ${isActive('/user/edit-profile') ? 'active' : ''}`}>
                    <BsFillPencilFill className="fs-3 me-2" />
                    <span className="prompt-semibold fs-6">แก้ไขบัญชี</span>
                </NavLink>
                <NavLink 
                    to="/user/std-add-project" 
                    className={`text-black s-link nav-link d-flex align-items-center mb-4 ${isActive('/user/std-add-project') ? 'active' : ''}`}>
                    <BsPlusCircleFill className="fs-3 me-2" />
                    <span className="prompt-semibold text-black fs-6">เพิ่มโปรเจค</span>
                </NavLink>
                <NavLink 
                    to="/user/std-manage-project" 
                    className={`text-black s-link nav-link d-flex align-items-center mb-4 ${isActive('/user/std-manage-project') ? 'active' : ''}`}>
                    <FaBook className="fs-3 me-2" />
                    <span className="prompt-semibold text-black fs-6">จัดการโปรเจค</span>
                </NavLink>
                <NavLink 
                    to="/" 
                    className={`text-danger s-link nav-link d-flex align-items-center mb-3 ${isActive('/') ? 'active' : ''}`}>
                    <BsBoxArrowRight  className="fs-3 me-2" />
                    <span className="prompt-semibold fs-6">ออกจากระบบ</span>
                </NavLink>
            </Nav>
        </div>
    </div>
    );
}
export default StdSideBar;