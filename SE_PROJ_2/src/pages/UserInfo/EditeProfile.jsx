import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './UserInfo.css';

function EditeProfile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [branchFaculty, setBranchFaculty] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [eMail, setEMail] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setFirstName('Jirawat');
        setLastName('Siri');
        setBranchFaculty('CSE');
        setPhoneNumber('0987654321');
        setEMail('email@example.com');
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.substr(0, 5) === "image") {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            console.log("Not an image file");
        }
    };

    const triggerFileInputClick = () => {
        document.getElementById('imageInput').click();
    };

    const handleCancel = () => {
        navigate('../userInfo');  
    };

    const handleUpdate = () => {
        navigate('../userInfo');  
    };

    return (
        <div className="ProfilePage">
            <div className="UserProfile">
                <div className="container">
                    <img className="PictureProfile"
                        style={{ borderRadius: '100%'}}
                        src={imageUrl || 'path_to_default_image.jpg'}
                        alt="Profile"
                        onClick={triggerFileInputClick}
                    />
                    <input
                        id="imageInput"
                        type="file"
                        hidden
                        onChange={handleImageChange}
                    />
                </div>
                <div className="Information">
                    <div className="TextSpace">
                        <p className="TextTitle">ชื่อ</p>
                        <div className="TextBox">
                            <input
                                type="text"
                                className="NameText"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
                            />
                        </div>
                    </div>
                    <div className="TextSpace">
                        <p className="TextTitle">นามสกุล</p>
                        <div className="TextBox">
                            <input
                                type="text"
                                className="NameText"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
                            />
                        </div>
                    </div>
                    <div className="TextSpace">
                        <p className="TextTitle">คณะและสาขา</p>
                        <div className="TextBox">
                            <input
                                type="text"
                                className="NameText"
                                value={branchFaculty}
                                onChange={(e) => setBranchFaculty(e.target.value)}
                                style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
                            />
                        </div>
                    </div>
                    <div className="TextSpace">
                        <p className="TextTitle">หมายเลขโทรศัพท์</p>
                        <div className="TextBox">
                            <input
                                type="text"
                                className="NameText"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
                            />
                        </div>
                    </div>
                    <div className="TextSpace">
                        <p className="TextTitle">E-Mail</p>
                        <div className="TextBox">
                            <input
                                type="email"
                                className="NameText"
                                value={eMail}
                                onChange={(e) => setEMail(e.target.value)}
                                style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
                            />
                        </div>
                    </div>
                    <div className="EditingBox">
                        <button className='CancelButton' onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className='UpdateButton' onClick={handleUpdate}>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditeProfile;
