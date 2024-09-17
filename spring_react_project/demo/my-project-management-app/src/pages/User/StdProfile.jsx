import React from 'react'
import Card from 'react-bootstrap/Card';
import StdSideBar from '../../components/User/StdSideBar';
import NawNavBar from '../../components/User/NewNavBar';

//บัญชีผู้ใช้ของนักศึกษา
const StdProfile = () => {
    return (
        <div>
            <NawNavBar />
            <div className='d-flex'>

                <StdSideBar />

                <Card className='mx-auto mt-4 shadow-sm p-4' style={{ width: '80rem', height: '13rem', }}>
                    <Card.Body className='ms-5'>

                        <h3 className='prompt-semibold text-primary mb-4'>ข้อมูลนักศึกษา</h3>

                        <p className="prompt-semibold me-4 d-inline">รหัสนักศึกษา</p>
                        <p className="prompt-regular d-inline">65000000-0</p>

                        <div className='d-block mt-4'>
                            <p className="prompt-semibold me-4  d-inline">ชื่อ</p>
                            <p className="prompt-regular d-inline me-5">นดกอมด</p>

                            <p className="prompt-semibold ms-5 me-4 d-inline ">นามสกุล</p>
                            <p className="prompt-regular d-inline me-5">ฟหกกดาสสนส</p>

                            <p className="prompt-semibold ms-5 me-4 d-inline">อีเมล</p>
                            <p className="prompt-regular d-inline ">name@email.com</p>
                        </div>
                    </Card.Body>

                </Card>
            </div>
        </div>
    )
}

export default StdProfile;