import React from "react";
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';


const DEFAULT_PLACEHOLDER_IMAGE = 
"https://via.placeholder.com/300.png/09f/fff";



const Restaurant = ({restaurant}) =>{
    const poster = 
    restaurant.restaurant.thumb === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE: restaurant.restaurant.thumb;
    return (
        <div>
        <GridListTile key={restaurant.restaurant.name}>
        <img src={poster} alt={`restaurant: ${restaurant.restaurant.name}`} />
        <GridListTileBar
          title={restaurant.restaurant.name}
          subtitle={restaurant.restaurant.location.address}
        />
      </GridListTile>
     
      </div>
    );
};

export default Restaurant;