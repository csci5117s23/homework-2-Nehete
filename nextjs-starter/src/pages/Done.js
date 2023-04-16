import TodoList from "@/components/TodoList";
import { UserButton, SignedIn, SignedOut,  } from "@clerk/clerk-react";
import Link from "next/link";


export default function Done() {
    return (
        <>
        <div className="container">
            <SignedIn>
                <TodoList done={true}></TodoList>
                <UserButton />
            </SignedIn>`
        </div>
        
        <SignedOut>
            <Link href={"/"}>Redirect to Sign In</Link>
        </SignedOut>
        </>
    )
}