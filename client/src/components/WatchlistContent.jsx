import React, {useState} from "react";
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

const WatchlistContent = (id) => {
    useEffect(() => {
        axios.get(`http://localhost:8000/api/watchlist/shows/${id}`, {withCredentials: true})
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        
        <div className="watchlistContentContainer">
            <h1>MyWatchList</h1>
        </div>
    )
}
export default WatchlistContent;