import classNames from 'classnames/bind';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

const Search = ({setSearch}) => {
    return  (
        <div className={cx("search")}>
        <input input
        type='text'
        className={cx('input')}
        placeholder='Tìm kiếm'
        onChange={({currentTarget: input}) => setSearch(input.value)}
        />
        <buttton className={cx('search-btn')}>
            <i className="fa-solid fa-magnifying-glass"></i>
        </buttton>
        </div>

    )
}

export default Search;