import React, {useState} from "react";
import axios from 'axios'
import { useNavigate, Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import tvIcon from "../assets/tv.png"

const Dashboard = (props) => {
    const navigate = useNavigate();
    const {watchlists, setWatchlists} = props;
    const [watchlistContent, setWatchlistContent] = useState([])
    const [currentWatchlist, setCurrentWatchlist] = useState("");
    const [currentWatchlistId, setCurrentWatchlistId] = useState(0);
    const [currentWatchlistDescription, setCurrentWatchlistDescription] = useState("");
    const [showDetails, setShowDetails] = useState([]);

        useEffect(() => {
                axios.get('http://localhost:8000/api/watchlists', {withCredentials: true})
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
        axios.get(`http://localhost:8000/api/watchlist/shows/${id}`, {withCredentials: true})
            .then((res) => {
                console.log(res.data)
                setWatchlistContent(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getShowDetails = (id) => {
        axios.get(`http://localhost:8000/api/show/${id}`, {withCredentials: true})
            .then((res) => {
                console.log(res.data)
                setShowDetails(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
        .then((res) => {
            navigate('/')
        })
    }
        
    return (
        <div className="fullBodyContainer">
            <div className="dashboardHeader">
                    <h1>MyWatchList</h1>
                    <button className="btn btn-danger" onClick={logout}>Logout</button>
            </div>
            <div className="dashboardContainer">
                <div className="sidebarContainer">
                    <div className="sidebarTop">
                        <h2>Your Watchlists</h2>
                        <Link to={'/createWatchlist'} className="createButton"> + </Link>
                    </div>
                    <div className="sidebar">
                        {watchlists.map((watchlist, index) => (
                            <Link className="watchlistSidebarContainer" key={watchlist.id} 
                                onClick={()=> {
                                    getWatchListContent(watchlist.id); 
                                    setCurrentWatchlist(watchlist.watchlist_name);
                                    setCurrentWatchlistDescription(watchlist.description);
                                    setCurrentWatchlistId(watchlist.id)
                                    }}>
                                <p className="watchlistInformation"><img className="sidebarImg"src={tvIcon} alt="Image of TV" />{watchlist.watchlist_name}</p>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="watchlistContent">
                    <div className="watchlistSide">
                        <div className="watchlistHeader">
                            <img className="watchlistImg"src={tvIcon} alt="Image of TV" />
                            <div className="headerRight">
                                <div>
                                    <h1>{currentWatchlist}</h1>
                                    <p>{currentWatchlistDescription}</p>
                                </div>
                                
                                {
                                    currentWatchlist ? 
                                    <Link to={`/addShow/${currentWatchlistId}`}>Add a show to this watchlist</Link> : ''
                                }
                            </div>
                        </div>
                        
                        <table className="table table-striped table-dark">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Genre</th>
                                    <th>Number of Episodes</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
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
                                <img className="showImg"src={tvIcon} alt="Image of TV" />
                                <div className="showTitle">
                                    <h3 className="showName">{showDetails.name}</h3>
                                    
                                </div>
                                <p className="showRating">Rating: {showDetails.rating}/10</p>
                                <p className="showGenre">Genre: {showDetails.genre}</p>
                                <div className="showStatus">
                                    <p>{showDetails.status}</p>
                                    <p>Episode: {showDetails.episodes_completed}/{showDetails.number_of_episodes}</p>
                                    
                                </div>
                                
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

export default Dashboard
