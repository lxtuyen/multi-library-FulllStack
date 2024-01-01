import React, { useState,useEffect } from 'react';
import classNames from 'classnames/bind';
import { Pagination } from 'antd';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useFetch from '~/hooks/useFetch';
import { BASE_URL } from '~/hooks/config';
import styles from './Content.module.scss';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';
const cx = classNames.bind(styles);
function Content() {
    const { id } = useParams();
    const [result, setResult] = useState([]);
    const [obj, setObj] = useState([]);
    const { data: chapter } = useFetch(`${BASE_URL}/content/${id}`);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getAllBooks = async () => {
            setLoading(true);
            try {
                const url = `${BASE_URL}/content/${id}`;
                const { data } = await axios.get(url);
                setObj(data.data);
                setLoading(false);
            } catch (err) {
                toast.error(err.message)
                setLoading(false);
            }
        };
        getAllBooks();
    },[id] );
    const onChange = (pageNumber) => {
        const result = obj?.filter((item) => item.chapter === pageNumber);
        setResult(result)
      };
      useEffect(()=>{
        const result = obj?.filter((item) => item.chapter === 1);
        setResult(result)
      },[obj])
     
    return (
        <div className={cx('wrapper')}>
            {result?.map((item) => (
            <>
            <div className="container">
                <div className={cx('content')}>
                    {loading ? <SyncLoader size={13} color="#36d7b7" /> : 
                    <div dangerouslySetInnerHTML={{__html: item.content}}></div> }
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