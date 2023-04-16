const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function getTodos(authToken) {
    const result = await fetch(backend_base+"/todos",{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function getDoneTodos(authToken) {
    const result = await fetch(backend_base+"/todos?done=true",{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function getTodo(authToken, id) {
    const result = await fetch(backend_base+"/todos?" + id,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function addTodo(authToken, todo) {
    const result = await fetch(backend_base+"/todos",{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'title': todo, 'done': false})
    })
    console.log(result);
    return await result.json();
}

export async function updateTodo(authToken, id, title, done) {
    const result = await fetch(backend_base+"/todos/" + id,{
        'method':'PUT',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({'title': title, 'done': done})
    })
    return await result.json();
}

export async function deleteTodo(authToken, id) {
    const result = await fetch(backend_base+"/todos/" + id,{
        'method':'DELETE',
        'headers': {'Authorization': 'Bearer ' + authToken},
    })
    return await result.json();
}