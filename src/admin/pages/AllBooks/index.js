import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import classNames from "classnames";
import { BASE_URL } from '~/hooks/config';
import { Link } from 'react-router-dom';
import styled from "../AllBooks/AllBooks.scss";
import Pagination from 'Components/Layout/components/Pagination';
function AllBooks() {
    const cx = classNames.bind(styled)
    const [obj, setObj] = useState([]);
    const [pag, setPag] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const option = { day: 'numeric', month: 'long', year: 'numeric' };
    useEffect(() => {
        const getAllBooks = async () => {
            setLoading(true);
            try {
                const url = `${BASE_URL}/books?page=${page}&sort=avgRating,desc`;
                const { data } = await axios.get(url);
                setObj(data?.books);
                setPag(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        getAllBooks();
    }, [page]);
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
                toast.success('xóa thành công')
                setObj((prevStatus) => prevStatus.filter((book) => book._id !== id));
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
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
                                    <th scope="col">Name</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Author</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">Publish date</th>
                                    <th scope="col">Average rate</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            {loading && <h4>Loading............</h4>}
                            {error && <h4>Error!!!</h4>}
                            {!loading && !error && (
                                <tbody>
                                    {obj?.map((book, i) => (
                                        <tr>
                                            <th scope="row">{i + 1}</th>
                                            <td>{book.title}</td>
                                            <td> <img src={book.photo} alt={book.title} className={cx('img')} /> </td>
                                            <td>{book.author}</td>
                                            <td>{book.genre.map((genre, index) => (
                                                <div key={index}>
                                                    {genre} {index !== genre.length - 1 && ','}
                                                </div>
                                            ))}</td>
                                            <td> {new Date(book.createdAt).toLocaleDateString('en-US', option)}</td>
                                            <td>{book.avgRating || <p>Not Rating</p>}</td>
                                            <td>
                                                <button className='btn btn-outline-primary'><Link to={`/chapters/${book._id}`}>Chapters</Link></button>
                                            </td> 
                                            <td>
                                                <button className='btn btn-outline-primary'><Link to={`/editbook/${book._id}`}>Edit</Link></button>
                                            </td>
                                            <td>
                                                <button className='btn btn-outline-danger' onClick={(e) => handleDelete(e, book._id)}> Delete </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>)}
                        </table>
                        <Pagination 
                            page={page}
                            limit={pag.limit ? pag.limit : 0}
                            total={pag.total ? pag.total : 0}
                            setPage={(page) => setPage(page)}
                        />
                    </div>
                </div>
            </main>
        </div>

    )
}

export default AllBooks

/*
 
 
*/