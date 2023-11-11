import React, { useState,useContext  ,useEffect, useRef} from 'react';
import {
  MDBContainer,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Login.module.scss';
import { AuthContext } from '~/context/AuthContext';
import { BASE_URL } from '~/hooks/config';

const cx = classNames.bind(styles);
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {

  const {dispatch} = useContext(AuthContext);
  const navitage = useNavigate();

  const emailRef = useRef();
  const errRef = useRef();

  const [pwd , setPwd ] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [email , setEmail ] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg , setErrMsg] = useState('');

  useEffect(()=>{
    emailRef.current.focus();
  },[])

  useEffect(()=>{
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  },[email])
  useEffect(()=>{
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
  },[pwd])

  useEffect(()=>{
    setErrMsg('');
  },[ pwd, email])

  const  credentials = {
    email: email,
    password: pwd,
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    dispatch({type: 'LOGIN START'})
    try {
      const res = await fetch(`${BASE_URL}/auth/login`,{
        method: 'post',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials)
      })
      const result =  await res.json()
      if(!res.ok){
        alert(result.message);
      } else{
        dispatch({type:"LOGIN_SUCCESS", payload: result})
        if(result.role === 'admin'){
          navitage(`/admin/${result.data?._id}`);
        } else{
          navitage('/');
        }
      }

  } catch (err) {
      errRef.current.focus();
      dispatch({type:"LOGIN_FAILURE", payload: err.message})
  }

  }
    return (
     <div className={cx('wrapper')} id='#form-login'>
         <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
    
    <form action="" onSubmit={handleSubmit} className={cx("form")} id="form-1">
        <h2>Đăng Nhập</h2>
      <div className={cx("form-group")}>
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
              ref={emailRef}
              placeholder="VD: email@domain.com"
              onChange={(e)=> setEmail(e.target.value)}
              required
              value={email}
              onFocus={()=> setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              aria-invalid={validEmail ? 'false' : 'true'}
              aria-describedby='emailnote'
              />
              <span id='emailnote' className={cx(emailFocus && email && !validEmail ? 'instructions' : 'offscreen')}>
              <i className="fa-solid fa-circle-info"></i>
              phải có duy nhất một @<br/>
              Phải bắt đầu bằng một chữ cái<br/>
              Có thể có một số dấu chấm để phân tách các phần của tên miền.<br/>
              Độ dài tối thiểu của tên miền là 2 hoặc 3 ký tự.
              </span>
            </div>
  
            <div className={cx("form-group")}>
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
              onChange={(e)=> setPwd(e.target.value)}
              required
              value={pwd}
              onFocus={()=> setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby='pwdnote'
              />
              <span id='pwdnote' className={cx(pwdFocus && !validPwd ? 'instructions' : 'offscreen')}>
              <i className="fa-solid fa-circle-info"></i>
              8 đến 24 ký tự.<br/>
              Phải bao gồm chữ hoa và chữ thường, số và ký tự đặc biệt.<br/>
              Cho phép ký tự đặc biệt:<br/>
              Cho phép các ký tự đặc biệt: 
              <span aria-label="exclamation mark">! </span>
              <span aria-label="at symbol">@ </span>
              <span aria-label="hashtag"># </span>
              <span aria-label="dollar sign">$ </span>
              <span aria-label="percent">%</span>
              </span>
            </div>
      <div className="d-flex justify-content-between mx-4 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Nhớ mật khẩu' />
        <p className='ms-5'>Chưa có tài khoản?<Link to="/register" className="link-info">Đăng Ký</Link></p>
      </div>
  
      <button className="btn" type="submit">Đăng Nhập</button>
    </form>
</MDBContainer>
     </div>
  );
    
}
export default Login;