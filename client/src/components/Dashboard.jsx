import React, {useState} from "react";
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
    const [watchlists, setWatchlists] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/watchlists', {withCredentials: true})
        .then((res) => {
            console.log(res)
            setWatchlists(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
        
    return (
        <>
            {watchlists.map((list, index) => (
                <div>
                    <h1>{list.watchlist_name}</h1>
                    <p>{list.description}</p>
                    <p>{list.created_by}</p>
                </div>
                
            ))}
        </>
    )
}

export default Dashboard
