/* eslint-disable import/first */
export const allNetworks = [
  // {
  //   name: 'HBIT',
  //   asset: 'HBIT',
  //   id: 11119,
  //   hash: '/',
  // },
  // {
  //   name: 'HBITtest',
  //   asset: 'HBITtest',
  //   id: 11120,
  //   hash: '/',
  // },
  {
    name: 'Conflux',
    asset: 'Conflux',
    id: 71,
    hash: '/',
  },
];

const network = allNetworks.find(n => window.location.hash.startsWith('#' + n.hash));

if (!network) {
  window.location.hash = allNetworks[0].hash;
  window.location.reload();
  console.log("network: ", network)
} else {
  window.REACT_APP_NETWORK_ID = network.id;
}

export default network;
