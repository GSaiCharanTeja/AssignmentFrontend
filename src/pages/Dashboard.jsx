import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: ""
    });

    // FIXED → Hooks inside component
    const [isEditing, setIsEditing] =
        useState(false);

    const [editId, setEditId] =
        useState(null);

    // Fetch Tasks
    const fetchTasks = async () => {

        try {

            const response =
                await API.get("/tasks");

            console.log(response.data);

            setTasks(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.log(error);

            alert("Failed to fetch tasks");
        }
    };

    useEffect(() => {

        fetchTasks();

    }, []);

    // Handle Input
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Edit Task
    const editTask = (task) => {

        setFormData({
            title: task.title,
            description: task.description,
            status: task.status
        });

        setEditId(task.id);

        setIsEditing(true);
    };

    // Create / Update Task
    const createTask = async (e) => {

        e.preventDefault();

        try {

            if (isEditing) {

                await API.put(
                    `/tasks/${editId}`,
                    formData
                );

                alert("Task Updated");

            } else {

                await API.post(
                    "/tasks",
                    formData
                );

                alert("Task Created");
            }

            // Clear Form
            setFormData({
                title: "",
                description: "",
                status: ""
            });

            setIsEditing(false);

            setEditId(null);

            fetchTasks();

        } catch (error) {

            console.log(error);

            alert("Failed");
        }
    };

    // Delete Task
    const deleteTask = async (id) => {

        try {

            await API.delete(`/tasks/${id}`);

            alert("Task Deleted");

            fetchTasks();

        } catch (error) {

            console.log(error);

            alert("Delete Failed");
        }
    };

    // Logout
    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    return (

        <div className="min-h-screen bg-gray-950 text-white p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-10">

                <h1 className="text-4xl font-bold text-cyan-400">
                    Task Dashboard
                </h1>

                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                >
                    Logout
                </button>

            </div>

            {/* Create Task */}
            <div className="bg-gray-900 p-6 rounded-2xl shadow-lg mb-10">

                <h2 className="text-2xl font-semibold mb-6">

                    {isEditing
                        ? "Update Task"
                        : "Create Task"}

                </h2>

                <form
                    onSubmit={createTask}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="title"
                        placeholder="Task Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none"
                    />

                    <input
                        type="text"
                        name="description"
                        placeholder="Task Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none"
                    />

                    <input
                        type="text"
                        name="status"
                        placeholder="Pending / Completed"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none"
                    />

                    <button
                        type="submit"
                        className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold"
                    >

                        {isEditing
                            ? "Update Task"
                            : "Create Task"}

                    </button>

                </form>

            </div>

            {/* Tasks */}
            <div>

                <h2 className="text-3xl font-bold mb-6">
                    My Tasks
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {tasks.map((task) => (

                        <div
                            key={task.id}
                            className="bg-gray-900 p-5 rounded-2xl shadow-lg hover:scale-105 transition"
                        >

                            <div className="flex justify-between items-center mb-4">

                                <h3 className="text-xl font-bold text-cyan-400">
                                    {task.title}
                                </h3>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm
                                    ${task.status === "Completed"
                                        ? "bg-green-500"
                                        : "bg-yellow-500 text-black"}
                                    `}
                                >
                                    {task.status}
                                </span>

                            </div>

                            <p className="text-gray-300 mb-6">
                                {task.description}
                            </p>

                            <div className="flex gap-3">

                                <button
                                    onClick={() => editTask(task)}
                                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        deleteTask(task.id)
                                    }
                                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;