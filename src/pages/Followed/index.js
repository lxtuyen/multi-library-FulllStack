import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { BASE_URL } from '~/hooks/config';
import RSideBar from '~/Components/UserLayout/RSideBar';

function Following() {
    const { id } = useParams();
    const [obj, setObj] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const title = 'Đang theo dõi';

    useEffect(() => {
        const getAllBook = async () => {
            setLoading(true);
            try {
                const url = `${BASE_URL}/followed/${id}?page=${page}`;
                const { data } = await axios.get(url);
                setObj(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        getAllBook();
    }, [id, page]);
    console.log(obj);
    return (
        <>
        <RSideBar obj={obj} value={1} title={title} error={error} loading={loading} setPage={setPage} page={page} />
    </>
    );
}
export default Following;
