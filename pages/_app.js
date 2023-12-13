import "../styles/global.css"
import Link from "next/link"
import { useRouter } from "next/router"
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import './watch';



export default function App({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        document.body.setAttribute('data-bs-theme', 'dark');
    }, []);

    return (
        <>
            <div data-bs-theme="dark">
                <h1>
                    Anime Robot 🤖
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">Anime</a>
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
                                    <li className="nav-item" >
                                        <Link className={router.pathname == "/watch" ? "nav-link active" : "nav-link"} href="/watch">Watch</Link>
                                    </li>
                                </ul>
                                {/* <form className="d-flex" role="search">
                                    <input disabled className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button disabled className="btn btn-outline-success" type="submit">Search</button>
                                </form> */}
                            </div>
                        </div>
                    </nav>
                </h1>
                <SpeedInsights />
            </div>
            <Component {...pageProps} />
            <footer style={{
                position: 'relative',
                textAlign: 'center'
            }}>Tushin Kulshreshtha © 2023</footer>
        </>
    )
}