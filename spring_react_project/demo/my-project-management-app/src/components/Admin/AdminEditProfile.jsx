import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { getUserById, updateUser } from '../../services/UserService';

const AdminEditProfile = () => {
    const [adminData, setAdminData] = useState({
        firstName: '',
        lastName: ''
    });
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('authToken'));
        if (userData) {
            setCurrentUserId(userData.id); // Assuming the ID is in userData
        }
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUserId) {
                try {
                    const response = await getUserById(currentUserId);
                    setAdminData({
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                    });
                } catch (error) {
                    setErrorMessage('ไม่สามารถดึงข้อมูลได้');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [currentUserId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateUser(currentUserId, {
                firstName: adminData.firstName,
                lastName: adminData.lastName,
            });
            await updateUser(currentUserId, adminData);
            alert('ข้อมูลถูกบันทึกเรียบร้อยแล้ว');
        } catch (error) {
            setErrorMessage('ไม่สามารถบันทึกข้อมูลได้');
        }
    };

    if (loading) {
        return <p>กำลังโหลดข้อมูล...</p>;
    }

    if (errorMessage) {
        return <p>{errorMessage}</p>;
    }
    return (
        <Card className='mx-auto mt-4 shadow-sm p-4 ' style={{ width: '75rem', height: '30rem', }}>
            <Card.Body className='ms-5'>

                <h3 className='prompt-semibold text-primary mb-4'>แก้ไขข้อมูลผู้ดูแล</h3>

                <Form onSubmit={handleSubmit}>
                    <div className='row'>

                        <Form.Group className="mb-3 col-6" >
                            <Form.Label className='prompt-semibold'>ชื่อ</Form.Label>
                            <Form.Control
                                className='prompt-regular'
                                type="text"
                                placeholder="ชื่อ"
                                value={adminData?.firstName || ''}
                                onChange={(e) => setAdminData({ ...adminData, firstName: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" >
                            <Form.Label className='prompt-semibold'>นามสกุล</Form.Label>
                            <Form.Control
                                className='prompt-regular'
                                type="text"
                                placeholder="นามสกุล"
                                value={adminData?.lastName || ''}
                                onChange={(e) => setAdminData({ ...adminData, lastName: e.target.value })}
                                required
                            />
                        </Form.Group>
                    </div>

                    <Button className='prompt-regular' variant="primary" type="submit">
                        บันทึก
                    </Button>
                </Form>
            </Card.Body>

        </Card>
    )
}
export default AdminEditProfile;