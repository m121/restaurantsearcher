import React, {useState} from "react";
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles(theme => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));

const Search = (props) =>{
    const [searchValue,setSearchValue] = useState("");
    const classes = useStyles();
    
    const handleSearchInputChanges = (e) =>{
        setSearchValue(e.target.value);
    }

    const resetInputField = () =>{
        setSearchValue("")
    }

     const callSearchFunction = (e) =>{
        e.preventDefault();
        props.search(searchValue);
        resetInputField();
    }

    return (
        <form className="search">     
    <Paper className={classes.root}>
        <InputBase
            className={classes.input}
            value={searchValue}
                    onChange={handleSearchInputChanges}
                    type="text"
        />
        <IconButton className={classes.iconButton} aria-label="search">
            <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <Button  variant="contained" color="primary" onClick={callSearchFunction} type="submit" value="Search" >Search</Button>
    </Paper>
        </form>
    );

    
}

export default Search;