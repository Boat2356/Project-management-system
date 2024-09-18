import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NawNavBar from '../../components/User/NewNavBar'
import StdSideBar from '../../components/User/StdSideBar'

//แก้ไขข้อมูลของนักศึกษา
const EditProfile = () => {
    return (

        <Card className='mx-auto mt-4 shadow-sm p-4' style={{ width: '80rem', height: '30rem', }}>
            <Card.Body className='ms-5'>

                <h3 className='prompt-semibold text-primary mb-4'>แก้ไขข้อมูลนักศึกษา</h3>

                <Form>
                    <Form.Group className=" mb-3" controlId="formBasicEmail">
                        <Form.Label className='prompt-semibold'>รหัสนักศึกษา</Form.Label>
                        <Form.Control className='prompt-regular' type="email" placeholder="xxxxxxxxx-x" />
                    </Form.Group>

                    <div className='row'>

                        <Form.Group className="mb-3 col-6" >
                            <Form.Label className='prompt-semibold'>ชื่อ</Form.Label>
                            <Form.Control className='prompt-regular' type="text" placeholder="ชื่อ" />
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" >
                            <Form.Label className='prompt-semibold'>นามสกุล</Form.Label>
                            <Form.Control className='prompt-regular' type="text" placeholder="นามสกุล" />
                        </Form.Group>
                    </div>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='prompt-semibold'>อีเมล</Form.Label>
                        <Form.Control className='prompt-regular' type="email" placeholder="name@email.com" />
                    </Form.Group>

                    <Button className='prompt-regular' variant="primary" type="submit">
                        บันทึก
                    </Button>
                </Form>
            </Card.Body>

        </Card>

    )
}
export default EditProfile;