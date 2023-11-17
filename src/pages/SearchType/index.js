import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';

import styles from './SearchType.module.scss';
import Search from '~/Components/SearchLayout/Search';
import Pagination from '~/Components/Layout/components/Pagination';
import Genre from '~/Components/SearchLayout/Genre';
import { Table } from '~/Components/Table';
import { BASE_URL } from '~/hooks/config';
import UseDebounce from '~/hooks/useDebounce';

const cx = classNames.bind(styles);

function SearchType() {
    const [obj, setObj] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filterGenre, setFilterGenre] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const debounced = UseDebounce(search, 500);

    useEffect(() => {
        const getAllBook = async () => {
            setLoading(true);
            try {
                const url = `${BASE_URL}/books?page=${page}
                &genre=${filterGenre.toString()}&search=${encodeURIComponent(debounced)}`;
                const { data } = await axios.get(url);
                setObj(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        getAllBook();
    }, [filterGenre, page, debounced]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container ')}>
                <Search setSearch={(search) => setSearch(search)} />
                <div className={cx('body')}>
                    <Genre
                        filterGenre={filterGenre}
                        genres={obj.genres ? obj.genres : []}
                        setFilterGenre={(genre) => setFilterGenre(genre)}
                    />
                    {
                        <Table books={obj.books ? obj.books : []} error={error} loading={loading} />
                    }
                </div>
                <Pagination
                    page={page}
                    limit={obj.limit ? obj.limit : 0}
                    total={obj.total ? obj.total : 0}
                    setPage={(page) => setPage(page)}
                />
            </div>
        </div>
    );
}
export default SearchType;
