import Link from "next/link"

export default function Home(){
    return (
        <>
            <h1>Home</h1>
            <Link href="/about"> Go to the about page</Link>
        </>
    )
}