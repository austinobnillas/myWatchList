import React, {useState} from "react";
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
    const navigate = useNavigate();
    const [watchlists, setWatchlists] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/api/watchlists', {withCredentials: true})
        .then((res) => {
            console.log(res)
            setWatchlists(res.data)
        })
        .catch((err) => {
            console.log(err)
            navigate('/')
        })
    }, [])

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
        .then((res) => {
            navigate('/')
        })
    }
        
    return (
        <>
            <div className="dashboardContainer">
                <div className="dashboardHeader">
                    <h1>MyWatchList</h1>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
            <ul>
            {watchlists.map((list, index) => (
                <div>
                    <li key={index}>
                        <h3>{list.watchlist_name}</h3>
                        <p>{list.created_by}</p>
                    </li>
                </div>
            ))}
            </ul>
            
        </>
    )
}

export default Dashboard
