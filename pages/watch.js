import Link from "next/link";
import React, { useState, useEffect } from "react";
import '../styles/post.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Image from "next/image";
import { ClimbingBoxLoader } from "react-spinners";


export default function Watch() {
    const [inputText, setInputText] = useState(' ');
    const [data, setData] = useState({ results: [] });
    const [animeData, setAnimeData] = useState('');
    const [id, setId] = useState('');


    const handleSearch = async (event) => {
        const textValue = event.target.value;
        setInputText(textValue);
    }

    useEffect(() => {
        console.log(inputText);
        fetch(`https://consumet-api-rust.vercel.app/anime/zoro/${inputText}?page=1`)
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData);
                setId(data.results[0].id);
                console.log(id);
                // console.log(jsonData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });


        // Fetching anime info
        fetch(`https://consumet-api-rust.vercel.app/anime/zoro/info?id=${id}`)
            .then((response) => response.json())
            .then((animeData) => {
                setAnimeData(animeData);
                console.log(animeData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

    }, [data.results, id, inputText])

    const style = {
        width: '300px',
    }

    return (
        <div data-bs-theme="dark">
            <h1>
                Watch
            </h1>
            <h4>
                <input id="search" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={inputText} onChange={handleSearch} style={{ width: '100%' }} />
            </h4>
            <div className="row" >
                {Array.isArray(data.results) && data.results.length > 0 ? (
                    data.results.map((item) => (
                        <div key={item.id} className="col-lg-4 col-md-6 col-sm-12">
                            <div className="card" style={style}>
                                <img src={item.image} className="card-img-top" alt={item.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    {/* <p className="card-text">{animeData.description}</p> */}
                                    <a href={`/watch/${item.id}`} className="btn btn-primary">Go To Anime</a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : <ClimbingBoxLoader color="white" style={{
                    position: "absolute",
                    top: '12em',
                    left: '30em',
                    fontSize: '23px'
                }
                } />
                }
            </div>

        </div >
    )
}

// {Array.isArray(data.results) && data.results.length > 0 ? (
//     data.results.map((item) => (
//         <tr key={item.id}>
//             <td><Link href={`/watch/${item.id}`}>{item.title}</Link></td>
//             <td>
//                 <Image className="anime-img" src={item.image} alt={item.title} width={300} height={300} />
//                 <a href={item.url}>Link</a>
//             </td>
//         </tr>
//     ))
// ) : (
//     <tr>
//         <td colSpan="3">No data available.</td>
//     </tr>
// )}



