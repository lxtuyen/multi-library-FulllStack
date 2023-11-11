import React from 'react';
import classNames from 'classnames/bind';

import styles from './DetailBook.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const DetailBook = ({book, Loading, error}) => {
    return (
        <div className={cx("book-details")}>
            <h2>Chi Tiết Sách</h2>
            <hr />
            <div className={cx("section")}>
                <h3 >Xuất bản tại</h3>
                <p>{book.publishedIn}</p>
            </div>
            <div className={cx("section")}>
                <h3>Ghi CHú Phiên Bản</h3>
                <p>HOA KỲ/CANADA</p>
                <dl>
                    <dt>Loạt:</dt>
                    <dd>{book.Series}</dd>
                    <dt>Ngày bản quyền:</dt>
                    <dd>{book.CopyrightDate}</dd>
                </dl>
            </div>
            <div className={cx("section")}>
                <h3>Ghi Chú Phiên Bản</h3>
                <dl>
                    <dt>Thư viện Quốc hội:</dt>
                    <dd>{book.versionNotes}</dd>
                </dl>
            </div>
            <div className={cx("section")}>
                <h3>Mô tả:</h3>
                <p className={cx("section-detail")}>
                    {book.desc}
                </p>
            </div>
            <div className={cx("section")}>
                <h3>Liên Kết Ngoài Multi-library:</h3>
                <ul className={cx("section-list")}>
                {Loading && <h4>Loading............</h4>}
                    {error && <h4>Error!!!</h4>}
                    {!Loading && !error && book.linkOut?.map((lib, index) => <li><Link key={index}>{lib}</Link></li>)}
                </ul>
            </div>
        </div>
    );
};

export default DetailBook;
