import { useState } from "react";
import AllBooks from "../AllBooks";
import { useEffect } from "react";
import { BASE_URL } from "hooks/config";
import axios from "axios";
import Chart from "../Chart";
import { Link } from "react-router-dom";
import classNames from "classnames";
import styled from "../Dashboard/Dashboard.scss";
import Pagination from 'Components/Layout/components/Pagination';
function Dashboard() {
    const cx = classNames.bind(styled)
    const [obj, setObj] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pag, setPag] = useState([]);
    const [page, setPage] = useState(1);
    const option = { day: 'numeric', month: 'long', year: 'numeric' };
    useEffect(() => {
        const getAllBooks = async () => {
            setLoading(true);
            try {
                const url = `${BASE_URL}/books?page=${page}&sort=avgRating,desc`;
                const { data } = await axios.get(url);
                setObj(data?.books);
                setPag(data)
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        getAllBooks();
    }, [page]);
    return (
        <>
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">
                        <h1 class="mt-4">Dashboard</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active">Dashboard</li>
                        </ol>
                        <div class="row">
                            <div class="col-xl-3 col-md-6">
                                <div class="card bg-primary text-white mb-4">
                                    <div class="card-body">Books</div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <Link class="small text-white stretched-link" to="/allbooks">View Details</Link>
                                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6">
                                <div class="card bg-danger text-white mb-4">
                                    <div class="card-body">Users</div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <Link class="small text-white stretched-link" href="/alluser">View Details</Link>
                                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-chart-area me-1"></i>
                                    Area Chart Example
                                </div>
                                <div class="card-body">
                                    <Chart />
                                </div>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table me-1"></i>
                                DataTable Example
                            </div>
                            <div class="card-body">
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
                                        </tr>
                                    </thead>
                                    {loading && <h4>Loading............</h4>}
                                    {error && <h4>Error!!!</h4>}
                                    {!loading && !error && (
                                        <tbody>
                                            {obj?.map((book, i) => (
                                                //<Tr item={book} key={i} index={i} setObj={(obj) => setObj(obj)} obj={obj.books} />
                                                <tr>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{book.title}</td>
                                                    <td> <img src={book.photo} alt={book.title} className={cx('img')} /> </td>
                                                    <td>{book.author}</td>
                                                    <td>{book.genre.map((genre, index) => (
                                                        <h5 key={index}>
                                                            {genre} {index !== genre.length - 1 && ','}
                                                        </h5>
                                                    ))}</td>
                                                    <td> {new Date(book.createdAt).toLocaleDateString('en-US', option)}</td>
                                                    <td>{book.avgRating}</td>
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
                    </div>
                </main>
            </div>

        </>
    )
}

export default Dashboard;