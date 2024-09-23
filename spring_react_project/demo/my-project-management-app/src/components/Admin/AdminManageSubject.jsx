import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Alert, Spinner } from 'react-bootstrap';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../../services/CourseService';

const AdminManageSubject = () => {

  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({ id: null, courseCode: '', name: '', description: '', credits: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [actionType, setActionType] = useState(''); // 'add', 'update', 'delete'
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setIsLoading(true);
    try {
      const response = await getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCourse = async () => {
    setIsLoading(true);
    try {
      await createCourse(formData);
      showNotification('เพิ่มรายวิชาสำเร็จ');
      loadCourses(); // Reload courses after adding
      handleCloseModal();
    } catch (error) {
      console.error('Error adding course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCourse = async () => {
    setIsLoading(true);
    try {
      await updateCourse(formData.id, formData);
      showNotification('แก้ไขรายวิชาสำเร็จ');
      loadCourses(); // Reload courses after updating
      handleCloseModal();
    } catch (error) {
      console.error('Error updating course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCourse = async () => {
    setIsLoading(true);
    try {
      await deleteCourse(courseToDelete.id);
      showNotification('ลบรายวิชาสำเร็จ');
      loadCourses(); // Reload courses after deleting
      setCourseToDelete(null);
      handleCloseConfirmModal();
    } catch (error) {
      console.error('Error deleting course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowModal = (course = { id: null, courseCode: '', name: '', description: '', credits: '' }, type = 'add') => {
    setFormData(course);
    setIsEdit(type === 'edit');
    setActionType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ id: null, courseCode: '', name: '', description: '', credits: '' });
  };

  const handleShowConfirmModal = (course, type) => {
    setCourseToDelete(course);
    setActionType(type);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setCourseToDelete(null);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='mx-auto mt-4 ' style={{ width: '75rem' }}>
      <h3 className='prompt-semibold text-primary mb-4'>จัดการวิชา</h3>
      <Button
        className='prompt-regular px-3'
        variant='primary'
        onClick={() => handleShowModal({}, 'add')}
        disabled={isLoading}>

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

      {notification && <Alert variant="success" className="mt-3 prompt-regular">{notification}</Alert>}
      {isLoading && <Spinner animation="border" className="mt-3 " />}

      <Table bordered hover responsive className='mt-4 '>
        <thead>
          <tr>
            <th className='prompt-semibold bg-body-tertiary' hidden>ID</th>
            <th className='prompt-semibold bg-body-tertiary'>รหัสวิชา</th>
            <th className='prompt-semibold bg-body-tertiary'>ชื่อวิชา</th>
            <th className='prompt-semibold bg-body-tertiary'>หน่วยกิต</th>
            <th className='prompt-semibold bg-body-tertiary'>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td className='prompt-regular' hidden>{course.id}</td>
              <td className='prompt-regular'>{course.courseCode}</td>
              <td className='prompt-regular'>{course.name}</td>
              <td className='prompt-regular'>{course.credits}</td>
              <td>
                <Button
                  className='prompt-regular me-2'
                  variant='primary'
                  onClick={() => handleShowModal(course, 'edit')}
                  disabled={isLoading}
                >
                  แก้ไข
                </Button>
                <Button
                  className='prompt-regular px-3'
                  variant='danger'
                  onClick={() => handleShowConfirmModal(course, 'delete')}
                  disabled={isLoading}

                >
                  ลบ
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>


      <Modal size='md' show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className='prompt-semibold text-primary'>
            {isEdit ? 'แก้ไขวิชา' : 'เพิ่มวิชา'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label className='prompt-semibold'>รหัสวิชา</Form.Label>
              <Form.Control
                className='prompt-regular'
                type='text'
                name="courseCode"
                value={formData.courseCode}
                onChange={handleChange}
                placeholder="รหัสวิชา"
                disabled={isLoading}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label className='prompt-semibold'>ชื่อวิชา</Form.Label>
              <Form.Control
                className='prompt-regular'
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="ชื่อวิชา"
                disabled={isLoading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className='prompt-semibold'>หน่วยกิต</Form.Label>
              <Form.Control
                className='prompt-regular'
                type="number"
                name="credits"
                value={formData.credits}
                onChange={handleChange}
                placeholder="หน่วยกิต"
                disabled={isLoading}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            disabled={isLoading}
            className='prompt-regular'>

            ปิด
          </Button>
          <Button
            className='prompt-regular'
            variant='primary'
            onClick={isEdit ? handleUpdateCourse : handleAddCourse}
            disabled={isLoading}>

            {isEdit ? 'แก้ไขวิชา' : 'เพิ่มวิชา'}
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
          ต้องการที่จะลบรายวิชานี้?
        </Modal.Body>
        <Modal.Footer>
          <Button className='prompt-regular' variant="secondary" onClick={handleCloseConfirmModal} disabled={isLoading}>
            ยกเลิก
          </Button>
          <Button
            className='prompt-regular'
            variant='danger'
            onClick={handleDeleteCourse}
            disabled={isLoading}
          >
            ลบ
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminManageSubject;
