import React from 'react';
import Navbar from '../../components/Admin/Navbar';
import UserCrud from '../../components/Admin/UserCrud';

const UserPageAdmin = () => {
    return (
        <div>
            <Navbar />
            <UserCrud />
        </div>
    );
}

export default UserPageAdmin;