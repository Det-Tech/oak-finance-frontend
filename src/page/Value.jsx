import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

import { Avatar } from "antd";
import Logo from "../assets/icons/icon.png";

import Atom from "../assets/icons/Atom.png";
import Bitcoin from "../assets/icons/Bitcoin.png";
import BNB from "../assets/icons/BNB.png";
import Doge from "../assets/icons/Doge.png";
import Ether from "../assets/icons/Ether.png";
import Kucoin from "../assets/icons/Kucoin.png";
import Litecoin from "../assets/icons/Litecoin.png";
import USDC from "../assets/icons/USDC.png";
import USCT from "../assets/icons/USDT.png";
import Wave from "../assets/icons/Wave.png";
import XRP from "../assets/icons/XRP.png";
import POLY from "../assets/icons/POLY.png";
import APEX from "../assets/icons/APEX.png";

import Twitter from "../assets/icons/twitter.png";
import Discord from "../assets/icons/discord.png";
import Github from "../assets/icons/github.png";

import React from "react";
import { useNavigate } from "react-router-dom";
import BigNumber from 'bignumber.js';
import { erc20ABI, hVaultABI, hStrategyABI, hMaster2ChefABI } from 'features/configure';
import { useConnectWallet } from 'features/home/redux/hooks';

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    color: "#3E2701",
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#3E2701",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));


const CONTRACTS = {
  padContract:"0x3f2474AaaFD4a5001096Ced7b91e768A50503b1D",
  lpToken:"0x534E2DD65900fC1C50AC388fFE0310F170A99EC9",
  vaultContract:"0x136556C149aA6C88cEB8cd3A62C9933b29840F9F",
  strategyContract:"0x7eb63900aCC474090328630afF4b9682e851cC08",
  masterChef2Contract: "0x68E515227d3E9037F29A40812785bD0bbA4E2bF3",
}
const units = ['', 'k', 'M', 'B', 'T', 'Q', 'Q', 'S', 'S'];


export default function ValuePage(params) {
  const navigate = useNavigate();
  const { web3, address } = useConnectWallet();
  const [depositPrice, setDepositPrice] = React.useState(0);
  const [depositAmount, setDepositAmount] = React.useState(0);

  const [apy, setApy] = React.useState(0);
  const [dailyApy, setDailyApy] = React.useState(0);
  const [tvl, setTvl] = React.useState(0);
  
  const yearlyToDaily = apy => {
    const g = Math.pow(10, Math.log10(apy + 1) / 365) - 1;

    if (isNaN(g)) {
      return 0;
    }

    return g;
  };

  const getApy = async() => {
    const secondsPerBlock = 3;
    const secondsPerYear = 31536000;

    // get lp token balance of masterChef
    const tokenContract = new web3.eth.Contract(erc20ABI, CONTRACTS.lpToken);
    const balance = await tokenContract.methods.balanceOf(CONTRACTS.masterChef2Contract).call();
    console.log("lp token balance in the masterChef", balance)

    // get poolInfo according to specific poolId from masterChef, in here, we need allocPoint of poolInfo
    const masterChefContract = new web3.eth.Contract(hMaster2ChefABI, CONTRACTS.masterChef2Contract);
    const poolId = 0
    const allocPointInfo = await masterChefContract.methods.poolInfo(poolId).call();
    console.log(allocPointInfo)
    const allocPoint = allocPointInfo["allocPoint"]
    console.log("allocPoint: ", allocPoint)

    // get blockReward and totalAllocPoint from masterChef
    const blockRewards = new BigNumber(await masterChefContract.methods.cakePerBlock(true).call());
    const totalAllocPoint = new BigNumber(await masterChefContract.methods.totalRegularAllocPoint().call());
    console.log("blockRewards: ", blockRewards.toNumber(), "totalAllocPoint: ", totalAllocPoint.toNumber())

    // totalStakeInUsd, poolBlockReward
    // const lpPrice = 1; //await fetchPrice({ oracle: 'lps', id: pool.name });
    const tokenPrice = 0.01; // await fetchPrice({ oracle, id: oracleId });
    const totalStakedInUsd = BigNumber(balance).times(tokenPrice).dividedBy('1e18');
    const poolBlockRewards = blockRewards.times(allocPoint).dividedBy(totalAllocPoint).dividedBy('1e18');
    console.log("totalStakedInUsd: ", totalStakedInUsd.toNumber(), "poolBlockRewards:", poolBlockRewards.toNumber())

    // yearlyRewards, yearlyRewardsInUsd
    const yearlyRewards = poolBlockRewards.dividedBy(secondsPerBlock).times(secondsPerYear);
    const yearlyRewardsInUsd = yearlyRewards.times(tokenPrice);
    console.log("yearlyRewards: ", yearlyRewards.toNumber(), "yearlyRewardsInUsd: ", yearlyRewardsInUsd.toNumber())

    // get APY
    const simpleApy = yearlyRewardsInUsd.dividedBy(totalStakedInUsd*100000).toNumber();
    console.log("simpleApy: ", simpleApy);
    setApy(simpleApy.toFixed(2))
    const totalDaily = yearlyToDaily(simpleApy);
    console.log("totalDaily: ", totalDaily)
    setDailyApy(totalDaily.toFixed(2))
  }

  const getTvl = async() => {
    const vaultContract = new web3.eth.Contract(hVaultABI, CONTRACTS.vaultContract);
    const tvl = await vaultContract.methods.balance().call({from: address})
    console.log("tvl: ", tvl)
    const tvlAmount = formatDecimalFrom18(tvl)
    console.log("tvlAmount: ", tvlAmount)
    const formatTvlAmount = formatTvl(tvlAmount, 0)
    console.log("formatTvlAmount: ", formatTvlAmount)
    setTvl(formatTvlAmount);
  }

  const formatTvl = (tvl, oraclePrice, useOrder = true) => {
    if (oraclePrice) {
      tvl = BigNumber(tvl).times(oraclePrice).toFixed(2);
    }
  
    let order = Math.floor(Math.log10(tvl) / 3);
    if (order < 0 || useOrder === false) {
      order = 0;
    }
  
    const num = tvl / 1000 ** order;
  
    return '$' + num.toFixed(2) + units[order];
  };

  const formatDecimalFrom18 = (amount)=> {
    let num=new BigNumber(amount)
    let denom = new BigNumber(10).pow(18)
    return num.dividedBy(denom).toNumber().toFixed(2);
  }

  const getTotalDeposit = ()=> {
    const contract = new web3.eth.Contract(erc20ABI, CONTRACTS.vaultContract);
    contract.methods.totalSupply().call({from: address}).then(amount=>{

      const vaultContract = new web3.eth.Contract(hVaultABI, CONTRACTS.vaultContract);
      vaultContract.methods.getPricePerFullShare().call({from: address}).then(pricePerFullShare=>{
      console.log("pricePerFullShare: ", pricePerFullShare);
      const _amount = new BigNumber(amount);
      const __amount = formatDecimalFrom18(_amount.multipliedBy(new BigNumber(pricePerFullShare)))
      console.log("totalDepositPrice: ", __amount);
      console.log("pricePerFullShare: ", pricePerFullShare);
      setDepositAmount(formatDecimalFrom18(__amount))
      setDepositPrice(formatDecimalFrom18(__amount*1))
      }).catch(err=>setDepositPrice(0))

    }).catch();
  }

  React.useEffect(() => {
    if(address){
      getTotalDeposit();
      getApy();
      getTvl();
    }
  }, [address])

  return (
    <div className="w-full min-h-screen bg-background relative">
      <div className="flex flex-col items-center justify-center px-20 py-4 Navbar-BG">
        <div className="flex flex-row items-center justify-between w-full mt-10">
          <div className="flex flex-col space-y-2">
            <span className="text-white font-normal text-2xl">Portfolio</span>
            <div className="flex flex-row items-center justify-between space-x-8">
              <div className="flex flex-col space-y-2">
                <span className="text-white font-normal text-sm">
                  DEPOSITED
                </span>
                <span className="text-white font-normal text-2xl">$0.00</span>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-white font-normal text-sm">
                  MONTHLY YIELD
                </span>
                <span className="text-white font-normal text-2xl">$0.00</span>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-white font-normal text-sm">
                  DAILY YIELD
                </span>
                <span className="text-white font-normal text-2xl">$0.00</span>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-white font-normal text-sm">AVG APY</span>
                <span className="text-white font-normal text-2xl">0 %</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between space-x-8">
            <div className="flex flex-col space-y-2 items-end">
              <span className="text-white font-normal text-sm">TVM</span>
              <span className="text-white font-normal text-xl">$0.00</span>
            </div>
            <div className="flex flex-col space-y-2 items-end">
              <span className="text-white font-normal text-sm">VAULTS</span>
              <span className="text-white font-normal text-xl">12</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-10 max-w-6xl w-full mx-auto px-2">
        <div className="flex flex-row items-start justify-between w-full">
          <div className="flex flex-col space-y-4 items-stretch">
            <input
              className="bg-cu-gray p-4 text-xs rounded border-none outline-none text-white"
              placeholder="Search vaults"
            />
            <div className="flex flex-row items-center space-x-4">
              <div className="bg-radian-purple-200 rounded px-2 py-2 flex flex-row items-center justify-center">
                <span className="text-white text-lg font-normal w-full text-center">
                  Filters:
                </span>
              </div>
              <div className="bg-cu-gray py-2 flex flex-row space-x-2 items-center px-2 rounded">
                <span className="text-white opacity-40 text-lg font-normal w-full text-center">
                  Platform:
                </span>
                <select
                  name="cars"
                  id="cars"
                  className="border-none outline-none bg-transparent text-white text-lg"
                >
                  <option value={1} className="bg-cu-gray text-white">
                    All
                  </option>
                  <option value={2} className="bg-cu-gray text-white">
                    S1
                  </option>
                </select>
              </div>
              <div className="bg-cu-gray flex flex-row space-x-2 items-center px-2 rounded">
                <span className="text-white opacity-40 text-lg font-normal w-full text-center py-2">
                  Vault type:
                </span>
                <select
                  name="cars"
                  defaultValue={2}
                  id="cars"
                  className="border-none outline-none bg-transparent text-white text-lg py-2"
                >
                  <option value={1} className="bg-cu-gray text-white">
                    All
                  </option>
                  <option value={2} className="bg-cu-gray text-white">
                    Stable LPs
                  </option>
                </select>
              </div>
              <div className="bg-cu-gray py-2 flex flex-row space-x-2 items-center px-2 rounded">
                <span className="text-white opacity-40 text-lg font-normal w-full text-center">
                  Asset:
                </span>
                <select
                  name="cars"
                  id="cars"
                  className="border-none outline-none bg-transparent text-white text-lg"
                >
                  <option value={1} className="bg-cu-gray text-white">
                    All
                  </option>
                  <option value={2} className="bg-cu-gray text-white">
                    S1
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center space-x-2">
            <span className="text-white font-semibold text-lg">
              Hide zero balances
            </span>
            <IOSSwitch />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between bg-radian-purple-200 rounded py-2 w-full mt-10">
          <span className="text-white text-center text-sm font-medium flex-[4]">
            VAULT
          </span>
          <span className="text-white text-center text-sm font-medium flex-[3]">
            WALLET
          </span>
          <span className="text-white text-center text-sm font-medium flex-[3]">
            Deposited
          </span>
          <span className="text-white text-center text-sm font-medium flex-[2]">
            APY
          </span>
          <span className="text-white text-center text-sm font-medium flex-[2]">
            DAILY
          </span>
          <span className="text-white text-center text-sm font-medium flex-[2]">
            TVL
          </span>
        </div>
        <div
          className="flex flex-row items-center justify-between bg-cu-gray rounded py-2 w-full my-3"
          onClick={() => navigate("/value/1")}
        >
          <div className="flex-[4] flex flex-row space-x-4">
            <div className="flex flex-row w-full space-x-4 px-4 py-2 items-center">
              <Avatar.Group>
                <Avatar src={USCT} size={32} />
                <Avatar src={USDC} size={32} />
              </Avatar.Group>
              <div className="flex flex-col justify-between">
                <span className="text-white text-opacity-40 text-lg">
                  Platform: MojitoSwap
                </span>
                <span className="text-white text-xl">USDT - USDC LP</span>
              </div>
            </div>
          </div>
          <span className="text-white text-center text-lg font-medium flex-[3]">
            {depositAmount}
          </span>
          <span className="text-white text-center text-lg font-medium flex-[3]">
            {depositPrice}
          </span>
          <span className="text-white text-center text-lg font-medium flex-[2]">
            {apy}
          </span>
          <span className="text-white text-center text-lg font-medium flex-[2]">
            {dailyApy}
          </span>
          <span className="text-white text-center text-lg font-medium flex-[2]">
            {tvl}
          </span>
        </div>
      </div>
    </div>
  );
}
