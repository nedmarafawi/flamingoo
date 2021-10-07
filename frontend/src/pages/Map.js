import React, { useState, useEffect, useContext } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { RoomTwoTone } from '@material-ui/icons';

import styled from 'styled-components';

import axios from 'axios';

import { format } from 'timeago.js';

import { Context } from '../context/Context';

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
    width: '98vw',
    height: '90vh',
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
    <FirstWrapper className="App" id="map">
      <TitleMap>Map</TitleMap>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/nedmarafawi/ckug2kuqa06jq17o3rbp5vas8"
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
              <RoomTwoTone
                style={{
                  fontSize: viewport.zoom * 7,
                  color: p.username === p.username ? '#F59700' : 'red',
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
                  {/* <ReviewDesc className="des">{p.des}</ReviewDesc> */}
                  <RatingLabel>Rating</RatingLabel>
                  <Stars className="stars">
                    {Array(p.rating).fill(
                      <>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          dataReactroot=""
                        >
                          <path
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="1"
                            stroke="#FF7373"
                            fill="#d0021b"
                            d="M21.8688 9.00004C20.9051 14.03 14.6126 19.762 12.6023 21.4846C12.2447 21.791 11.729 21.7896 11.3735 21.4808C9.39224 19.7598 3.22301 14.0646 2.14642 9.00004C1.29483 4.99389 4.3218 2 6.98599 2C9.99495 2 11.986 4.00004 11.986 4.00004C11.986 4.00004 14.1227 1.99993 16.986 2C19.8696 2.00007 22.6375 4.8726 21.8688 9.00004Z"
                          ></path>
                        </svg>
                      </>
                    )}
                  </Stars>
                  <CardUsername className="username">
                    Created by&nbsp;
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
                <InputTitle
                  placeholder="Enter a title"
                  onChange={(e) => setTitle(e.target.value)}
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
  display: flex;
  justify-content: center;
  align-items: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 70px;
  width: 98.5%;
`;

const TitleMap = styled.h2`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 12%;
  left: 50%;
`;

const Card = styled.div`
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

// width: max-content;
const PlaceLabel = styled.p`
  color: black;
  display: flex;
  justify-content: center;
  font-size: 18px;
  margin: 3px 0;
`;

const PlaceTitle = styled.h4`
  display: flex;
  justify-content: center;
`;

const ReviewDesc = styled.p`
  width: max-content;
  color: black;
  font-size: 13px;
  border-bottom: 0.5px solid blue;
  margin: 3px 0;
`;

// width: max-content;
const RatingLabel = styled.p`
  color: black;
  display: flex;
  justify-content: center;
  font-size: 18px;
  margin: 3px 0;
`;

const Stars = styled.p`
  color: gold;
  display: flex;
  justify-content: center;
`;

const CardUsername = styled.span`
  font-size: 14px;
  display: flex;
  justify-content: center;
`;

const CardDate = styled.span`
  display: flex;
  justify-content: center;
`;

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

// width: max-content;
const TitleLabel = styled.p`
  color: black;
  font-size: 18px;
  margin: 3px 0;
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;

const InputTitle = styled.input``;

const Button = styled.button`
  border: none;
  padding: 10px;
  border-radius: 5px;
  color: white;
  background-color: #f59700;
  cursor: pointer;

  &:hover {
    background-color: #cc7e00;
  }
`;
