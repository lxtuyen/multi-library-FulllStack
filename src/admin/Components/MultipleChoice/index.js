import React from 'react';
import { Select, Space } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { options } from '@fullcalendar/core/preact';
import { toast } from 'react-toastify';

import { BASE_URL } from 'hooks/config';

function MultiChoice({ setGenre }) {
    const [obj, setObj] = useState([]);

    const handleChange = (value) => {
        setGenre(value);
    };
    useEffect(() => {
        const getAllBooks = async () => {
            try {
                const url = `${BASE_URL}/books`;
                const { data } = await axios.get(url);
                setObj(data.genres);
            } catch (err) {
                toast.error(err.message);
            }
        };
        getAllBooks();
    }, []);
    const options = [];
    obj.forEach((value) => {
        options.push({
            label: `${value}`,
            value: `${value}`,
        });
    });
    return (
        <Space
            style={{
                width: '100%',
            }}
            direction="vertical"
        >
            <Select
                mode="multiple"
                allowClear
                style={{
                    width: '100%',
                }}
                placeholder="Please select"
                onChange={handleChange}
                options={options}
            />
        </Space>
    );
}
export default MultiChoice;
