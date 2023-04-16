import TodoList from "@/components/TodoList";
import { UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import Link from "next/link";


export default function Todos() {
    return (
        <>
        <div className="container">
            <SignedIn>
                <h1>Todos List</h1>
                <TodoList done={false}></TodoList>
                <UserButton />
            </SignedIn>
        </div>

        <SignedOut>
            <Link href={"/"}>Redirect to Sign In</Link>
        </SignedOut>
        </> 
    )
}