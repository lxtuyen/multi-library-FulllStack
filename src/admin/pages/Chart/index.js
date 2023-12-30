import axios from "axios";
import { BASE_URL } from "hooks/config";
import { useEffect } from "react";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { toast } from 'react-toastify';
import {
    Chart as ChartJS,
} from 'chart.js/auto'

function Chart() {
    const [obj, setObj] = useState([]);
    const option = { year: 'numeric' };
    useEffect(() => {
        const getAllBooks = async () => {
            try {
                const url = `${BASE_URL}/books?page=1`;
                const { data } = await axios.get(url);
                setObj(data?.books);

            } catch (err) {
                toast.error(err.message)
            }
        };
        getAllBooks();
    }, []);


    const [books, setBooks] = useState({
        labels: [],
        datasets: [
            {
                label: "",
                data: ''
            }
        ]
    })

    const arrDate = obj?.map((book) => new Date(book.publishedIn).toLocaleDateString('en-US', option))
    console.log(arrDate);
    const countOccurrences = (arrDate) => {
        const occurrences = {};
        for (const item of arrDate) {
            occurrences[item] = (occurrences[item] || 0) + 1;
        }
        return occurrences;
    };
    const results = countOccurrences(arrDate);

    const keys = [];
    const values = [];

    for (const [key, value] of Object.entries(results)) {
        keys.push(key);
        values.push(value);
    }

    console.log(keys); // ['2023', '2021', '2022']
    console.log(values); // [1, 1, 2]
    useEffect(() => {
        setBooks(
            {
                labels: keys.map((result) => result),
                datasets: [
                    {
                        label: "Number of books",
                        data: values.map((value) => value),
                    }
                ]
            }
        )
    }, [obj])
    return (
        <>
            <Bar data={books} />
        </>
    )
}

export default Chart;