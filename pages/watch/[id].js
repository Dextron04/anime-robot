import Link from "next/link"
import { useRouter } from "next/router"
import 'bootstrap/dist/css/bootstrap.css';
import { use, useEffect, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";


export default function Episode() {
    const router = useRouter();
    const { id } = router.query;
    const [episode, setEpisode] = useState(null);
    const [link, setLink] = useState(null);

    useEffect(() => {
        // Fetch episode data based on the ID
        async function fetchEpisodeData() {
            try {
                const response = await fetch(`https://api.consumet.org/anime/zoro/info?id=${id}`); // Replace with your API endpoint
                const data = await response.json();
                setEpisode(data); // Update the episode state with the fetched data


                const linkResponse = await fetch(`https://api.consumet.org/anime/zoro/watch/${id}?server=vidcloud`);
                const linkData = await linkResponse.json();
                setLink(linkData);
                console.log("success!")
                // console.log(data);
                console.log(linkData);
            } catch (error) {
                console.error('Error fetching episode data:', error);
            }
        }

        if (id) {
            fetchEpisodeData(); // Fetch data when the ID is available
        }
    }, [id]);

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
                    <div key={episode.id} className="container text-center">
                        <div className="row row-cols-auto">
                            <div className="col">{episodeData.number}</div>
                            <div className="col">{episodeData.id}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// {episode.episodes.map((episodeData) => (
//     <tr key={episodeData.id}>
//         <td>{episodeData.number}</td>
//         <td>
//             <a href={episodeData.url}>Watch</a>
//         </td>
//     </tr>
// ))}