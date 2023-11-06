import classNames from "classnames/bind"
import Styles from './SearchItem.module.scss'
import images from '~/assets/images'

const cx = classNames.bind(Styles)

function SearchItem() {
    return ( 
        <div className={cx('wrapper')}>
            <img className={cx('img-book')} src={images.sach} alt="img-book" />
            <div className={cx('info')}>
                <p className={cx('name')}>sach a</p>
                <span className={cx('author')}>nguyen van a</span>
            </div>
        </div>
     );
}

export default SearchItem;