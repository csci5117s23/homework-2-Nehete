import TodoObject from "./TodoObject";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import { getTodos, addTodo } from "@/modules/Data";

export default function TodoList() {
    const [loading, setLoading] = useState(true);
    const [todoList, setTodoList] = useState([]);
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    const [newName, setNewName] = useState("");


    useEffect(() => {
        async function getTodoList() {
            if (userId) { // check if 1) logged in, and 2) auth is loaded properly in the first place
                const token = await getToken({ template: "codehooks" });
                const todos = await getTodos(token);
                console.log(todos)

                setTodoList(todos);
                setLoading(false);
            }
        }
        getTodoList();
    }, [isLoaded]);



    async function add() {
        const token = await getToken({ template: "codehooks" });
        const newTodo = await addTodo(token, newName);
        setNewName("");
        setTodoList(todoList.concat(newTodo));
    }


    if (loading) {
        return <span> loading... </span>
    } else {
        // const listItems = todoList.map( (todo) => <li>{todo.title}</li> );
        const listItems = todoList.map( (todo) => 
        <li key={todo._id}>
            <div>
                <TodoObject title={todo.title} done={todo.done}></TodoObject> 
                <Link href={"/todo/_id=" + todo._id}> {todo.title} </Link>
            </div>
        </li> );
        return (<>
            <ul>{listItems}</ul>
            <input
                placeholder="Add a Todo"
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown = {(e)=>{if (e.key === 'Enter'){add()}}}
            ></input>
            <button onClick={add}>Add Todo</button>
        </>)
    }
}