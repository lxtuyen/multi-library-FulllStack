import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';

import styles from './User.module.scss';
import Sidebar from '~/Components/UserLayout/Sidebar';
import { AuthContext } from '~/context/AuthContext';
import { BASE_URL } from '~/hooks/config';

const cx = classNames.bind(styles);

function User() {
    const { id } = useParams();
    const { user, dispatch } = useContext(AuthContext);
    const [previewURL, setPreviewURL] = useState('');
    console.log(user);
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
                username: user?.username,
                password: user?.password,
                avatar: previewURL,
                phoneNumber: '',
                address: '',
                email: user.email,
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
                            username: result.data.username,
                            email: result.data.email,
                            password: result.data.password,
                            phoneNumber: '',
                            address: '',
                        },
                    },
                });
                console.log(user);
                console.log(previewURL);
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
                                        <label className="labels">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="first name"
                                            value={user?.username}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <label className="labels">PhoneNumber</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="enter phone number"
                                            value=""
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="enter your password"
                                            value={user?.password}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">Email ID</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="enter email id"
                                            value={user?.email}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">ảnh đại diện</label>
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
                                        <label className="labels">Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="enter address"
                                            value=""
                                        />
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
