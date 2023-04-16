import Link from "next/link";

export default function Error() {
    return (
        <>
            <Link href={"/Todos"}>Error, redirect to Todos</Link>
        </>
    )
}