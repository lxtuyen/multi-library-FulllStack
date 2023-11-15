import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import SyncLoader from 'react-spinners/SyncLoader';

import styles from './Table.module.scss';
import Card from '~/components/Layout/components/Card';
import useFetch from '~/hooks/useFetch';
import { BASE_URL } from '~/hooks/config';
import { AuthContext } from '~/context/AuthContext';

const cx = classNames.bind(styles);

export const Table = ({ books, error, loading }) => {
    const { user } = useContext(AuthContext);
    const id = user.data._id;

    const { data: followed } = useFetch(`${BASE_URL}/users/${id}`);
    const bookId = [followed?.map((book) => book.bookId)];
    const followedId = [followed?.map((book) => book._id)];
    return (
        <div className={'container'}>
            <div className={'row'}>
                {loading && <SyncLoader size={30} color="#36d7b7" margin="30px"  />}
                {error && <h4>Error!!!</h4>}
                {!loading && !error && !books.length && <h4>not found</h4>}
                {!loading &&
                    !error &&
                    books?.map((book) => (
                        <div className={cx('column')} key={book._id}>
                            <Card items={book} bookIds={bookId} followedId={followedId} />
                        </div>
                    ))}
            </div>
        </div>
    );
};
export const FeaturedTable = ({ followed }) => {
    const { data: featuredBook, loading, error } = useFetch(`${BASE_URL}/books/search/getFeaturedBook`);
    const bookId = [followed?.map((book) => book.bookId)];
    const followedId = [followed?.map((book) => book._id)];

    return (
        <div className={'container'}>
            <div className={'row'}>
                {loading && <SyncLoader size={15} color="#36d7b7" margin="30px" />}
                {error && <h4>Error!!!</h4>}
                {!loading &&
                    !error &&
                    featuredBook.map((item, index) => (
                        <div className={cx('column')} key={index}>
                            <Card items={item} bookIds={bookId} followedId={followedId} />
                        </div>
                    ))}
            </div>
        </div>
    );
};
