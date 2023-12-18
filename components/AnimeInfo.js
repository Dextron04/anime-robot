import React from 'react';
import Image from 'next/image';
import styles from '../styles/anime.module.css'


const AnimeInfo = ({ title, image, description }) => {
    return (
        <div>
            <h1>{title}</h1>
            <div className={styles.wrapper}>
                <Image className={styles.image} src={image} alt={title} width={200} height={300} />
                <p>{description}</p>
            </div>
        </div>
    );
};

export default AnimeInfo;
