import axios from "axios";
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const EditWatchlist = (props) => {
    const [watchlistName, setWatchlistName] = useState("");
    const [watchlistDescription, setWatchlistDescription] = useState("");
    const {currentWatchlistId, setCurrentWatchlistId} = props;
    const [errors, setErrors] = useState();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        axios.patch(`http://localhost:8000/api/editwatchlist/${currentWatchlistId}`, 
            {watchlistName, watchlistDescription},
            {withCredentials: true})
            .then((res) => {
                // console.log(res.data)
                navigate('/dashboard')
                window.location.reload(false)
            })
            .catch((err) => {
                // console.log(err.response.data)
                setErrors(err.response.data)
            })
    }
    return (
        <form className="createWatchlistForm" onSubmit={submitHandler}>
            <div>
                <label className="form-label" >Watchlist Name:</label>
                {errors ? <p className="text-danger">{errors.name_error}</p>: ""}
                <input className="form-control" onChange={(e) => setWatchlistName(e.target.value)}/>
            </div>
            <div>
                <label className="form-label" >Description:</label>
                {errors ? <p className="text-danger">{errors.description_error}</p>: ""}
                <textarea className="form-control"  onChange={(e) => setWatchlistDescription(e.target.value)}/>
            </div>
            <button className="btn btn-primary mt-3 mb-3">Save</button>
        </form>
    )
}
export default EditWatchlist;