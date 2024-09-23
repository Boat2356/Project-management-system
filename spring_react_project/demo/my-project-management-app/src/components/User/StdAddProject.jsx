import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createProject } from '../../services/ProjectService';

//เพิ่มโปรเจคนักศึกษา
const StdAddProject = () => {
    
    return (

        <Card className='mx-auto mt-4 shadow-sm p-4' style={{ width: '80rem', height: '48rem', }}>
            <Card.Body className='ms-5'>

                <h3 className='prompt-semibold text-primary mb-4'>เพิ่มโปรเจคนักศึกษา</h3>

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className='prompt-semibold'>ชื่อโปรเจค</Form.Label>
                        <Form.Control className='prompt-regular' type="text" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='prompt-semibold'>คำอธิบาย</Form.Label>
                        <Form.Control className='prompt-regular' as="textarea" rows={3} />
                    </Form.Group>

                    <div className='row'>
                        <Form.Group controlId="formFile" className="mb-3 col-6">
                            <Form.Label className='prompt-semibold'>อัปโหลดเอกสารเค้าโครง</Form.Label>
                            <Form.Control className='prompt-regular' type="file" />
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3 col-6">
                            <Form.Label className='prompt-semibold'>อัปโหลดเอกสารเต็ม</Form.Label>
                            <Form.Control className='prompt-regular' type="file" />
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" >
                            <Form.Label className='prompt-semibold'>ปีการศึกษา</Form.Label>
                            <Form.Select className='prompt-regular'>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" >
                            <Form.Label className='prompt-semibold'>ภาคการศึกษา</Form.Label>
                            <Form.Select className='prompt-regular'>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" >
                            <Form.Label className='prompt-semibold'>รหัสวิชา</Form.Label>
                            <Form.Select className='prompt-regular'>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" >
                            <Form.Label className='prompt-semibold'>รายวิชา</Form.Label>
                            <Form.Select className='prompt-regular'>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                            </Form.Select>
                        </Form.Group>
                    </div>

                    <Form.Group className="mb-3" >
                        <Form.Label className='prompt-semibold'>อาจารย์ที่ปรึกษา</Form.Label>
                        <Form.Select className='prompt-regular'>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                        </Form.Select>
                    </Form.Group>

                    <Button className='prompt-regular' variant="primary" type="submit">
                        บันทึก
                    </Button>
                </Form>
            </Card.Body>

        </Card>

    )
}
export default StdAddProject;