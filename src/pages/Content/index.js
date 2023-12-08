import React, { useState,useEffect } from 'react';
import classNames from 'classnames/bind';
import { Pagination } from 'antd';
import { useParams } from 'react-router-dom';

import useFetch from '~/hooks/useFetch';
import { BASE_URL } from '~/hooks/config';
import styles from './Content.module.scss';
const cx = classNames.bind(styles);
function Content() {
    const { id } = useParams();
    const [result, setResult] = useState([]);
    const { data: contents } = useFetch(`${BASE_URL}/content/${id}`);
    const onChange = (pageNumber) => {
        const result = contents.filter((item) => item.chapter === pageNumber);
        setResult(result)
      };
      useEffect(()=>{
        const result = contents.filter((item) => item.chapter === 1);
        setResult(result)
      },[contents])
    return (
        <div className={cx('wrapper')}>
            {result.map((item) => (
            <>
            <h1>{item.title}</h1>
            <div className="container">
                <div className={cx('content')}>
                    {item.content}
                </div>
                </div>
            </>
            ))}
                <div className={cx('pagination')}>
                    <Pagination showQuickJumper defaultCurrent={1} total={`${contents.length}0`} onChange={onChange} />
                </div>  
        </div>
    );
}

export default Content;