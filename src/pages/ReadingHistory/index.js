import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { BASE_URL } from '~/hooks/config';
import RSideBar from '~/Components/UserLayout/RSideBar';

function ReadingHistory() {
    const { id } = useParams();
    const [obj, setObj] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const title = "Lịch sử đọc";


    useEffect(() => {
        const getAllHistory = async () => {
            setLoading(true);
            try {
                const url = `${BASE_URL}/history/${id}?page=${page}`;
                const { data } = await axios.get(url);
                setObj(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        getAllHistory();
    }, [id, page]);
    return (
        <>
            <RSideBar obj={obj} value={2} title={title} error={error} loading={loading} setPage={setPage} page={page} />
        </>
    );
}
export default ReadingHistory;
