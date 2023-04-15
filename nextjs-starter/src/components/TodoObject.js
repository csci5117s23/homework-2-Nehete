import { getTodos, addTodo, deleteTodo } from "@/modules/Data";
import React, { useState, useEffect } from "react";

export default function TodoObject({title, done}) {
    const [newName, setNewName] = useState("");

    return (
        <>
            <label>
                <span className="todo-title">{title}</span>
                <input type="checkbox" className="todo-checkbox"/>
            </label>
        </>
    )
}