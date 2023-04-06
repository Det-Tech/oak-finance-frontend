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
import { erc20ABI, hVaultABI, hStrategyABI } from 'features/configure';
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
  padContract:"0x2C24c88f06A316A3995244d10A8D9f881962dBC6",
  lpToken:"0x23cEb1822689A5D3c3E1086075c3fC2cadD372b2",
  vaultContract:"0x13B1f02739Dad0A4Ffc285F566383568D68F99CE",
  strategyContract:"0x4F4e3362105819E17405F85d923600AbF88e5dFE"
}

export default function ValuePage(params) {
  const navigate = useNavigate();
  const { web3, address } = useConnectWallet();
  const [depositPrice, setDepositPrice] = React.useState(0);
  const [depositAmount, setDepositAmount] = React.useState(0);

  React.useEffect(() => {
    if(address){
      const contract = new web3.eth.Contract(erc20ABI, CONTRACTS.vaultContract);
      contract.methods.totalSupply().call({from: address}).then(amount=>{
        let num=new BigNumber(amount)
        let denom = new BigNumber(10).pow(18)
        let ans = num.dividedBy(denom).toNumber().toFixed(2)
        console.log(amount, ans)
        setDepositAmount(ans)

        const _contract = new web3.eth.Contract(hVaultABI, CONTRACTS.vaultContract);
          _contract.methods.getPricePerFullShare().call({from: address}).then(pricePerFullShare=>{
          const _amount = amount * pricePerFullShare;
          console.log("totalDepositPrice", _amount);
          let num=new BigNumber(_amount)
          let denom = new BigNumber(10).pow(18)
          let ans = num.dividedBy(denom).toNumber().toFixed(2)
          console.log("totalDepositPrice", ans);
          setDepositPrice(ans)
          }).catch(err=>setDepositPrice(0))
      }).catch()
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
            0
          </span>
          <span className="text-white text-center text-lg font-medium flex-[2]">
            0
          </span>
          <span className="text-white text-center text-lg font-medium flex-[2]">
            0
          </span>
        </div>
      </div>
    </div>
  );
}
