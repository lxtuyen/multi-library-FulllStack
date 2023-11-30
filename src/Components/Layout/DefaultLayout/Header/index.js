import { useState, useEffect, useContext, useRef } from 'react';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';

import styles from '../DefaultLayout.module.scss';
import images from '~/assets/images';
import { Wrapper as PopperWrapper } from '~/Components/Layout/Popper';
import SearchItem from '~/Components/Layout/components/SearchItem';
import { AuthContext } from '~/context/AuthContext';
import { BASE_URL } from '~/hooks/config';
import UseDebounce from '~/hooks/useDebounce';
import useFetch from '~/hooks/useFetch';

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();
    const { user, dispatch, role } = useContext(AuthContext);
    const [obj, setObj] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const inputRef = useRef();
    const debounced = UseDebounce(searchValue, 400)
    const [ avatar, setAvatar ] = useState()
    const startListening = () => SpeechRecognition.startListening({ continuous: true });
    const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition()

    const { data: Genres } = useFetch(`${BASE_URL}/admin/genre`);
    useEffect(() => {
        if (listening && transcript) {
            // Update the input field with the recognized speech
            setSearchValue(transcript);
        }
    }, [listening, transcript]);

    useEffect(()=>{
        setAvatar(user?.data.avatar)
    },[user?.data.avatar])
    
    useEffect(() => {
        const getAllBook = async () => {
            if (!debounced?.trim()) {
                setObj([]);
                return;
            }
            setLoading(true);
            try {
                const url = `${BASE_URL}/books?search=${encodeURIComponent(debounced)}&limit=4`;
                const { data } = await axios.get(url);
                setObj(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        getAllBook();
    }, [debounced]);

    const logout = () => {
        window.location.href = "/"
        dispatch({ type: 'LOGOUT' });
        googleLogout();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to='/'>
                    <img src={images.logo} alt="Multi-Library" />
                    </Link> 
                </div>
                <div className={cx('nav')}>
                    <ul>
                        <li className={cx('nav-item__type-list')}>
                            <i className="fa-solid fa-book"></i>
                            <small>&nbsp;Thể Loại</small>
                            <div className={cx('wrapper-list')}>
                                <div class="row">
                                    {Genres?.map((Genre,i)=>(
                                        <div class="col-4" key={i}>
                                        <span>{Genre.name}</span>
                                    </div>
                                    ))}  
                                </div>
                            </div>
                        </li>
                        <li>
                            <NavLink to={`/chatbot/${user?.data._id}`}>
                            <i class="fas fa-robot"></i>
                                <small>&nbsp;Chatbot</small>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/search">
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <small> Tìm Kiếm</small>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <HeadlessTippy
                    interactive
                    visible={showResult}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                {obj.books?.map((book) => (
                                    <SearchItem books={book ? book : []} />
                                ))}
                            </PopperWrapper>
                        </div>
                    )}
                    content="Tìm Kiếm"
                    onClickOutside={handleHideResult}
                >
                    <div className={cx('search')}>
                        <input
                            placeholder="Search Books"
                            spellCheck={false}
                            value={searchValue}
                            ref={inputRef}
                            onFocus={() => {
                                setShowResult(true);
                            }}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                        />
                        {!!searchValue && !loading && (
                            <buttton
                                className={cx('clear')}
                                onClick={() => {
                                    setSearchValue('');
                                    inputRef.current.focus();
                                    setObj([]);
                                }}
                            >
                                <i className="fa-solid fa-circle-xmark"></i>
                            </buttton>
                        )}
                        {loading && (
                            <div className={cx('loading')}>
                                <i className="fa-solid fa-spinner"></i>
                            </div>
                        )}
                        <buttton className={cx('search-btn')}
                              onTouchStart={startListening}
                              onMouseDown={startListening}
                              onTouchEnd={SpeechRecognition.stopListening}
                              onMouseUp={SpeechRecognition.stopListening}
                        >
                            <i className="fa-solid fa-microphone"></i>
                        </buttton>
                    </div>
                </HeadlessTippy>
                <div className={cx('action')}>
                    {user ? (
                        <div className={cx('profile-dropdown-btn')}>
                            <div className={cx('profile-img')}>
                                {avatar ? (
                                    <img src={avatar} alt="Thông tin cá nhân" />
                                ) : (
                                    <img src={images.profile_user} alt="Thông tin cá nhân" />
                                )}
                            </div>
                            <ul>
                                <li>
                                    <Link
                                        to={`${
                                            role === 'admin' ? `/admin/${user.data._id}` : `/user/${user.data._id}`
                                        }`}
                                    >
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
