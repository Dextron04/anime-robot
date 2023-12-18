import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router"


const NavBar = () => {
    const router = useRouter();
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle');
    }, []);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                {/* <Image alt='svg' src={'https://drive.google.com/file/d/1DyRirqxahQTQbbfTvxZNIs4Vp2oCYa84/view?usp=sharing'} width={100} height={100} /> */}
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
                    </ul>
                    <form className="d-flex" role="search">
                        <input disabled className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button disabled className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
