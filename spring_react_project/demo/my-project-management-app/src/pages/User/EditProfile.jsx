import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NawNavBar from '../../components/User/NewNavBar'
import StdSideBar from '../../components/User/StdSideBar'

//แก้ไขข้อมูลของนักศึกษา
const EditProfile = () => {
    return (
        <div>
            <NawNavBar />
            <div className='d-flex'>
                <StdSideBar />

                <Card className='mx-auto mt-4 shadow-sm p-4' style={{ width: '80rem', height: '30rem', }}>
                    <Card.Body className='ms-5'>

                        <h3 className='prompt-semibold text-primary mb-4'>แก้ไขข้อมูลนักศึกษา</h3>

                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>รหัสนักศึกษา</Form.Label>
                                <Form.Control type="email" placeholder="xxxxxxxxx-x" />
                            </Form.Group>

                            <div className='row'>

                                <Form.Group className="mb-3 col-6" >
                                    <Form.Label>ชื่อ</Form.Label>
                                    <Form.Control type="text" placeholder="ชื่อ" />
                                </Form.Group>

                                <Form.Group className="mb-3 col-6" >
                                    <Form.Label>นามสกุล</Form.Label>
                                    <Form.Control type="text" placeholder="นามสกุล" />
                                </Form.Group>
                            </div>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>อีเมล</Form.Label>
                                <Form.Control type="email" placeholder="name@email.com" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                บันทึก
                            </Button>
                        </Form>
                    </Card.Body>

                </Card>
            </div>
        </div>
    )
}
export default EditProfile;