import { getTodos, addTodo, updateTodo } from "@/modules/Data";
import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function TodoObject({title, done, id, canEdit}) {
    const [doneBool, setDone] = useState(done);
    const [titleText, setTitle] = useState(title);
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    async function updateDone() {
        const token = await getToken({ template: "codehooks" });
        const newTodo = await updateTodo(token, id, titleText, !doneBool);
        setDone(!doneBool);

        console.log(newTodo);
    }

    async function updateTitle() {
        const token = await getToken({ template: "codehooks" });
        const newTodo = await updateTodo(token, id, titleText, doneBool);
        // setTitle(newTitle);
    }

    if (canEdit) {
        return (
        <>
            <label>
                <span className="todo-title">{titleText}</span>
                <input type="checkbox" className="todo-checkbox" defaultChecked={doneBool} onChange={updateDone}/>
            </label>
            <br></br>
            <input
                placeholder="Edit Todo"
                onChange={(e) => setTitle(e.target.value)}
            ></input>
            <button onClick={updateTitle}>Update Todo</button>
        </>
        )
    }
    return (
        <>
            <label>
                {/* <span className="todo-title">{title}</span> */}
                <Link href={"/todo/_id=" + id}> {titleText} </Link>
                <input type="checkbox" className="todo-checkbox" defaultChecked={doneBool} onChange={updateDone}/>
            </label>
        </>
    )
}