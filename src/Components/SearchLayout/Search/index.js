import { useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

const Search = ({ setSearch, search }) => {
    const inputRef = useRef();
    return (
        <div className={cx('search')}>
            <input
                input
                type="text"
                ref={inputRef}
                className={cx('input')}
                placeholder="Tìm kiếm"
                onChange={({ currentTarget: input }) => setSearch(input.value)}
            />
            {!!search && (
            <buttton
            className={cx('clear')}
            onClick={() => {
                setSearch('');
                inputRef.current.focus();
            }}
        >
            <i className="fa-solid fa-circle-xmark"></i>
        </buttton>
            )}
            <buttton className={cx('search-btn')}>
                <i className="fa-solid fa-magnifying-glass"></i>
            </buttton>
        </div>
    );
};

export default Search;
