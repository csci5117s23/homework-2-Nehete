import TodoObject from "./TodoObject";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import { getTodos, addTodo, getDoneTodos, getNotDoneTodos } from "@/modules/Data";

export default function TodoList({done}) {
    const [loading, setLoading] = useState(true);
    const [todoList, setTodoList] = useState([]);
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    const [newName, setNewName] = useState("");


    useEffect(() => {
        async function getTodoList() {
            if (userId) { // check if 1) logged in, and 2) auth is loaded properly in the first place
                const token = await getToken({ template: "codehooks" });
                var todos;
                if (done) {
                    todos = await getDoneTodos(token);
                } else {
                    todos = await getNotDoneTodos(token);
                }
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
                <TodoObject title={todo.title} done={todo.done} id={todo._id} canEdit={false}></TodoObject> 
                {/* <Link href={"/todo/_id=" + todo._id}> {todo.title} </Link> */}
            </div>
        </li> );

        if (done) {
            return (<>
                <h1>Done Todos</h1>
                <ul>{listItems}</ul>
                <Link href={"/Todos"}> Back to Todos </Link>
            </>)
        }

        return (<>
            <ul>{listItems}</ul>
            <input
                placeholder="Add a Todo"
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown = {(e)=>{if (e.key === 'Enter'){add()}}}
            ></input>
            <button onClick={add}>Add Todo</button>
            <br></br>
            <Link href={"/Done"}>Check Done Todos</Link>
        </>)
    }
}