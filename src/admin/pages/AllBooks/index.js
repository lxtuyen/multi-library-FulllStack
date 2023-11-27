import React, { useState, useEffect } from 'react'
import axios from 'axios';


import { BASE_URL } from '~/hooks/config';
import useFetch from '~/hooks/useFetch';
import calculateAvgRatings from '~/utils/avgRatings';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Tr from 'admin/Components/TableLayout';
function AllBooks() {
    const [obj, setObj] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reviews, setReviews] = useState([]);
    const option = { day: 'numeric', month: 'long', year: 'numeric' };
    const { avgRatings } = calculateAvgRatings(obj?.reviews);

    useEffect(() => {
        const getAllBook = async () => {
            setLoading(true);
            try {
                const url = `${BASE_URL}/books?page=1`;
                const { data } = await axios.get(url);
                setObj(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        getAllBook();
    }, []);

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/books/${id}`, {
                method: 'delete',
                headers: { 'content-type': 'application/json' },
                credentials: 'include',
            });
            const result = await res.json();
            if (!res.ok) {
                return alert(result.message);
            } else {
                alert('thanh cong')
                setObj((book) => book.filter((id) => id._id.toString() !== id))
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    console.log(obj.books);
    return (

        <div id='layoutSidenav_content'>
            <main>
                <div class="container-fluid px-4">
                    <h1 className='mt-4'> All Books</h1>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <i className="fas fa-table me-1"></i>
                            DataTable Example
                        </div>
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Ảnh</th>
                                    <th scope="col">Tác giả</th>
                                    <th scope="col">Thể loại</th>
                                    <th scope="col">Ngày đăng</th>
                                    <th scope="col">Đánh giá trung bình</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            {loading && <h4>Loading............</h4>}
                            {error && <h4>Error!!!</h4>}
                            {!loading && !error && (
                                <tbody>
                                    {obj.books?.map((book, i)=>(
                                        <Tr item={book} key={i} index={i} />
                                    ))}                  
                                </tbody>)}
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AllBooks

/*
 
 
*/