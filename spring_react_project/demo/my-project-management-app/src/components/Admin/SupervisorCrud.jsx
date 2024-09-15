import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Alert, Spinner } from 'react-bootstrap';
import { getSupervisors, createSupervisor, updateSupervisor, deleteSupervisor } from '../../services/SupervisorService';

const SupervisorCrud = () => {
    const [supervisors, setSupervisors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [notification, setNotification] = useState(null);
    const [formData, setFormData] = useState({ id: null, name: '', email: '' });
    const [isEdit, setIsEdit] = useState(false);
    const [actionType, setActionType] = useState(''); // 'add', 'update', 'delete'
    const [supervisorToDelete, setSupervisorToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
            showNotification('Supervisor added successfully');
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
            showNotification('Supervisor updated successfully');
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
            showNotification('Supervisor deleted successfully');
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
    };    

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Supervisor Management</h1>
            <Button
                variant="primary"
                onClick={() => handleShowModal({}, 'add')}
                disabled={isLoading}
            >
                Add Supervisor
            </Button>
            {notification && <Alert variant="success" className="mt-3">{notification}</Alert>}
            {isLoading && <Spinner animation="border" className="mt-3" />}
            <Table striped bordered hover className="mt-4" responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {supervisors.map((supervisor) => (
                        <tr key={supervisor.id}>
                            <td>{supervisor.id}</td>
                            <td>{supervisor.name}</td>
                            <td>{supervisor.email}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => handleShowModal(supervisor, 'edit')}
                                    disabled={isLoading}
                                >
                                    Edit
                                </Button>{' '}
                                <Button
                                    variant="danger"
                                    onClick={() => handleShowConfirmModal(supervisor, 'delete')}
                                    disabled={isLoading}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Supervisor Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEdit ? 'Edit Supervisor' : 'Add Supervisor'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter supervisor name"
                                disabled={isLoading}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter supervisor email"
                                disabled={isLoading}
                            />
                        </Form.Group>                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal} disabled={isLoading}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={isEdit ? handleUpdateSupervisor: handleAddSupervisor}
                        disabled={isLoading}
                    >
                        {isEdit ? 'Update Supervisor' : 'Add Supervisor'}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Confirmation Modal */}
            <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm {actionType.charAt(0).toUpperCase() + actionType.slice(1)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {actionType} this supervisor?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmModal} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        variant={actionType === 'delete' ? 'danger' : 'primary'}
                        onClick={actionType === 'delete' ? handleDeleteSupervisor : () => {
                            handleCloseConfirmModal();
                            actionType === 'add' ? handleAddSupervisor() : handleUpdateSupervisor();
                        }}
                        disabled={isLoading}
                    >
                        {actionType === 'delete' ? 'Delete' : actionType === 'add' ? 'Add' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default SupervisorCrud;