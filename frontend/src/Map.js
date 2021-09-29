import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room, Star } from '@material-ui/icons';

import './app.css';

import axios from 'axios';

import { format } from 'timeago.js';

import Register from './components/Register';
import Login from './components/Login';

import { Link } from 'react-router-dom';

import Profile from './components/pages/Profile';

const Map = () => {
  // Local Storage
  const localStorage = window.localStorage;

  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'));

  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);

  // Register form
  const [showRegister, setShowRegister] = useState(false);
  // Login form
  const [showLogin, setShowLogin] = useState(false);

  // Form
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);

  const [viewport, setViewport] = useState({
    width: '50vw',
    height: '50vh',
    latitude: 54,
    longitude: -105,
    zoom: 4,
    borderRadius: '50px',
  });

  /*
   *******************
   **** useEffect ****
   *******************
   */
  useEffect(() => {
    // 👉 Make a request
    const getPins = async () => {
      try {
        // 👉 Return a response
        const res = await axios.get('/pins');
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  /*
   ***************************
   ******* Marker Click ******
   ***************************
   */
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  /*
   ************************
   ****** Add Click *******
   ************************
   */
  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post('/pins', newPin);
      // "proxy": "http://localhost:3000/api"
      // Adding inside the map
      setPins([...pins, res.data]);

      // Close form popup once done
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  return (
    <div className="App">
      {currentUser && (
        <nav className="nav">
          {/* <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="nav-brand">Travel Map</div>
          </Link> */}
          <ul className="nav-items">
            <li className="nav-item">
              {/* <Link to="/profile">Profile</Link> */}
            </li>
            <li className="nav-item">
              <Link to="/upload">Upload</Link>
            </li>
          </ul>
        </nav>
      )}
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/nedmarafawi/cku3331p809n617nt20vhybin"
        onDblClick={handleAddClick}
        transitionDuration="200"
      >
        {pins.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-viewport.zoom * 3.5}
              offsetTop={-viewport.zoom * 7}
            >
              <Room
                style={{
                  fontSize: viewport.zoom * 7,
                  color: p.username === currentUser ? 'blue' : 'red',
                  cursor: 'pointer',
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="top"
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="des">{p.des}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {/* Second Popup */}
        {newPlace && (
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            anchor="top"
            onClose={() => setNewPlace(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Review</label>
                <textarea
                  placeholder="Say something about this place."
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button type="submit" className="submitButton">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
      </ReactMapGL>

      {currentUser ? (
        <button className="button logout" onClick={handleLogout}>
          Log out
        </button>
      ) : (
        <div className="buttons">
          <button className="button login" onClick={() => setShowLogin(true)}>
            Login
          </button>
          <button
            className="button register"
            onClick={() => setShowRegister(true)}
          >
            Register
          </button>
        </div>
      )}
      {showRegister && <Register setShowRegister={setShowRegister} />}
      {showLogin && (
        <Login
          setShowLogin={setShowLogin}
          localStorage={localStorage}
          setCurrentUser={setCurrentUser}
        />
      )}
    </div>
  );
};

export default Map;
