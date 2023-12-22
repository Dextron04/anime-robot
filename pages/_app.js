import "../styles/global.css"
// import 'bootstrap/dist/css/bootstrap.css'
import './watch';
import NavBar from "../components/NavBar";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';



export default function App({ Component, pageProps }) {
    // useEffect(() => { // Add this line
    //     document.body.setAttribute('data-bs-theme', 'dark');
    // }, []); // Add this line

    return (
        <>
            <NavBar />
            <Component {...pageProps} />
            <footer style={{
                position: 'relative',
                textAlign: 'center',
                bottom: 0,
            }}>Tushin Kulshreshtha © 2023</footer>
            <SpeedInsights />
            <Analytics />

        </>
    )
}