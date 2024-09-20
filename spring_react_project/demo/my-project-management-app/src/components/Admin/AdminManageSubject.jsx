import { React, useState } from 'react'
import { Button, Form, Table, Modal } from 'react-bootstrap';

const AdminManageSubject = () => {
  const [show, setShow] = useState(false);
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [subjects, setSubjects] = useState([
    { code: 'CP123456', name: 'Web development' }
  ]);
  const [editingIndex, setEditingIndex] = useState(null); 

  const handleClose = () => {
    setShow(false);
    resetForm();
  };
  const handleShow = () => setShow(true);

  const resetForm = () => {
    setSubjectCode('');
    setSubjectName('');
    setEditingIndex(null);
  };

  

  const handleEdit = (index) => {
    setEditingIndex(index);
    setSubjectCode(subjects[index].code);
    setSubjectName(subjects[index].name);
    handleShow();
  };

 

  return (
<div className='mx-auto mt-4 ' style={{ width: '75rem' }}>
      <h3 className='prompt-semibold text-primary mb-4'>จัดการวิชา</h3>
      <Button className='prompt-regular px-3' variant='primary' onClick={handleShow}>
        เพิ่มวิชา
      </Button>
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
        <thead>
          <tr>
            <th className='prompt-semibold bg-body-tertiary'>รหัสวิชา</th>
            <th className='prompt-semibold bg-body-tertiary'>ชื่อวิชา</th>
            <th className='prompt-semibold bg-body-tertiary'>Action</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index}>
              <td className='prompt-regular'>{subject.code}</td>
              <td className='prompt-regular'>{subject.name}</td>
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


      <Modal size='md' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='prompt-semibold text-primary'>
            {editingIndex === null ? 'เพิ่มวิชา' : 'แก้ไขวิชา'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label className='prompt-semibold'>รหัสวิชา</Form.Label>
              <Form.Control
                type='text'
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label className='prompt-semibold'>รายวิชา</Form.Label>
              <Form.Control
                type='text'
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='prompt-regular' variant='primary' >
            {editingIndex === null ? 'บันทึก' : 'แก้ไข'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminManageSubject;
