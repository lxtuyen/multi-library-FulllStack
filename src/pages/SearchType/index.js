import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import styles from './SearchType.module.scss';
import Search from '~/Components/SearchLayout/Search';
import Pagination from '~/Components/Layout/components/Pagination';
import Genre from '~/Components/SearchLayout/Genre';
import Sort from '~/Components/SearchLayout/Sort';
import { Table } from '~/Components/Table';
import { BASE_URL } from '~/hooks/config';
import UseDebounce from '~/hooks/useDebounce';
import { FollowedProvider } from '~/context/FollowedContext'

const cx = classNames.bind(styles);

function SearchType() {
    const [obj, setObj] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filterGenre, setFilterGenre] = useState([]);
    const [sort, setSort] = useState({ sort: "avgRating", order: "desc" });
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const debounced = UseDebounce(search, 500);
    const navigate = useNavigate();

    useEffect(() => {
        const getAllBook = async () => {
            setLoading(true);
            try {
                const url = `${BASE_URL}/books?page=${page}&sort=${sort.sort},${sort.order}&genre=${filterGenre.toString()}&search=${encodeURIComponent(debounced)}`;
                const { data } = await axios.get(url);
                setObj(data);
                setLoading(false);
                const queryParams = new URLSearchParams({
                    page: page,
                    sort: sort.sort,
                    order: sort.order,
                });
                if (encodeURIComponent(debounced).length > 0) {
                    queryParams.set('search', encodeURIComponent(debounced));
                  }
                if (filterGenre.length > 0) {
                    queryParams.set('genre', filterGenre.toString());
                  }
                navigate(`/search?${queryParams.toString()}`);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        getAllBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort, filterGenre, page, debounced]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container ')}>
                <div className={cx('container-header')}>
                    <Search setSearch={(search) => setSearch(search)} search={search} />
                    <Sort sort={sort} setSort={(sort) => setSort(sort)} />
                </div>
                <div className={cx('body')}>
                    <Genre
                        filterGenre={filterGenre}
                        genres={obj.genres ? obj.genres : []}
                        setFilterGenre={(genre) => setFilterGenre(genre)}
                    />
                    {
                        <FollowedProvider>
                            <Table books={obj.books ? obj.books : []} error={error} loading={loading} />    
                        </FollowedProvider>                       
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
