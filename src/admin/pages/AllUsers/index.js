import axios from 'axios';
import { BASE_URL } from 'hooks/config';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function AllUsers(){
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState('')
    const { id } = useParams();
    const [obj, setObj] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const data = {
                role : role
            };
            const res = await fetch(`${BASE_URL}/users/${id}`, {
                method: 'put',
                headers: { 'content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (!res.ok) {
                return toast.error(result.message)
            } else {
                toast.success('Thành công')
            }
        } catch (error) {
            toast.error(error.message)
        }
    };
    useEffect(() => {
        const getAllUser = async () => {
            setLoading(true);
            try {
                const url = `${BASE_URL}/users`;
                const { data } = await axios.get(url);
                setObj(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        getAllUser();
    }, [])
    console.log(obj.data);
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
                                    <th scope="col">Email</th>
                                    <th scope="col">phoneNumber</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">role</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {loading && <h4>Loading............</h4>}
                            {error && <h4>Error!!!</h4>}
                            {!loading && !error && (
                            <tbody>
                                {obj.data?.map((user, i)=>(
                                
                                 <tr>
                                    <th scope="row">{i}</th>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.address}</td>
                                    <td>
                                    <select className="form-select" aria-label=".form-select-sm example" value={user.role}>
                                        <option selected>select role</option>
                                        <option value="admin" onChange={(e)=>{setRole(e.target.value)}}>Admin</option>
                                        <option value="user" onChange={(e)=>{setRole(e.target.value)}}>User</option>
                                    </select>
                                    </td>
                                </tr>))}
                            </tbody>)}
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AllUsers