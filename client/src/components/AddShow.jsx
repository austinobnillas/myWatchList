import axios from "axios";
import React, {useState} from "react";
import { useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";

const AddShow = (props) => {
    const [showName, setShowName] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [numberOfEpisodes, setNumberOfEpisodes] = useState(0);
    const [episodesCompleted, setEpisodesCompleted] = useState(0);
    const [status, setStatus] = useState("");
    const [rating, setRating] = useState(0);
    const [errors, setErrors] = useState();
    const {currentWatchlistId, setCurrentWatchlistId} = props;
    const {watchlistContent, setWatchlistContent} = props;
    const {addShowForm, setAddShowForm} = props
    const navigate = useNavigate();


    useEffect( () => {
        console.log(watchlistContent)
    }, []
        
    )

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/${currentWatchlistId}/addshow`, 
            {
                showName,
                genre,
                description,
                numberOfEpisodes,
                episodesCompleted,
                status,
                rating
            }, {withCredentials: true})
            .then((res) => {
                console.log(res.data)
                console.log("SUCCESS")
                setWatchlistContent([...watchlistContent, res.data])
                setAddShowForm(false)
                // window.location.reload(false)
                navigate('/dashboard')
            })
            .catch((err) => {
                console.log("ERROR")
                console.log(err.response.data)
                setErrors(err.response.data)
                console.log(errors)
            })
    }

    return (
        <div className="addShowContainer">
            <div className="addShowFormContainer">
                <form className="addShowForm" onSubmit={submitHandler}>
                    <div className="formRow1">
                        <div>
                            <label className="form-label">Show Name:</label> 
                            {errors ? <p className="text-danger">{errors.name_error}</p> : ' '} 
                            <input className="form-control" type="text" onChange={(e) => setShowName(e.target.value)}/>
                        </div>
                        <div>
                            <label className="form-label">Genre:</label>
                            {errors ? <p className="text-danger">{errors.genre_error}</p>: ""}
                            <input className="form-control" type="text" onChange={(e) => setGenre(e.target.value)}/>
                        </div>
                    </div>
                    <div className="formDescription">
                        <label className="form-label">Description:</label>
                        {errors ? <p className="text-danger">{errors.description_error}</p>: ""}
                        <textarea className="form-control" onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="formRow3">
                        <div>
                            <label className="form-label">Number of Episodes:</label>
                            {errors ? <p className="text-danger">{errors.number_of_episodes_error}</p>: ""}
                            <input className="form-control" type="number" onChange={(e) => setNumberOfEpisodes(e.target.value)}/>
                        </div>
                        <div>
                            <label className="form-label">Episodes Completed:</label>
                            {errors ? <p className="text-danger">{errors.episodes_completed_error}</p>: ""}
                            <input className="form-control" type="number" onChange={(e) => setEpisodesCompleted(e.target.value)}/>
                        </div>
                        <div>
                            <label className="form-label">Status:</label>
                            {errors ? <p className="text-danger">{errors.status_error}</p>: ""}
                            <select className="form-select" name="status" onChange={(e) => setStatus(e.target.value)}>
                                <option value={"Plan to Watch"}>Plan to Watch</option>
                                <option value={"Watching"}>Watching</option>
                                <option value={"Completed"}>Completed</option>
                                <option value={"On Hold"}>On Hold</option>
                                <option value={"Dropped"}>Dropped</option>
                            </select>
                            <label className="form-label">Rating:</label>
                            {errors ? <p className="text-danger">{errors.rating_error}</p>: ""}
                            <select className="form-select" name="status" onChange={(e) => setRating(e.target.value)}>
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </select>
                        </div>
                    </div>
                    <button className="btn btn-primary">Add Show</button>
                </form>
            </div>
        </div>
    )

}

export default AddShow;