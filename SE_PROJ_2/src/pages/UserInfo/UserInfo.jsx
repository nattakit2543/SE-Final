import React from 'react';
import sosImage from '../../assets/SOS.png';
import './UserInfo.css';

const UserInfo = () => {
    return (
        <div className="center">
            <img src={sosImage} alt="SOS" />
        </div>
    );
};

export default UserInfo;
