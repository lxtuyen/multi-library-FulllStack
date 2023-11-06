import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { MDBCollapse } from 'mdb-react-ui-kit';

import styles from './Decription.module.scss';

const cx = classNames.bind(styles);
function Decription({ book, Loading, error }) {
    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(!show);

    return (
        <div className={cx('book-decription')}>
            <p>{book.detailHead}</p>
            <span tag="a" onClick={toggleShow}>
                Đọc Thêm
            </span>
            <MDBCollapse show={show}>
                <p>{book.title}</p>
                {Loading && <h4>Loading............</h4>}
                {error && <h4>Error!!!</h4>}
                {!Loading && !error && book.detailLast?.map((detail, index) => (<p key={index}>{detail}</p>))}
            </MDBCollapse>
        </div>
    );
}
export default Decription;
