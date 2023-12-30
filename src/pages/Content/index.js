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
    const { data: chapter } = useFetch(`${BASE_URL}/content/${id}`);
    console.log(chapter)
    const onChange = (pageNumber) => {
        const result = chapter?.filter((item) => item.chapter === pageNumber);
        setResult(result)
      };
      useEffect(()=>{
        const result = chapter?.filter((item) => item.chapter === 2);
        setResult(result)
      },[chapter])
    return (
        <div className={cx('wrapper')}>
            {result?.map((item) => (
            <>
            <h1>{item.title}</h1>
            <div className="container">
                <div className={cx('content')}>
                    <div dangerouslySetInnerHTML={{__html: item.content}}></div>
                    
                </div>
                </div>
            </>
            ))}
                <div className={cx('pagination')}>
                    <Pagination defaultCurrent={1} total={`${chapter.length}0`} onChange={onChange} />
                </div>  
        </div>
    );
}

export default Content;