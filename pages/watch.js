import Link from "next/link";
import React, { useState, useEffect } from "react";
import '../styles/post.module.css';

export default function Watch() {
    const [inputText, setInputText] = useState('');
    const [data, setData] = useState({ results: [] });


    const handleSearch = async (event) => {
        const textValue = event.target.value;
        setInputText(textValue);
    }

    useEffect(() => {
        console.log(inputText);
        fetch(`https://api.consumet.org/anime/zoro/${inputText}?page=1`)
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData);
                console.log(jsonData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

    }, [inputText])



    return (
        <div>
            <h1>
                Watch
            </h1>
            <h3>
                <input placeholder="Enter Something" value={inputText} onChange={handleSearch} type="text" />
            </h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data.results) && data.results.length > 0 ? (
                        data.results.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>
                                    <img className="anime-img" src={item.image} alt={item.title} />
                                    <a href={item.url}>Link</a>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No data available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div >
    )
}



