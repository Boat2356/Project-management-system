import { React, useState } from 'react'
import { Button, Form, Table, Modal } from 'react-bootstrap';
import NawNavBar from './NewNavBar';
import StdSideBar from './StdSideBar';

//จัดการโปรเจคสำหรับนักศึกษา
const StdManageProject = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (

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
                        <th className='prompt-semibold'>ชื่อโปรเจค</th>
                        <th className='prompt-semibold'>รายวิชา</th>
                        <th className='prompt-semibold'>สถานะ</th>
                        <th className='prompt-semibold'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='prompt-regular'>เว็บไซต์......</td>
                        <td className='prompt-regular'>Web development</td>
                        <td className='prompt-regular'>อนุมัติ</td>
                        <td>
                            <Button className='prompt-regular me-2' variant='primary' onClick={handleShow}>แก้ไข</Button>
                            <Button className='prompt-regular px-3' variant='danger'>ลบ</Button>
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
                            </Form.Select >
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='prompt-regular' variant="primary" onClick={handleClose}>
                        บันทึก
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}
export default StdManageProject;