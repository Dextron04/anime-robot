import { useRouter } from "next/router"
import 'bootstrap/dist/css/bootstrap.css';
import { useRef, useEffect, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import ReactPlayer from "react-player";
import { Image } from "react-bootstrap";
import React from "react";
import AnimeInfo from "../../components/AnimeInfo";
import styles from '../../styles/anime.module.css'
import { Button } from "@mui/material";
import { style } from "@mui/system";




export default function Episode() {
    const router = useRouter();
    const { id } = router.query;
    const [episode, setEpisode] = useState(null);
    const [episodeId, setEpisodeId] = useState(null);
    const [link, setLink] = useState(null);
    const [subtitles, setSubtitles] = useState([]);
    const [subTitleTracks, setSubtitleTracks] = useState([]);

    useEffect(() => {
        // Fetch episode data based on the ID
        async function fetchEpisodeData() {
            try {
                const response = await fetch(`https://consumet-api-rust.vercel.app/anime/zoro/info?id=${id}`); // Replace with your API endpoint
                const data = await response.json();
                setEpisode(data); // Update the episode state with the fetched data

                const linkResponse = await fetch(`https://consumet-api-rust.vercel.app/anime/zoro/watch?episodeId=${episodeId}&server=vidstreaming`);
                console.log(episodeId);
                const linkData = await linkResponse.json();
                setLink(linkData.sources[0].url);
                setSubtitles(linkData.subtitles[0].url);
                setSubtitleTracks(
                    linkData.subtitles.map(subtitle => ({
                        kind: 'subtitles',
                        src: subtitle.url,
                        srcLang: subtitle.lang,
                        default: false,
                    }))
                );
            } catch (error) {
                console.error('Error fetching episode data:', error);
            }
        }

        if (id) {
            fetchEpisodeData(); // Fetch data when the ID is available
        }
    }, [episodeId, id, link, subtitles]);

    if (!episode) {
        // Handle the case when episode is null (not fetched yet)
        return <ClimbingBoxLoader className={styles.loader} color="white" />;
    }

    const handleId = (id) => {
        setEpisodeId(id);
        console.log(episodeId);
    };

    const buttonsPerRow = 9;

    return (
        <div>
            <div className={styles.anime_wrapper}>
                <AnimeInfo title={episode.title} description={episode.description} image={episode.image} />
                <div >
                    {subtitles && link && (
                        <ReactPlayer
                            width='100%'
                            height='100%'
                            url={link}
                            playing={true}
                            muted={true}
                            loop={true}
                            controls
                            config={{
                                file: {
                                    // attributes: {
                                    //     crossOrigin: "",
                                    // },
                                    tracks: subTitleTracks,
                                },
                            }}
                        />
                    )}
                </div>
            </div>
            <div>
                <br />
                <br />
                <div >
                    <div className={styles.episode_wrapper}>
                        {episode.episodes.map((episodeData, index) => (
                            <React.Fragment key={episodeData.id}>
                                {/* {(index > 0 && index % buttonsPerRow === 0) && <div className="w-100"></div>} */}
                                <button type="button" className="btn btn-light" onClick={() => handleId(episodeData.id)}>
                                    {episodeData.number}
                                </button>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}