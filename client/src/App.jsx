import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import WatchlistContent from './components/WatchlistContent';

function App() {
  const [watchlists, setWatchlists] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8000/api/watchlists', {withCredentials: true})
//     .then((res) => {
//         console.log(res.data)
//         setWatchlists(res.data)
//     })
//     .catch((err) => {
//         console.log(err)
//         navigate('/')
//     })
// }, [])

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path={'/'} element={<Login/>}/>
          <Route path={'/dashboard'} element={<Dashboard watchlists={watchlists} setWatchlists={setWatchlists}/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
