import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';


export const getAllRestuarants = async (bounds, apiFilterOptions) => {
    console.log(apiFilterOptions)
  if(bounds  === null){
        } else {
    try {
      const {data: { data }} = await axios.get(URL, {
        params: {
          bl_latitude: bounds[0].lat,
          tr_latitude: bounds[1].lat,
          bl_longitude: bounds[0].lng,
          tr_longitude: bounds[1].lng,
          limit: apiFilterOptions.rangeOfOption,
        },
        headers: {
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
          'X-RapidAPI-Key': '811b53e259msh2d94fa614d99f0ap184e92jsn18f57292f0bd',
        },
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
};
