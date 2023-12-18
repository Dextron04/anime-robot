import React from "react";
import Image from "next/image";
import styles from '../styles/card.module.css'

const Card = ({ title, imageSrc, link, id, description }) => {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    {console.log(imageSrc)}
                    <Image alt={title} src={imageSrc} className={styles.banner_image} width={200} height={350} />
                    <h1 className={styles.h1}>{title}</h1>
                    <p className={styles.p}>{description}</p>
                </div>
                <div className={styles.button_wrapper}>
                    {/* <button className={`${styles.btn} ${styles.outline}`}>DETAILS</button> */}
                    <a href={`/watch/${id}`} className={`${styles.btn} ${styles.fill}`}>GO TO ANIME</a>
                </div>
            </div>
        </div>
    );
}

export default Card;
