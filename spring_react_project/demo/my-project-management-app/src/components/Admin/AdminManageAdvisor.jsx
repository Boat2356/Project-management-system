import { React, useState } from 'react'
import { Button, Form, Table, Modal } from 'react-bootstrap';

const AdminManageAdvisor = () => { 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div className='mx-auto mt-4 ' style={{ width: '80rem' }}>
            <h3 className='prompt-semibold text-primary mb-4'>ข้อมูลอาจารย์ที่ปรึกษา</h3>
            <Button className='prompt-regular px-3' variant='primary ' onClick={handleShow}>เพิ่มอาจารย์</Button>
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
                        <th className='prompt-semibold bg-body-tertiary'>ชื่ออาจารย์</th>
                        <th className='prompt-semibold bg-body-tertiary'>อีเมล</th>
                        <th className='prompt-semibold bg-body-tertiary'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='prompt-regular'>ตทม่นัยสว้บยเส</td>
                        <td className='prompt-regular'>bujrmbi@gmail.com</td>
                        <td>
                            <Button className='prompt-regular me-2' variant='primary'>แก้ไข</Button>
                            <Button className='prompt-regular px-3' variant='danger'>ลบ</Button>
                            
                        </td>

                    </tr>
                </tbody>
            </Table>


            <Modal size="md" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='prompt-semibold text-primary'>เพิ่มอาจารย์</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className='prompt-semibold'>ชื่ออาจารย์</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className='prompt-semibold'>อีเมล</Form.Label>
                            <Form.Control type="text" />
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
  )
}
export default AdminManageAdvisor;