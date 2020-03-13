import React from 'react';
import { getUser, removeUserSession } from './Utils/Common'

const Dashboard = (props) => {
    const email = getUser();

    const handleLogout = () => {
        removeUserSession();
        props.history.push('/login');
    }
    return (
        <div>
            Welcome {email}<br /><br />
            <input type="button" onClick={handleLogout} value="Logout" />
        </div>
    );
};

export default Dashboard;