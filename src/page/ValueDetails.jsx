import { Avatar } from "antd";
import React from "react";
import Logo from "../assets/icons/icon.png";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

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

import { AreaChart } from "react-chartkick";
import "chartkick/chart.js";

import Twitter from "../assets/icons/twitter.png";
import Discord from "../assets/icons/discord.png";
import Github from "../assets/icons/github.png";

import LaunchIcon from "@mui/icons-material/Launch";

import { useNavigate } from "react-router-dom";
import { useConnectWallet } from 'features/home/redux/hooks';

import { erc20ABI, hVaultABI, hStrategyABI, hMaster2ChefABI } from 'features/configure';
import BigNumber from 'bignumber.js';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CONTRACTS = {
  padContract:"0x3f2474AaaFD4a5001096Ced7b91e768A50503b1D",
  lpToken:"0x534E2DD65900fC1C50AC388fFE0310F170A99EC9",
  vaultContract:"0x136556C149aA6C88cEB8cd3A62C9933b29840F9F",
  strategyContract:"0x7eb63900aCC474090328630afF4b9682e851cC08",
  masterChef2Contract: "0x68E515227d3E9037F29A40812785bD0bbA4E2bF3",
}
const units = ['', 'k', 'M', 'B', 'T', 'Q', 'Q', 'S', 'S'];


toast.configure();

export default function ValueDetailsPage(params) {
  const { web3, address } = useConnectWallet();
  const [section, setSection] = React.useState(0);
  const [chart, setChart] = React.useState(0);
  const [day, setDay] = React.useState(0);
  const navigate = useNavigate();
  const [value, setValue] = React.useState([0, 25]);

  const [approved, setApproved] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [balance, setBalance] = React.useState(0);
  const [withdrawBalance, setWithdrawBalance] = React.useState(0);

  const [apy, setApy] = React.useState(0);
  const [dailyApy, setDailyApy] = React.useState(0);
  const [tvl, setTvl] = React.useState(0);
  const [depositPrice, setDepositPrice] = React.useState(0);
  const [depositAmount, setDepositAmount] = React.useState(0);

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

  const approval = async(address, contractAddress, tokenAddress, amount) => {
    const contract = new web3.eth.Contract(erc20ABI, tokenAddress);
    const res = await contract.methods
      .approve(contractAddress, amount)
      .send({ from: address })
      .on('transactionHash', function (hash) {
        console.log("hash: ", hash)
        return hash;
      })
      .on('receipt', function (receipt) {
        return new BigNumber('Infinity').toNumber()
      })
      .on('error', function (error) {
        return error
      })
      .catch(error => {
        return error;
      });
      console.log(res);
  }

  const deposit = async(address, contractAddress, amount) => {
    const contract = new web3.eth.Contract(hVaultABI, contractAddress);   
    const res = await contract.methods
      .deposit(amount)
      .send({ from: address })
      .on('transactionHash', function (hash) {
        console.log("hash: ", hash)
        return hash;
      })
      .on('receipt', function (receipt) {
        return new BigNumber('Infinity').toNumber()
      })
      .on('error', function (error) {
        return error
      })
      .catch(error => {
        return error;
      });
      console.log(res);
  }

  const depositAll = async(address, contractAddress) => {
    const contract = new web3.eth.Contract(hVaultABI, contractAddress);   
    const res = await contract.methods
      .depositAll()
      .send({ from: address })
      .on('transactionHash', function (hash) {
        console.log("hash: ", hash)
        return hash;
      })
      .on('receipt', function (receipt) {
        return new BigNumber('Infinity').toNumber()
      })
      .on('error', function (error) {
        return error
      })
      .catch(error => {
        return error;
      });
      console.log(res);
  }

  const withdraw = async(address, contractAddress, amount) => {
    const contract = new web3.eth.Contract(hVaultABI, contractAddress);
    const res = await contract.methods
      .withdraw(amount)
      .send({ from: address })
      .on('transactionHash', function (hash) {
        console.log("hash: ", hash)
        return hash;
      })
      .on('receipt', function (receipt) {
        return new BigNumber('Infinity').toNumber()
      })
      .on('error', function (error) {
        return error
      })
      .catch(error => {
        return error;
      });
      console.log(res);
  }

  const withdrawAll = async(address, contractAddress) => {
    const contract = new web3.eth.Contract(hVaultABI, contractAddress);
    const res = await contract.methods
      .withdrawAll()
      .send({ from: address })
      .on('transactionHash', function (hash) {
        console.log("hash: ", hash)
        return hash;
      })
      .on('receipt', function (receipt) {
        return new BigNumber('Infinity').toNumber()
      })
      .on('error', function (error) {
        return error
      })
      .catch(error => {
        return error;
      });
      console.log(res);
  }

  const harvest = async(address, contractAddress) => {
    const contract = new web3.eth.Contract(hStrategyABI, contractAddress);
    const res = await contract.methods
      .harvest()
      .send({ from: address })
      .on('transactionHash', function (hash) {
        console.log("hash: ", hash)
        return hash;
      })
      .on('receipt', function (receipt) {
        return new BigNumber('Infinity').toNumber()
      })
      .on('error', function (error) {
        return error
      })
      .catch(error => {
        return error;
      });
      console.log(res);
  }

  const maxAmountHandle = async()=> {
    if(section == 0){ 
      const res = await getBalance();
      setAmount(res)
    }else{
      const res = await getWithdrawBalance();
      console.log(res)
      setAmount(res);
    }
  }

  const getBalance = async()=> {
    const contract = new web3.eth.Contract(erc20ABI, CONTRACTS.lpToken);
    return await contract.methods.balanceOf(address).call({from: address}).then(amount=>{
      let num = new BigNumber(amount)
      let ans = num.dividedBy('1e18').toNumber().toFixed(2)
      console.log("my lptoken balance: ", ans, amount);
      setBalance(ans)
      return amount;
    }).catch(err=>{setBalance(0); return 0;})
  }

  const getWithdrawBalance = async()=> {
    const contract = new web3.eth.Contract(erc20ABI, CONTRACTS.vaultContract);
    return await contract.methods.balanceOf(address).call({from: address}).then(amount=>{
      console.log("withdraw balance share: ", amount);
      let num = new BigNumber(amount)
      let ans = num.dividedBy('1e18').toNumber().toFixed(2)
      setWithdrawBalance(ans)
      return ans;
    }).catch(err=>{setWithdrawBalance(0); return 0})
  }

  const depositHandle = ()=> {
    if(amount <= 0) {
      toast.info("Please input the amount", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    if(amount > balance) {
      toast.info("Please decrease the amount", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    let denom = new BigNumber(10).pow(18)
    let num=new BigNumber(amount)
    let _amount = num.multipliedBy(denom).toNumber()
    console.log(address, "", CONTRACTS.vaultContract, "", CONTRACTS.lpToken, "", _amount)

    const id = toast.loading("Approving...", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });

    approval(address, CONTRACTS.vaultContract, CONTRACTS.lpToken, _amount.toString()).then(data=>{
      console.log("approved result data: ", data)
      setApproved(true)

      toast.update(id, {
        render: "Approved successfully!",
        type: "success",
        autoClose: 2000,
        isLoading: false,
      });
      const _id = toast.loading("Depositing...", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });

      deposit(address, CONTRACTS.vaultContract, _amount.toString()).then(data=>{
        console.log("deposited result data: ", data)
        toast.update(_id, {
          render: "Deposited successfully!",
          type: "success",
          autoClose: 2000,
          isLoading: false,
        });
      }).catch(err=>{
        console.log("deposit error:", err)
        toast.update(_id, {
          render: "Got Error!",
          type: "error",
          autoClose: 2000,
          isLoading: false,
        });
      })
    }).catch(err=>{
      toast.update(id, {
        render: "Got Error!",
        type: "error",
        autoClose: 2000,
        isLoading: false,
      });
      console.log("approve error: ", err)
    })
    console.log("approving...")
    
  }

  const depositAllHandle = ()=> {

    const id = toast.loading("Approving...", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
    approval(address, CONTRACTS.vaultContract, CONTRACTS.lpToken, "1000000000000000000000000000000000000000000000000").then(data=>{
      console.log("approved result data: ", data)
      setApproved(true)

      toast.update(id, {
        render: "Approved successfully!",
        type: "success",
        autoClose: 2000,
        isLoading: false,
      });
      const _id = toast.loading("Depositing...", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });

      depositAll(address, CONTRACTS.vaultContract).then(data=>{
        console.log("deposited result data: ", data)
        toast.update(_id, {
          render: "Deposited successfully!",
          type: "success",
          autoClose: 2000,
          isLoading: false,
        });
      }).catch(err=>{
        console.log("deposit error:", err)
        toast.update(_id, {
          render: "Got Error!",
          type: "error",
          autoClose: 2000,
          isLoading: false,
        });
      })
    }).catch(err=>{
      toast.update(id, {
        render: "Got Error!",
        type: "error",
        autoClose: 2000,
        isLoading: false,
      });
      console.log("approve error: ", err)
    })
    console.log("approving...")
    
  }

  const withdrawHandle = ()=> {
    console.log("withdraw...")
    if(amount <= 0){
      toast.info("Please input the amount", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    let denom = new BigNumber(10).pow(18)
    let num=new BigNumber(amount)
    let _amount = num.multipliedBy(denom).toNumber()
   
    console.log(address, "", CONTRACTS.vaultContract, "", _amount)

    const id = toast.loading("Withdrawing...", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
    withdraw(address, CONTRACTS.vaultContract, _amount.toString()).then(data=>{
      console.log("withdrawed result data: ", data)
      toast.update(id, {
        render: "Withdrawed successfully!",
        type: "success",
        autoClose: 2000,
        isLoading: false,
      });
    }).catch(err=>{
      console.log("withdraw error:", err)
      toast.update(id, {
        render: "Got Error!",
        type: "error",
        autoClose: 2000,
        isLoading: false,
      });
    })
  }

  const withdrawAllHandle = ()=> {
    console.log("withdraw...")
    const id = toast.loading("Withdrawing...", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
    withdrawAll(address, CONTRACTS.vaultContract).then(data=>{
      console.log("withdrawed result data: ", data)
      toast.update(id, {
        render: "Withdrawed successfully!",
        type: "success",
        autoClose: 2000,
        isLoading: false,
      });
    }).catch(err=>{
      console.log("withdraw error:", err)
      toast.update(id, {
        render: "Got Error!",
        type: "error",
        autoClose: 2000,
        isLoading: false,
      });
    })
  }

  const harvestHandle = ()=> {
    const id = toast.loading("Harvesting...", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
    harvest(address, CONTRACTS.strategyContract).then(data=>{
      console.log("harvested result data: ", data)
      toast.update(id, {
        render: "Harvested successfully!",
        type: "success",
        autoClose: 2000,
        isLoading: false,
      });
    }).catch(err=>{
      console.log("harvest error:", err)
      toast.update(id, {
        render: "Got Error!",
        type: "error",
        autoClose: 2000,
        isLoading: false,
      });
    })
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
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
      getBalance();
      getWithdrawBalance();
      getTotalDeposit();
      getApy();
      getTvl();
    }
  }, [address])

  return (
    <div className="w-full min-h-screen bg-background relative">
      <div className="flex flex-col items-center justify-center py-10 max-w-6xl w-full mx-auto px-2">
        <span className="w-full text-left text-white font-medium text-lg cursor-pointer mb-6" onClick={()=>navigate('/value')}>
          {"< Back to all vaults"}
        </span>
        <div className="flex flex-row items-center justify-between bg-cu-gray rounded py-2 w-full my-3">
          <div className="flex-[4] flex flex-row space-x-4 items-center">
            <div className="flex flex-row space-x-4 px-4 py-2 items-start">
              <Avatar.Group>
                <Avatar src={USDC} size="large" />
                <Avatar src={USCT} size="large" />
              </Avatar.Group>
              <div className="flex flex-col justify-between">
                <span className="text-white text-lg">USDT - USDC LP</span>
                <div className="flex flex-row space-x-4">
                  <span className="text-base text-white font-semibold">
                    <span className="text-white text-opacity-60">Chain: </span>
                    KCC Chain
                  </span>
                  <span className="text-base text-white font-semibold">
                    <span className="text-white text-opacity-60">
                      Platform:
                    </span>
                    MojitoSwap
                  </span>
                </div>
                <div className="flex flex-row space-x-4 mt-3">
                  <span className="text-base text-white font-semibold">
                    <LaunchIcon className="text-white" /> Buy Token
                  </span>
                  <span className="text-base text-white font-semibold">
                    <LaunchIcon className="text-white" /> Add Liquidity
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-end flex-1 px-6">
              <div className="flex flex-row items-center justify-between space-x-8">
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-sm">
                    DEPOSITED
                  </span>
                  <span className="text-white font-semibold text-2xl">
                    {depositAmount}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-sm">
                    DAILY YIELD
                  </span>
                  <span className="text-white font-semibold text-2xl">
                    {dailyApy}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-sm">
                    AVG APY
                  </span>
                  <span className="text-white font-semibold text-2xl">
                    {apy}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-start justify-between space-x-4 w-full">
          <div className="flex bg-cu-gray rounded p-4 flex-1 flex-col items-center">
            <div className="w-full rounded-full bg-background p-1 flex flex-row">
              <span
                className={`${
                  section === 0
                    ? "bg-cu-green text-opacity-100"
                    : "text-opacity-60"
                } flex-1 text-center py-2 rounded-full text-white cursor-pointer`}
                onClick={() =>{ setSection(0); setAmount(0)}}
              >
                Deposit
              </span>
              <span
                className={`${
                  section === 1
                    ? "bg-cu-green text-opacity-100"
                    : "text-opacity-60"
                } flex-1 text-center py-2 rounded-full text-white cursor-pointer`}
                onClick={() =>{ setSection(1); setAmount(0)}}
              >
                Withdraw
              </span>
            </div>
            <span className={`${section===1?'text-opacity-0':''} mt-4 mb-10 text-white font-semibold text-base w-full text-left`}>
              Deposit your LP
            </span>
            <div className="flex flex-row items-center justify-between w-full my-1">
              <span className="text-white font-semibold text-xs">
                Balance: {section == 0? balance: withdrawBalance} USDT-USDC LP
              </span>
              <span className="text-cu-green font-semibold text-xs cursor-pointer" onClick={maxAmountHandle}>
                MAX
              </span>
            </div>
            <div className="bg-background py-2 flex flex-row space-x-2 items-center justify-between px-2 rounded w-full">
              <select
                name="cars"
                id="cars"
                className="border-none outline-none bg-transparent text-white text-base"
              >
                <option value="All" className="bg-black text-white">
                  USDT-USDC LP
                </option>
                <option value="S1" className="bg-black text-white">
                  USDT-USDC LP
                </option>
              </select>
              <input
                value={amount}
                onChange={(e)=>{setAmount(e.target.value)}}
                placeholder={0}
                type="number"
                className="text-white text-opacity-60 text-base outline-none border-none bg-transparent w-20"
              />
            </div>
            <div className="w-full">
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={value}
                step={1}
                color="success"
                onChange={handleChange}
                valueLabelDisplay="auto"
              />
            </div>
            <button className="w-full text-center mt-10 mb-4 py-2 rounded-full bg-cu-green text-white font-semibold text-base"
              onClick={()=>{section == 0?depositHandle():withdrawHandle()}}
            >              
              {section ==0 ?(!approved? "Deposit": "Deposit"):"Withdraw"}
            </button>
            {section == 0 ? 
              <button className="w-full text-center  py-2 rounded-full bg-cu-green text-white font-semibold text-base"
                onClick={()=>{depositAllHandle()}}
              >              
                {"Deposit All"}
              </button>
            :  
              <button className="w-full text-center  py-2 rounded-full bg-cu-green text-white font-semibold text-base"
                onClick={()=>{withdrawAllHandle()}}
              >              
                {"Withdraw All"}
              </button>
            }
            <button className="w-full text-center mt-4 mb-4 py-2 rounded-full bg-cu-green text-white font-semibold text-base"
              onClick={()=>{harvestHandle()}}
            >              
              {"Harvest"}
            </button>
            <div className="flex flex-col w-full rounded bg-background p-4">
              <span className="text-white font-semibold text-base">
                Oak Fees
              </span>
              <div className="my-4 w-full flex flex-row items-center space-x-24">
                <div className="flex flex-col">
                  <span className="text-white font-normal text-base">
                    Deposit fee
                  </span>
                  <span className="text-white font-semibold text-3xl">0%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-normal text-base">
                    Withdrawal fee
                  </span>
                  <span className="text-white font-semibold text-3xl">0%</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-normal text-base">
                  Performance fee
                </span>
                <span className="text-white font-semibold text-3xl">0.3%</span>
              </div>
              <span className="mt-6 max-w-md w-full text-white font-medium text-sm">
                Performance fees are already subtracted from the displayed APY.
              </span>
            </div>
          </div>
          <div className="flex bg-cu-gray rounded p-4 flex-[2] flex-col">
            <div className="flex flex-row items-center justify-between mb-6 w-full">
              <span className="text-white text-2xl font-semibold">History</span>
              <div className="flex flex-row items-center justify-center bg-background rounded p-1">
                <span
                  className={`w-16 text-center py-1 rounded ${
                    chart === 0
                      ? "bg-cu-green text-opacity-100"
                      : "text-opacity-60"
                  } text-white font-semibold text-base cursor-pointer`}
                  onClick={() => setChart(0)}
                >
                  TVL
                </span>
                <span
                  className={`w-16 text-center py-1 rounded ${
                    chart === 1
                      ? "bg-cu-green text-opacity-100"
                      : "text-opacity-60"
                  } text-white font-semibold text-base cursor-pointer`}
                  onClick={() => setChart(1)}
                >
                  PRICE
                </span>
                <span
                  className={`w-16 text-center py-1 rounded ${
                    chart === 2
                      ? "bg-cu-green text-opacity-100"
                      : "text-opacity-60"
                  } text-white font-semibold text-base cursor-pointer`}
                  onClick={() => setChart(2)}
                >
                  APY
                </span>
              </div>
            </div>
            <AreaChart
              colors={["#28CE8A"]}
              label="Value"
              prefix="$"
              data={{
                "2021-01-01 00:00:00 -0800": 2000,
                "2021-01-01 00:01:00 -0800": 5000,
                "2021-01-01 00:03:00 -0800": 2000,
                "2021-01-01 00:04:00 -0800": 5000,
              }}
            />
            <div className="flex flex-row items-center justify-end space-x-2 mt-4">
              <span
                className={`text-white ${
                  day === 0 ? "text-cu-green" : "text-opacity-60"
                } font-medium cursor-pointer`}
                onClick={() => setDay(0)}
              >
                1D
              </span>
              <span
                className={`text-white ${
                  day === 1 ? "text-cu-green" : "text-opacity-60"
                } font-medium cursor-pointer`}
                onClick={() => setDay(1)}
              >
                1W
              </span>
              <span
                className={`text-white ${
                  day === 2 ? "text-cu-green" : "text-opacity-60"
                } font-medium cursor-pointer`}
                onClick={() => setDay(2)}
              >
                1M
              </span>
              <span
                className={`text-white ${
                  day === 3 ? "text-cu-green" : "text-opacity-60"
                } font-medium cursor-pointer`}
                onClick={() => setDay(3)}
              >
                1Y
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
