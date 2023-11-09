import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import styles from '../DefaultLayout.module.scss';
import images from '~/assets/images';
import  axios from 'axios';
import { Wrapper as PopperWrapper } from '~/components/Layout/Popper';
import SearchItem from '~/components/SearchItem';
import { AuthContext } from '~/context/AuthContext';
import { BASE_URL } from '~/hooks/config';

const cx = classNames.bind(styles);

function Header() {
    const navitage = useNavigate();
    const { user, dispatch, role, token } = useContext(AuthContext);
    const [obj, setObj] = useState([]);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('');

    useEffect(()=>{
        const getAllBook = async () =>{
            setLoading(true)
            try{
                const url = `${BASE_URL}/books?search=${search}`;
                const {data} = await axios.get(url);
                setObj(data)
                setLoading(false)
            }
            catch(err){
                setError(err.message)
                setLoading(false)
            }
        }
        getAllBook();
    },[search]);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navitage('/');
    };

    const [searchResult, setSearchResult] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="Multi-Library" />
                </div>
                <div className={cx('nav')}>
                    <ul>
                        <li className={cx('nav-item__type-list')}>
                            <i className="fa-solid fa-book"></i>
                            <span>Thể Loại</span>
                            <div className={cx('wrapper-list')}>
                                <div class="row">
                                    <div class="col-3">
                                        <span>col</span>
                                    </div>
                                    <div class="col-3">
                                        <span>col</span>
                                    </div>
                                    <div class="col-3">
                                        <span>col</span>
                                    </div>
                                    <div class="col-3">
                                        <span>col</span>
                                    </div>
                                    <div class="col-3">
                                        <span>col</span>
                                    </div>
                                    <div class="col-3">
                                        <span>col</span>
                                    </div>
                                    <div class="col-3">
                                        <span>col</span>
                                    </div>
                                    <div class="col-3">
                                        <span>col</span>
                                    </div>
                                    <div class="col-3">
                                        <span>col</span>
                                    </div>
                                    <div class="col-3">
                                        <span>col</span>
                                    </div>
                                    <div class="col-3">
                                        <span>col</span>
                                    </div>
                                    <div class="col-3">
                                        <span>col</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <NavLink>
                                <i className="fa-solid fa-crown"></i>
                                <span>Xếp Hạng</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/search">
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <span>Tìm Kiếm</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <Tippy
                    inertia
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                {obj.data?.map((book)=>(
                                    <SearchItem books={obj.books?obj.books:[]} error={error} loading={loading} />
                                ))}
                            </PopperWrapper>
                        </div>
                    )}
                    content="Tìm Kiếm"
                >
                    <div className={cx('search')}>
                        <input placeholder="Search Books and author" spellCheck={false} />
                        <buttton className={cx('clear')}>
                            <i className="fa-solid fa-circle-xmark"></i>
                        </buttton>
                        <div className={cx('loading')}>
                            <i className="fa-solid fa-spinner"></i>
                        </div>
                        <buttton className={cx('search-btn')}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </buttton>
                    </div>
                </Tippy>
                <div className={cx('action')}>
                    {user ? (
                        <div className={cx('profile-dropdown-btn')}>
                            <div className={cx('profile-img')}>
                                <img src={images.profile_user} alt="" />
                            </div>
                            <ul>
                                <li>
                                    <Link to={`${role === 'admin'?`/admin/${user.data._id}`:`/user/${user.data._id}`}`}>
                                        <i className="fa-regular fa-user"></i>
                                        Hồ sơ
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/history/${user.data._id}`}>
                                        <i className="fa-sharp fa-solid fa-clock-rotate-left"></i>
                                        Lịch Sử Đọc
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/followed/${user.data._id}`}>
                                        <i className="far fa-heart"></i>
                                        Đang Theo Dõi
                                    </Link>
                                </li>
                                <li>
                                    <Link>
                                        <i className="fa-regular fa-circle-question"></i>
                                        Trợ giúp & Hỗ trợ
                                    </Link>
                                </li>
                                <hr />
                                <li>
                                    <Link onClick={logout}>
                                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                        Đăng Xuất
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <button type="button" className="btn btn-primary btn-block">
                                <Link to="/login" className={cx('login__link')}>
                                    <i className="fa-solid fa-user"></i>
                                    Đăng nhập
                                </Link>
                            </button>
                        </>
                    )}
                </div>
                <span className={cx('mobile__menu')}>
                    <i class="fa-solid fa-bars"></i>
                </span>
            </div>
        </header>
    );
}

export default Header;
