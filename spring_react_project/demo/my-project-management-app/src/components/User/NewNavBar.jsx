import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Nav Bar ตามที่ออกแบบ
const NawNavBar = () => {
    return (
        <div className=''>
            <Navbar expand="lg" className="p-3 mb-2 bg-white text-dark shadow-sm ">
                <Container>
                    <div>
                        <Navbar.Brand href="#"><span className='text-primary fw-bold fs-3'>S</span> <span className='fw-bold'>- project</span></Navbar.Brand>
                    </div>

                    <div>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />

                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className=''>
                                <Nav.Link href="#" className='prompt-semibold pt-3 fw-bold'>หน้าหลัก</Nav.Link>
                                <Nav.Link href="#" className='prompt-semibold pt-3 fw-bold'>เข้าสู่ระบบ</Nav.Link>

                            </Nav>
                        </Navbar.Collapse>
                    </div>

                </Container>
            </Navbar>
        </div>
    )
}
export default NawNavBar;