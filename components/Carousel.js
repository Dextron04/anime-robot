import React, { useEffect, useState } from 'react';
import { getTopAiring } from "../api/api";
import 'bootstrap/dist/css/bootstrap.css';
import { ClimbingBoxLoader } from "react-spinners";
import Image from "next/image";


const Carousel = ({ title, imageSrc, link, id, description }) => {
    // Add your carousel logic here
    const [animeData, setAnimeData] = useState("");

    useEffect(() => {
        const getTop = async () => {
            try {
                const topAiring = await getTopAiring();
                console.log(topAiring);
                setAnimeData(topAiring);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getTop();
    }, [])

    return (
        <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                {Array.isArray(animeData.results) && animeData.results.length > 0 ?
                    (animeData.results.map((item) => {
                        console.log(item.image);
                        return (
                            <div key={item.title} class="carousel-item">
                                <Image src={item.image} alt={item.title} width={1000} height={500} priority />
                            </div>
                        );
                    })
                    ) : <div>
                    </div>
                }
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Carousel;