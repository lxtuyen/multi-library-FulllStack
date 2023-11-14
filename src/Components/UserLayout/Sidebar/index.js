import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Sidebar.module.scss';
import { AuthContext } from '~/context/AuthContext';
import images from '~/assets/images';


const cx = classNames.bind(styles);

function Sidebar() {
    const { user, dispatch } = useContext(AuthContext);
    const navitage = useNavigate();
    const [ avatar, setAvatar ] = useState()

    useEffect(()=>{
        setAvatar(user?.data.avatar)
    },[user?.data.avatar])

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navitage('/');
    };
   
    return (
        <>
            <div className={cx('profile-sidebar')}>
                <div className={cx('profile-userpic')}>
                    {avatar ? (
                        <img src={avatar} alt="Thông tin cá nhân" />
                    ) : (
                        <img src={images.profile_user} alt="Thông tin cá nhân" />
                    )}
                </div>
                <div className={cx('profile-usertitle')}>
                    <div className={cx('profile-usertitle-name')}>{user?.username}</div>
                </div>
                <div className={cx('profile-userbuttons')}>
                    <button type="button" className="btn btn-danger btn-sm" onClick={logout}>
                        Đăng xuất
                    </button>
                </div>
                <div className={cx('profile-usermenu')}>
                    <ul>
                        <li>
                            <Link to={`/user/${user?._id}`}>
                                <i class="fa-regular fa-circle-question"></i>
                                Cập nhật thông tin
                            </Link>
                        </li>
                        <li>
                            <Link to={`/followed/${user?._id}`}>
                                <i class="far fa-heart"></i>
                                Đang theo dõi
                            </Link>
                        </li>
                        <li>
                            <Link to={`/history/${user?._id}`}>
                                <i class="fa-sharp fa-solid fa-clock-rotate-left"></i>
                                Lịch sử đọc
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
