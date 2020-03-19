import React from 'react';

const Dashboard = ({email, onReset, onLogout}) => {
    return (
        <div>
            Welcome {email}<br /><br />
            <input type="button" onClick={() => onLogout()} value="Logout" />
        </div>
    );
};

export default Dashboard;
