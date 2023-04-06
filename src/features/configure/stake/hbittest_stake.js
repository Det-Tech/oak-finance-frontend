import { govPoolABI } from '../abi';

export const hbitTestStakePools = [
  {
    id: 'oaki-bnb',
    name: 'OAKI',
    logo: 'single-assets/BIFI.png',
    token: 'OAKI',
    tokenDecimals: 18,
    tokenAddress: '0xCa3F508B8e4Dd382eE878A314789373D80A5190A',
    tokenOracle: 'tokens',
    tokenOracleId: 'OAKI',
    earnedToken: 'BNB',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    earnContractAddress: '0x453D4Ba9a2D594314DF88564248497F7D74d6b2C',
    earnContractAbi: govPoolABI,
    earnedOracle: 'tokens',
    earnedOracleId: 'WBNB',
    partnership: false,
    status: 'active',
    fixedStatus: true,
    partners: [
      {
        logo: 'stake/oaki/beefyfinance.png',
        logoNight: 'stake/oaki/beefyfinance_night.png',
        background: 'stake/oaki/background.png',
        text: "OAKI Finance is The Multi-Chain Yield Optimizer across many blockchains, enabling users to earn autocompounded yield on their crypto. Did you know also that you can own a piece of Beefy itself? Beefy runs on its governance token, BIFI. The token has a set supply of 80,000 across all chains; no more may be minted, ever! As a holder of BIFI you may create and vote on important DAO proposals, and you become dividend-eligible to earn a share of every compounding harvest on Beefy vaults, hour by hour. Here on Binance, you just need to stake BIFI in this reward pool, or in the autocompounding BIFI Maxi vault on the main page. For this pool, BNB dividends are gathered and sent proportionally to each staker. Stake here, return later to claim the BNB you've earned.",
        website: 'https://app.oaki.finance',
        social: {
          telegram: 'http://t.me/oakifinance',
          twitter: 'https://twitter.com/oakifinance',
        },
      },
    ],
  },
];