import React, { useState, useContext, useEffect, useRef } from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import SyncLoader from 'react-spinners/SyncLoader';
import {  toast } from 'react-toastify';

import styles from '../Login/Login.module.scss';
import { AuthContext } from '~/context/AuthContext';
import { BASE_URL } from '~/hooks/config';

const cx = classNames.bind(styles);
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    if(user){
        navigate('/')
    }

    const [loading , setLoading] = useState(false);

    const usernameRef = useRef();

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(username);
        setValidName(result);
    }, [username]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    const credentials = {
        username: username,
        email: email,
        password: pwd,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            const result = await res.json();
            if (!res.ok) {
            toast.error(result.message)
            } 
            setLoading(false)
            toast.success('Đăng ký thành công')
            dispatch({ type: 'REGISTER_SUCCESS' });
            navigate('/login');
        } catch (err) {
            toast.error('Đăng ký thất bại')
        }
    };
    return (
        <div className={cx('wrapper')} id="#form-login">
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                <form action="" onSubmit={handleSubmit} className={cx('form')} id="form-2">
                    <h2>Đăng Ký</h2>
                    <div className={cx('form-group')}>
                        <label htmlFor="username">
                            Tên người dùng:
                            <span className={cx(validName ? 'valid' : 'hide')}>
                                <i className="fa-solid fa-check"></i>
                            </span>
                            <span className={cx(validName || !username ? 'hide' : 'invalid')}>
                                <i className="fa-solid fa-times"></i>
                            </span>
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="VD: tuyen123"
                            ref={usernameRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            aria-invalid={validName ? 'false' : 'true'}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <span
                            id="uidnote"
                            className={cx(userFocus && username && !validName ? 'instructions' : 'offscreen')}
                        >
                            <i className="fa-solid fa-circle-info"></i>
                            4 đến 24 ký tự <br />
                            Phải bắt đầu bằng một chữ cái
                            <br />
                            Cho phép sử dụng chữ cái, số, dấu gạch dưới, dấu gạch nối.
                        </span>
                    </div>

                    <div className={cx('form-group')}>
                        <label htmlFor="email">
                            Email:
                            <span className={cx(validEmail ? 'valid' : 'hide')}>
                                <i className="fa-solid fa-check"></i>
                            </span>
                            <span className={cx(validEmail || !email ? 'hide' : 'invalid')}>
                                <i className="fa-solid fa-times"></i>
                            </span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="VD: email@domain.com"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            value={email}
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            aria-invalid={validEmail ? 'false' : 'true'}
                            aria-describedby="emailnote"
                        />
                        <span
                            id="emailnote"
                            className={cx(emailFocus && email && !validEmail ? 'instructions' : 'offscreen')}
                        >
                            <i className="fa-solid fa-circle-info"></i>
                            phải có duy nhất một @<br />
                            Phải bắt đầu bằng một chữ cái
                            <br />
                            Có thể có một số dấu chấm để phân tách các phần của tên miền.
                            <br />
                            Độ dài tối thiểu của tên miền là 2 hoặc 3 ký tự.
                        </span>
                    </div>

                    <div className={cx('form-group')}>
                        <label htmlFor="password">
                            Mật khẩu:
                            <span className={cx(validPwd ? 'valid' : 'hide')}>
                                <i className="fa-solid fa-check"></i>
                            </span>
                            <span className={cx(validPwd || !pwd ? 'hide' : 'invalid')}>
                                <i className="fa-solid fa-times"></i>
                            </span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            value={pwd}
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            aria-invalid={validPwd ? 'false' : 'true'}
                            aria-describedby="pwdnote"
                        />
                        <span id="pwdnote" className={cx(pwdFocus && !validPwd ? 'instructions' : 'offscreen')}>
                            <i className="fa-solid fa-circle-info"></i>
                            8 đến 24 ký tự.
                            <br />
                            Phải bao gồm chữ hoa và chữ thường, số và ký tự đặc biệt.
                            <br />
                            Cho phép ký tự đặc biệt:
                            <br />
                            Cho phép các ký tự đặc biệt:
                            <span aria-label="exclamation mark">! </span>
                            <span aria-label="at symbol">@ </span>
                            <span aria-label="hashtag"># </span>
                            <span aria-label="dollar sign">$ </span>
                            <span aria-label="percent">%</span>
                        </span>
                    </div>

                    <div className={cx('form-group')}>
                        <label htmlFor="confirm_pwd">
                            Nhập Lại Mật khẩu:
                            <span className={cx(validMatch && matchPwd ? 'valid' : 'hide')}>
                                <i className="fa-solid fa-check"></i>
                            </span>
                            <span className={cx(validMatch || !matchPwd ? 'hide' : 'invalid')}>
                                <i className="fa-solid fa-times"></i>
                            </span>
                        </label>
                        <input
                            id="confirm_pwd"
                            placeholder="Nhập lại mật khẩu"
                            type="password"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            required
                            value={matchPwd}
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            aria-invalid={validMatch ? 'false' : 'true'}
                            aria-describedby="confirmnote"
                        />
                        <span id="confirmnote" className={cx(matchFocus && !validMatch ? 'instructions' : 'offscreen')}>
                            <i className="fa-solid fa-circle-info"></i>
                            Phải khớp với trường nhập mật khẩu đầu tiên
                        </span>
                    </div>
                    <p className="ms-5">
                        Đã có tài khoản?
                        <Link to="/login" className="link-info">
                            Đăng Nhập
                        </Link>
                    </p>
                    <button disabled={!validName || !validPwd || !validMatch ? true : false } type="submit" className="btn">
                        {loading ? <SyncLoader size={12} color="#36d7b7" /> : "Đăng ký"}
                    </button>
                </form>
            </MDBContainer>
        </div>
    );
};
export default Register;

