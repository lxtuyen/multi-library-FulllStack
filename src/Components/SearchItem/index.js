import classNames from "classnames/bind"
import Styles from './SearchItem.module.scss'
import images from '~/assets/images'

const cx = classNames.bind(Styles)

function SearchItem({ books, error, loading}) {

    const { photo, title, author } = books
    return ( 
        <div className={cx('wrapper')}>
            <img className={cx('img-book')} src={photo} alt="img-book" />
            <div className={cx('info')}>
                <p className={cx('name')}>{title}</p>
                <span className={cx('author')}>{author}</span>
            </div>
        </div>
     );
}

export default SearchItem;