import TodoObject from "./TodoObject"
import { useAuth } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import { getTodos } from "@/modules/Data";

export default function TodoList() {
    const [loading, setLoading] = useState(true);
    const [todoList, setTodoList] = useState([]);
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    const [newName, setNewName] = useState("");


    useEffect(() => {
        async function getTodoList() {
            console.log("Start")
            if (userId) { // check if 1) logged in, and 2) auth is loaded properly in the first place
                console.log("Finished 2")
                const token = await getToken({ template: "codehooks" });
                const todos = await getTodos(token);
                
                setTodoList(todos)
                setLoading(false);

                console.log("Finished")
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
        return <span> loading... </span>;
    } else {
        const listItems = todoList.map( (todo) => <li>{todo.title}</li> )
        return (<>
            <ul>{listItems}</ul>
            <input
                placeholder="Add a Task"
                onKeyDown = {(e)=>{if (e.key === 'Enter'){add()}}}
            ></input>
            <button onClick={add}>Add Task</button>

            <TodoObject></TodoObject>
        </>)
    }
}