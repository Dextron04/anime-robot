import React from 'react';
import Image from 'next/image';
import styles from '../styles/anime.module.css'


const AnimeInfo = ({ title, image, description }) => {
    return (
        <div>
            <div className={styles.wrapper}>
                <Image className={styles.image} src={image} alt={title} width={200} height={300} />
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    );
};

export default AnimeInfo;
