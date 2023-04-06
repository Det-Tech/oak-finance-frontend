import { addressBook } from 'blockchain-addressbook';
import { addressBook as yhAddressBook } from '@yieldhubfinance/blockchain-addressbook';

const {
  polygon: polygonAddressBook,
  heco: hecoAddressBook,
  celo: celoAddressBook,
  avax: avaxAddressBook,
  bsc: bscAddressBook,
  fantom: fantomAddressBook,
  one: harmonyAddressBook,
  arbitrum: arbitrumAddressBook,
  moonriver: moonriverAddressBook,
  cronos: cronosAddressBook,
  aurora: auroraAddressBook,
  fuse: fuseAddressBook,
  metis: metisAddressBook,
  moonbeam: moonbeamAddressBook,
} = addressBook;

const hbitAddressBook = bscAddressBook
const hbitTestAddressBook = bscAddressBook

export {
  bscAddressBook,
  hecoAddressBook,
  celoAddressBook,
  avaxAddressBook,
  polygonAddressBook,
  fantomAddressBook,
  harmonyAddressBook,
  arbitrumAddressBook,
  moonriverAddressBook,
  cronosAddressBook,
  auroraAddressBook,
  fuseAddressBook,
  metisAddressBook,
  moonbeamAddressBook,
  hbitAddressBook,
  hbitTestAddressBook
};

const { telos: telosAddressBook } = yhAddressBook;
export { telosAddressBook };

export {
  vaultABI,
  bnbVaultABI,
  erc20ABI,
  strategyABI,
  multicallABI,
  govPoolABI,
  beefyUniV2ZapABI,
  uniswapV2PairABI,
  uniswapV2RouterABI,
  yieldhubZapABI,
  omnidexRouter01ABI,
  launchPoolABI,
  hVaultABI,
  hStrategyABI,
  hMaster2ChefABI
} from './abi';
export { bscStakePools } from './stake/bsc_stake';
export { hecoStakePools } from './stake/heco_stake';
export { avalancheStakePools } from './stake/avalanche_stake';
export { celoStakePools } from './stake/celo_stake';
export { moonriverStakePools } from './stake/moonriver_stake';
export { polygonStakePools } from './stake/polygon_stake';
export { fantomStakePools } from './stake/fantom_stake';
export { harmonyStakePools } from './stake/harmony_stake';
export { arbitrumStakePools } from './stake/arbitrum_stake';
export { cronosStakePools } from './stake/cronos_stake';
export { auroraStakePools } from './stake/aurora_stake';
export { fuseStakePools } from './stake/fuse_stake';
export { metisStakePools } from './stake/metis_stake';
export { moonbeamStakePools } from './stake/moonbeam_stake';
export { telosPools } from './vault/telos_pools';
export { bscPools } from './vault/bsc_pools';
export { hecoPools } from './vault/heco_pools';
export { avalanchePools } from './vault/avalanche_pools';
export { celoPools } from './vault/celo_pools';
export { moonriverPools } from './vault/moonriver_pools';
export { polygonPools } from './vault/polygon_pools';
export { fantomPools } from './vault/fantom_pools';
export { harmonyPools } from './vault/harmony_pools';
export { arbitrumPools } from './vault/arbitrum_pools';
export { cronosPools } from './vault/cronos_pools';
export { auroraPools } from './vault/aurora_pools';
export { fusePools } from './vault/fuse_pools';
export { metisPools } from './vault/metis_pools';
export { moonbeamPools } from './vault/moonbeam_pools';
export { bscZaps } from './zap/bsc_zaps';
export { hecoZaps } from './zap/heco_zaps';
export { avalancheZaps } from './zap/avalanche_zaps';
export { celoZaps } from './zap/celo_zaps';
export { moonriverZaps } from './zap/moonriver_zaps';
export { polygonZaps } from './zap/polygon_zaps';
export { fantomZaps } from './zap/fantom_zaps';
export { harmonyZaps } from './zap/harmony_zaps';
export { arbitrumZaps } from './zap/arbitrum_zaps';
export { cronosZaps } from './zap/cronos_zaps';
export { auroraZaps } from './zap/aurora_zaps';
export { fuseZaps } from './zap/fuse_zaps';
export { metisZaps } from './zap/metis_zaps';
export { moonbeamZaps } from './zap/moonbeam_zaps';
export { telosZaps } from './zap/telos_zaps';

export { hbitZaps } from './zap/hbit_zaps';
export { hbittestZaps } from './zap/hbittest_zaps';
export { hbitPools } from './vault/hbit_pools';
export { hbittestPools } from './vault/hbittest_pools';

export { hbitStakePools } from './stake/hbit_stake';
export { hbitTestStakePools } from './stake/hbittest_stake';

export { nativeCoins } from './native_coins';
