import { CssBaseline, Grid ,Button,Box, Typography} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { getAllRestuarants } from '../Api/apiService'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Global } from '@emotion/react';
import Header from './components/Header/Header';
import Map from './components/Map/Map';
import List from './components/List/ResturantList';

// MOBILE FIRST
export default function Root() {
  const [places, setPlaces] = useState();
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [clickedName, setClickedName] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  const [apiFilterOptions,setApiFilterOptions]  = useState({
    rangeOfOption:"15",
  });

  const isMobile = useMediaQuery('(max-width:768px)');


  

  console.log(apiFilterOptions);

  const toggleDrawer = (newOpen) => () => {
    setIsDrawerOpen(newOpen)
  }

  useEffect(() => {
    getAllRestuarants(bounds,apiFilterOptions)
      .then((data) => {
        if (data === undefined) {
          console.log("undef")
        } else {
          console.log(data);
         let filterdData = data.filter((place)=>{
           return place.name !== undefined;
         })
         console.log(filterdData);
          setPlaces(filterdData);
        }
      })
  }, [bounds])

 
  return (
    <div>
      <CssBaseline />
       <Header setCoordinates={setCoordinates}></Header> 
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            overflow: 'visible',

          },
        }}
      />
      <Grid container style={{ width: '100%',  height: "100vh", }}>
        {isMobile ?
         <SwipeableDrawer 
          anchor="bottom"
           open={isDrawerOpen} 
         onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)}>

          
          <List
            places={places}
            clickedName={clickedName}
          />
          </SwipeableDrawer> 
          : <Grid item xs={12} md={4} sx={{ height: "100%" }} >
          <List
            places={places}
            clickedName={clickedName}
            setApiFilterOptions={setApiFilterOptions}
            apiFilterOptions={apiFilterOptions}

          />
        </Grid>}

        <Grid item xs={12} md={8} sx={{ height: "200px" }}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            bounds={bounds}
            places={places}
            setClickedName={setClickedName}
          />
        </Grid>
      </Grid>
    </div>
  );
}