import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../Components/spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateItems = () => {
    const [isloading, setisloding] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setisloding(true)
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('image', image);

            const response = await axios.post('http://localhost:4000/user/Create', formDataToSend);

            if (response.data.message === "Item saved successfully") {
                toast.success("Item added successfully");
                setFormData({ title: "", description: "" });
                setImage(null);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setisloding(false);
        }
    };


    return (
        
          
        <div className='container'>
             {isloading ? <Spinner/>: null}
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
                <h1>Add new items</h1> 
            </div>
           
            <div className="formcontainer">
                <form onSubmit={handleSubmit}>
                    <label>title:</label>
                    <input
                        type='text'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        placeholder='Enter title'
                    />

                    <label>descreption:</label>
                    <input
                        type='text'
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        placeholder='Enter description'
                    />

                    <div className='password-input'>
                        <input
                            type='file'
                            name='image'
                            onChange={handleImageChange}
                        />
                    </div>

                    <button className="btn" type='submit' disabled={isloading}> "Create"</button>
                </form>
            </div>
        </div>
    )
}

export default CreateItems;
