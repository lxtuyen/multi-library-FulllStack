import React, { useRef, useState, useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './CommentBox.module.scss';
import images from '~/assets/images';
import { AuthContext } from '~/context/AuthContext';
import { BASE_URL } from '~/hooks/config';

const cx = classNames.bind(styles);

function CommentBox({ book }) {
    const commentRef = useRef('');
    const [comments, setComments] = useState(book?.reviews);
    const { id } = useParams();
    useEffect(() => {
        setComments(book?.reviews);
    }, [book?.reviews]);

    const [bookRating, setBookRating] = useState(null);
    const [rating, setRating] = useState([false, false, false, false, false]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const option = { day: 'numeric', month: 'long', year: 'numeric' };

    const handleClick = (index) => {
        setRating(
            rating.map((value, i) => {
                if (i === index) {
                    return !value;
                } else {
                    return value;
                }
            }),
        );
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const commentText = commentRef.current.value;

        if (!commentText) {
            alert('Vui lòng nhập bình luận.');
            return;
        }

        try {
            if (!user || user === undefined || user === null) {
                navigate('/login');
                return;
            }

            const reviewObj = {
                username: user.data.username,
                reviewText: commentText,
                rating: bookRating,
            };

            const res = await fetch(`${BASE_URL}/review/${id}`, {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(reviewObj),
            });

            const result = await res.json();
            if (!res.ok) {
                return alert(result.message);
            } else {
                setComments([...comments, result.data]);
                // Xóa nội dung của ô nhập bình luận
                commentRef.current.value = '';
            }
        } catch (error) {
            alert(error.message);
        }
    };
    const renderComments = () => {
        if (comments?.length === 0) {
            return <p>Chưa có bình luận nào.</p>;
        }
        console.log(comments);
        return comments?.map((review, index) => (
            <div className={cx('review__item')} key={index}>
                <img src={images.profile_user} alt="" />

                <div className="w-100">
                    <div className="d-lex align-items-center justify-content-between">
                        <div>
                            <h5>{review.username}</h5>
                            <p>{new Date(review.createdAt).toLocaleDateString('en-US', option)}</p>
                        </div>
                        <div className={cx('comment-box__text')}>
                            <h6>{review.reviewText}</h6>
                            <span className="d-lex align-items-center">
                                {review.rating}
                                <i className="fas fa-star"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };
    return (
        <div className={cx('wrapper__comment-box')}>
            <div className="container">
                <div className={cx('comment-box')}>
                    <h4 className={cx('Comment-box__title')}>Bình Luận ({comments?.length} bình luận)</h4>
                    <form onSubmit={submitHandler}>
                        <div className={cx('comment-box__star')}>
                            {rating.map((value, index) => (
                                <span
                                    onClick={() => {
                                        setBookRating(index + 1);
                                        handleClick(index);
                                    }}
                                    key={index}
                                    className={value ? cx('active') : ''}
                                >
                                    {index + 1}
                                    <i className="fas fa-star"></i>
                                </span>
                            ))}
                        </div>

                        <div className={cx("form-group")}>
                            <textarea
                                className={cx("form-input")}
                                ref={commentRef}
                                required=""
                                placeholder="Viết bình luận tại đây."
                            ></textarea>
                        </div>
                        <button type="button" className="btn btn-primary btn-block">
                            Bình Luận
                        </button>
                    </form>
                    <div className={cx('list-group')}>{renderComments()}</div>
                </div>
            </div>
        </div>
    );
}

export default CommentBox;
/*
<span
                                onClick={() => {
                                    setBookRating(1);
                                }}
                            >
                                1<i className="fas fa-star"></i>
                            </span>
                            <span onClick={() => setBookRating(2)}>
                                2<i className="fas fa-star"></i>
                            </span>
                            <span onClick={() => setBookRating(3)}>
                                3<i className="fas fa-star"></i>
                            </span>
                            <span onClick={() => setBookRating(4)}>
                                4<i className="fas fa-star"></i>
                            </span>
                            <span onClick={() => setBookRating(5)}>
                                5<i className="fas fa-star"></i>
                            </span>
 */
/*<div className={cx('comment-box__input')}>
                            <input
                                type="text"
                                ref={commentRef}
                                className={cx('comment-input')}
                                placeholder="Viết bình luận tại đây."
                            />
                            <button className="btn primary__btn " type="submit">
                                Bình Luận
                            </button>
                            
                        </div>*/
