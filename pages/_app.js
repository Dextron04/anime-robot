import "../styles/global.css"
import Link from "next/link"
import { useRouter } from "next/router"
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from "react";


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
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav" id="navbarNav" style={{ fontSize: '25px' }}>
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
                        </div>
                    </nav>
                </h1>
            </div>
            <Component {...pageProps} />
            <footer style={{
                position: 'relative',
                textAlign: 'center'
            }}>Tushin Kulshreshtha © 2023</footer>
        </>
    )
}