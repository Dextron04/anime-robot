import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Image from 'next/image';
import styles from '../styles/index.module.css'


const Home = (props) => {
    return (
        <div>
            <div className={styles.img_wrapper}>
                <Image className={styles.logo} alt='svg' src='/logo.svg' width={400} height={400} />
            </div>
            <div className={styles.update}>
                <p className={styles.text}>
                    Updates:<br />
                    {/* - Updated design<br /> */}
                    - FIXED: Subtitles not showing up<br />
                    {/* - Updated specific anime pages<br /> */}
                    Recommendations:<br />
                    - Use on a smartphone for better experience<br />
                </p>
            </div>
        </div>
    );
};

export default Home;
