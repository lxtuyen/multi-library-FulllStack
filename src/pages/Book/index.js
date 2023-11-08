import React, { useContext, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link, useParams, useNavigate } from 'react-router-dom';

import styles from './Book.module.scss';
import calculateAvgRatings from '~/utils/avgRatings';
import OverViewBook from '~/Components/overViewBook';
import CommentBox from '~/Components/CommentBox';
import BookVendor from '~/Components/Layout/components/BookVendor';
import { BASE_URL } from '~/hooks/config';
import useFetch from '~/hooks/useFetch';
import { AuthContext } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function Book() {
    const { id } = useParams();
    const { data: books, loading, error } = useFetch(`${BASE_URL}/books/${id}`);
    const { _id, title, author, follower, language, reviews, photo } = books;

    const { user } = useContext(AuthContext);
    const [isFolloweds, setIsFolloweds] = useState(false);
    const [followId, setFollowId] = useState([]);
    const [followerId, setFollowerId] = useState([]);
    const idUser = user?.data._id;
    const navigate = useNavigate();
    const { avgRatings } = calculateAvgRatings(reviews);

    const { data: followed } = useFetch(`${BASE_URL}/users/${idUser}`);

    const bookIds = [followed?.map((book) => book.bookId)];

    const bookIdsArray = Array.from(bookIds.toString().split(','));
    const isFollowed = bookIdsArray.includes(_id);
    const followedIds = Array.from(followId.toString().split(','));

    const foundBookIds = followedIds?.filter((bookId) => {
        return followerId?.includes(bookId);
    });

    useEffect(() => {
        const followedId = [followed?.map((book) => book._id)];
        setIsFolloweds(isFollowed);
        setFollowId(followedId);
        setFollowerId(follower);
    }, [isFollowed, follower, followed]);
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const deletedBookIds = await foundBookIds.map(async (foundBookId) => {
                const deleteObj = {
                    userId: user.data._id,
                    bookId: _id,
                };
                const res = await fetch(`${BASE_URL}/followed/${foundBookId}`, {
                    method: 'delete',
                    headers: { 'content-type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(deleteObj),
                });
                const result = await res.json();
                if (!res.ok) {
                    return alert(result.message);
                } else {
                    return foundBookId;
                }
            });

            // Cập nhật trạng thái theo dõi
            if (deletedBookIds.length > 0) {
                setIsFolloweds(false);
                setFollowId(followId.filter((id) => !foundBookIds.includes(id)));
                setFollowerId(followerId.filter((id) => id !== _id));
                // Hiển thị thông báo
                alert('Xóa thành công');
            }
        } catch (error) {
            alert(error.message);
        }
    };
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            if (!user || user === undefined || user === null) {
                navigate('/login');
                return;
            }

            const followedObj = {
                userId: user.data._id,
                bookId: _id,
                bookName: title,
                author: author,
                avgRating: avgRatings,
                language: language,
                photo: photo,
            };

            const res = await fetch(`${BASE_URL}/followed`, {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(followedObj),
            });

            const result = await res.json();
            if (!res.ok) {
                return alert(result.message);
            } else {
                alert('thanh cong');
                setIsFolloweds(true);
                setFollowId([...followId, result.savedFollowed._id]);
                setFollowerId([...followerId, result.savedFollowed.bookId]);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('wrapper__left')}>
                    <div className={cx('read-options')}>
                        <div className={cx('read-options__box-img')}>
                            <img src={photo} alt={title} />
                        </div>
                        <div className={cx('read-options__button')}>
                            <button type="button" className="btn btn-primary btn-block">
                                
                                    <i className="fa-solid fa-book-open-reader"></i>
                                    Đọc
                                
                            </button>
                            <button type="button" className="btn btn-primary btn-block">
                                
                                    <i className="fa-solid fa-book"></i>
                                    Mượn Sách
                                
                            </button>
                            {isFolloweds ? (
                                <button onClick={handleDelete} className="btn btn-danger">
                                    Xóa
                                </button>
                            ) : (
                                <button onClick={handleClick} type="button" className="btn btn-primary btn-block">
                                    <i className="fa-regular fa-heart"></i>
                                    Theo dõi
                                </button>
                            )}
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
                    </div>
    
                    
                    <BookVendor book={books} Loading={loading} error={error} />
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
