import React from 'react';
import ReactPlayer from 'react-player';

const Player = ({ subTitleTracks, subtitles, link }) => {
    return (
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
    );
};

export default Player;
