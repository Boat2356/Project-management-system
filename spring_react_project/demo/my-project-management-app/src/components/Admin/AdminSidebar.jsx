import React from 'react'
import { NavLink, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";

const AdminSidebar = () => {
    const location = useLocation(); // ใช้ hook เพื่อดู path ปัจจุบัน

    const isActive = (path) => location.pathname === path; // ตรวจสอบว่า path นั้น active หรือไม่
    return (
        <div className="sidebar me-3">
        <div className="sidebar-wrapper bg-white shadow p-3" style={{ height: '120vh', }}>
            <Nav className='d-flex flex-column'>
                <NavLink 
                    to="/admin/profile" 
                    className={`text-black s-link nav-link d-flex align-items-center mb-4 ${isActive('/admin/profile') ? 'active' : ''}`}>
                    <i className="bi bi-person-fill fs-5 me-2 mb-2" ></i>
                    <span className="prompt-semibold text-black fs-6">บัญชีผู้ใช้</span>
                </NavLink>

                <NavLink 
                    to="/admin/edit-profile" 
                    className={`text-black s-link nav-link d-flex align-items-center mb-4 ${isActive('/admin/edit-profile') ? 'active' : ''}`}>
                    <i className="bi bi-pencil-fill fs-5 me-2 mb-2"></i>
                    <span className="prompt-semibold fs-6">แก้ไขบัญชี</span>
                </NavLink>
                
                <NavLink 
                    to="/admin/manage-project" 
                    className={`text-black s-link nav-link d-flex align-items-center mb-4 ${isActive('/admin/manage-project') ? 'active' : ''}`}>
                    <i className="bi bi-book-half fs-5 me-2 mb-2"></i>
                    <span className="prompt-semibold text-black fs-6">จัดการโปรเจค</span>
                </NavLink>
                <NavLink 
                    to="/admin/manage-subject" 
                    className={`text-black s-link nav-link d-flex align-items-center mb-4 ${isActive('/admin/manage-subject') ? 'active' : ''}`}>
                    <i className="bi bi-file-earmark-text-fill fs-5 me-2 mb-2"></i>
                    <span className="prompt-semibold text-black fs-6">จัดการวิชา</span>
                </NavLink>
                <NavLink 
                    to="/admin/manage-advisor" 
                    className={`text-black s-link nav-link d-flex align-items-center mb-4 ${isActive('/admin/manage-advisor') ? 'active' : ''}`}>
                    <i className="bi bi-people-fill fs-5 me-2 mb-2"></i>
                    <span className="prompt-semibold text-black fs-6">ข้อมูลอาจารย์ที่ปรึกษา</span>
                </NavLink>
            </Nav>
        </div>
    </div>
    );
}
export default AdminSidebar;