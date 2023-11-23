import React,  {useState, useEffect } from 'react'
import axios from 'axios';

import { BASE_URL } from '~/hooks/config';
import useFetch from '~/hooks/useFetch';
function AllBooks(){
    const [obj, setObj] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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

    console.log(obj.books);
    return(
        
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
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <button className='btn btn-outline-danger'> Xóa </button>
                                    </td>
                                    <td>
                                        <button className='btn btn-outline-primary'>Sửa</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AllBooks