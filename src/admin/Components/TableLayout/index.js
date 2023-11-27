import React, { useState, useEffect } from 'react'
import axios from 'axios';

import styles from './TableLayout.module.scss';
import { BASE_URL } from '~/hooks/config';
import useFetch from '~/hooks/useFetch';
import calculateAvgRatings from '~/utils/avgRatings';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

function Tr({ item, index }) {
    const cx = classNames.bind(styles);
    const option = { day: 'numeric', month: 'long', year: 'numeric' };
    const { avgRatings } = calculateAvgRatings(item?.reviews);

    /*  const handleDelete = async (e,id) => {
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
              }    onClick={(e) => handleDelete(e, item._id)}
          } catch (error) {
              toast.error(error.message)
          }}*/
    console.log(item);
    return (
        <>
            <tr>
                <th scope="row">{index}</th>
                <td>{item.title}</td>
                <td> <img src={item.photo} alt={item.title} className={cx('image')} /> </td>
                <td>{item.author}</td>
                <td>{item.genre.map((genre, index) => (
                    <h5 key={index}>
                        {genre} {index !== genre.length - 1 && ','}
                    </h5>
                ))}</td>
                <td> {new Date(item.createdAt).toLocaleDateString('en-US', option)}</td>
                <td>{avgRatings}</td>
                <td>
                    <button className='btn btn-outline-danger'> Xóa </button>
                </td>
                <td>
                    <button className='btn btn-outline-primary'><Link to={`/addbook/${item._id}`}>Sửa</Link></button>
                </td>
            </tr>
        </>
    )
}

export default Tr;