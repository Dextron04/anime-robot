import React from 'react';
import ReactPlayer from 'react-player';

const Player = ({ subTitleTracks, subtitles, link, subtitle }) => {
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
                            attributes: {
                                crossOrigin: 'true',
                            },
                            tracks:
                                subTitleTracks.map((tracks) => ({
                                    kind: 'subtitles',
                                    src: tracks.src,
                                    srcLang: tracks.srcLang,
                                    default: tracks.default,

                                }))
                        },
                    }}
                />
            )}
        </div>
    );
};

export default Player;
