import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserInfo.css';
import axios from 'axios';

function UserInfo() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState(null);
    const [branchFaculty, setBranchFaculty] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [eMail, setEMail] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getuserdata()
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

    return (
        <div className="ProfilePage">
            <div className="UserProfile">
                <div className="container">
                    <img className="PictureProfile"
                        style={{ borderRadius: '100%' }}
                        src={"https://upload.wikimedia.org/wikipedia/en/d/db/GutsBerserk.PNG"}
                        alt="Profile"

                    />

                </div>
                <div className="Information">
                    <div className="TextSpace">
                        <p className="TextTitle">ชื่อ</p>
                        <div className="TextBox"><p className="NameText">{firstName}</p></div>
                    </div>
                    <div className="TextSpace">
                        <p className="TextTitle">นามสกุล</p>
                        <div className="TextBox"><p className="NameText">{lastName}</p></div>
                    </div>
                    <div className="TextSpace">
                        <p className="TextTitle">คณะและสาขา</p>
                        <div className="TextBox"><p className="NameText">{branchFaculty}</p></div>
                    </div>
                    <div className="TextSpace">
                        <p className="TextTitle">หมายเลขโทรศัพท์</p>
                        <div className="TextBox"><p className="NameText">{phoneNumber}</p></div>
                    </div>
                    <div className="TextSpace">
                        <p className="TextTitle">E-Mail</p>
                        <div className="TextBox"><p className="NameText">{eMail}</p></div>
                    </div>
                    <div className="EditingBox">
                        <button
                            className='EditButton'
                            style={{ width: '70%' }}
                            onClick={() => navigate('editProfile')}
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    async function getuserdata() {
        var url = "http://localhost:3100/userinfo";
        axios.get(url).then((Response) => {
            setFirstName(Response.data[0].TeacherName)
            setLastName(Response.data[0].TeacherSurname)
            setBranchFaculty(Response.data[0].Major)
            setPhoneNumber(Response.data[0].TeacherPhone)
            setEMail(Response.data[0].TeacherEmail)

        })
    }

}

export default UserInfo;