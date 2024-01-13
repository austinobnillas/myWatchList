import React, {useState} from "react";
import axios from 'axios'
import { useNavigate, Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import tvIcon from "../assets/tv.png"
import AddShow from "./AddShow";
import CreateWatchlist from "./CreateWatchlist";
import EditWatchlist from "./EditWatchlist";
import EditShow from "./EditShow";


const Demo = (props) => {
    const navigate = useNavigate();
    const [watchlists, setWatchlists] = useState([]);
    const [watchlistContent, setWatchlistContent] = useState([])
    const [currentWatchlist, setCurrentWatchlist] = useState("");
    const [currentWatchlistId, setCurrentWatchlistId] = useState(0);
    const [currentWatchlistDescription, setCurrentWatchlistDescription] = useState("");
    const [showDetails, setShowDetails] = useState([]);
    const [addShowForm, setAddShowForm] = useState(false);
    const [showCreateWatchlist, setShowCreateWatchlist] = useState(false)
    const [editWatchlistDetails, setEditWatchlistDetails] = useState(false);
    const [editShowDetails, setEditShowDetails] = useState(false);
    const [currentShowId, setCurrentShowId] = useState();
    const [episodesCompleted, setEpisodesCompleted] = useState();

    useEffect(() => {
            axios.get('http://localhost:8000/api/demo')
        .then((res) => {
            console.log(res.data)
            setWatchlists(res.data)
        })
        .catch((err) => {
            console.log(err)
            navigate('/')
        })
    }, [])

    const getWatchListContent = (id) => {
        axios.get(`http://localhost:8000/api/demo/watchlists`)
            .then((res) => {
                // console.log(res.data)
                setWatchlistContent(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getShowDetails = (id) => {

        axios.get(`http://localhost:8000/api/demo/shows`)
            .then((res) => {
                console.log(res.data)
                setShowDetails(res.data)
                setEpisodesCompleted(res.data[0].episodes_completed)
                setEditShowDetails(false)
                
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // const updateEpisodesCompleted = (id, updatedEp) => {
    //     axios.patch(`http://localhost:8000/api/updateepisodes/${id}`, {updatedEp}, {withCredentials: true})
    //         .then((res) => {
    //             // console.log(res)
    //             setEpisodesCompleted(res.data[0].episodes_completed)
                
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    const logout = () => {
        navigate('/')
    }
    const deleteWatchlistHandler = (id) => {
        alert("Demo Page, Sign in or Register")
    }
    const deleteShowHandler = (id) => {
        alert("Demo Page, Sign in or Register")
    }

    const createButtonHandler = () => {
        alert("Demo Page, Sign in or Register");
        if (showCreateWatchlist == false)
            setShowCreateWatchlist(true)
        if (showCreateWatchlist == true) 
            setShowCreateWatchlist(false);
        }
    const editWatchlistHandler = () => {
        alert("Demo Page, Sign in or Register");
        if (editWatchlistDetails == false)
            setEditWatchlistDetails(true)
            setAddShowForm(false)
        if (editWatchlistDetails == true)
            setEditWatchlistDetails(false)
    }
    const addShowButtonHandler = () => {
        alert("Demo Page, Sign in or Register");
        if (addShowForm == false)
            setAddShowForm(true)
            setEditWatchlistDetails(false)
        if (addShowForm == true)
            setAddShowForm(false)
    }
    const editShowHandler = (id) => {
        alert("Demo Page, Sign in or Register");
        if (editShowDetails == false)
            setEditShowDetails(true)
        if (editShowDetails == true)
            setEditShowDetails(false)
    }

        
    return (
        <div className="fullBodyContainer">
            <div className="dashboardHeader">
                    <h1>MyWatchList - DEMO</h1>
                    <button className="btn btn-danger" onClick={logout}>Back to Sign In/Register</button>
            </div>
            <div className="dashboardContainer">
                <div className="sidebarContainer">
                    <div className="sidebarTop">
                        <h2>Your Watchlists</h2>
                        <button onClick={()=> {createButtonHandler(showCreateWatchlist)}} className="createButton">+</button>
                    </div>
                    
                    <div className="sidebar">
                        <div>{ showCreateWatchlist == true ? 
                            <CreateWatchlist/> : "" }
                        </div>
                        {watchlists.map((watchlist, index) => (
                            <Link className="watchlistSidebarContainer" key={watchlist.id} 
                                onClick={()=> {
                                    getWatchListContent(); 
                                    setCurrentWatchlist(watchlist.watchlist_name);
                                    setCurrentWatchlistDescription(watchlist.description);
                                    setAddShowForm(false)
                                    setEditWatchlistDetails(false)
                                    }}>
                                <p className="watchlistInformation"><img className="sidebarImg"src={tvIcon} alt="Image of TV" />{watchlist.watchlist_name}</p>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="watchlistContent">
                    <div className="watchlistSide">
                        <div className="watchlistHeader">
                            {currentWatchlist ? <img className="watchlistImg"src={tvIcon} alt="Image of TV" /> : ''}
                            <div className="headerRight">
                                <div>
                                    <h1>{currentWatchlist}</h1>
                                    <p>{currentWatchlistDescription}</p>
                                </div>
                                <div className="addAndDelete">
                                    {currentWatchlist ? <button onClick={() => addShowButtonHandler(addShowForm)} className="btn btn-primary">Add a show to this watchlist</button> : '' }
                                    {currentWatchlist ? <div className="editDelete">
                                        <button onClick={() => editWatchlistHandler(currentWatchlistId)} className="btn btn-primary m-1">Edit</button>
                                        <button onClick={() => deleteWatchlistHandler(currentWatchlistId)} className="btn btn-danger m-1">Delete</button>
                                    </div> : ''}
                                </div>
                            </div>
                        </div>
                        {addShowForm == true ? 
                            <AddShow 
                            currentWatchlistId={currentWatchlistId} 
                            setCurrentWatchlistId={setCurrentWatchlistId}
                            watchlistContent={watchlistContent}
                            setWatchlistContent={setWatchlistContent}
                            addShowForm={addShowForm}
                            setAddShowForm={setAddShowForm}
                            />
                            : ''
                        }
                        {editWatchlistDetails == true ? 
                            <EditWatchlist currentWatchlistId={currentWatchlistId} 
                            setCurrentWatchlistId={setCurrentWatchlistId}
                            currentWatchlist={currentWatchlist}
                            setCurrentWatchlist={setCurrentWatchlist}
                            currentWatchlistDescription={currentWatchlistDescription}
                            setCurrentWatchlistDescription={setCurrentWatchlistDescription}
                            />
                            : ''
                        }
                        <table className="table table-striped table-dark">
                        {currentWatchlist ? <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Genre</th>
                                    <th># Episodes</th>
                                    <th>Status</th>
                                </tr>
                            </thead>: ""}
                            
                            <tbody>
                                {watchlistContent.map((watchlistContent, index) => (
                                    <tr key={watchlistContent.id}>
                                        <td><Link onClick={() => {getShowDetails(watchlistContent.id)}}>{watchlistContent.name}</Link></td>
                                        <td>{watchlistContent.genre}</td>
                                        <td>{watchlistContent.number_of_episodes}</td>
                                        <td>{watchlistContent.status}</td>
                                    </tr>
                                    
                                ))}
                                </tbody>
                        </table>
                        
                    </div>
                    <div className="showSide">
                        {showDetails.map((showDetails, index) => (
                            <div className="showSideContainer" key={showDetails.id}>
                                <div className="showOptions mb-2">
                                    <button className="me-1 btn btn-primary" onClick={
                                            () => {editShowHandler(showDetails.id)}}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => {deleteShowHandler(showDetails.id)}}>Delete</button>
                                </div>
                                <img className="showImg"src={tvIcon} alt="Image of TV" />
                                {editShowDetails == true ? 
                                    <EditShow getWatchListContent={getWatchListContent} showDetails={showDetails} setShowDetails={setShowDetails} showId={showDetails.id} editShowDetails={editShowDetails} setEditShowDetails={setEditShowDetails} /> : ''}
                                <div className="showTitle">
                                    <h3 className="showName">{showDetails.name}</h3>
                                    
                                </div>
                                <p className="showStatus">Status: {showDetails.status}</p>
                                <div className="showEpisodes">
                                    <button onClick={
                                        () => {setEpisodesCompleted(episodesCompleted - 1)}} className="btn btn-danger">-</button>
                                    <p>Episode: {episodesCompleted}/{showDetails.number_of_episodes}</p>
                                    <button onClick={() => {setEpisodesCompleted(episodesCompleted + 1)}} className="btn btn-success">+</button>
                                </div>
                                <p className="showRating">Rating: {showDetails.rating}/10</p>
                                <p className="showGenre">Genre: {showDetails.genre}</p>
                                
                                
                                
                                <div className="showDescription">
                                    <h5>Description:</h5>
                                    <p>{showDetails.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Demo
