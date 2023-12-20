import { useRouter } from "next/router"
import 'bootstrap/dist/css/bootstrap.css';
import { useRef, useEffect, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import React from "react";
import AnimeInfo from "../../components/AnimeInfo";
import styles from '../../styles/anime.module.css'
import Player from "../../components/Player";




export default function Episode() {
    const router = useRouter();
    const { id } = router.query;
    const [episode, setEpisode] = useState(null);
    const [episodeId, setEpisodeId] = useState(null);
    const [link, setLink] = useState(null);
    const [subtitles, setSubtitles] = useState([]);
    const [subTitleTracks, setSubtitleTracks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

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
                console.log(subTitleTracks)
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

    const episodesPerPage = 50;
    const indexOfFirstEpisode = currentPage * episodesPerPage;
    const indexOfLastEpisode = indexOfFirstEpisode - episodesPerPage;

    const currentEpisodes = episode.episodes.slice(indexOfLastEpisode, indexOfFirstEpisode);

    return (
        <div>
            <div className={styles.anime_wrapper}>
                <AnimeInfo title={episode.title} description={episode.description} image={episode.image} />
                <Player className={styles.video} subTitleTracks={subTitleTracks} link={link} subtitles={subtitles} />
            </div>
            <div>
                <br />
                <br />
                <div >
                    <div className={styles.episode_wrapper}>
                        {currentEpisodes.map((episodeData, index) => (
                            <React.Fragment key={episodeData.id}>
                                <button type="button" className={styles.episode_btn} onClick={() => handleId(episodeData.id)}>
                                    {episodeData.number}
                                </button>
                            </React.Fragment>
                        ))}
                    </div>
                    <div className={styles.nav_btn}>
                        <button
                            className={styles.episode_btn}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            className={styles.episode_btn}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === Math.ceil(episode.episodes.length / episodesPerPage)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}