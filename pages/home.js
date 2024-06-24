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
        </div>
    );
};



export default Home;
