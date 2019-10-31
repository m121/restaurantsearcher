import React, { useReducer, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import "../App.css";
import Header from "./Header";
import Restaurant from "./Restaurant";
import Search from "./Search";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles(theme => ({
 
  gridList: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: theme.palette.background.paper,
    overflow: 'hidden',
    justifyContent: 'center',
   
   
  }

}));


const MOVIE_API_URL = "https://developers.zomato.com/api/v2.1/search";


const initialState = {
  loading: true,
  restaurants : [],
  errorMessage: null
};


const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_RESTAURANT_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_RESTAURANT_SUCCESS":
      return {
        ...state,
        loading: false,
        restaurants: action.payload
      };
    case "SEARCH_RESTAURANT_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};



const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();


    useEffect(() => {
    
        fetch(MOVIE_API_URL,{
            method: 'GET',
            headers:{
              'user-key': 'a24baaa7e3fa4498372c3ed83f82296e'
            } })
            .then(response => response.json())
            .then(jsonResponse => {
        
            dispatch({
                type: "SEARCH_RESTAURANT_SUCCESS",
                payload: jsonResponse.restaurants
        	});
      	});
  	}, []);

    const search = searchValue => {
    	dispatch({
      	type: "SEARCH_RESTAURANT_REQUEST"
      });
      
      fetch('https://developers.zomato.com/api/v2.1/locations?query='+searchValue,{
          method: 'GET',
          headers:{
            'user-key': 'a24baaa7e3fa4498372c3ed83f82296e'
          } })
      	.then(response => response.json())
      	.then(jsonResponse => {
        	if (jsonResponse.status === 'success') {
            
            fetch('https://developers.zomato.com/api/v2.1/search?entity_id='+jsonResponse.location_suggestions[0].entity_id+'&entity_type=city&start=0&count=20',{
              method: 'GET',
              headers:{
                'user-key': 'a24baaa7e3fa4498372c3ed83f82296e'
              } })
            .then(response => response.json())
            .then(jsonResponse => {
              if (jsonResponse.results_found > 0) {
                dispatch({
                    type: "SEARCH_RESTAURANT_SUCCESS",
                    payload: jsonResponse.restaurants
                });
              } else {
                dispatch({
                    type: "SEARCH_RESTAURANT_FAILURE",
                    error: jsonResponse.results_found
                });
              }
            });
        	} 
      	});
	
        
	  };

    const { restaurants, errorMessage, loading } = state;

    return (
    <div className="App">
      <Header text="GlotonApp" />
      <Search search={search} />
     
      <div>
        {loading && !errorMessage ? (
         <CircularProgress />
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          
          <GridList cellHeight={180}  className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">Restaurants</ListSubheader>
          </GridListTile>
          {restaurants.map((restaurant, index) => (
            <Restaurant key={`${index}-${restaurant.restaurant.name}`} restaurant={restaurant}  />
          ))}
          </GridList>
         
        )}
      </div>
    </div>
  );
};

export default App;