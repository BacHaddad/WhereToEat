import React, { useCallback, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import useMediaQuery from '@mui/material/useMediaQuery';


const containerStyle = {
  width: '100%',
  height: "100vh",
  marginBottom: "10px",
};

function GoogleMapFunction({ setCoordinates, setBounds, coordinates, bounds, places, setClickedName }) {
  const [map, setMap] = React.useState(null);
  const isMobile = useMediaQuery('(max-width:420px)');
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCgWufTqe3OlC88mQXprFGSChtR5W7w6mw',
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const success = pos => {
    console.log("GEOLOCATION")
    const crd = pos.coords;
    setCoordinates({
      lat: Number(crd.latitude),
      lng: Number(crd.longitude),
    });
  };
  const error = () => {
    console.log('no position available');
  };

  const onLoad = map => {
    const position = new window.google.maps.LatLngBounds(coordinates);
    console.log("MAP")
    setMap(map);
    setTimeout(() => {
      test(map)
    }, 100)

  };


  const onUnmount = map => {
    console.log('unmounted');
    setMap(null);

  };
  const test = (map) => {
    let pos = map.getBounds();
    setBounds([
      {
        lat: pos.getNorthEast().lat(),
        lng: pos.getNorthEast().lng()
      },
      {
        lat: pos.getSouthWest().lat(),
        lng: pos.getSouthWest().lng()
      }
    ])

  }
  const onDragChange = () => {
    let newBounds = map.getBounds();
    setBounds([
      {
        lat: newBounds.getNorthEast().lat(),
        lng: newBounds.getNorthEast().lng()
      },
      {
        lat: newBounds.getSouthWest().lat(),
        lng: newBounds.getSouthWest().lng()
      }
    ])
  }


  const clickedOnInfoWindow = (name, index) => {
    console.log(index)
    setClickedName(index)
  }

  return isLoaded ? (

    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coordinates}
      zoom={17}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onDragEnd={onDragChange}

    >

      <Marker position={coordinates}>
      </Marker>
      {places?.map((place, index) => {

        let localLatLngObj = {
          lat: Number(place.latitude),
          lng: Number(place.longitude),
        }
        return (

          <InfoWindow key={index} position={localLatLngObj} >
            <Paper sx={{ height: "75px", width: "35px", cursor: "pointer" }} onClick={() => { clickedOnInfoWindow(place, index) }} >
              {place.name}
              <Box style={{ width: "30", height: "30px" }} component="img" src={place.photo ? place.photo.images.thumbnail.url : <></>} alt="Picture"></Box>

            </Paper>
          </InfoWindow>
        )
      })}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default GoogleMapFunction;
