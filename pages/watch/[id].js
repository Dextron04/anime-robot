import { useRouter } from "next/router"
import 'bootstrap/dist/css/bootstrap.css';
import { useRef, useEffect, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import ReactPlayer from "react-player";




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
        return <ClimbingBoxLoader color="white" style={{
            position: "absolute",
            top: '12em',
            left: '30em',
            fontSize: '23px'
        }} />;
    }

    const handleId = (id) => {
        setEpisodeId(id);
        console.log(episodeId);
    };

    return (
        <div>
            <h1>{episode.title}</h1>
            <img src={episode.image} alt={episode.title} />
            <div>
                <div style={{
                    position: "absolute",
                    left: "30rem",
                    bottom: "14rem",
                }}>
                    {subtitles && link && (
                        <ReactPlayer
                            url={link}
                            controls
                            config={{
                                file: {
                                    attributes: {
                                        crossOrigin: "",
                                    },
                                    tracks: subTitleTracks,
                                },
                            }}
                        />
                    )}
                </div>
                {episode.episodes.map((episodeData) => (
                    <div key={episodeData.id} className="container text-center">
                        <div className="row row-cols-auto">
                            {/* <div className="col">{episodeData.number}</div> */}
                            <button className="col" onClick={() => handleId(episodeData.id)}>{episodeData.number}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}