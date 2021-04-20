import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";

import buy_aix_contract from "../../contracts/buy_aix.json";
import smart_aix_contract from "../../contracts/smartAIX.json";

import useContracts from "../../hooks/useContracts";
import { useStoreState } from "../../store/globalStore";
import ConnectWeb3 from "./ConnectWeb3";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { BigNumber } from "bignumber.js";
import goumai from "../../assets/images/goumai@2x.png";
import jeichu from "../../assets/images/jeichu@2x.png";
import zhiya from "../../assets/images/zhiya@2x.png";
import quanwang from "../../assets/images/quanwang@2x.png";
import jiedian from "../../assets/images/jiedian@2x.png";

import {
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

// Input
const useStyles2 = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const theme = createMuiTheme();

theme.typography.h3 = {
  fontSize: '1rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

const MainChinese: React.FunctionComponent = () => {

  const classes = useStyles();

  const { connected } = useStoreState((state) => state);
  const { approveTokenAIX, depositAIX, withDrawAIX, 
    checkTotalReward, checkBalanceAIX, checkBalanceAIXT, approveToken, 
    buyAIX, sellAIX, checkUserInfo, checkInvitorReward, checkViewStaticReward, checkViewTeamReward,
    checkTotalDeposit } = useContracts();

  const [open, setOpen] = useState(false);
  const [claimableReward, setReward] = useState('0');
  const [claimableTeamReward, setTeamReward] = useState('0');
  const [claimableStaticReward, setStaticReward] = useState('0');
  const [claimableInvitorReward, setInvitorReward] = useState('0');

  const [stackedTeamPercent, setTeamPercent] = useState('0');
  const [stackedStaticPercent, setStaticPercent] = useState('0');
  const [stackedInvitorPercent, setInvitorPercent] = useState('0');

  const [totalDeposit, setTotalDeposit] = useState('0');

  const [aixtBalance, setAIXTBalance] = useState('0');
  const [aixBalance, setAIXBalance] = useState('0');
  const [aixDepositAmount, setDepositAmount] = useState('0');
  const [aixWithdrawAmount, setWithdrawAmount] = useState('0');
  const [aixBuyAmount, setBuyAIXAmount] = useState('0');
  const [aixSellAmount, setSellAIXAmount] = useState('0');
  const [invitorAddress, setInvitorAddress] = useState('');
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    async function process() {
      try {
        await checkRewardOfClaim()
      } catch (error) {
        console.log(error)
      }
    }
    if(connected){
      process()
    }
    var lanBtn = document.getElementById('language-btn');
    var walletAddr = document.getElementById('wallet-address');
    console.info(connected);
    if (!connected) {
      document.body.style.background = "white";
      if (walletAddr !== null && walletAddr !== undefined) {
        walletAddr.style.display = "block";
      }
    }else{
      document.body.style.background="linear-gradient(to right, #4F5799 0%,#687EC2 100%)";
      if (lanBtn !== null && lanBtn !== undefined) {
        lanBtn.style.background = "none";
        lanBtn.style.color = "white";
      }
      if (walletAddr !== null && walletAddr !== undefined) {
        walletAddr.style.display = "none";
      }
    }
  },  [connected])

  const checkRewardOfClaim = async () => {
    try {
      const reward = await checkTotalReward();
      const staticReward = await checkViewStaticReward();
      const invitorReward = await checkInvitorReward();
      const teamReward = await checkViewTeamReward();
      const aixBal = await checkBalanceAIX();
      const aixtBal = await checkBalanceAIXT();
      const _totalDeposit = await checkTotalDeposit()
      const userInfoDetails: any = await checkUserInfo()
      console.log('userInfoDetails: ', userInfoDetails, parseFloat(userInfoDetails[0])/1e18)

      setReward(reward)
      setStaticReward(staticReward)
      setInvitorReward(invitorReward)
      setTeamReward(teamReward)
      setAIXBalance(aixBal)
      setAIXTBalance(aixtBal)
      setTotalDeposit(_totalDeposit)
      setUserInfo(userInfoDetails)
      if(userInfoDetails[2] != '0x0000000000000000000000000000000000000000') {
        setInvitorAddress(userInfoDetails[2]);
      }

      const staticPercent = new BigNumber(userInfoDetails[0]).multipliedBy(100).div(new BigNumber(_totalDeposit))
      // const invitorPercent = new BigNumber(invitorReward).multipliedBy(100).div(new BigNumber(_totalDeposit))
      const teamPercent = new BigNumber(userInfoDetails[5]).multipliedBy(100).div(new BigNumber(_totalDeposit))

      setStaticPercent(staticPercent.toString())
      // setInvitorPercent(invitorPercent.toString())
      setTeamPercent(teamPercent.toString())

    } catch (error) {
      console.log('checkRewardOfClaim-error', error)
    }
  }

  const handleDepositAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDepositAmount(event.target.value);
  };

  const handleWithdrawAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawAmount(event.target.value);
  };

  const handleInvitorAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInvitorAddress(event.target.value);
  };

  const handleBuyAIXAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyAIXAmount(event.target.value);
  };

  const handleSellAIXAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSellAIXAmount(event.target.value);
  };

  return (
    !connected ? ( 
      <div style={{margin: "auto", width: "50%", padding: "0px", marginLeft: "0%"}}>
        <ConnectWeb3 />
      </div>
      ) : (
    <>
    <Container>
      <div>
        <Grid container spacing={3} >
          <Grid item xs={12}>
            <div className="checking-allowance">
              <ThemeProvider theme={theme}>
                <Typography variant="h3" style={{fontSize: '0.9rem', color: "rgba(255,255,255,0.4)", textAlign: "center"}}>AIXT收益</Typography>
              </ThemeProvider> 
            </div>
             <div className="checking-allowance">
              <ThemeProvider theme={theme}>
                <Typography variant="h5" style={{fontSize: '1rem', color:"rgba(255,255,255)", textAlign: "center", width:"100%",overflow:"hidden",textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{parseFloat(claimableReward)/1e18} AIXT</Typography>
              </ThemeProvider>
            </div>
          </Grid>
          <Grid item xs={4}>
              <div className="checking-allowance" style={{marginTop:"5px"}}>
                <ThemeProvider theme={theme}>
                  <Typography variant="h5" style={{fontSize: '0.8rem', color:"rgba(255,255,255)", textAlign: "center", width:"100%",overflow:"hidden",textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{parseFloat(userInfo[0])/1e18} AIX({parseFloat(stackedStaticPercent)}%)</Typography>
                </ThemeProvider>
              </div>
              <div className="checking-allowance">
                <ThemeProvider theme={theme}>
                  <Typography variant="h3" style={{fontSize: '1rem', color: "rgba(255,255,255,0.4)", textAlign: "center", whiteSpace:"nowrap"}}>質押的AIX</Typography>
                </ThemeProvider> 
              </div>
          </Grid>
          <Grid item xs={4}>
              <div className="checking-allowance" style={{marginTop:"5px"}}>
                <ThemeProvider theme={theme}>
                  <Typography variant="h5" style={{fontSize: '0.8rem', color:"rgba(255,255,255)", textAlign: "center", width:"100%",overflow:"hidden",textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{parseFloat(aixtBalance)/1e18} AIXT</Typography>
                </ThemeProvider>
              </div>
              <div className="checking-allowance">
                <ThemeProvider theme={theme}>
                  <Typography variant="h3" style={{fontSize: '1rem', color: "rgba(255,255,255,0.4)", textAlign: "center", whiteSpace:"nowrap"}}>AIXT餘額</Typography>
                </ThemeProvider> 
              </div>
          </Grid>
           <Grid item xs={4}>
              <div className="checking-allowance" style={{marginTop:"5px"}}>
                <ThemeProvider theme={theme}>
                  <Typography variant="h5" style={{fontSize: '0.8rem', color:"rgba(255,255,255)", textAlign: "center", width:"100%",overflow:"hidden",textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{parseFloat(aixBalance)/1e18} AIX</Typography>
                </ThemeProvider>
              </div>
              <div className="checking-allowance">
                <ThemeProvider theme={theme}>
                  <Typography variant="h3" style={{fontSize: '1rem', color: "rgba(255,255,255,0.4)", textAlign: "center", whiteSpace:"nowrap"}}>AIX餘額</Typography>
                </ThemeProvider> 
              </div>
            </Grid>
                <Grid item xs={4} spacing={0} style={{padding:'0px'}}>
                <div className="checking-allowance" style={{textAlign: "center",backgroundColor:"white",padding:'20px',borderTopLeftRadius:"10px",borderBottomLeftRadius:"10px"}}>
                  <ThemeProvider theme={theme}>
                    <Link to='/cn/buy' style={{textDecoration:"none"}}>
                      <img src={goumai} style={{width:'45%', height:'45%'}}/>
                      <div className="txt" style={{color:"black", textDecoration:"none"}}>購買AIX</div>
                    </Link>
                  </ThemeProvider>
                </div>
                </Grid>
                <Grid item xs={4} spacing={0} style={{padding:'0px',border:'none'}}>
                <div className="checking-allowance" style={{textAlign: "center",backgroundColor:"white",padding:'20px',marginLeft:"-1px",marginRight:"-1px"}}>
                  <ThemeProvider theme={theme}>
                    <Link to='/cn/pledge' style={{textDecoration:"none"}}>
                      <img src={jeichu} style={{width:'44%', height:'44%'}}/>
                      <div className="txt" style={{color:"black"}}>質押AIX</div>
                    </Link>
                  </ThemeProvider>
                </div>
                </Grid>
                <Grid item xs={4} style={{padding:'0px',border:'none'}}>
                <div className="checking-allowance" style={{textAlign: "center",padding:'20px', backgroundColor:"white",borderTopRightRadius:"10px",borderBottomRightRadius:"10px"}}>
                  <ThemeProvider theme={theme}>
                    <Link to='/cn/relieve' style={{textDecoration:"none"}}>
                      <img src={zhiya} style={{width:'45%', height:'45%'}}/>
                      <div className="txt" style={{color:"black", textDecoration:"none", whiteSpace:"nowrap"}}>解除質押</div>
                    </Link>
                  </ThemeProvider>
                </div>
                </Grid>
        <Grid item xs={6} style={{paddingLeft:"0px",color:"rgba(0,0,0,1)"}}>
            <Paper className={classes.paper} style={{borderRadius:"10px",color:"rgba(0,0,0,1)"}}>
              <div className="checking-allowance" style={{color:"rgba(0,0,0,1)", textAlign: "left"}}>
                <ThemeProvider theme={theme}>
                  <Typography variant="inherit" style={{fontSize: '0.8rem',display:"block", width:"100%",overflow:"hidden",textOverflow:"ellipsis", whiteSpace:"nowrap"}}><span style={{fontSize:"1rem"}}>{parseFloat(totalDeposit)/1e18}</span> AIX</Typography>
                </ThemeProvider>
              </div>
              <div className="checking-allowance" style={{marginTop:"40px", textAlign: "left"}}>
                <img className="icon" src={quanwang} width="20px" height="20px"/>
              </div>
              <div className="checking-allowance">
                <ThemeProvider theme={theme}>
                  <Typography variant="h3" style={{fontSize: '0.9rem', color:"rgba(0,0,0,0.4)", textAlign: "left", whiteSpace:"nowrap"}}>AIX全網質押總量</Typography>
                </ThemeProvider> 
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6} style={{paddingRight:"0px"}}>
            <Paper className={classes.paper} style={{borderRadius:"10px"}}>
              <div className="checking-allowance" style={{color:"rgba(0,0,0,1)", textAlign: "left"}}>
                <ThemeProvider theme={theme}>
                  <Typography variant="inherit" style={{fontSize: '0.8rem',display:"block",width:"100%",overflow:"hidden",textOverflow:"ellipsis", whiteSpace:"nowrap"}}><span style={{fontSize:"1rem"}}>{parseFloat(userInfo[5])/1e18}</span> AIX</Typography>
                  <Typography variant="inherit" style={{fontSize: '0.8rem', display:'block',width:"100%",overflow:"hidden",textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{parseFloat(stackedTeamPercent)}%</Typography>
                </ThemeProvider>
              </div>
              <div className="checking-allowance" style={{marginTop:"22px", textAlign: "left"}}>
                <img className="icon" src={jiedian} width="20px" height="20px"/>
              </div>
              <div className="checking-allowance">
                <ThemeProvider theme={theme}>
                  <Typography variant="h3" style={{fontSize: '0.9rem', color:"rgba(0,0,0,0.4)", textAlign: "left", whiteSpace:"nowrap"}}>節點質押總量</Typography>
                </ThemeProvider> 
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6} style={{backgroundColor:"#FFFFFF",padding:'10px 5px 10px 0px',borderTopLeftRadius:"10px",margin:"-1px"}}>
              <div className="checking-allowance">
                <ThemeProvider theme={theme}>
                  <Typography variant="inherit" style={{fontSize: '1rem', color:"rgba(0,0,0,0.4)", textAlign: "left", paddingLeft:"13px"}}>質押礦池</Typography>
                </ThemeProvider> 
              </div>
          </Grid>
          <Grid item xs={4} style={{backgroundColor:"#FFFFFF",padding:'10px 5px 10px 0px',margin:"-1px"}}>
              <div className="checking-allowance">
                <ThemeProvider theme={theme}>
                  <Typography variant="inherit" style={{fontSize: '0.9rem', display:'block', textAlign: "right", paddingRight:"13px",width:"100%",overflow:"hidden",textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{parseFloat(claimableStaticReward)/1e18}</Typography>
                </ThemeProvider>
              </div>
          </Grid>
          <Grid item xs={2} style={{backgroundColor:"#FFFFFF",padding:'10px 6px 10px 0px',borderTopRightRadius:"10px",margin:"-1px"}}>
              <div className="checking-allowance">
                <ThemeProvider theme={theme}>
                  <Typography variant="inherit" style={{fontSize: '0.9rem', display:'block', textAlign: "right", paddingRight:"13px", whiteSpace:"nowrap"}}> AIXT</Typography>
                </ThemeProvider>
              </div>
          </Grid>
          <Grid item xs={6} style={{backgroundColor:"#FFFFFF",padding:'10px 5px 10px 0px',margin:"-1px"}}>
            <div className="checking-allowance">
                <ThemeProvider theme={theme}>
                  <Typography variant="inherit" style={{fontSize: '1rem', color:"rgba(0,0,0,0.4)", textAlign: "left", paddingLeft:"13px",margin:"-1px"}}>節點礦池</Typography>
                </ThemeProvider> 
              </div>
          </Grid>
          <Grid item xs={4} style={{backgroundColor:"#FFFFFF",padding:'10px 5px 10px 0px',margin:"-1px"}}>
              <div className="checking-allowance" >
                <ThemeProvider theme={theme}>
                  <Typography variant="inherit" style={{fontSize: '0.9rem', display:'block', textAlign: "right",margin:"-1px", width:"100%",overflow:"hidden",textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{parseFloat(claimableTeamReward)/1e18}</Typography>
                </ThemeProvider>
              </div>
          </Grid>
          <Grid item xs={2} style={{backgroundColor:"#FFFFFF",padding:'10px 6px 10px 0px',margin:"-1px"}}>
              <div className="checking-allowance">
                <ThemeProvider theme={theme}>
                  <Typography variant="inherit" style={{fontSize: '0.9rem', display:'block', textAlign: "right", paddingRight:"13px", whiteSpace:"nowrap"}}> AIXT</Typography>
                </ThemeProvider>
              </div>
          </Grid>
          <Grid item xs={6} style={{backgroundColor:"#FFFFFF",padding:'10px 5px 10px 0px',borderBottomLeftRadius:"10px", margin:"-1px",marginBottom:"30px"}}>   
              <div className="checking-allowance">
                <ThemeProvider theme={theme}>
                  <Typography variant="inherit" style={{fontSize: '1rem', color:"rgba(0,0,0,0.4)", textAlign: "left", paddingLeft:"13px"}}>推薦礦池</Typography>
                </ThemeProvider> 
              </div>
          </Grid>
          <Grid item xs={4} style={{backgroundColor:"#FFFFFF",padding:'10px 5px 10px 0px',margin:"-1px -1px 30px -1px"}}>
              <div className="checking-allowance">
                <ThemeProvider theme={theme}>
                  <Typography variant="inherit" style={{fontSize: '0.9rem', display:'block', textAlign: "right", whiteSpace:"nowrap"}}>{parseFloat(claimableInvitorReward)/1e18}</Typography>
                </ThemeProvider>
              </div>
          </Grid>
          <Grid item xs={2} style={{backgroundColor:"#FFFFFF",padding:'10px 6px 10px 0px',borderBottomRightRadius:"10px",margin:"-1px -1px 30px -1px"}}>
              <div className="checking-allowance">
                <ThemeProvider theme={theme}>
                  <Typography variant="inherit" style={{fontSize: '0.9rem', display:'block', textAlign: "right", paddingRight:"13px", whiteSpace:"nowrap"}}> AIXT</Typography>
                </ThemeProvider>
              </div>
          </Grid>
        </Grid>
      </div>
      </Container>
    </>
  ));
};

export default MainChinese;
