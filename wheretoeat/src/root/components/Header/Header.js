
import React, { useState } from "react";
import { Toolbar, AppBar, Typography, InputBase, IconButton, Box } from "@mui/material";
import { SearchBox } from "../../../styledComponents/StyledComponents";
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { Autocomplete } from "@react-google-maps/api";


const SearchInput = styled(InputBase)({
    width: "100%",
    color: "white",
    padding: "20px",
    paddingLeft: "0",
    '& .MuiInputBase-input': {
        width: '12ch',
        transition: " .25s ease-in-out",
        '&:focus': {
            width: '20ch',
        },
        "@media (max-width:420px)": {
            width: "7ch",
            '&:focus': {
                transition: "none",
                width: "7ch",
            },
        }

    },
})

const flexCenter = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}
export default function Header({ props, setCoordinates }) {



    const [autoComplete, setAutoComplete] = useState(null);

    const onLoad = (autoComp) => setAutoComplete(autoComp);
    const onPlaceChange = () => {
        const lat = autoComplete.getPlace().geometry.location.lat();
        const lng = autoComplete.getPlace().geometry.location.lng();
        setCoordinates({ lat, lng });
        console.log('{ lat, lng }', { lat, lng });
    }


    const handlePosition = () => {
        navigator.geolocation.getCurrentPosition(success, error);
    }
    const success = pos => {
        const crd = pos.coords;
        setCoordinates({
            lat: Number(crd.latitude),
            lng: Number(crd.longitude),
        });
    };
    const error = () => {
        console.log('no position available');
    };

    return (
        <div className="wrap">
            <AppBar>
                <Toolbar
                    sx={{
                        backgroundColor: "#121212",
                        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
                        display: "flex", justifyContent: "space-between",
                        height: "64px",

                    }}>
                    <Typography>WhereToEat</Typography>
                    <Box component={"section"} sx={{ display: "flex", flexCenter, }}>
                        <SearchBox style={{ position: "relative" }}>
                            <IconButton sx={{ color: "white", paddingLeft: 1, paddingRight: 1 }}> <SearchIcon /></IconButton>

                            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChange}  >
                                <SearchInput
                                    placeholder="Search…"
                                // onChange={(e) => { handleChange(e) }}
                                // onKeyDown={(e) => {
                                //     if (e.key === "Enter") {
                                //         handleChange(e);
                                //     }
                                // }}
                                >
                                </SearchInput>
                            </Autocomplete>

                        </SearchBox>
                        <IconButton sx={{ marginLeft: "5px" }} onClick={handlePosition} > <LocationSearchingIcon htmlColor={"white"} />   </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}