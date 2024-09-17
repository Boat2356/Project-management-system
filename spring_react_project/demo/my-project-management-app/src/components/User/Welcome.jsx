import React from 'react'

//ของหน้า home page
const Welcome = () => {
    return (
        <div >
            <div className="p-3 bg-primary text-white d-flex justify-content-center align-items-center gap-5">
                <div className="me-5">
                    <h5 className="prompt-semibold fs-3">ยินดีต้อนรับเข้าสู่เว็บไซต์</h5>
                    <p className="prompt-regular pt-2">เว็บไซต์รวมรวมโปรเจคของนักศึกษาวิทยาลัยการคอมพิวเตอร์ สาขาวิทยาการคอมพิวเตอร์</p>
                </div>
                <div className='w-25'>
                    <img src="../homeimg2.svg" />
                </div>
            </div>
        </div>
    )
}
export default Welcome;