import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response =
                await API.post(
                    "/auth/login",
                    formData
                );

            console.log(
                "LOGIN RESPONSE:",
                response.data
            );

            if (response.data.token) {

                localStorage.setItem(
                    "token",
                    response.data.token
                );

                alert("Login Successful");

                navigate("/dashboard");

            } else {

                alert(response.data.message);
            }

        } catch (error) {

            console.log(error);

            alert("Login Failed");
        }
    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-950 text-white">

            <div className="bg-gray-900 p-10 rounded-2xl shadow-2xl w-full max-w-md">

                <h1 className="text-4xl font-bold text-center text-cyan-400 mb-8">
                    Welcome Back
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 outline-none"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 outline-none"
                    />

                    <button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg font-semibold"
                    >
                        Login
                    </button>

                </form>

                <p className="text-center text-gray-400 mt-6">

                    Don’t have an account?

                    <Link
                        to="/register"
                        className="text-cyan-400 ml-2"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;