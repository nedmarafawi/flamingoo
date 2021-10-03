import React, { useState, useEffect, useContext } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room, Star } from '@material-ui/icons';

import styled from 'styled-components';

import axios from 'axios';

import { format } from 'timeago.js';

import { Context } from './context/Context';

import { Link } from 'react-router-dom';

const Map = () => {
  // Local Storage
  // const localStorage = window.localStorage;

  // const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'));

  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);

  const { user } = useContext(Context);

  // Form
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '70vh',
    latitude: 54,
    longitude: -105,
    zoom: 4,
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
      username: user.username,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post('/pins', newPin);
      // Adding inside the map
      setPins([...pins, res.data]);

      // Close form popup once done
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FirstWrapper className="App">
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
                  color: p.username === p.username ? 'blue' : 'red',
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
                <Card className="card">
                  <PlaceLabel>Place</PlaceLabel>
                  <PlaceTitle className="place">{p.title}</PlaceTitle>
                  <ReviewLabel>Review</ReviewLabel>
                  <ReviewDesc className="des">{p.des}</ReviewDesc>
                  <RatingLabel>Rating</RatingLabel>
                  <Stars className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </Stars>
                  <InfoLabel>Information</InfoLabel>
                  <CardUsername className="username">
                    {/* Created by <b>{p.username}</b> */}
                    Created by
                    <Link to={`/?user=${p.username}`} className="link">
                      <b>{p.username}</b>
                    </Link>
                  </CardUsername>
                  <CardDate className="date">{format(p.createdAt)}</CardDate>
                </Card>
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
            <SecondWrapper>
              <FormContainer onSubmit={handleSubmit}>
                <TitleLabel>Title</TitleLabel>
                <input
                  placeholder="Enter a title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <ReviewLabel>Review</ReviewLabel>
                <ReviewText
                  placeholder="Say something about this place."
                  onChange={(e) => setDesc(e.target.value)}
                />
                <RatingLabel>Rating</RatingLabel>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <Button type="submit" className="submitButton">
                  Add Pin
                </Button>
              </FormContainer>
            </SecondWrapper>
          </Popup>
        )}
      </ReactMapGL>
    </FirstWrapper>
  );
};

export default Map;

const FirstWrapper = styled.div`
  border-radius: 10px;
  margin-top: 80px;
  display: flex;
  justify-content: center;
`;
// margin-left: 2px;
// margin-right: 555px;

const Card = styled.div`
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const PlaceLabel = styled.p`
  width: max-content;
  color: blue;
  font-size: 13px;
  border-bottom: 0.5px solid blue;
  margin: 3px 0;
`;

const PlaceTitle = styled.h4``;

const ReviewLabel = styled.p`
  width: max-content;
  color: blue;
  font-size: 13px;
  border-bottom: 0.5px solid blue;
  margin: 3px 0;
`;

const ReviewDesc = styled.p`
  width: max-content;
  color: blue;
  font-size: 13px;
  border-bottom: 0.5px solid blue;
  margin: 3px 0;
`;

const RatingLabel = styled.p`
  width: max-content;
  color: blue;
  font-size: 13px;
  border-bottom: 0.5px solid blue;
  margin: 3px 0;
`;

const Stars = styled.p`
  color: gold;
`;

const InfoLabel = styled.p`
  width: max-content;
  color: blue;
  font-size: 13px;
  border-bottom: 0.5px solid blue;
  margin: 3px 0;
`;

const CardUsername = styled.span`
  font-size: 14px;
`;

const CardDate = styled.span``;

// Second Popup
const SecondWrapper = styled.div``;

const FormContainer = styled.form`
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: rgb(88, 87, 87);
`;

const TitleLabel = styled.p`
  width: max-content;
  color: blue;
  font-size: 13px;
  border-bottom: 0.5px solid blue;
  margin: 3px 0;
`;

const ReviewText = styled.textarea``;

const Button = styled.button`
  border: none;
  padding: 5px;
  border-radius: 5px;
  color: white;
  background-color: rgb(190, 31, 31);
  cursor: pointer;
`;
