import React from 'react'
import Card from 'react-bootstrap/Card';

const AdminProfile = () => {
  return (
    <Card className='mx-auto mt-4 shadow-sm p-4' style={{ width: '80rem', height: '13rem', }}>
            <Card.Body className='ms-5'>

                <h3 className='prompt-semibold text-primary mb-4'>ข้อมูลผู้ดูแล</h3>

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
  )
}
export default AdminProfile;