

import React from 'react';
import { Select, Space } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from 'hooks/config';
import { options } from '@fullcalendar/core/preact';

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
function MultiChoice() {
  const [obj, setObj] = useState([]);
  const [error, setError] = useState(null);
  
  
  useEffect(() => {
    const getAllBooks = async () => {
      try {
        const url = `${BASE_URL}/books`;
        const { data } = await axios.get(url);
        setObj(data.genres);
      } catch (err) {
        setError(err.message);
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
  console.log(options);
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