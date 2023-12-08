import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const EditWatchlist = (props) => {
    const [watchlistName, setWatchlistName] = useState("");
    const [watchlistDescription, setWatchlistDescription] = useState("");
    const {currentWatchlistId, setCurrentWatchlistId} = props;
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        axios.patch(`http://localhost:8000/api/editwatchlist/${currentWatchlistId}`, 
            {watchlistName, watchlistDescription},
            {withCredentials: true})
            .then((res) => {
                console.log(res.data)
                navigate('/dashboard')
                window.location.reload(false)
            })
            .catch((err) => {
                console.log("ERROR")
                console.log(err)
            })
    }
    return (
        <div className="createWatchlistContainer">
            <div className="createHeader">
                <h3>Edit This Watchlist</h3>
            </div>
            <div className="createFormContainer">
                <form onSubmit={submitHandler}>
                    <div>
                        <label className="form-label" >Watchlist Name:</label>
                        <input className="form-control" onChange={(e) => setWatchlistName(e.target.value)} type="text" name="watchlistName"/>
                    </div>
                    <div>
                        <label className="form-label" >Description:</label>
                        <input className="form-control" onChange={(e) => setWatchlistDescription(e.target.value)} type="text" name="watchlistDescription"/>
                    </div>
                    <div>
                        <button className="btn btn-primary">Save</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}
export default EditWatchlist;