import classNames from 'classnames/bind';

import styles from './Carouse.module.scss';
const cx = classNames.bind(styles);
function Carousel({ carousel }) {
    const { image, title, text } = carousel


    return (
        <div className={cx('card')}>
            <img src={image} alt="..." />
            <div className="card-body">
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
        </div>
    );
}

export default Carousel;
