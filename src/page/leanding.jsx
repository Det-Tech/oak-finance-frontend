// import Background from "../asset/images/Background.png";
import Logo from "../assets/icons/icon.png";
import Add from "../assets/icons/add.png";
import Right from "../assets/icons/right.png";
import Reward from "../assets/icons/reward.png";

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

import Twitter from "../assets/icons/twitter.png";
import Discord from "../assets/icons/discord.png";
import Github from "../assets/icons/github.png";
import Oakfi_bg from "../assets/images/Oakfi_bg.png";

import LaunchIcon from "@mui/icons-material/Launch";

import { useNavigate } from "react-router-dom";

export default function LeandingPage(params) {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-background relative">
      <div className="flex flex-col px-20 py-8 space-y-4">
        <div className="flex flex-col items-center justify-center w-full px-20 py-8 space-4" style={{padding:"10%"}}>
          <span className="text-xs font-medium text-white mb-2">TOTAL VALUE LOCKED</span>
          <span className="text-2xl font-medium text-cu-green">$0.00</span>
          <span className="text-5xl font-semibold text-center max-w-xl text-white my-10">
            Yield Optimizer on Kucoin Community Chain.
          </span>
          <span className="text-base font-light text-white mb-10 max-w-lg text-center">
            We’re a decentralised, yield optimizer that allows its users to earn compound interest
            on their crypto holdings. Optimizing crypto assets for the highest APYs.
          </span>
          <button className="px-10 py-3 rounded-full bg-cu-green text-background font-bold text-base">
            Launch App
          </button>
        </div>
        <div className="flex flex-row w-full items-center justify-center px-20 py-8 space-y-4 space-x-4 mb-10">
          <span className="text-4xl font-semibold text-white">
            Oak Fi Optimizer
          </span>
          <div className="bg-cu-green flex-1 h-1"></div>
        </div>
        <div className="flex flex-row items-stretch justify-center space-x-6">
          <div className="flex-1 rounded-xl Purple-BG px-10 py-10 flex flex-col space-y-2">
            <img alt="" src={Add} className="w-8" />
            <span className="font-semibold py-4 text-xl text-white">
              Liquidity Pools
            </span>
            <div className="flex flex-row py-2 space-x-4 items-center w-[60%]">
              <img alt="" src={Right} className="w-6 h-6" />
              <span className="text-white font-light text-base">
                Stake LP Tokens from external DEX in Oak Fi Vault
              </span>
            </div>
            <div className="flex flex-row py-2 space-x-4 items-center w-[60%]">
              <img alt="" src={Right} className="w-6 h-6" />
              <span className="text-white font-light text-base">
                Earn interest rewards on your LP which is held in Custody by
                OakFi
              </span>
            </div>
            <div className="flex flex-row py-2 space-x-4 items-center w-[60%]">
              <img alt="" src={Right} className="w-6 h-6" />
              <span className="text-white font-light text-base">
                Oak Fi reinvest your interest by purchasing more of the
                underlying token pair to increase rewards
              </span>
            </div>
            <div className="flex flex-row py-2 space-x-4 items-center w-[60%]">
              <img alt="" src={Right} className="w-6 h-6" />
              <span className="text-white font-light text-base">
                Auto-Compound regularly and automatically repeats the process,
                saving you time and Fees
              </span>
            </div>
          </div>
          <div className="flex-1 rounded-xl Brown-BG px-10 py-10 flex flex-col space-y-2">
            <img alt="" src={Reward} className="w-8" />
            <span className="font-semibold py-4 text-xl text-white">
              Oak Reward Pools
            </span>
            <div className="flex flex-row py-2 space-x-4 items-center w-[60%]">
              <img alt="" src={Right} className="w-6 h-6" />
              <span className="text-white font-light text-base">
                Invest in OAK Token, stake it in Reward Pools for a specific
                asset
              </span>
            </div>
            <div className="flex flex-row py-2 space-x-4 items-center w-[60%]">
              <img alt="" src={Right} className="w-6 h-6" />
              <span className="text-white font-light text-base">
                Earn shares of the platform’s revenue which is used to purchase
                the token
              </span>
            </div>
            <div className="flex flex-row py-2 space-x-4 items-center w-[60%]">
              <img alt="" src={Right} className="w-6 h-6" />
              <span className="text-white font-light text-base">
                Oak Fi reinvest your interest and purchase another asset that
                becomes your reward.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-8 space-y-24 w-full">
        <span className="text-4xl font-semibold text-white">Featured</span>
        <div className="flex flex-row items-center justify-center space-x-4 w-full flex-wrap max-w-7xl">
          <div className="space-x-2 max-w-[186px] w-full py-4 my-2 rounded-md shadow-md bg-radian-purple-200 flex flex-row items-center justify-center">
            <img alt="" src={Atom} className="w-12 h-12 object-scale-down" />
            <span className="text-white text-base">Atom</span>
          </div>
          <div className="space-x-2 max-w-[186px] w-full py-4 my-2 rounded-md shadow-md bg-radian-purple-200 flex flex-row items-center justify-center">
            <img alt="" src={Bitcoin} className="w-12 h-12 object-scale-down" />
            <span className="text-white text-base">Bitcoin</span>
          </div>
          <div className="space-x-2 max-w-[186px] w-full py-4 my-2 rounded-md shadow-md bg-radian-purple-200 flex flex-row items-center justify-center">
            <img alt="" src={BNB} className="w-12 h-12 object-scale-down" />
            <span className="text-white text-base">BNB</span>
          </div>
          <div className="space-x-2 max-w-[186px] w-full py-4 my-2 rounded-md shadow-md bg-radian-purple-200 flex flex-row items-center justify-center">
            <img alt="" src={Logo} className="w-10 h-12 object-scale-down" />
            <span className="text-white text-base">OAK</span>
          </div>
          <div className="space-x-2 max-w-[186px] w-full py-4 my-2 rounded-md shadow-md bg-radian-purple-200 flex flex-row items-center justify-center">
            <img alt="" src={Ether} className="w-12 h-12 object-scale-down" />
            <span className="text-white text-base">Ether</span>
          </div>
          <div className="space-x-2 max-w-[186px] w-full py-4 my-2 rounded-md shadow-md bg-radian-purple-200 flex flex-row items-center justify-center">
            <img alt="" src={Kucoin} className="w-12 h-12 object-scale-down" />
            <span className="text-white text-base">Kucoin</span>
          </div>
          <div className="space-x-2 max-w-[186px] w-full py-4 my-2 rounded-md shadow-md bg-radian-purple-200 flex flex-row items-center justify-center">
            <img
              alt=""
              src={Litecoin}
              className="w-12 h-12 object-scale-down"
            />
            <span className="text-white text-base">Litecoin</span>
          </div>
          <div className="space-x-2 max-w-[186px] w-full py-4 my-2 rounded-md shadow-md bg-radian-purple-200 flex flex-row items-center justify-center">
            <img alt="" src={USDC} className="w-12 h-12 object-scale-down" />
            <span className="text-white text-base">USDC</span>
          </div>
          <div className="space-x-2 max-w-[186px] w-full py-4 my-2 rounded-md shadow-md bg-radian-purple-200 flex flex-row items-center justify-center">
            <img alt="" src={USCT} className="w-12 h-12 object-scale-down" />
            <span className="text-white text-base">USDT</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center px-20 py-8 space-y-4">
        <div className="flex flex-col w-full items-center justify-center space-y-6 mb-16">
          <span className="text-4xl font-semibold text-white">OAK Token</span>
          <span className="text-xl font-medium text-white max-w-md text-center">
            <span className="text-cu-green">$OAK</span> is the native
            revenue-share and governance token for our protocol.
          </span>
        </div>
        <div className="w-full max-w-5xl flex flex-row items-stretch justify-center space-x-4">
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="Dark-Green-BG p-4 w-full flex flex-col space-y-4 shadow-lg">
              <span className="text-base text-white font-semibold">
                OAK Hodl
              </span>
              <span className="text-base text-white text-opacity-60">
                Oak holders share in our revenue by staking their OAK in OAK
                Hodl vaults.
              </span>
              <div className="flex flex-row space-x-2 items-center">
                <LaunchIcon className="text-cu-green" />
                <span className="text-cu-green text-base font-bold">
                  Earn OAK
                </span>
              </div>
            </div>
            <div className="Dark-Green-BG p-4 w-full flex flex-col space-y-4 shadow-lg">
              <span className="text-base text-white font-semibold">
                OAK Reward Pools
              </span>
              <span className="text-base text-white text-opacity-60">
                Staking OAK in OAK Reward Pool earns you specific tokens with
                the platform’s earnings.
              </span>
              <div className="flex flex-row space-x-2 items-center">
                <LaunchIcon className="text-cu-green" />
                <span className="text-cu-green text-base font-bold">
                  Earn OAK
                </span>
              </div>
            </div>
            <div className="Dark-Green-BG p-4 w-full flex flex-col space-y-4 shadow-lg">
              <span className="text-base text-white font-semibold">
                Governance
              </span>
              <span className="text-base text-white text-opacity-60">
                Our snapshot governance mechanism will give OAK holders a voting
                power in Oak Fi’s Dao soon.
              </span>
              <div className="flex flex-row space-x-2 items-center">
                <LaunchIcon className="text-cu-green" />
                <span className="text-cu-green text-base font-bold">Vote</span>
              </div>
            </div>
          </div>
          <div className="flex-1 Green-BG relative flex flex-col justify-between p-10">
            <img
              alt=""
              src={Oakfi_bg}
              className="w-full h-full bottom-0 right-0 absolute"
            />
            <div className="flex flex-col space-y-2">
              <span className="text-2xl text-white font-semibold">
                Fixed Max Supply
              </span>
              <span className="text-base text-white text-opacity-60 w-[80%]">
                A Fixed Maximum supply of 50,000 OAK tokens acts as a control
                against token inflation.
              </span>
            </div>
            <div className="flex flex-row space-x-2 items-center">
              <LaunchIcon className="text-cu-green" />
              <span className="text-cu-green text-base font-bold">
                Learn more
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
