import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NawNavBar from '../../components/User/NewNavBar'
import StdSideBar from '../../components/User/StdSideBar'

//เพิ่มโปรเจคนักศึกษา
const StdAddProject = () => {
    return (
        <div>
            <NawNavBar />
            <div className='d-flex'>
                <StdSideBar />

                <Card className='mx-auto mt-4 shadow-sm p-4' style={{ width: '80rem', height: '48rem', }}>
                    <Card.Body className='ms-5'>

                        <h3 className='prompt-semibold text-primary mb-4'>เพิ่มโปรเจคนักศึกษา</h3>

                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>ชื่อโปรเจค</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>คำอธิบาย</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>

                            <div className='row'>
                                <Form.Group controlId="formFile" className="mb-3 col-6">
                                    <Form.Label>อัปโหลดเอกสารเค้าโครง</Form.Label>
                                    <Form.Control type="file" />
                                </Form.Group>

                                <Form.Group controlId="formFile" className="mb-3 col-6">
                                    <Form.Label>อัปโหลดเอกสารเต็ม</Form.Label>
                                    <Form.Control type="file" />
                                </Form.Group>

                                <Form.Group className="mb-3 col-6" >
                                    <Form.Label>ปีการศึกษา</Form.Label>
                                    <Form.Select >
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3 col-6" >
                                    <Form.Label>ภาคการศึกษา</Form.Label>
                                    <Form.Select >
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3 col-6" >
                                    <Form.Label>รหัสวิชา</Form.Label>
                                    <Form.Select >
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3 col-6" >
                                    <Form.Label>รายวิชา</Form.Label>
                                    <Form.Select >
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <Form.Group className="mb-3" >
                                <Form.Label>อาจารย์ที่ปรึกษา</Form.Label>
                                <Form.Select >
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                    </Form.Select>
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
export default StdAddProject;