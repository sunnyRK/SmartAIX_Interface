import React from "react";
import { useStoreState } from "../../store/globalStore";
import logo from "../../assets/images/logo.png";
import { createMuiTheme, ThemeProvider, makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }),
);

const theme = createMuiTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

const refresh = ()=> {
    window.location.reload();
};

const InfoHeader: React.FunctionComponent = () => {

  const classes = useStyles();

  const { account, network } = useStoreState((state) => state);

  return (
    <div className="header">
      <div className="title" style={{display:"inline-block",width: "30%"}}>
        {/* <img src={logo} style={{width: "30%", height: "30%", marginBottom:"0.1%"}}></img> */}
        <Avatar alt="Remy Sharp" src={logo} className={classes.large} onClick={() => refresh()}
          style={{width: "90%", height: "60%", padding: "20px", paddingLeft:"0px",marginBottom:"1%"}} />
          <Typography variant="h3" style={{fontSize: '0.9rem', color: "white", marginBottom:"1%"}}>
            {account ? `(${network}) ${account}` : "connect wallet to continue"}
          </Typography>
      </div>
      <Grid spacing={3} style={{display:"inline-block", float:"right"}}>    
        <Grid item xs={2}>
          <Link to="/chinees" style={{color:"#ffffff", textDecoration: "none"}}>
            <div
            id="language-btn"
              className="approve-token-button"
              style={{width:"50px", paddingTop:"1.5rem",marginRight:"20px",color: '#6C79D3'}}
            >
              CN
            </div>
          </Link>
        </Grid>
      </Grid>
      <div id="wallet-address" className="wallet-address" style={{display:"none"}}>
        {/* {account ? `(${network}) ${account}` : "connect wallet to continue"} */}
        <ThemeProvider theme={theme}>
          <Typography variant="h3" style={{fontSize: '0.6rem', color: "black", marginBottom:"1%"}}>
            {account ? `(${network}) ${account}` : "connect wallet to continueeeee"}
          </Typography>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default InfoHeader;
