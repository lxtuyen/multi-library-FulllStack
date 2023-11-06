import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './OverViewBook.module.scss';
import Decription from '~/Components/Layout/components/Decription';
import DetailBook from '~/Components/DetailBook';
import calculateAvgRatings from '~/utils/avgRatings';

const cx = classNames.bind(styles);

const OverViewBook = ({ book, Loading, error }) => { 
    const { totalRating, avgRatings } = calculateAvgRatings(book.reviews);

    return (
        <>
        {Loading && <h4>Loading............</h4>}
                {error && <h4>Error!!!</h4>}
                {!Loading && !error &&(
                    <div className={cx('book__header')}>
                    <h1 class={cx('book-header__title')}>{book.title}</h1>
                    <h2 class={cx('book-header__author')}>
                        By
                        <Link> {book.author}</Link>
                    </h2>
                    <ul class={cx('reader-stats')}>
                        <li>
                            <div className={cx('reader-stats__rating')}>
                            {avgRatings <= 1 ?   <span className={cx('item__start--gold')}>
                                    <i className="fas fa-star"></i>
                                </span>:null}
                                {avgRatings > 1 && avgRatings <= 2 ?  <>
                                    <span className={cx('item__start--gold')}>
                                    <i className="fas fa-star"></i>
                                </span>
                                <span className={cx('item__start--gold')}>
                                <i className="fas fa-star"></i>
                            </span>
                                </>:null
                                }
                               {avgRatings > 2 && avgRatings <= 3 ?  <>
                                    <span className={cx('item__start--gold')}>
                                    <i className="fas fa-star"></i>
                                </span>
                                <span className={cx('item__start--gold')}>
                                <i className="fas fa-star"></i>
                            </span>
                            <span className={cx('item__start--gold')}>
                                    <i className="fas fa-star"></i>
                                </span>
                                </>:null
                                }
                                {avgRatings > 3 && avgRatings <= 4 ?  <>
                                    <span className={cx('item__start--gold')}>
                                    <i className="fas fa-star"></i>
                                </span>
                                <span className={cx('item__start--gold')}>
                                <i className="fas fa-star"></i>
                            </span>
                            <span className={cx('item__start--gold')}>
                                    <i className="fas fa-star"></i>
                                </span>
                                <span className={cx('item__start--gold')}>
                                    <i className="fas fa-star"></i>
                                </span>
                                </>:null
                                }
                                {avgRatings > 4 && avgRatings <= 5 ?  <>
                                    <span className={cx('item__start--gold')}>
                                    <i className="fas fa-star"></i>
                                </span>
                                <span className={cx('item__start--gold')}>
                                <i className="fas fa-star"></i>
                            </span>
                            <span className={cx('item__start--gold')}>
                                    <i className="fas fa-star"></i>
                                </span>
                                <span className={cx('item__start--gold')}>
                                    <i className="fas fa-star"></i>
                                </span>
                                <span className={cx('item__start--gold')}>
                                    <i className="fas fa-star"></i>
                                </span>
                                </>:null
                                }                                                                
                            </div>
                            {avgRatings === 0 ? null : <span>{avgRatings}</span>}
                            
                        </li>
                        <li>{book.reviews?.length} Đánh giá</li>
                        <li>{book.wantToRead} Muốn đọc</li>
                        <li> {book.currentlyReading} Hiện đang đọc</li>
                        <li>{book.haveRead} Đã đọc</li>
                    </ul>
                    <ul className={cx('book-navbar')}>
                        <li>
                            <Link>Tổng Quan</Link>
                        </li>
                        <li>
                            <Link>Chi Tiết</Link>
                        </li>
                        <li>
                            <Link>Bình Luận</Link>
                        </li>
                    </ul>
                    <div className={cx('book-info')}>
                        <div className={cx('book-info__item')}>
                            <p>Ngày xuất bản</p>
                            <span>{book.publishingDate}</span>
                        </div>
                        <div className={cx('book-info__item')}>
                            <p>Nhà xuất bản</p>
                            <span>{book.publishingCompany}</span> 
                        </div>
                        <div className={cx('book-info__item')}>
                            <p>Ngôn ngữ</p>
                            <span>{book.language}</span>
                        </div>
                        <div className={cx('book-info__item')}>
                            <p>Trang</p>            
                            <span>{book.page}</span>
                        </div>
                    </div>
                    <div className={cx('previews-languages')}>
                        <h6>Bản xem trước có sẵn trong:</h6>
                        <Link>{book.previewAvailable}</Link>
                    </div>
                    <Decription book={book} Loading={Loading} error={error} />
                    <div className={cx('subject-content')}>
                        <div className={cx('link-box')}>
                            <h6>Thể Loại: </h6>
                            {book.genre?.map((genre, index) => (<Link key={index}>{genre},</Link>))}...
                        </div>
                        <div class={cx('link-box')}>
                            <h6>Nhân Vật Chính: </h6>
                            <Link>{book.people}</Link>
                        </div>
                        <div class={cx('link-box')}>
                            <h6>Địa Điểm: </h6>
                            <Link>{book.places}</Link>
                        </div>
                    </div>
                    <DetailBook  book={book} Loading={Loading} error={error} />
                </div>
                )}
        </>
    );
};

export default OverViewBook;
