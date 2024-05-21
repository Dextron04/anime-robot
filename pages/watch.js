import Link from "next/link";
import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { ClimbingBoxLoader } from "react-spinners";
import Card from "../components/Card";
import styles from '../styles/post.module.css'


export default function Watch() {
    const [inputText, setInputText] = useState('');
    const [data, setData] = useState({ results: [] });
    const [animeData, setAnimeData] = useState('');
    const [id, setId] = useState('');


    const router = useRouter();
    const { search } = router.query;

    useEffect(() => {
        setInputText(search);
    }, [search]);


    // const handleSearch = async (event) => {
    //     const textValue = event.target.value;
    //     setInputText(textValue);
    // }

    useEffect(() => {
        fetch(`https://dex-consumet-api.vercel.app/anime/zoro/${inputText}?page=1`)
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData);
                setId(data.results[0].id);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });


        // Fetching anime info
        fetch(`https://dex-consumet-api.vercel.app/anime/zoro/info?id=${id}`)
            .then((response) => response.json())
            .then((animeData) => {
                setAnimeData(animeData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

    }, [data.results, id, inputText])




    return (
        <div className={styles.body}>
            <h1 className={styles.title}>
                Watch
            </h1>
            <div className={styles.search_bar} placeholder="Search">
                {/* <input id="search" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={inputText} onChange={handleSearch} style={{ width: '100%' }} /> */}
            </div>
            <div className={styles.container}>
                {Array.isArray(data.results) && data.results.length > 0 ? (
                    data.results.map((item) => (
                        <div key={item.id} >
                            <Card title={item.title} imageSrc={item.image} id={item.id} />

                        </div>
                    ))
                ) : <ClimbingBoxLoader color="white" style={{
                    position: "relative",
                    top: '8em',
                    left: '0em',
                    fontSize: '23px',
                }
                } />
                }
            </div>
        </div>
    )
}





