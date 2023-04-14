import { getTodos, addTodo, deleteTodo } from "@/modules/Data";
import React, { useState, useEffect } from "react";

export default function TodoObject({title, done}) {
    const [newName, setNewName] = useState("");

    return (
        <>
            <li class="todo-item">
            <label>
                <span class="todo-title">{title}</span>
                <input type="checkbox" class="todo-checkbox"/>
            </label>
            </li>
        </>
    )
}