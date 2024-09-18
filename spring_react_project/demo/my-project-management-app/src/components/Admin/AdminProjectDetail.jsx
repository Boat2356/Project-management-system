import React from 'react'
import { Card, Button, Form } from 'react-bootstrap';

const AdminProjectDetail = () => {
    return (
        <Card className='mx-auto mt-4 shadow-sm p-4' style={{ width: '75rem' }}>
            <Card.Body className='ms-5'>
                <Form>
                    <h3 className='prompt-semibold text-primary mb-5'>รายละเอียดโปรเจคนักศึกษา</h3>

                    {/* ชื่อโปรเจค */}
                    <div className='row mb-3 '>
                        <p className="col-sm-3 prompt-semibold ">ชื่อโปรเจค:</p>
                        <p className="col-sm-8 prompt-regular">Web development</p>
                    </div>

                    {/* คำอธิบาย */}
                    <div className='row mb-3'>
                        <p className="col-sm-3 prompt-semibold">คำอธิบาย:</p>
                        <p className="col-sm-8 prompt-regular">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into </p>
                    </div>

                    {/* เอกสารเค้าโครง */}
                    <div className='row mb-3'>
                        <p className="col-sm-3 prompt-semibold">เอกสารเค้าโครง:</p>
                        <div className="col-sm-8">
                            <a href='#' download="document.pdf" className='link-opacity-50-hover'>ไฟล์ proposal.pdf</a>
                        </div>
                    </div>

                    {/* เอกสารเต็ม */}
                    <div className='row mb-3'>
                        <p className="col-sm-3 prompt-semibold">เอกสารเต็ม:</p>
                        <div className="col-sm-8">
                            <a href='#' download="document.pdf" className='link-opacity-50-hover'>ไฟล์เต็ม.pdf</a>
                        </div>
                    </div>

                    {/* ปีการศึกษา และภาคการศึกษา */}
                    <div className='row mb-3'>
                        <p className="col-sm-3 prompt-semibold">ปีการศึกษา:</p>
                        <p className="col-sm-2 prompt-regular">2567</p>

                        <p className="col-sm-2 prompt-semibold">ภาคการศึกษาที่:</p>
                        <p className="col-sm-2 prompt-regular">1</p>
                    </div>

                    {/* รหัสวิชา และรายวิชา */}
                    <div className='row mb-3'>
                        <p className="col-sm-3 prompt-semibold">รหัสวิชา:</p>
                        <p className="col-sm-2 prompt-regular">CP123456</p>

                        <p className="col-sm-1 prompt-semibold">รายวิชา:</p>
                        <p className="col-sm-2 prompt-regular">Web development</p>
                    </div>

                    {/* อาจารย์ที่ปรึกษา */}
                    <div className='row mb-3'>
                        <p className="col-sm-3 prompt-semibold">อาจารย์ที่ปรึกษา:</p>
                        <p className="col-sm-8 prompt-regular">ฟหกดาส สบวงสน</p>
                    </div>

                    {/* สถานะ */}
                    <div className='row mb-3'>
                        <p className="col-sm-3 prompt-semibold">สถานะ:</p>
                        <div className="col-sm-8 d-flex gap-3">
                            <Form.Check
                                type="radio"
                                label="รออนุมัติ"
                                name="status"
                                id="statusPending"
                            />
                            <Form.Check
                                type="radio"
                                label="อนุมัติ"
                                name="status"
                                id="statusApproved"
                            />
                        </div>
                    </div>

                    {/* ปุ่มบันทึก */}
                    <div className='prompt-regular mt-4'>
                        <Button variant="primary">บันทึก</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AdminProjectDetail
