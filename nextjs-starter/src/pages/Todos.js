export default function Todos() {
    const [tasks, setTasks] = useState([]);
    const [newName, setNewName] = useState("");


    async function add() {
        const token = await getToken({ template: "codehooks" });
        const newTask = await addTasks(token, newName);
        setNewName("");
        setTasks(tasks.concat(newTask));
    }

    return (
        <>
            <Head>
                <title>Todo List</title>
            </Head>

            <input
                placeholder="Add a Task"
                value={newName}
                onKeyDown = {(e)=>{if (e.key === 'Enter'){add()}}}
            ></input>
          <button onClick={add}>Add Task</button>
        </>
    )
}