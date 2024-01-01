import React, { useState, useEffect } from 'react';

import { BASE_URL } from '~/hooks/config';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';

function AddBook() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState([]);
    const [genre, setGenre] = useState([]);
    const onFinish = async (values) => {
        try {
            const addGenres = values.genres.map(async (value) => {
                const data = { name: value.name };
                const res = await fetch(`${BASE_URL}/admin/genre`, {
                    method: 'post',
                    headers: { 'content-type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(data),
                });
                const result = await res.json();
                if (!res.ok) {
                    return toast.error(result.message);
                } else {
                    setGenre([result.data, ...genre]);
                    return value;
                }
            });
            // Cập nhật trạng thái theo dõi
            if (addGenres.length > 0) {
                toast.success('Successful');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    useEffect(() => {
        const getAllUser = async () => {
            setLoading(true);
            try {
                const url = `${BASE_URL}/admin/genre`;
                const { data } = await axios.get(url);
                setObj(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        getAllUser();
    }, []);

    useEffect(() => {
        setGenre(obj.data);
    }, [obj]);
    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/admin/genre/${id}`, {
                method: 'delete',
                headers: { 'content-type': 'application/json' },
                credentials: 'include',
            });
            const result = await res.json();
            if (!res.ok) {
                return toast.error(result.message);
            } else {
                toast.success('xóa thành công');
                setGenre((prevGenre) => prevGenre.filter((Genre) => Genre._id !== id));
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 className="mt-4">All Genres</h1>
                    <div className="row">
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Tên</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {loading && <h4>Loading............</h4>}
                            {error && <h4>Error!!!</h4>}
                            {!loading && !error && (
                                <tbody>
                                    {genre?.map((genre, i) => (
                                        <tr>
                                            <th scope="row">{i}</th>
                                            <td>{genre.name}</td>
                                            <td>
                                                <button
                                                    className="btn btn-outline-danger"
                                                    onClick={(e) => handleDelete(e, genre._id)}
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
                        <Form
                            name="dynamic_form_nest_item"
                            onFinish={onFinish}
                            style={{
                                maxWidth: 600,
                            }}
                            autoComplete="off"
                        >
                            <Form.List name="genres">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Space
                                                key={key}
                                                style={{
                                                    display: 'flex',
                                                    marginBottom: 8,
                                                }}
                                                align="baseline"
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'name']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Missing genres',
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="Add genre" />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                Add genre
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AddBook;
