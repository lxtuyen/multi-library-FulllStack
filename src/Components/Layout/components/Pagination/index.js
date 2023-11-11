import classNames from 'classnames/bind';

import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);


const Pagination = ({ page, total, limit, setPage }) => {

    const totalPages = Math.ceil(total/limit)
    const onClick = (newPage) =>{
        setPage(newPage +1);
    }
    return  ( 
        <div className={cx('wrapper')}>
            {totalPages > 0 && [...Array(totalPages)].map((val,index)=>(
                <button 
                className={
                page === index + 1 ?`${cx("page_btn")} ${cx('active')}`
                :cx("page_btn")
                }
                key={index}
                onClick={()=> onClick(index)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    )
}

export default Pagination;