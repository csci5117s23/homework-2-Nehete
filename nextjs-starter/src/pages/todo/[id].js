import TodoObject from "@/components/TodoObject";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import { getTodo } from "@/modules/Data";

export default function todoPage() {
    const router = useRouter();
    const { id } = router.query;
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [todo, setTodo] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        async function getLinkedTodo() {
            if (userId) { // check if 1) logged in, and 2) auth is loaded properly in the first place
                const token = await getToken({ template: "codehooks" });
                const linkedTodo = await getTodo(token, id);
                
                console.log(linkedTodo)
                console.log(linkedTodo[0].title)

                setTodo(linkedTodo);
                setTitle(linkedTodo[0].title)
            }
        }
        getLinkedTodo();
    }, [isLoaded]);

    return (<><li><TodoObject title={title} done={todo.done}></TodoObject></li></>)
}