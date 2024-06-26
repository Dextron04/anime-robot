import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { ClimbingBoxLoader } from "react-spinners";
import Card from "../components/Card";
import styles from '../styles/post.module.css'
import { searchAnime, getTopAiring } from "../api/api";


export default function Watch() {
    const [inputText, setInputText] = useState('');
    const [data, setData] = useState({ results: [] });
    const [animeData, setAnimeData] = useState('');
    const [id, setId] = useState('');
    const [airData, setAirData] = useState("");
    const [page, setPage] = useState(1);
    const router = useRouter();

    // The searched key word is sent here
    const { search } = router.query;

    useEffect(() => {
        const getTop = async () => {
            try {
                const topAiring = await getTopAiring();
                console.log(topAiring);
                setAirData(topAiring);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getTop();
    }, [])

    // The value gets added to the variable for further use.
    useEffect(() => {
        setInputText(search);
    }, [search]);


    // if the user doesn't search for a specific text then it will show the
    // top airing anime based on gogoanime.
    useEffect(() => {
        const fetchData = async () => {
            if (inputText) {
                try {
                    const searchData = await searchAnime(inputText, page);
                    setData(searchData);
                    setId(searchData.results[0].id);
                    console.log(searchData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            } else {
                const airData = await getTopAiring();
                setData(airData);
            }
        };

        fetchData();
    }, [inputText, page]);

    const handleNextPage = () => {
        setPage(page => page + 1);
    };

    const handlePreviousPage = () => {
        if (page == 1) {
            return;
        } else {
            setPage(page => page - 1);
        }
    };


    return (
        <div className={styles.body}>
            <div className={styles.container}>
                {Array.isArray(data.results) && data.results.length > 0 ? (
                    data.results.map((item) => (
                        <div key={item.id} >
                            <Card title={item.title} imageSrc={item.image} id={item.id} hover />
                        </div>
                    ))
                ) : <div>
                    <div style={{ color: 'white' }}>
                        <div > -LOL Emptiness</div>
                        <div>- Just hit previous if nothing is coming up</div>
                    </div>
                    <div className={styles.loader_wrapper}>
                        <ClimbingBoxLoader color="white" size={20} />
                    </div>
                </div>
                }
            </div>
            <div className={styles.btn_container}>
                <button onClick={handleNextPage} className={styles.btn}>Next</button>
                <button onClick={handlePreviousPage} className={styles.btn}>Previous</button>
            </div>
        </div>
    )
}





