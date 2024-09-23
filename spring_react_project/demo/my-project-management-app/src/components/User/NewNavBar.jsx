import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

// Nav Bar ตามที่ออกแบบ
const NewNavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // Add state for role


  useEffect(() => {
    // Check if the auth token exists
    const token = localStorage.getItem("authToken");
    
    const role = localStorage.getItem("userRole"); // Retrieve role from localStorage
    setIsLoggedIn(!!token); // Set logged in state based on token existence
    setUserRole(role); // Set the user role
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole"); // Remove role on logout
    navigate("/login-page");
  };


  return (
    <div className="">
      <Navbar expand="lg" className="p-3 bg-white text-dark shadow-sm ">
        <Container>
          <div>
            <Navbar.Brand href="/home-page">
              <span className="text-primary fw-bold fs-3">S</span>{" "}
              <span className="fw-bold">- project</span>
            </Navbar.Brand>
          </div>

          <div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="">
                <Nav.Link
                  href="/home-page"
                  className="prompt-semibold pt-3 fw-bold"
                >
                  หน้าหลัก
                </Nav.Link>
                {isLoggedIn ? (
                  <>
                    {userRole === "ADMIN" ? (
                      <Nav.Link
                        href="/admin/profile"
                        className="prompt-semibold pt-3 fw-bold"
                      >
                        Dashboard
                      </Nav.Link>
                    ) : (
                      <Nav.Link
                        href="/user/std-profile"
                        className="prompt-semibold pt-3 fw-bold"
                      >
                        Dashboard
                      </Nav.Link>
                    )}
                    <Button variant="danger" onClick={handleLogout}>
                      ออกจากระบบ
                    </Button>
                  </>
                ) : (
                  <Nav.Link
                    href="/login-page"
                    className="prompt-semibold pt-3 fw-bold"
                  >
                    เข้าสู่ระบบ
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default NewNavBar;
