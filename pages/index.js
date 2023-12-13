import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Home = (props) => {
    return (
        <Container className="mt-5">
            <header className="text-center">
                <h1>Welcome to Anime Robot</h1>
                <p className="lead">Your Ultimate Destination for Anime and Technology</p>
            </header>


            <section className="my-5">
                <Row>
                    <Col>
                        <h2>About Us</h2>
                        <p>
                            Anime Robot is more than just a website; it&apos;s a fusion of captivating
                            anime stories and cutting-edge technology. As a software engineer, I
                            built this platform from the ground up using React, Node.js, and
                            Bootstrap CSS to provide you with a seamless and immersive
                            experience.
                        </p>
                    </Col>
                </Row>
            </section>

            <section className="mb-5">
                <Row>
                    <Col md={6}>
                        <h3>Curated Anime Archives</h3>
                        <p>
                            Immerse yourself in a collection of the finest anime series and
                            movies that explore the wonders of robotics and technology.
                        </p>
                    </Col>
                    <Col md={6}>
                        <h3>Tech Hub</h3>
                        <p>
                            Stay updated with the latest advancements in technology, inspired by
                            the futuristic concepts showcased in anime. Discover how
                            real-world innovation mirrors the imaginative worlds of your
                            favorite shows.
                        </p>
                    </Col>
                </Row>
            </section>

            <section className="text-center my-5">
                <p>Ready to embark on this exciting journey?</p>
                <Button variant="primary">Explore Now</Button>
            </section>

            <footer className="text-center mt-5">
                <p>Follow us on social media: Twitter | Instagram | Facebook</p>
            </footer>
        </Container>
    );
};

export default Home;
