import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const CreateWatchlist = (props) => {
    const [watchlistName, setWatchlistName] = useState("");
    const [watchlistDescription, setWatchlistDescription] = useState("");
    const [errors, setErrors] = useState()
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/createwatchlist', 
            {watchlistName, watchlistDescription},
            {withCredentials: true})
            .then((res) => {
                // console.log(res.data)
                navigate('/dashboard')
                window.location.reload(false)
            })
            .catch((err) => {
                // console.log("ERROR")
                // console.log(err)
                setErrors(err.response.data)
            })

    }

    return (
        <form className="createWatchlistForm"onSubmit={submitHandler}>
            <div>
                <label className="form-label" >Watchlist Name:</label>
                {errors ? <p className="text-danger">{errors.name_error}</p>: ""}
                <input className="form-control" onChange={(e) => setWatchlistName(e.target.value)} type="text" name="watchlistName"/>
            </div>
            <div>
                <label className="form-label" >Description:</label>
                {errors ? <p className="text-danger">{errors.description_error}</p>: ""}
                <input className="form-control" onChange={(e) => setWatchlistDescription(e.target.value)} type="text" name="watchlistDescription"/>
            </div>
            <button className="btn btn-primary mt-3 mb-3">Create</button>
        </form>
    )
}

export default CreateWatchlist;