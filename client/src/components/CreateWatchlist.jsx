import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const CreateWatchlist = (props) => {
    const [watchlistName, setWatchlistName] = useState("");
    const [watchlistDescription, setWatchlistDescription] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/createwatchlist', 
            {watchlistName, watchlistDescription},
            {withCredentials: true})

            .then((res) => {
                console.log(res.data)
                navigate('/dashboard')
            })
            .catch((err) => {
                console.log("ERROR")
                console.log(err)
            })

    }

    return (
        <div className="createWatchlistContainer">
            <div className="createHeader">
                <h1>MyWatchList</h1>
                <button>Logout</button>
            </div>
            <div className="createFormContainer">
                <form onSubmit={submitHandler}>
                    <div>
                        <label>Watchlist Name:</label>
                        <input onChange={(e) => setWatchlistName(e.target.value)} type="text" name="watchlistName"/>
                    </div>
                    <div>
                        <label>Description:</label>
                        <input onChange={(e) => setWatchlistDescription(e.target.value)} type="text" name="watchlistDescription"/>
                    </div>
                    <div>
                        <button>Create</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default CreateWatchlist;