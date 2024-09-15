import React from 'react';
import Navbar from '../../components/Admin/Navbar';
import SupervisorCrud from '../../components/Admin/SupervisorCrud';

const SupervisorPage = () => {
    return (
        <div>
            <Navbar />
            <SupervisorCrud />
        </div>
    );
}

export default SupervisorPage;