import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../Styles/Showitems.css"
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";



const DisplayItems = () => {
    const [items, setitems] = useState([])
    const fetchitems = async () => {
        try {
            const response = await axios.get('http://localhost:4000/user/showitems')
            setitems(response.data)
            console.log("response data " + response.data)

        }
        catch (err) {
            console.log("error fetching items", err)
        }
    };

    useEffect(() => {
        fetchitems()
    }, [])
    return (
        <div className="full">
           { items.map (item => (
            <div className="card">
                <img src={item.imageUrl} alt={item.title} width={500}  />
                <div className="card-content">
                    <h2>{item.title}</h2>
                    <p >{item.description}</p>
                </div>
                <div className="icons">
                <div className="like">
                <h2><AiOutlineLike /></h2>
                <span>like</span>
                </div>
                
                <div className="dislike">
                <h2><AiOutlineDislike /></h2>
                <span>dislike</span>
                </div>

                </div>
            </div>

           )) } 


        </div>

    )
}

export default DisplayItems