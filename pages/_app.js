import "../styles/global.css"
import { useRouter } from "next/router"
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import './watch';
import NavBar from "../components/NavBar";



export default function App({ Component, pageProps }) {
    useEffect(() => { // Add this line
        document.body.setAttribute('data-bs-theme', 'dark');
    }, []); // Add this line

    return (
        <>
            <NavBar />
            <Component {...pageProps} />
            <footer style={{
                position: 'relative',
                textAlign: 'center',
                bottom: 0,
            }}>Tushin Kulshreshtha © 2023</footer>
        </>
    )
}