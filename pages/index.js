import Link from "next/link";
import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { ClimbingBoxLoader } from "react-spinners";
import Card from "../components/Card";
import styles from '../styles/post.module.css'
import { searchAnime, getTopAiring } from "../api/api";
import Carousel from "../components/Carousel";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default function Watch() {
    const [inputText, setInputText] = useState('');
    const [data, setData] = useState({ results: [] });
    const [animeData, setAnimeData] = useState('');
    const [id, setId] = useState('');
    const [airData, setAirData] = useState("");

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


    const router = useRouter();

    // The searched key word is sent here
    const { search } = router.query;

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
                    const searchData = await searchAnime(inputText);
                    setData(searchData);
                    setId(searchData.results[0].id);
                    // console.log(searchData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            } else {
                const airData = await getTopAiring();
                setData(airData);
            }
        };

        fetchData();
    }, [inputText]);



    // useEffect(() => {


    //     // Fetching anime info
    //     fetch(`https://dex-consumet-api.vercel.app/anime/gogoanime/top-airing`)
    //         .then((response) => response.json())
    //         .then((animeData) => {
    //             setAnimeData(animeData);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data:', error);
    //         });

    // }, [data.results, id, inputText])




    return (
        <div className={styles.body}>
            <div className={styles.container}>
                {Array.isArray(data.results) && data.results.length > 0 ? (
                    data.results.map((item) => (
                        <div key={item.id} >
                            <Card title={item.title} imageSrc={item.image} id={item.id} hover />
                        </div>
                    ))
                ) : <div className={styles.loader_wrapper}>
                    <ClimbingBoxLoader color="white" size={20} />
                </div>
                }
            </div>
        </div>
    )
}

{/* <Swiper
                spaceBetween={20} // Adjust space between slides
                slidesPerView={2} // Adjust number of slides visible at once
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {Array.isArray(airData.results) && airData.results.length > 0 ? (
                    airData.results.map((item) => (
                        <SwiperSlide key={item.title}>
                            <div className={styles.cropped_image}>
                                <Image src={item.image} alt={item.title} width={800} height={500} priority />
                            </div>
                        </SwiperSlide>
                    ))
                ) : <div>LOL Emptiness</div>}
            </Swiper> */}





