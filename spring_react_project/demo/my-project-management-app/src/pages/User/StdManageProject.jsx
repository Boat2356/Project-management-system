import {React,useState } from 'react'
import { Button, Form, Table, Modal } from 'react-bootstrap';
import NawNavBar from '../../components/User/NewNavBar';
import StdSideBar from '../../components/User/StdSideBar';

//จัดการโปรเจคสำหรับนักศึกษา
const StdManageProject = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <NawNavBar />
            <div className='d-flex'>
                <StdSideBar />

                <div className='mx-auto mt-4 ' style={{ width: '80rem' }}>
                    <h3 className='prompt-semibold text-primary mb-4'>จัดการโปรเจคนักศึกษา</h3>

                    {/* <Form>
                        <div className='row mt-4'>
                            <Form.Group className="mb-3 col-3" >
                                <Form.Control type="text" placeholder="ค้นหา" />
                            </Form.Group>
                            <Button className="mb-3 col-1" variant="primary" type="submit">
                                ค้นหา
                            </Button>
                        </div>
                    </Form> */}

                    <Table bordered hover className='mt-4 '>
                        <thead >
                            <tr >
                                <th className='bg-body-tertiary'>ชื่อโปรเจค</th>
                                <th className='bg-body-tertiary'>รายวิชา</th>
                                <th className='bg-body-tertiary'>สถานะ</th>
                                <th className='bg-body-tertiary'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>เว็บไซต์......</td>
                                <td>Web development</td>
                                <td>อนุมัติ</td>
                                <td>
                                    <Button className='me-2' variant='primary' onClick={handleShow}>แก้ไข</Button>
                                    <Button className='px-3' variant='danger'>ลบ</Button>
                                </td>

                            </tr>
                        </tbody>
                    </Table>
                    
                    {/* model แก้ไขโปรเจค */}
                    <Modal size="lg" show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className='prompt-semibold text-primary'>แก้ไขโปรเจค</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
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
                        </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                                บันทึก
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
export default StdManageProject;