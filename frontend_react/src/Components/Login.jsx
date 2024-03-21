import React, { useState } from 'react';
import "../Styles/Register.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/user/Login', formData);

            if (response.data.message === "Logged in successfully") {
                toast.success("Login successful");
                navigate('/'); 
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className='container'>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            <div className="heading">
                <h1>Login page</h1>
            </div>

            <div className="formcontainer">
                <form onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input
                        type='text'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        placeholder='Enter your Username'
                    />

                    <label>Password:</label>
                    <input
                        type={"password"}
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Enter your Password'
                    />

                    <div>
                        <button className="btn" type='submit'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
