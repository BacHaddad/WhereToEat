import React, { createRef, useEffect, useRef, useState } from 'react';
import { Card, IconButton, Typography, Paper, Box, Button, Menu, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Slider from '@mui/material/Slider';

const cardStyle = { margin: "auto", marginTop: "20px", width: "70%", padding: "15px", cursor: "pointer", display: "flex", flexDirection: "column", marginBottom: "10px" }

//Vi kan fixa det sen med css etc när vi har datan vi behöver
export default function ResturantList({ places, clickedName, setApiFilterOptions }) {
  let placeArr = places;
  let placeArrLength = placeArr?.length;
  let [elRefs, setElRefs] = useState([]);
  const [filteredNumber, setFilteredNumber] = useState(0)


  const [anchorElement, setAnchorElement] = useState(null);
  let open = Boolean(anchorElement)
  useEffect(() => {
    setElRefs((elRefs) => Array(placeArrLength).fill().map((_, i) => elRefs[i] || createRef()))
  }, [placeArr])

  useEffect(() => {
    elRefs[clickedName]?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [clickedName])

  const handleFilterClick = (e) => {

    setAnchorElement(e.currentTarget);

  }
  const handleClose = () => {
    setAnchorElement(null);
    setApiFilterOptions({
      rangeOfOption: String(filteredNumber),
    })
  }
  const sliderChanged = (e) => {
    setFilteredNumber(e.target.value)
  }

  //background: linear-gradient(90deg, violet, lightblue);
  return (
    <Paper sx={{
      background: "	#D8D8D8",
      overflowY: "scroll",
      height: "100%",
      width: "100%",
      border: "none",


    }}>

      <Box sx={{ marginTop: "5px", height: "50px", width: "100%", padding: "10px", display: "flex", justifyContent: "flex-end" }}>
        <Typography style={{ marginRight: "auto" }}>Results:</Typography>
        <Typography>Filter results</Typography>

        <IconButton sx={{ color: "black" }} onClick={handleFilterClick}> <FilterListIcon ></FilterListIcon></IconButton>

      </Box>

      <Menu
        anchorEl={anchorElement}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{
          width: "400px",
          height: "250px",
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",



        }}>
          <Typography>Filter your results</Typography>
          <div style={{ transform: "translateY(27px)", display: "flex", justifyContent: "space-between", width: "100%" }}><span>15</span>
            <span>30</span></div>
          <Slider min={15} max={30} step={1} onChange={sliderChanged} sx={{ width: "80%", margin: "0 auto 0 auto" }} aria-label="Default" valueLabelDisplay="auto" />
          <Button variant='outlined' style={{ width: "25%", alignSelf: "flex-end", marginTop: "auto" }} onClick={handleClose}>Spara</Button>
        </Box>
      </Menu>
      {placeArr?.map((place, index) => (

        <Card
          key={index}
          ref={elRefs[index]}
          sx={{ margin: "auto", marginTop: "20px", width: "70%", padding: "15px", cursor: "pointer", display: "flex", flexDirection: "column" }}
          style={{ background: `${place.name === clickedName.name ? "red" : "white"}` }}

        >
          <Typography variant='h5' >{place.name}</Typography>
          <Typography variant='p' >{place.address}</Typography>
          <Typography variant='p' >  {place.rating}</Typography>
          <Box mb={1} component="img" src={place.photo ? place.photo.images.small.url : <></>} alt="Picture"></Box>
          <Button href={place.web_url}>Learn more</Button>
        </Card>
      ))}
    </Paper>
  )
}

