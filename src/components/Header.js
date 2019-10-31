import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';






const header = (props) => {

    

    return (
        <div >
            <AppBar position="static">
        <Toolbar>
         
          <Typography variant="h6" >
          {props.text}
          </Typography>
         
        </Toolbar>
      </AppBar>
        </div>
    );
};

export default header;