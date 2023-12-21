import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router"
import styles from '../styles/index.module.css'


const NavBar = () => {

    const [inputValue, setInputValue] = useState('');

    const router = useRouter();
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle');
    }, []);

    const handleSearch = (event) => {
        setInputValue(event.target.value);
    }

    const handleButtonClick = () => {
        event.preventDefault();
        router.push(`/watch?search=${inputValue}`);
    }

    const handleBuyMeACoffeeClick = () => {
        window.open('https://www.buymeacoffee.com/dextron', '_blank');
    };


    return (
        <div style={{ backgroundColor: 'transparent' }}>
            <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary" style={{ borderRadius: '10px', margin: '20px', backgroundAttachment: 'none' }}>
                <div className="container-fluid">
                    <a>Anime Robot 🤖</a>
                    {/* NavBar collapse toggle button */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={router.pathname == "/" ? "nav-link active" : "nav-link"} href="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={router.pathname == "/about" ? "nav-link active" : "nav-link"} href="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={router.pathname == "/watch" ? "nav-link active" : "nav-link"} href="/watch">Watch</Link>
                            </li>
                            <li>
                                <button className={styles.logo} onClick={handleBuyMeACoffeeClick}>
                                    <Image alt='svg' src='/bmc-full-logo.svg' width={100} height={25} />
                                </button>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={inputValue} onChange={handleSearch} />
                            <button className="btn btn-outline-success" type="submit" onClick={handleButtonClick} >Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
};


export default NavBar;
