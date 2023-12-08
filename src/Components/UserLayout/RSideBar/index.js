import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SyncLoader from 'react-spinners/SyncLoader';

import styles from './RSideBar.module.scss';
import Sidebar from '~/components/UserLayout/Sidebar';
import Pagination from '~/Components/Layout/components/Pagination';
import Start from '~/components/Layout/components/Start';
import { AuthContext } from '~/context/AuthContext';
import { BASE_URL } from '~/hooks/config';

const cx = classNames.bind(styles);

function RSideBar({ title, value, obj, error, loading, setPage, page }) {
    const { user } = useContext(AuthContext);
    const type = title === 'Đang theo dõi' ? obj.followed : obj.readingHistory;
    const option = { day: 'numeric', month: 'long', year: 'numeric' };
    const [status, setStatus] = useState([]);
    useEffect(() => {
        setStatus(type);
    }, [obj, type, value]);
    const handleDelete = async (e, _id, bookId) => {
        e.preventDefault();
        try {
            const deleteObj = {
                userId: user.data._id,
                bookId: bookId,
            };
            const res = await fetch(`${BASE_URL}/followed/${_id}`, {
                method: 'delete',
                headers: { 'content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(deleteObj),
            });
            const result = await res.json();
            if (!res.ok) {
                return alert(result.message);
            } else {
                toast.success('Xóa thành công');
                setStatus((prevStatus) => prevStatus.filter((id) => id._id.toString() !== _id));
            }
        } catch (error) {
            toast.error('Xóa thất bại');
        }
    };
    const handleDeleteHistory = async (e, _id, bookId) => {
        e.preventDefault();
        try {
            const deleteObj = {
                userId: user.data._id,
                bookId: bookId,
            };
            const res = await fetch(`${BASE_URL}/history/${_id}`, {
                method: 'delete',
                headers: { 'content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(deleteObj),
            });
            const result = await res.json();
            if (!res.ok) {
                return alert(result.message);
            } else {
                toast.success('Xóa thành công');
                setStatus((prevStatus) => prevStatus.filter((id) => id._id.toString() !== _id));
            }
        } catch (error) {
            toast.error('Xóa thất bại');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className={cx('tabs-content-wrap')}>
                            <h2>{title}</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th className={cx('thead-name')}>Tên sách</th>
                                        <th className={cx('thead-post-on')}>Thời gian cập nhật</th>
                                    </tr>
                                </thead>
                                {loading && <SyncLoader size={15} color="#36d7b7" />}
                                {error && <h4>Error!!!</h4>}
                                {!loading && !error && !status && (
                                    <tbody>
                                        <span>Bạn chưa từng đọc bất kỳ cuốn sách nào</span>
                                    </tbody>
                                )}
                                {!loading && !error && (
                                    <tbody>
                                        {status?.map((value) => (
                                            <tr key={value._id}>
                                                <td>
                                                    <div className={cx('tbody-book-name')}>
                                                        <div className={cx('item-thumb')}>
                                                            <Link>
                                                                <img src={value.photo} alt="" />
                                                            </Link>
                                                        </div>
                                                        <div className={cx('item-info')}>
                                                            <span>{value.bookName}</span>
                                                            <p>Tác giả: {value.author}</p>
                                                            <p>Ngôn Ngữ: Tiếng Anh</p>
                                                            <Start value={value.avgRating} />
                                                            <Link to={`/books/${value.bookId}`}>
                                                                <button type="button" className="btn btn-primary">
                                                                    Đọc tiếp
                                                                </button>
                                                            </Link>
                                                            {title === 'Đang theo dõi' ? (
                                                                <button
                                                                    onClick={(e) =>
                                                                        handleDelete(e, value._id, value.bookId)
                                                                    }
                                                                    className="btn btn-danger"
                                                                >
                                                                    Xóa
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={(e) =>
                                                                        handleDeleteHistory(e, value._id, value.bookId)
                                                                    }
                                                                    className="btn btn-danger"
                                                                >
                                                                    Xóa
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={cx('post-on')}>
                                                        <h4>Cập nhật vào:</h4>
                                                        {new Date(value.createdAt).toLocaleDateString('en-US', option)}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                )}
                            </table>
                            {status?.length > 0 && (
                                <Pagination
                                    page={page}
                                    limit={obj.limit ? obj.limit : 0}
                                    total={obj.total ? obj.total : 0}
                                    setPage={(page) => setPage(page)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default RSideBar;
