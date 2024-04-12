import React from 'react';
import sosImage from '../../assets/SOS.png';
import './UserInfo.css';

const UserInfo = () => {
    return (
        <div className="userInfo-container">
            <div className="circle"></div>

            <div className="box box-name"></div>
            <div className="text text-name">ชื่อ</div>

            <div className="box box-surname"></div>
            <div className="text text-surname">นามสกุล</div>

            <div className="box box-faculty"></div>
            <div className="text text-faculty">คณะและสาขา</div>

            <div className="box box-phone"></div>
            <div className="text text-phone">เบอร์โทรศัพท์</div>

            <div className="box box-email"></div>
            <div className="text text-email">อีเมล</div>
        </div>
    );
};

export default UserInfo;
