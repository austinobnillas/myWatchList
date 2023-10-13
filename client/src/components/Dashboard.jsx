import React, {useState} from "react";
import axios from 'axios'
import { useNavigate, Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = (props) => {
    const navigate = useNavigate();
    const {watchlists, setWatchlists} = props;
    const [watchlistContent, setWatchlistContent] = useState([])
    const [currentWatchlist, setCurrentWatchlist] = useState("");
    const [currentWatchlistId, setCurrentWatchlistId] = useState(0);
    const [currentWatchlistDescription, setCurrentWatchlistDescription] = useState("");

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
                        <h3>Your Watchlists</h3>
                        <Link to={'/createWatchlist'}>Create A Watchlist</Link>
                    </div>
                    <ul className="sidebar">
                        {watchlists.map((watchlist, index) => (
                            <Link className="watchlistSidebarContainer" key={watchlist.id} 
                                onClick={()=> {
                                    getWatchListContent(watchlist.id); 
                                    setCurrentWatchlist(watchlist.watchlist_name);
                                    setCurrentWatchlistDescription(watchlist.description);
                                    setCurrentWatchlistId(watchlist.id)
                                    }}>
                                <li className="watchlistInformation">
                                    <h3>{watchlist.watchlist_name}</h3>
                                    <p>{watchlist.created_by}</p>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className="watchlistContent">
                    <div className="watchlistSide">
                        <h1>{currentWatchlist}</h1>
                        <p>{currentWatchlistDescription}</p>
                        <Link to={`/addShow/${currentWatchlistId}`}>Add a show to this watchlist</Link>
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
                                        <td>{watchlistContent.name}</td>
                                        <td>{watchlistContent.genre}</td>
                                        <td>{watchlistContent.number_of_episodes}</td>
                                        <td>{watchlistContent.status}</td>
                                    </tr>
                                    
                                ))}
                                </tbody>
                        </table>
                        
                    </div>
                    <div className="showSide">
                        <h1>TESTING SHOW NAME</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
