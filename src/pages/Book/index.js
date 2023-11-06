import React from 'react';
import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';

import styles from './Book.module.scss';
import OverViewBook from '~/Components/overViewBook';
import CommentBox from '~/Components/CommentBox';
import BookVendor from '~/Components/Layout/components/BookVendor';
import { BASE_URL } from '~/hooks/config';
import useFetch from '~/hooks/useFetch';


const cx = classNames.bind(styles);

function Book() {
    const { id } = useParams();

    const { data: books, loading, error } = useFetch(`${BASE_URL}/books/${id}`);

    const { photo, title } = books;

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('wrapper__left')}>
                    <div className={cx('read-options')}>
                        <div className={cx('read-options__box-img')}>
                            <img src={photo} alt={title} />
                        </div>
                        <div className={cx('read-options__button')}>
                            <Link>
                                <span className={cx('read-options__icon')}>
                                    <i className="fa-solid fa-book-open-reader"></i>
                                </span>
                                <span className={cx('read-options__label')}>Đọc</span>
                            </Link>
                        </div>
                        <div className={cx('read-options__button')}>
                            <Link>
                                <span className={cx('read-options__icon')}>
                                    <i className="fa-solid fa-book"></i>
                                </span>
                                <span className={cx('read-options__label')}>Mượn Sách</span>
                            </Link>
                        </div>
                        <div className={cx('read-options__button')}>
                            <Link>
                                <span className={cx('read-options__icon')}>
                                    <i className="fa-regular fa-heart"></i>
                                </span>
                                <span className={cx('read-options__label')}>Theo Dõi</span>
                            </Link>
                        </div>
                        <hr />
                        <div className={cx('read-options__modal-link')}>
                            <div>
                                <Link className={cx('read-options__icon-link')}>
                                    <img src="https://openlibrary.org/static/images/icons/reviews.svg" alt="" />
                                    <div>Review</div>
                                </Link>
                            </div>
                            <div>
                                <Link className={cx('read-options__icon-link')}>
                                    <img src="https://openlibrary.org/static/images/icons/notes.svg" alt="" />
                                    <div>Ghi Chú</div>
                                </Link>
                            </div>
                            <div>
                                <Link className={cx('read-options__icon-link')}>
                                    <img src="https://openlibrary.org/static/images/icons/share.svg" alt="" />
                                    <div>Chia Sẻ</div>
                                </Link>
                            </div>
                        </div>      
                        <BookVendor book={books} Loading={loading} error={error}/>
                    </div>
                </div>
                <div className={cx('wrapper__right')}>
                    <OverViewBook book={books} Loading={loading} error={error} />
                </div>
            </div>
            <CommentBox book={books} Loading={loading} error={error} />
        </>
    );
}
export default Book;
