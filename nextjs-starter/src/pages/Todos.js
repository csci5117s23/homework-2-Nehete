import TodoList from "@/components/TodoList";
import { UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import Link from "next/link";


export default function Todos() {
    return (
        <>
        <SignedIn>
            <TodoList done={false}></TodoList>
            <UserButton />
        </SignedIn>

        <SignedOut>
            <Link href={"/"}>Redirect to Sign In</Link>
        </SignedOut>
        </>
    )
}