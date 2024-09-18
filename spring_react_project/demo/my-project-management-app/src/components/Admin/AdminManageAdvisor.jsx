import { React, useState } from 'react'
import { Button, Form, Table, Modal } from 'react-bootstrap';

const AdminManageAdvisor = () => { 
    const [show, setShow] = useState(false);
    const [advisorName, setAdvisorName] = useState('');
    const [advisorSurname, setAdvisorSurname] = useState('');
    const [advisorEmail, setAdvisorEmail] = useState('');
    const [advisors, setAdvisors] = useState([
      { name: 'นดกอมด',surname:'ฟหกกดาสสนส', email: 'name@email.com' }
  ]);
    const [editingIndex, setEditingIndex] = useState(null);

    const handleClose = () => {
        setShow(false);
        resetForm();
  };
    const handleShow = () => setShow(true);

    const resetForm = () => {
      setAdvisorName('');
      setAdvisorSurname('');
      setAdvisorEmail('');
    };
  
  
    const handleEdit = (index) => {
        setEditingIndex(index);
        setAdvisorName(advisors[index].name);
        setAdvisorSurname(advisors[index].surname);
        setAdvisorEmail(advisors[index].email);
        handleShow();
  };
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
                    {advisors.map((advisor, index) => (
                        <tr key={index}>
                            <td className='prompt-regular'>{advisor.name} {advisor.surname}</td>
                            
                            <td className='prompt-regular'>{advisor.email}</td>
                            <td>
                                <Button
                                    className='prompt-regular me-2'
                                    variant='primary'
                                    onClick={() => handleEdit(index)}
                                >
                                    แก้ไข
                                </Button>
                                <Button
                                    className='prompt-regular px-3'
                                    variant='danger'
                                    
                                >
                                    ลบ
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>


            <Modal size="md" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='prompt-semibold text-primary'> {editingIndex === null ? 'เพิ่มอาจารย์' : 'แก้ไขข้อมูลอาจารย์'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className='prompt-semibold'>ชื่อ</Form.Label>
                            <Form.Control type="text" value={advisorName} onChange={(e) => setAdvisorName(e.target.value)} />
                        </Form.Group>
                        
                        <Form.Group className="mb-3"> 
                            <Form.Label className='prompt-semibold'>นามสกุล</Form.Label>
                            <Form.Control
                                type="text"
                                value={advisorSurname}
                                onChange={(e) => setAdvisorSurname(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='prompt-semibold'>อีเมล</Form.Label>
                            <Form.Control type="email" value={advisorEmail}onChange={(e) => setAdvisorEmail(e.target.value)}/>
                        </Form.Group>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='prompt-regular' variant="primary">
                    {editingIndex === null ? 'บันทึก' : 'แก้ไข'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
  )
}
export default AdminManageAdvisor;