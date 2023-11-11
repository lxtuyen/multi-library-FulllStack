import classNames from 'classnames/bind';

import styles from './Genre.module.scss';

const cx = classNames.bind(styles);


const Genre = ({ genres, filterGenre, setFilterGenre }) => {
    const onChange = ({ currentTarget: input }) => {
        if (input.checked) {
            const state = [...filterGenre, input.value];
            setFilterGenre(state);
        } else {
            const state = filterGenre.filter((val) => val !== input.value);
            setFilterGenre(state);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h1>Tìm Kiếm Theo Thể Loại</h1>
            <hr/>
            <div className={cx('genre-container')}>
            {genres.map((genre,index) => (
                    <div key={genre}>
                        <input
                            type='checkbox'
                            value={genre}
                            onChange={onChange}
                        />
                        <p>{genre}</p>
                    </div>
            ))}
            </div>
        </div>
    );
};
export default Genre;
