import React, { useContext, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './User.module.scss';
import Sidebar from '~/components/layout/sidebar';
import { AuthContext } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function User() {
    const { user } = useContext(AuthContext);
    const { username, email } = user.data;
    const handleUpdate = (e) => {
        e.preventDefault();
    }
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
                                        <input type="text" className="form-control" placeholder="first name" value={username} />
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
                                        <label className="labels">Address</label>
                                        <input type="text" className="form-control" placeholder="enter address" value="" />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">Email ID</label>
                                        <input type="text" className="form-control" placeholder="enter email id" value={email} />
                                    </div>
                                </div>
                                <div className="mt-5 text-center">
                                    <button onClick={handleUpdate} className="btn btn-primary profile-button" type="button">
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
