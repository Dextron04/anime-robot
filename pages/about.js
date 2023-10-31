import Link from "next/link"

export default function About(){
    return (
        <>
            <h1>This is the about content</h1>
            <Link href="/"> Go back to the home page</Link>
        </>
    )
}