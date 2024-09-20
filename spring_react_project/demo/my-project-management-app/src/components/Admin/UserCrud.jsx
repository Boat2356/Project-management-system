import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Alert, Spinner } from 'react-bootstrap';
import { getUsers, createUser, updateUser, deleteUser } from '../../services/UserService';

const UserCrud = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showConfirmActionModal, setShowConfirmActionModal] = useState(false);
    const [notification, setNotification] = useState(null);
    const [formData, setFormData] = useState(
        { id: null, firstName: '', lastName: '', username: '', email: '', role: 'USER', password: '' });
    const [isEdit, setIsEdit] = useState(false);
    const [actionType, setActionType] = useState(''); // 'add', 'update', 'delete'
    const [userToDelete, setUserToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    }

    const loadUsers = async () => {
        setIsLoading(true);
        try {
            const response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error('Error loading users:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleAddUser = () => {
        setShowConfirmActionModal(true);
    }

    const handleUpdateUser = () => {
        setShowConfirmActionModal(true);
    }

    const handleDeleteUser = (user) => {
        setUserToDelete(user);
        setShowConfirmModal(true);
    }

    const confirmAddUser = async () => {
        setIsLoading(true);
        try {
            await createUser(formData);
            showNotification('User added successfully');
            loadUsers();
            handleCloseModal();
        } catch (error) {
            console.error('Error adding user:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const confirmUpdateUser = async () => {
        setIsLoading(true);
        try {
            await updateUser(formData.id, formData);
            showNotification('User updated successfully');
            loadUsers();
            handleCloseModal();
        } catch (error) {
            console.error('Error updating user:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleDeleteUserConfirm  = async () => {
        setIsLoading(true);
        try {
            await deleteUser(userToDelete.id);
            showNotification('User deleted successfully');
            loadUsers();
            setUserToDelete(null);
            handleCloseConfirmModal();
        } catch (error) {
            console.error('Error deleting user:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleShowModal = (type, user) => {
        setActionType(type);
        if (type === 'add') {
            setFormData({ id: null, firstName: '', lastName: '', username: '', email: '', role: 'USER', password: '' });
            setIsEdit(false);
        } else if (type === 'update') {
            setFormData({ ...user });
            setIsEdit(true);
        } else if (type === 'delete') {
            setUserToDelete(user);
        }
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ id: null, firstName: '', lastName: '', username: '', email: '', role: 'USER', password: '' });
        setShowConfirmActionModal(false);
    }

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
        setUserToDelete(null);
    }
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <div className="container">
            <h2>User Management</h2>
            <Button variant="primary" onClick={() => handleShowModal('add')}>
                Add New User
            </Button>

            {notification && <Alert variant="success" className="mt-3">{notification}</Alert>}
            {isLoading && <Spinner animation="border" role="status" className="mt-3"><span className="visually-hidden">Loading...</span></Spinner>}

            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleShowModal('update', user)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDeleteUser(user)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Add/Edit User Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{actionType === 'add' ? 'Add New User' : 'Edit User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        {/* Password field for adding user only */}
                        {actionType === 'add' && (
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                        )}

                        <Form.Group controlId="role">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" disabled>Select role</option> {/* Add a disabled option */}
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={actionType === 'add' ? handleAddUser : confirmUpdateUser}>
                        {actionType === 'add' ? 'Add User' : 'Update User'}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Confirm Delete Modal */}
            <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this user?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmModal}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteUserConfirm}>Delete</Button>
                </Modal.Footer>
            </Modal>

            {/* Confirm Action Modal */}
            <Modal show={showConfirmActionModal} onHide={() => setShowConfirmActionModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{actionType === 'add' ? 'Confirm Add User' : 'Confirm Update User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {actionType === 'add' ? 'add this user' : 'update this user'}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmActionModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={actionType === 'add' ? confirmAddUser : confirmUpdateUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserCrud;
