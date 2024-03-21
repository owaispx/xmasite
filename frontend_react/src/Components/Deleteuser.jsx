import React, { useState } from 'react';
import "../Styles/Register.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Delete = () => {

    const navigate = useNavigate();

    const [formData, setformData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
           
        try {
            const response = await axios.post('http://localhost:4000/user/Delete', formData);
            
            if (response.data.message === "User's account deleted") {
                toast.success(" account deleted");
                console.log("msg"+response.data.message);
                navigate('/Login');
            }
            else { 
                
                toast.error(response.data.message);
                console.log("error"+response.data.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong"); 
        }
    }

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
                <h1>Delete user </h1>
            </div>

            <div className="formcontainer">
                <form onSubmit={handleSubmit}>

                    <label>
                        Useeid:  </label>
                    <input
                        type='text'
                        name='id'
                        value={formData.id}
                        onChange={handleChange}
                        placeholder='Enter userid '
                    />

                    <div >
                    <button className="btn" type='submit'>Delete</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Delete
