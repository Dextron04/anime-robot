import "../styles/global.css"
// import 'bootstrap/dist/css/bootstrap.css'
import './index';
import NavBar from "../components/NavBar";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';



export default function App({ Component, pageProps }) {

    return (
        <>
            <NavBar />
            <Component {...pageProps} />
            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'black' }}>
                <footer style={{
                    position: 'relative',
                    textAlign: 'center',
                    color: 'white',
                }}>Tushin Kulshreshtha © 2024</footer>
            </div>
            <SpeedInsights />
            <Analytics />
        </>
    )
}