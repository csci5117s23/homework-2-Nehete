const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function getTodos(authToken) {
    const result = await fetch(backend_base+"/todos",{
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
        'body': JSON.stringify({'title': todo})
    })
    console.log(result);
    return await result.json();
}


export async function deleteTodo(authToken, todo) {
    const result = await fetch(backend_base+"/todos/"+todo._id,{
        'method':'DELETE',
        'headers': {'Authorization': 'Bearer ' + authToken},
    })
    return await result.json();
}