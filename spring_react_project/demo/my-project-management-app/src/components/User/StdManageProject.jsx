import { React, useState, useEffect } from "react";
import { Table, Button, Form, Modal, Alert, Spinner } from "react-bootstrap";
import { getCourses } from "../../services/CourseService";
import { getSupervisors } from "../../services/SupervisorService";
import {
  updateProject, getProjectsByUserId
} from "../../services/ProjectService";
import { getUsers } from "../../services/UserService";
import {
  getFileMetadata,
  downloadFile
} from "../../services/ProjectService";
import { getProjectUsersByUserId } from "../../services/ProjectUserService";
import Select from "react-select";
import { useParams } from "react-router-dom";

//จัดการโปรเจคสำหรับนักศึกษา
const StdManageProject = () => {
  const [projects, setProjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });
  const [fileMetadata, setFileMetadata] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    year: "",
    semester: "",
    status: 0,
    course_code: "",
    courseId: "",
    supervisorId: "",
    userIds: [],
  });
  const [files, setFiles] = useState({
    proposalFile: null,
    fullDocumentFile: null,
    imageFile: null,
  });

  useEffect(() => {
    fetchProjects();
    fetchCourses();
    fetchSupervisors();
    fetchUsers();
    getProjectsByUserId(currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("authToken"));
    if (userData) {
      setCurrentUserId(userData.id); // Assuming the ID is in userData
    }
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await getProjectsByUserId(currentUserId);
      setProjects(response.data);
    } catch (error) {
      //console.error("Error fetching projects:", error);
      //showAlert("Error fetching projects", "danger");
    }
    setIsLoading(false);
  };

  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchSupervisors = async () => {
    try {
      const response = await getSupervisors();
      setSupervisors(response.data);
    } catch (error) {
      console.error("Error fetching supervisors:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      const filteredUsers = response.data.filter((user) => user.role === "USER");
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: files[0] || null, // ใช้ไฟล์ใหม่ถ้ามี มิฉะนั้นให้เป็น null
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      year: "",
      semester: "",
      status: 0,
      course_code: "",
      courseId: "",
      supervisorId: "",
      userIds: [],
    });
    setFiles({
      proposalFile: null,
      fullDocumentFile: null,
      imageFile: null,
    });
  };

  const showAlert = (message, variant = "success") => {
    setAlert({ show: true, message, variant });
    setTimeout(
      () => setAlert({ show: false, message: "", variant: "success" }),
      3000
    );
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await updateProject(selectedProject.id, formData, files);
      showAlert("Project updated successfully");
      fetchProjects();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error updating project:", error);
      showAlert("Error updating project", "danger");
    }
    setIsLoading(false);
  };

  const openModal = async (mode, project = null) => {
    setModalMode(mode);
    setSelectedProject(project);
    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        year: project.year,
        semester: project.semester,
        status: project.status,
        course_code: project.course.course_code,
        courseId: project.course.id,
        supervisorId: project.supervisor.id,
        userIds: project.projectStudents.map((ps) => ps.user.id),
      });
      await fetchFileMetadata(project.id);
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const fetchFileMetadata = async (projectId) => {
    try {
      const response = await getFileMetadata(projectId);
      setFileMetadata(response.data);
    } catch (error) {
      console.error("Error fetching file metadata:", error);
    }
  };

  const handleFileDownload = async (url, filename) => {
    try {
      const response = await downloadFile(url);
      const urlObject = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = urlObject;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleUserChange = (selectedOptions) => {
    // Map selected options to get userIds
    const selectedUserIds = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFormData({
      ...formData,
      userIds: selectedUserIds,
    });
  };

  const handleSelectProject = (projectId) => {
    setSelectedProjects((prevSelected) => {
      if (prevSelected.includes(projectId)) {
        return prevSelected.filter((id) => id !== projectId);
      } else {
        return [...prevSelected, projectId];
      }
    });
  };

  return (
    <div className="container mt-4">
      <h3 className="prompt-semibold text-primary mb-4">จัดการโปรเจค</h3>

      {alert.show && (
        <Alert
          variant={alert.variant}
          onClose={() => setAlert({ ...alert, show: false })}
          dismissible
        >
          {alert.message}
        </Alert>
      )}

      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Table>
          <thead>
            <tr>
              <th className="prompt-semibold me-4">ชื่อโปรเจค</th>
              <th className="prompt-semibold me-4">รายวิชา</th>
              <th className="prompt-semibold me-4">สถานะ</th>
              <th className="prompt-semibold me-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="prompt-regular">{project.name}</td>
                <td className="prompt-regular">{project.course.name}</td>
                <td className="prompt-semibold text-success-emphasis">{project.status === 1 ? "อนุมัติ" : "กำลังพิจารณา"}</td>

                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => openModal("view", project)}
                    className='prompt-regular mx-3'
                  >
                    ดูรายละเอียด
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => openModal("edit", project)}
                    className='prompt-regular'
                  >
                    แก้ไข
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode.charAt(0).toUpperCase() + modalMode.slice(1)} Project
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>ชื่อโปรเจค</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={modalMode === "view"}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>คำอธิบาย</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={modalMode === "view"}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ปีการศึกษา</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                disabled={modalMode === "view"}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ภาคการศึกษา</Form.Label>
              <Form.Control
                type="number"
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                disabled={modalMode === "view"}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>รายวิชา</Form.Label>
              <Form.Select
                name="courseId"
                value={formData.courseId}
                onChange={handleInputChange}
                disabled={modalMode === "view"}
              >
                <option value="">เลือกรายวิชา</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>อาจารย์ที่ปรึกษา</Form.Label>
              <Form.Select
                name="supervisorId"
                value={formData.supervisorId}
                onChange={handleInputChange}
                disabled={modalMode === "view"}
              >
                <option value="">เลือกอาจารย์ที่ปรึกษา</option>
                {supervisors.map((supervisor) => (
                  <option key={supervisor.id} value={supervisor.id}>
                    {supervisor.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>สมาชิกในกลุ่ม</Form.Label>
              <Select
                isMulti // สำหรับเลือกหลายผู้ใช้
                name="userIds"
                value={users
                  .filter((user) => formData.userIds.includes(user.id))
                  .map((user) => ({ value: user.id, label: user.username }))}
                onChange={handleUserChange}
                options={users.map((user) => ({
                  value: user.id,
                  label: user.username,
                }))}
                isDisabled={modalMode === "view"}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </Form.Group>
            {modalMode === "create" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>อัปโหลดเอกสารเค้าโครง</Form.Label>
                  <Form.Control
                    type="file"
                    name="proposalFile"
                    onChange={handleFileChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>อัปโหลดเอกสารเต็ม</Form.Label>
                  <Form.Control
                    type="file"
                    name="fullDocumentFile"
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </>
            )}
            {modalMode === "edit" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>อัปโหลดเอกสารเค้าโครง</Form.Label>
                  <Form.Control
                    type="file"
                    name="proposalFile"
                    onChange={handleFileChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>อัปโหลดเอกสารเต็ม</Form.Label>
                  <Form.Control
                    type="file"
                    name="fullDocumentFile"
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </>
            )}
          </Form>
          {modalMode === "view" && fileMetadata.length > 0 && (
            <div className="mt-4">
              <h5>ดาวน์โหลดไฟล์</h5>
              <ul>
                {fileMetadata.map((file) => (
                  <li key={file.filePath}>
                    {file.fileType === "proposal" ? (
                      <>
                        <strong>เอกสารเค้าโครง: </strong>
                        <a
                          href="#"
                          onClick={() =>
                            handleFileDownload(file.filePath, file.filename)
                          }
                        >
                          {file.filename}
                        </a>
                      </>
                    ) : file.fileType === "fulldocument" ? (
                      <>
                        <strong>เอกสารเต็ม: </strong>
                        <a
                          href="#"
                          onClick={() =>
                            handleFileDownload(file.filePath, file.filename)
                          }
                        >
                          {file.filename}
                        </a>
                      </>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {modalMode === "edit" && fileMetadata.length > 0 && (
            <div className="mt-4">
              <h5>ไฟล์ล่าสุด</h5>
              <ul>
                {fileMetadata.map((file) => (
                  <li key={file.filePath}>
                    {file.fileType === "proposal" ? (
  <>
    <strong>เอกสารเค้าโครง: </strong>
    <a
      href="#"
      onClick={() =>
        handleFileDownload(file.filePath, file.filename)
      }
    >
      {file.filename}
    </a>
  </>
) : file.fileType === "fulldocument" ? (
  <>
    <strong>เอกสารเต็ม: </strong>
    <a
      href="#"
      onClick={() =>
        handleFileDownload(file.filePath, file.filename)
      }
    >
      {file.filename}
    </a>
  </>
) : null}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            ปิด
          </Button>
          {modalMode === "edit" && (
            <Button variant="primary" onClick={handleUpdate}>
              แก้ไข
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default StdManageProject;
