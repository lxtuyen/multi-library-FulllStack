import React from 'react';
import classNames from 'classnames/bind';

import styles from './BookVendor.module.scss';

const cx = classNames.bind(styles);

function BookVendor({ book, Loading, error }) {
    return (
        <>
            {Loading && <h4>Loading............</h4>}
            {error && <h4>Error!!!</h4>}
            {!Loading && !error && (
                <div className={cx('book-vendor')}>
                    <div>
                        <p>Kiểm tra các thư viện gần đây:</p>
                        <ul>
                            {book.checkNearbyLibraries?.map((lib, index) => (
                                <li key={index}>{lib}</li>
                            ))}
                        </ul>
                    </div>
                    <div class="section">
                        <p>Mua cuốn sách này tại:</p>
                        <ul>
                            {book.buyThisBook?.map((lib, index) => (
                                <li key={index}>{lib}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

export default BookVendor;
