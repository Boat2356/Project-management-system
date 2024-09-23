import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Alert, Spinner } from 'react-bootstrap';
import { getSupervisors, createSupervisor, updateSupervisor, deleteSupervisor } from '../../services/SupervisorService';

const AdminManageAdvisor = () => {
    const [supervisors, setSupervisors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [notification, setNotification] = useState(null);
    const [formData, setFormData] = useState({ id: null, name: '', email: '' });
    const [isEdit, setIsEdit] = useState(false);
    const [actionType, setActionType] = useState(''); // 'add', 'update', 'delete'
    const [supervisorToDelete, setSupervisorToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState('');


    useEffect(() => {
        loadSupervisors();
    }, []);

    const loadSupervisors = async () => {
        setIsLoading(true);
        try {
            const response = await getSupervisors();
            setSupervisors(response.data);
        } catch (error) {
            console.error('Error loading supervisors:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleAddSupervisor = async () => {
        setIsLoading(true);
        try {
            await createSupervisor(formData);
            showNotification('เพิ่มอาจารย์ที่ปรึกษาสำเร็จ');
            loadSupervisors(); // Reload supervisors after adding
            handleCloseModal();
        } catch (error) {
            console.error('Error adding supervisor:', error);
        } finally {
            setIsLoading(false);
        }
    }
    const handleUpdateSupervisor = async () => {
        setIsLoading(true);
        try {
            await updateSupervisor(formData.id, formData);
            showNotification('แก้ไขอาจารย์ที่ปรึกษาสำเร็จ');
            loadSupervisors(); // Reload supervisors after updating
            handleCloseModal();
        } catch (error) {
            console.error('Error updating supervisor:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleDeleteSupervisor = async () => {
        setIsLoading(true);
        try {
            await deleteSupervisor(supervisorToDelete.id);
            showNotification('ลบอาจารย์ที่ปรึกษาสำเร็จ');
            loadSupervisors(); // Reload supervisors after deleting
            handleCloseConfirmModal();
        } catch (error) {
            console.error('Error deleting supervisor:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    }

    const handleShowModal = (supervisor = { id: null, name: '', email: '' }, type = 'add') => {
        setFormData(supervisor);
        setIsEdit(type === 'edit');
        setActionType(type);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ id: null, name: '', email: '' });
    };

    const handleShowConfirmModal = (supervisor, type) => {
        setSupervisorToDelete(supervisor);
        setActionType(type);
        setShowConfirmModal(true);
    };

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
        setSupervisorToDelete(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'email') {
            if (!isEmailValid(value)) {
              setEmailError('รูปแบบอีเมลไม่ถูกต้อง');
            } else {
              setEmailError(''); // เคลียร์ข้อความเตือนเมื่ออีเมลถูกต้อง
            }
          }
    };

    // ฟังก์ชันตรวจสอบอีเมล
const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // ใช้ isEmailValid เพื่อตรวจสอบก่อน submit
  const isFormValid = () => {
    return isEmailValid(formData.email); 
  };
  

    return (
        <div className='mx-auto mt-4 ' style={{ width: '75rem' }}>
            <h3 className='prompt-semibold text-primary mb-4'>ข้อมูลอาจารย์ที่ปรึกษา</h3>
            <Button
                className='prompt-regular px-3'
                variant='primary '
                onClick={() => handleShowModal({}, 'add')}
                disabled={isLoading} >
                เพิ่มอาจารย์
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

            {notification && <Alert variant="success" className="mt-3 prompt-regular">{notification}</Alert>}
            {isLoading && <Spinner animation="border" className="mt-3" />}

            <Table bordered hover responsive className='mt-4 '>
                <thead >
                    <tr >
                        <th className='prompt-semibold bg-body-tertiary' hidden>ID</th>
                        <th className='prompt-semibold bg-body-tertiary'>ชื่ออาจารย์</th>
                        <th className='prompt-semibold bg-body-tertiary'>อีเมล</th>
                        <th className='prompt-semibold bg-body-tertiary'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {supervisors.map((supervisor) => (
                        <tr key={supervisor.id}>
                            <td className='prompt-regular' hidden>{supervisor.id}</td>
                            <td className='prompt-regular'>{supervisor.name}</td>
                            <td className='prompt-regular'>{supervisor.email}</td>
                            <td>
                                <Button
                                    className='prompt-regular me-2'
                                    variant='primary'
                                    onClick={() => handleShowModal(supervisor, 'edit')}
                                    disabled={isLoading}
                                >
                                    แก้ไข
                                </Button>
                                <Button
                                    className='prompt-regular px-3'
                                    variant='danger'
                                    onClick={() => handleShowConfirmModal(supervisor, 'delete')}
                                    disabled={isLoading}
                                >
                                    ลบ
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>


            <Modal size="md" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title
                        className='prompt-semibold text-primary' disabled={!isEmailValid() || isLoading}>
                        {isEdit ? 'แก้ไขอาจารย์ที่ปรึกษา' : 'เพิ่มอาจารย์ที่ปรึกษา'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label
                                className='prompt-semibold'>ชื่ออาจารย์</Form.Label>
                            <Form.Control
                                className='prompt-regular'
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="ชื่ออาจารย์"
                                disabled={isLoading} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className='prompt-semibold'>อีเมล</Form.Label>
                            <Form.Control
                                className='prompt-regular'
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@email.com"
                                disabled={isLoading} 
                                isInvalid={!!emailError}/>
                                {emailError && <Form.Text className="text-danger">{emailError}</Form.Text>}
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className='prompt-regular'
                        variant="secondary"
                        onClick={handleCloseModal}
                        disabled={isLoading}>
                        ปิด
                    </Button>
                    <Button
                        className='prompt-regular'
                        variant="primary"
                        onClick={isEdit ? handleUpdateSupervisor : handleAddSupervisor}
                        disabled={!!emailError || isLoading}
                    >
                        {isEdit ? 'แก้ไข' : 'เพิ่มอาจารย์'}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Confirmation Modal */}
            <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
                <Modal.Header closeButton>
                    <Modal.Title
                        className='prompt-semibold'>ยืนยันการลบ</Modal.Title>
                </Modal.Header>
                <Modal.Body className='prompt-regular'>
                    ต้องการที่จะลบอาจารย์ที่ปรึกษา?
                </Modal.Body>
                <Modal.Footer>
                    <Button className='prompt-regular' variant="secondary" onClick={handleCloseConfirmModal} disabled={isLoading}>
                        ยกเลิก
                    </Button>
                    <Button
                        className='prompt-regular'
                        variant='danger'
                        onClick={handleDeleteSupervisor}
                        disabled={isLoading}
                    >
                        ลบ
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default AdminManageAdvisor;