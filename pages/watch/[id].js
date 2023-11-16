import { useRouter } from "next/router"
import 'bootstrap/dist/css/bootstrap.css';
import { useRef, useEffect, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import ReactPlayer from "react-player";
import { TheosPlayer } from "@aka_theos/react-hls-player";




export default function Episode() {
    const router = useRouter();
    const { id } = router.query;
    const [episode, setEpisode] = useState(null);
    const [episodeId, setEpisodeId] = useState(null);
    const [link, setLink] = useState(null);

    // const play = {
    //     fill: true,
    //     fluid: true,
    //     autoplay: true,
    //     controls: true,
    //     preload: "metadata",
    //     sources: [
    //         {
    //             src:
    //                 anime,
    //             type: "application/x-mpegURL"
    //         }
    //     ]
    // };

    useEffect(() => {
        // Fetch episode data based on the ID
        async function fetchEpisodeData() {
            try {
                const response = await fetch(`https://api.consumet.org/anime/zoro/info?id=${id}`); // Replace with your API endpoint
                const data = await response.json();
                setEpisode(data); // Update the episode state with the fetched data


                const linkResponse = await fetch(`https://consumet-api-rust.vercel.app/anime/zoro/watch?episodeId=${episodeId}&server=vidstreaming`);
                console.log(episodeId);
                const linkData = await linkResponse.json();
                setLink(linkData.sources[0].url);
                console.log(linkData);
                console.log(link);
            } catch (error) {
                console.error('Error fetching episode data:', error);
            }
        }

        if (id) {
            fetchEpisodeData(); // Fetch data when the ID is available
        }
    }, [episodeId, id, link]);


    if (!episode) {
        // Handle the case when episode is null (not fetched yet)
        return <ClimbingBoxLoader color="white" style={{
            position: "absolute",
            top: '12em',
            left: '30em',
            fontSize: '23px'
        }
        } />
    }

    const handleId = (id) => {
        setEpisodeId(id);
        console.log(episodeId);
    }

    return (
        <div>
            <h1>{episode.title}</h1>
            <img src={episode.image} alt={episode.title} />
            <div style={{
                position: 'relative',
                left: '18em',
                top: '-20em'
            }}>
                {episode.episodes.map((episodeData) => (
                    <div key={episodeData.id} className="container text-center">
                        <div className="row row-cols-auto">
                            <div className="col">{episodeData.number}</div>
                            <button className="col" onClick={() => handleId(episodeData.id)}>{episodeData.id}</button>
                        </div>
                    </div>
                ))}
            </div>
            {link && <TheosPlayer src={link} autoPlay={false} />}
            {/* <Video {...play} /> */}
        </div>
    );
}
const Video = (props) => {
    const videoNode = useRef(null);
    const [player, setPlayer] = useState(null);
    useEffect(() => {
        if (videoNode.current) {
            const _player = videojs(videoNode.current, props);
            setPlayer(_player);
            return () => {
                if (player !== null) {
                    player.dispose();
                }
            };
        }
    }, []);

    return (
        <div data-vjs-player>
            <video ref={videoNode} className="video-js"></video>
        </div>
    );
};

// {episode.episodes.map((episodeData) => (
//     <tr key={episodeData.id}>
//         <td>{episodeData.number}</td>
//         <td>
//             <a href={episodeData.url}>Watch</a>
//         </td>
//     </tr>
// ))}