import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

//Navbar หลังจาก login แล้ว
const LoginNavBar = () => {
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
                <Nav.Link
                  href="/user/std-profile"
                  className="prompt-semibold pt-3 fw-bold"
                >
                  Dashboard
                </Nav.Link>
              </Nav>
              <Nav>
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    // Add logout functionality here
                    console.log("Logging out...");
                  }}
                >
                  Logout
                </Button>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default LoginNavBar;
