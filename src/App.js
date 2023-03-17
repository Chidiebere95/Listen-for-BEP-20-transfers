import './App.css';
const Web3 = require('web3');

function App() {
  const listenForTokensBSCURL =
    'wss://wandering-hardworking-patina.bsc.discover.quiknode.pro/27a4cb6ee5a487af041088ea09f2142500f30b60/';
  const listenForTokensEthereumURL =
        'wss://practical-necessary-mountain.discover.quiknode.pro/b7b754637febb9825b7a78a42f400edcc4909393/';

  const listenForBNBTrnxsBSCChain = () => {
    const web3 = new Web3(listenForTokensBSCURL);

    let options = {
      topics: [web3.utils.sha3('Transfer(address,address,uint256)')],
    };

    const abi = [
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            name: '',
            type: 'string',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [
          {
            name: '',
            type: 'uint8',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ];

    let subscription = web3.eth.subscribe('logs', options);

    async function collectData(contract) {
      const [decimals, symbol] = await Promise.all([
        contract.methods.decimals().call(),
        contract.methods.symbol().call(),
      ]);
      return { decimals, symbol };
    }

    subscription.on('data', (event) => {
      if (event.topics.length === 3) {
        let transaction = web3.eth.abi.decodeLog(
          [
            {
              type: 'address',
              name: 'from',
              indexed: true,
            },
            {
              type: 'address',
              name: 'to',
              indexed: true,
            },
            {
              type: 'uint256',
              name: 'value',
              indexed: false,
            },
          ],
          event.data,
          [event.topics[1], event.topics[2], event.topics[3]]
        );

        const contract = new web3.eth.Contract(abi, event.address);

        collectData(contract).then((contractData) => {
          const unit = Object.keys(web3.utils.unitMap).find(
            (key) =>
              web3.utils.unitMap[key] ===
              web3.utils
                .toBN(10)
                .pow(web3.utils.toBN(contractData.decimals))
                .toString()
          );
          // console.log(contractData.symbol);
          if (contractData.symbol === 'WBNB') {
            console.log(
              `Transfer of ${web3.utils.fromWei(transaction.value, unit)} ${
                contractData.symbol
              } from ${transaction.from} to ${transaction.to}`
            );
          }
          // console.log(
          //   `Transfer of ${web3.utils.fromWei(transaction.value, unit)} ${
          //     contractData.symbol
          //   } from ${transaction.from} to ${transaction.to}`
          // );

          // if (
          //   transaction.from === '0x495f947276749ce646f68ac8c248420045cb7b5e'
          // ) {
          //   console.log('Specified address sent an ERC-20 token!');
          // }
          // if (transaction.to === '0x495f947276749ce646f68ac8c248420045cb7b5e') {
          //   console.log('Specified address received an ERC-20 token!');
          // }
          // if (
          //   transaction.from === '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D' &&
          //   event.address === '0x6b175474e89094c44da98b954eedeac495271d0f'
          // ) {
          //   console.log('Specified address transferred specified token!');
          // } // event.address contains the contract address
          // if (event.address === '0x6b175474e89094c44da98b954eedeac495271d0f') {
          //   console.log('Specified ERC-20 transfer!');
          // }
        });
      }
    });

    subscription.on('error', (err) => {
      throw err;
    });
    subscription.on('connected', (nr) =>
      console.log('Subscription on BEP-20 started with ID %s', nr)
    );
  };
  const listenForUSDTTrnxsBSCChain = () => {
    const web3 = new Web3(listenForTokensBSCURL);

    let options = {
      topics: [web3.utils.sha3('Transfer(address,address,uint256)')],
    };

    const abi = [
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            name: '',
            type: 'string',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [
          {
            name: '',
            type: 'uint8',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ];

    let subscription = web3.eth.subscribe('logs', options);

    async function collectData(contract) {
      const [decimals, symbol] = await Promise.all([
        contract.methods.decimals().call(),
        contract.methods.symbol().call(),
      ]);
      return { decimals, symbol };
    }

    subscription.on('data', (event) => {
      if (event.topics.length === 3) {
        let transaction = web3.eth.abi.decodeLog(
          [
            {
              type: 'address',
              name: 'from',
              indexed: true,
            },
            {
              type: 'address',
              name: 'to',
              indexed: true,
            },
            {
              type: 'uint256',
              name: 'value',
              indexed: false,
            },
          ],
          event.data,
          [event.topics[1], event.topics[2], event.topics[3]]
        );

        const contract = new web3.eth.Contract(abi, event.address);

        collectData(contract).then((contractData) => {
          const unit = Object.keys(web3.utils.unitMap).find(
            (key) =>
              web3.utils.unitMap[key] ===
              web3.utils
                .toBN(10)
                .pow(web3.utils.toBN(contractData.decimals))
                .toString()
          );
          // console.log(contractData.symbol);
          if (contractData.symbol === 'USDT') {
            console.log(
              `Transfer of ${web3.utils.fromWei(transaction.value, unit)} ${
                contractData.symbol
              } from ${transaction.from} to ${transaction.to}`
            );
          }
          // console.log('transaction',transaction);
          // console.log('transaction.value',transaction.value);
          // console.log('transaction', contractData.symbol);
          // console.log(
          //   `Transfer of ${web3.utils.fromWei(transaction.value, unit)} ${
          //     contractData.symbol
          //   } from ${transaction.from} to ${transaction.to}`
          // );

          // if (
          //   transaction.from === '0x495f947276749ce646f68ac8c248420045cb7b5e'
          // ) {
          //   console.log('Specified address sent an ERC-20 token!');
          // }
          // if (transaction.to === '0x495f947276749ce646f68ac8c248420045cb7b5e') {
          //   console.log('Specified address received an ERC-20 token!');
          // }
          // if (
          //   transaction.from === '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D' &&
          //   event.address === '0x6b175474e89094c44da98b954eedeac495271d0f'
          // ) {
          //   console.log('Specified address transferred specified token!');
          // } // event.address contains the contract address
          // if (event.address === '0x6b175474e89094c44da98b954eedeac495271d0f') {
          //   console.log('Specified ERC-20 transfer!');
          // }
        });
      }
    });

    subscription.on('error', (err) => {
      throw err;
    });
    subscription.on('connected', (nr) =>
      console.log('Subscription on BEP-20 started with ID %s', nr)
    );
  };
  const listenForUSDTTrnxsETHChain = () => {
    const web3 = new Web3(listenForTokensEthereumURL);

    let options = {
      topics: [web3.utils.sha3('Transfer(address,address,uint256)')],
    };

    const abi = [
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            name: '',
            type: 'string',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [
          {
            name: '',
            type: 'uint8',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ];

    let subscription = web3.eth.subscribe('logs', options);

    async function collectData(contract) {
      const [decimals, symbol] = await Promise.all([
        contract.methods.decimals().call(),
        contract.methods.symbol().call(),
      ]);
      return { decimals, symbol };
    }

    subscription.on('data', (event) => {
      if (event.topics.length === 3) {
        let transaction = web3.eth.abi.decodeLog(
          [
            {
              type: 'address',
              name: 'from',
              indexed: true,
            },
            {
              type: 'address',
              name: 'to',
              indexed: true,
            },
            {
              type: 'uint256',
              name: 'value',
              indexed: false,
            },
          ],
          event.data,
          [event.topics[1], event.topics[2], event.topics[3]]
        );

        const contract = new web3.eth.Contract(abi, event.address);

        collectData(contract).then((contractData) => {
          const unit = Object.keys(web3.utils.unitMap).find(
            (key) =>
              web3.utils.unitMap[key] ===
              web3.utils
                .toBN(10)
                .pow(web3.utils.toBN(contractData.decimals))
                .toString()
          );
          // console.log(contractData.symbol);
          if (contractData.symbol === 'USDT') {
            console.log(
              `Transfer of ${web3.utils.fromWei(transaction.value, unit)} ${
                contractData.symbol
              } from ${transaction.from} to ${transaction.to}`
            );
          }
          // console.log('transaction',transaction);
          // console.log('transaction.value',transaction.value);
          // console.log('transaction', contractData.symbol);
          // console.log(
          //   `Transfer of ${web3.utils.fromWei(transaction.value, unit)} ${
          //     contractData.symbol
          //   } from ${transaction.from} to ${transaction.to}`
          // );

          // if (
          //   transaction.from === '0x495f947276749ce646f68ac8c248420045cb7b5e'
          // ) {
          //   console.log('Specified address sent an ERC-20 token!');
          // }
          // if (transaction.to === '0x495f947276749ce646f68ac8c248420045cb7b5e') {
          //   console.log('Specified address received an ERC-20 token!');
          // }
          // if (
          //   transaction.from === '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D' &&
          //   event.address === '0x6b175474e89094c44da98b954eedeac495271d0f'
          // ) {
          //   console.log('Specified address transferred specified token!');
          // } // event.address contains the contract address
          // if (event.address === '0x6b175474e89094c44da98b954eedeac495271d0f') {
          //   console.log('Specified ERC-20 transfer!');
          // }
        });
      }
    });

    subscription.on('error', (err) => {
      throw err;
    });
    subscription.on('connected', (nr) =>
      console.log('Subscription on ERC-20 started with ID %s', nr)
    );
  };

  return (
    <div className='App'>
      <button onClick={listenForBNBTrnxsBSCChain}>BNB Trnxs On BNB chain</button>
      <button onClick={listenForUSDTTrnxsBSCChain}>USDT Trnxs on BSC Chain</button>
      <button onClick={listenForUSDTTrnxsETHChain}>USDT Trnxs on ETH chain</button>
      <button>Tron</button>
      <button>Ripple</button>
    </div>
  );
}

export default App;
