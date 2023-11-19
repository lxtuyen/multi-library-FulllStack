import React from 'react'

function AllUsers(){
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
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td></td>
                                    <td></td>
                                    <td> 
                                    <select className="form-select" aria-label=".form-select-sm example">
                                        <option selected>select role</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                    </td>
                                    <td>
                                        <button className='btn btn-outline-primary'>Update</button>
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

export default AllUsers