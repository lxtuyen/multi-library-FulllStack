import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '~/hooks/config';
import { Link, useParams } from 'react-router-dom';
function AllBooks() {
    const [obj, setObj] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const option = { day: 'numeric', month: 'long', year: 'numeric' };
    useEffect(() => {
        const getAllChapters = async () => {
            setLoading(true);
            try {
                const url = `${BASE_URL}/content/${id}`;
                const { data } = await axios.get(url);
                setObj(data.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        getAllChapters();
    }, [id]);
    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/content/${id}`, {
                method: 'delete',
                headers: { 'content-type': 'application/json' },
                credentials: 'include',
            });
            const result = await res.json();
            if (!res.ok) {
                return toast.error(result.message);
            } else {
                toast.success('xóa thành công');
                setObj((prevStatus) => prevStatus.filter((book) => book._id !== id));
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 className="mt-4"> All Chapters </h1>
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-table me-1"></i>
                            DataTable
                        </div>
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Chapter</th>
                                    <th scope="col">CreateAt</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            {loading && <h4>Loading............</h4>}
                            {error && <h4>Error!!!</h4>}
                            {!loading && !error && !obj && <p> The book currently has no chapters</p>}
                            {!loading && !error && (
                                <tbody>
                                    {obj?.map((content, i) => (
                                        <tr>
                                            <th scope="row">{i + 1}</th>
                                            <td>{content.title}</td>
                                            <td>{content.chapter}</td>
                                            <td> {new Date(content.createdAt).toLocaleDateString('en-US', option)}</td>
                                            <td>
                                                <button className="btn btn-primary">
                                                    <Link to={`/editChapters/${content._id}`}>Edit</Link>
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={(e) => handleDelete(e, content._id)}
                                                >
                                                    {' '}
                                                    Delete{' '}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                        <button type="button" class="btn btn-primary">
                            <Link to={`/addContent/${id}`}>Add new content</Link>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AllBooks;
