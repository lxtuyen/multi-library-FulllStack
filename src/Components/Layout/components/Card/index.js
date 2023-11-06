import React, { useContext, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Card.module.scss';
import calculateAvgRatings from '~/utils/avgRatings';
import { AuthContext } from '~/context/AuthContext';
import { BASE_URL } from '~/hooks/config';

const cx = classNames.bind(styles);
function Card({ items, bookIds, followedId }) {
    const navigate = useNavigate();
    const [isFolloweds, setIsFolloweds] = useState(false);
    const { user } = useContext(AuthContext);
    const { _id, photo, title, author, genre, reviews, language, follower } = items;
    const { totalRating, avgRatings } = calculateAvgRatings(reviews);

    const bookIdsArray = Array.from(bookIds.toString().split(','));

    const isFollowed = bookIdsArray.includes(_id);
        const followedIds = Array.from(followedId.toString().split(','));

        const foundBookIds = followedIds?.filter((bookId) => {
                return follower?.includes(bookId);  
        });
        useEffect(()=>{
            setIsFolloweds(isFollowed)      
        },[isFollowed])
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
        const deleteObj = {
            userId: user.data._id,
            bookId: _id,
        };
        
        const res = await fetch(`${BASE_URL}/followed/${foundBookIds}`, {
            method: 'delete',
            headers: { 'content-type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(deleteObj),
        });
        const result = await res.json();
            if (!res.ok) {
                return alert(result.message);
            } else {
                alert('thanh cong');
                setIsFolloweds(false);
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
                setIsFolloweds(true)
                console.log(isFolloweds)
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <>
            <div className={cx('card-container')}>
                <div className={cx('card')}>
                    <div className={cx('card__img')}>
                        <img src={photo} alt="" title={title} />
                    </div>
                </div>
                <div
                    className="cardBody d-flex align-items-center 
                    justify-content-between"
                >
                    <span className={cx('book__author')}>
                        Tác Giả: <h5>{author}</h5>
                    </span>
                    <span className={cx('book__rating')}>
                        <i className="fa-solid fa-star"></i> {avgRatings === 0 ? null : avgRatings}
                        {totalRating === 0 ? 'Not rated' : <span>({reviews?.length})</span>}
                    </span>
                </div>

                <h5 className={cx('tour__title')}>{items?.title}</h5>
                <div className={cx('genre_container')}>
                    <span>Thể Loại:</span>
                    {genre.map((genre, index) => (
                        <h5 key={index}>
                            {genre} {index !== genre.length - 1 && ' '}
                        </h5>
                    ))}
                </div>
                <div className={cx('card-bottom d-flex align-items-center justify-content-between mt-3')}>
                    <div className={cx('home-product-item')}>
                        <button type="button" className="btn btn-primary btn-block">
                            <Link to={`/books/${_id}`}>
                                <i className="fa-solid fa-book-open-reader"></i>
                                Đọc
                            </Link>
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
                </div>
            </div>
        </>
    );
}

export default Card;
