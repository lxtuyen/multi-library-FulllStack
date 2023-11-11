import classNames from "classnames/bind"
import { Link } from "react-router-dom";

import Styles from './SearchItem.module.scss'
import Start from '~/components/Layout/components/Start';
import calculateAvgRatings from '~/utils/avgRatings';

const cx = classNames.bind(Styles)

function SearchItem({ books, error, loading}) {

    const { _id, photo, title, author,reviews } = books
    const { avgRatings } = calculateAvgRatings(reviews);
    return ( 
        <Link to={`/books/${_id}`} className={cx('wrapper')}>
            <img className={cx('img-book')} src={photo} alt="img-book" />
            <div className={cx('info')}>
                <p className={cx('name')}>{title}</p>
                <span className={cx('author')}>{author}</span>
                <Start value={avgRatings} />
            </div>
        </Link>
     );
}

export default SearchItem;