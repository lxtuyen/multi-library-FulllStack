import React from 'react';
import classNames from 'classnames/bind';

import styles from './Start.module.scss';

const cx = classNames.bind(styles);

function Start({ value }) {
    return (
        <div className={cx('reader-stats__rating')}>
            {value > 0 && value <= 1 ? (
                <>
                    <span className={cx('item__start--gold')}>
                        <i className="fas fa-star"></i>
                    </span>
                    <span>
                        <i className="fas fa-star"></i>
                    </span>
                    <span>
                        <i className="fas fa-star"></i>
                    </span>
                    <span>
                        <i className="fas fa-star"></i>
                    </span>
                    <span>
                        <i className="fas fa-star"></i>
                    </span>
                </>
            ) : null}
            {value > 1 && value <= 2 ? (
                <>
                    <span className={cx('item__start--gold')}>
                        <i className="fas fa-star"></i>
                    </span>
                    <span className={cx('item__start--gold')}>
                        <i className="fas fa-star"></i>
                    </span>
                    <span>
                        <i className="fas fa-star"></i>
                    </span>
                    <span>
                        <i className="fas fa-star"></i>
                    </span>
                    <span>
                        <i className="fas fa-star"></i>
                    </span>
                </>
            ) : null}
            {value > 2 && value <= 3 ? (
                <>
                    <span className={cx('item__start--gold')}>
                        <i className="fas fa-star"></i>
                    </span>
                    <span className={cx('item__start--gold')}>
                        <i className="fas fa-star"></i>
                    </span>
                    <span className={cx('item__start--gold')}>
                        <i className="fas fa-star"></i>
                    </span>
                    <span>
                        <i className="fas fa-star"></i>
                    </span>
                    <span>
                        <i className="fas fa-star"></i>
                    </span>
                </>
            ) : null}
            {value > 3 && value <= 4 ? (
                <>
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
                    <span>
                        <i className="fas fa-star"></i>
                    </span>
                </>
            ) : null}
            {value > 4 && value <= 5 ? (
                <>
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
                </>
            ) : null}
                    {value === null ? <><span>
                        <i className="fas fa-star"></i>
                    </span>
                    <span>
                        <i className="fas fa-star"></i>
                    </span>
                    <span>
                        <i className="fas fa-star"></i>
                    </span>
                    <span>
                        <i className="fas fa-star"></i>
                    </span>
                    <span>
                        <i className="fas fa-star"></i>
                    </span>
                    <span>Not rating</span>
                    </> : <span>{value}</span>}
        </div>
    );
}

export default Start;
