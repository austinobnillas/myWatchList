import axios from "axios";
import React, {useState} from "react";
import { useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";

const EditShow = (props) => {
    const [showName, setShowName] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [numberOfEpisodes, setNumberOfEpisodes] = useState(0);
    const [episodesCompleted, setEpisodesCompleted] = useState(0);
    const [status, setStatus] = useState("");
    const [rating, setRating] = useState(0);
    const [errors, setErrors] = useState();
    const {showDetails, setShowDetails} = props
    const {watchlistContent, setWatchlistContent} = props;
    const {getWatchListContent} = props
    const {showId} = props
    const {editShowDetails, setEditShowDetails} = props;
    const navigate = useNavigate();

        useEffect(() => {
            axios.get(`http://localhost:8000/api/show/${showId}`, {withCredentials: true})
                .then((res) => {
                    console.log(res.data[0])
                    setShowName(res.data[0].name)
                    setGenre(res.data[0].genre)
                    setDescription(res.data[0].description)
                    setNumberOfEpisodes(res.data[0].number_of_episodes)
                    setEpisodesCompleted(res.data[0].episodes_completed)
                    setStatus(res.data[0].status)
                    setRating(res.data[0].rating)
                })
                .catch((err) => {
                    console.log(err)
                })
        }, [])
    const submitHandler = (e) => {
        e.preventDefault()
        axios.patch(`http://localhost:8000/api/editshow/${showId}`, {
                showName,
                genre,
                description,
                numberOfEpisodes,
                episodesCompleted,
                status,
                rating}, {withCredentials: true})
            .then((res) => {
                setShowDetails(res.data)
                setEditShowDetails(false)
                navigate('/dashboard')
                getWatchListContent(res.data[0].watchlist_id)
            })
            .catch((err) => {
                setErrors(err.response.data)
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
                            <input className="form-control" value={showName} type="text" onChange={(e) => setShowName(e.target.value)}/>
                        </div>
                        <div>
                            <label className="form-label">Genre:</label>
                            {errors ? <p className="text-danger">{errors.genre_error}</p>: ""}
                            <input className="form-control" value={genre} type="text" onChange={(e) => setGenre(e.target.value)}/>
                        </div>
                    </div>
                    <div className="formDescription">
                        <label className="form-label">Description:</label>
                        {errors ? <p className="text-danger">{errors.description_error}</p>: ""}
                        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="formRow3">
                        <div>
                            <label className="form-label">Number of Episodes:</label>
                            {errors ? <p className="text-danger">{errors.number_of_episodes_error}</p>: ""}
                            <input className="form-control" value={numberOfEpisodes} type="number" onChange={(e) => setNumberOfEpisodes(e.target.value)}/>
                        </div>
                        <div>
                            <label className="form-label">Episodes Completed:</label>
                            {errors ? <p className="text-danger">{errors.episodes_completed_error}</p>: ""}
                            <input className="form-control" value={episodesCompleted} type="number" onChange={(e) => setEpisodesCompleted(e.target.value)}/>
                        </div>
                        <div>
                            <label className="form-label">Status:</label>
                            {errors ? <p className="text-danger">{errors.status_error}</p>: ""}
                            <select className="form-select" value={status} name="status" onChange={(e) => setStatus(e.target.value)}>
                                <option value={"Plan to Watch"}>Plan to Watch</option>
                                <option value={"Watching"}>Watching</option>
                                <option value={"Completed"}>Completed</option>
                                <option value={"On Hold"}>On Hold</option>
                                <option value={"Dropped"}>Dropped</option>
                            </select>
                            <label className="form-label">Rating:</label>
                            {errors ? <p className="text-danger">{errors.rating_error}</p>: ""}
                            <select className="form-select" value={rating} name="status" onChange={(e) => setRating(e.target.value)}>
                                <option value={0}>0</option>
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
                    <button className="btn btn-primary">Submit Changes</button>
                </form>
            </div>
        </div>
    )

}

export default EditShow;