import React, { useContext, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import styles from './User.module.scss';
import Sidebar from '~/Components/UserLayout/Sidebar';
import { AuthContext } from '~/context/AuthContext';
import { BASE_URL } from '~/hooks/config';

const cx = classNames.bind(styles);
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
function User() {
    const { id } = useParams();
    const { user, dispatch } = useContext(AuthContext);

    const [name, setUsername] = useState('');

    const [previewURL, setPreviewURL] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [ allProvince, setAllProvince ] = useState([])
    useEffect(() => {
        const url = 'https://provinces.open-api.vn/api/';
      
        const fetchData = async () => {
          const response = await axios.get(url);
          const data = response.data;
          setAllProvince(data)
        };
      
        fetchData();
      }, []);
    
    useEffect(() => {
        setUsername(user?.data.username);
        setPhoneNumber(user?.data.phoneNumber);
        setAddress(user?.data.address);
        setEmail(user?.data.email);
    }, [user]);
    const handleFileInput = async (e) => {
        const file = e.target.files[0];
        const uploadData = new FormData();

        uploadData.append('file', file);
        uploadData.append('upload_preset', 'multiLibrary');
        uploadData.append('upload_name', '');
        fetch('https://api.cloudinary.com/v1_1/multi-library/image/upload', {
            method: 'post',
            body: uploadData,
        })
            .then((res) => res.json())
            .then((data) => setPreviewURL(data.url))
            .catch((err) => console.log(err));
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const obj = {
                username: name,
                avatar: previewURL,
                phoneNumber: phoneNumber,
                address: address,
                email: email,
            };
            const res = await fetch(`${BASE_URL}/users/${id}`, {
                method: 'put',
                headers: { 'content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(obj),
            });
            const result = await res.json();
            if (!res.ok) {
                console.error('Update failed:', result.message);
                alert(`Update failed: ${result.message}`);
            } else {
                console.log('Update successful:', result);
                alert('Update successful');
                dispatch({
                    type: 'UPDATE_INFO',
                    payload: {
                        data: {
                            avatar: previewURL,
                            phoneNumber: phoneNumber,
                            address: address,
                        },
                    },
                });
            }
        } catch (error) {
            console.error('Update error:', error);
            alert('Update error');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className={cx('tabs-content-wrap')}>
                            <h2>Hồ sơ cá nhân</h2>
                            <div className="p-3 py-5">
                                <div className="row mt-2">
                                    <div className="col-md-12">
                                        <label className="labels">Username:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="first name"
                                            value={name}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <label className="labels">Số điện thoại:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="enter phone number"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">Email:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="enter email id"
                                            value={email}
                                            disabled
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">Ảnh đại diện</label>
                                        <input
                                            type="file"
                                            id="file"
                                            className="form-control"
                                            onChange={handleFileInput}
                                            accept=".jpg, .png"
                                            name="photo"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">Địa chỉ</label>
                                        <form action="">
                                            <select name="" id="province" onChange={(e)=> setAddress(e.target.value)}>
                                            <option value={address}>{address || 'Chọn tỉnh'}</option>
                                                {allProvince.map((province,i)=>(
                                                    <option value={province.name}>{province.name}</option>
                                                ))}
                                            </select>
                                        </form>
                                    </div>
                                </div>
                                <div className="mt-5 text-center">
                                    <button
                                        onClick={handleUpdate}
                                        className="btn btn-primary profile-button"
                                        type="button"
                                    >
                                        Cập nhật hồ sơ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default User;
