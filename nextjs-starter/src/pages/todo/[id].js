import TodoObject from "@/components/TodoObject";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import { getTodo, deleteTodo } from "@/modules/Data";
import { UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import Link from "next/link";

export default function todoPage() {
    const router = useRouter();
    const { id } = router.query;
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [todo, setTodo] = useState([]);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getLinkedTodo() {
            if (userId) { // check if 1) logged in, and 2) auth is loaded properly in the first place
                const token = await getToken({ template: "codehooks" });
                const linkedTodo = await getTodo(token, id);

                // const results = await deleteTodo(token, id);
                // console.log(results);

                console.log(linkedTodo[0])
                // console.log(linkedTodo[0].title)

                setTodo(linkedTodo[0]);
                setTitle(linkedTodo[0].title);
                setLoading(false);
            }
        }
        getLinkedTodo();
    }, [isLoaded]);

    if (loading) {
        return <span> loading... </span>
    }
    return (<>
        <SignedIn>
            <li><TodoObject title={title} done={todo.done} id={todo._id} canEdit={true}></TodoObject></li> <UserButton /> 
        </SignedIn>

        <SignedOut>
            <Link href={"/"}>Redirect to Sign In</Link>
        </SignedOut>
    </>)
}