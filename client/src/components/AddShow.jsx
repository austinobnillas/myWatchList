import axios from "axios";
import React, {useState} from "react";
import { useParams, useNavigate} from "react-router-dom";

const AddShow = (props) => {
    const [showName, setShowName] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [numberOfEpisodes, setNumberOfEpisodes] = useState(0);
    const [episodesCompleted, setEpisodesCompleted] = useState(0);
    const [status, setStatus] = useState("");
    const [rating, setRating] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();

    console.log(id);

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/${id}/addshow`, 
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
                navigate('/dashboard')
            })
            .catch((err) => {
                console.log("ERROR")
                console.log(err)
            })
    }

    return (
        <div className="addShowContainer">
            <div className="addShowHeader">
                <h1>MyWatchList</h1>
                <button>Logout</button>
            </div>
            <div className="addShowFormContainer">
                <form onSubmit={submitHandler}>
                    <div>
                        <label>Show Name:</label>
                        <input type="text" onChange={(e) => setShowName(e.target.value)}/>
                    </div>
                    <div>
                        <label>Genre:</label>
                        <input type="text" onChange={(e) => setGenre(e.target.value)}/>
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div>
                        <label>Number of Episodes:</label>
                        <input type="number" onChange={(e) => setNumberOfEpisodes(e.target.value)}/>
                    </div>
                    <div>
                        <label>Episodes Completed:</label>
                        <input type="number" onChange={(e) => setEpisodesCompleted(e.target.value)}/>
                    </div>
                    <div>
                        <label>Status:</label>
                        <select name="status" onChange={(e) => setStatus(e.target.value)}>
                            <option value={"Plan to Watch"}>Plan to Watch</option>
                            <option value={"Watching"}>Watching</option>
                            <option value={"Completed"}>Completed</option>
                            <option value={"On Hold"}>On Hold</option>
                            <option value={"Dropped"}>Dropped</option>
                        </select>
                    </div>
                    <div>
                        <label>Rating:</label>
                        <select name="status" onChange={(e) => setRating(e.target.value)}>
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
                    <button>Add Show</button>
                </form>
            </div>
        </div>
    )

}

export default AddShow;