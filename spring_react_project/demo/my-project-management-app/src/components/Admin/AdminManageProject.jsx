import React from 'react'
import { Button, Table} from 'react-bootstrap';


const AdminManageProject = () => {
    return (

        <div className='mx-auto mt-4 ' style={{ width: '80rem' }}>
            <h3 className='prompt-semibold text-primary mb-4'>จัดการโปรเจคนักศึกษา</h3>

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
                        <th className='prompt-semibold bg-body-tertiary'>ชื่อโปรเจค</th>
                        <th className='prompt-semibold bg-body-tertiary'>รายวิชา</th>
                        <th className='prompt-semibold bg-body-tertiary'>สถานะ</th>
                        <th className='prompt-semibold bg-body-tertiary'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='prompt-regular'>เว็บไซต์......</td>
                        <td className='prompt-regular'>Web development</td>
                        <td className='prompt-regular'>อนุมัติ</td>
                        <td>
                            <Button className='prompt-regular me-2' variant='primary'>รายละเอียด</Button>
                            <Button className='prompt-regular px-3' variant='danger'>ลบ</Button>
                            
                        </td>

                    </tr>
                </tbody>
            </Table>

        </div>

    )
}
export default AdminManageProject;