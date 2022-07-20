$(document).ready(() => {
  particlesJS.load(
    "particles-js",
    "../particlesjs-config.json",
    function () {}
  );
  $(".newLockPage").css({ display: "flex" });
  $(".loadingLock").remove();
  $(this).scrollTop(0);
  $(window).scroll(() => {
    if ($(this).scrollTop() > 35) {
      $("nav").css({
        transform: "translateY(-100%)",
        opacity: "0",
        "pointer-events": "none",
      });
    } else {
      $("nav").css({
        transform: "translateY(0)",
        opacity: "1",
        "pointer-events": "all",
      });
    }
  });

  $(".navMobileBtn").on("click", (e) => {
    $(".navMobile").toggleClass("mobileActiveNav");
  });

  let navLinks = $(".navMobile > ul > li");
  $(navLinks).each(function () {
    $(this).on("click", () => {
      $(".navMobile").removeClass("mobileActiveNav");
    });
  });

  // VARIABLES
  const safuContractAddress = "0xd6E4b6b3A1b615ee0b0621C71ed81F1d2fA630A0"; // MAINNET
  // const safuContractAddress = '0xe7eA845cE685f20838670020D62FB318fDdEbeCF'; // TESTNET

  const connectBtn = document.querySelector(".connectBtn");
  const connectBtnMobile = document.querySelector(".connectBtnMobile");
  const inputAddress = document.querySelector("#nl-address");
  const searchBtn = document.querySelector("#nl-search");
  const nlTokenSymbol = document.querySelector(".nl-symbol");
  const tokenImg = document.querySelector(".nl-tokenInfo img");
  const tokenSymbol = document.querySelector("#nl-symbol");
  const tokenBalance = document.querySelector("#nl-balance");
  const inputAmount = document.querySelector("#nl-amount");
  const inputDate = document.querySelector("#nl-date");
  const approveBtn = document.querySelector("#nl-approve");
  const sendBtn = document.querySelector("#nl-send");
  const notification = document.querySelector(".nl-notification");
  const successNotification = document.querySelector("#nl-success");
  const changeNetwork = document.querySelector("#changeNetwork");
  changeNetwork.addEventListener("click", changeMetamaskNetwork);

  //SET NETWORK
  if (typeof web3 !== "undefined") {
    web3 = new Web3(web3.currentProvider);
    window.ethereum.on("chainChanged", function (networkId) {
      location.reload();
    });
    window.ethereum.on("accountsChanged", function (status) {
      location.reload();
    });
    let netVersion = web3.eth.net.getId().then(async function (data) {
      if (data == "97") {
        // 56 for main net
        console.log("BSC", data);
      } else {
        console.log("Not BSC", data);
        searchBtn.style.cssText =
          "border-color: gray; color: gray; pointer-events: none;";
        inputAddress.style.cssText =
          "border-color: gray; pointer-events: none;";
        inputAddress.value =
          "Please switch to Binance Smart Chain TESTNET network";
        notification.style.display = "initial";
      }
    });
    cnct();
  } else {
    web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545/"
      )
    );
    cnct();
  }

  async function changeMetamaskNetwork() {
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x61" }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x61",
                chainName: "BSC Testnet",
                nativeCurrency: {
                  name: "TBNB",
                  symbol: "TBNB",
                  decimals: 18,
                },
                rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
                blockExplorerUrls: ["https://testnet.bscscan.com/"],
              },
            ],
          });
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  }

  // END SET NETWORK

  // CONNECT METAMASK
  let userAddress;
  function cnct() {
    web3.eth.getAccounts((err, accounts) => {
      if (err != null) {
        console.log(err);
      } else if (accounts.length == 0) {
        searchBtn.style.cssText =
          "border-color: gray; color: gray; pointer-events: none";
        notification.style.display = "initial";
        console.log("Not connected");
        connectBtn.addEventListener("click", () => {
          ethereum
            .request({ method: "eth_requestAccounts" })
            .then(async function (result) {
              let res = await result;
              if (res != null) {
              }
            });
        });
        connectBtnMobile.addEventListener("click", () => {
          ethereum
            .request({ method: "eth_requestAccounts" })
            .then(async function (result) {
              let res = await result;
              if (res != null) {
              }
            });
        });
      } else {
        console.log("Connected " + accounts[0]);
        userAddress = accounts[0];
        connectBtn.innerHTML = "Connected";
        connectBtn.style.cssText = "background-color: #00AB94;";
        connectBtnMobile.innerHTML = "Connected";
        connectBtnMobile.style.cssText = "background-color: #00AB94;";
      }
    });
  }

  // END CONNECT METAMASK

  const safuAbi = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "tokenAddress",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "unlockTime",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "depositId",
          type: "uint256",
        },
      ],
      name: "TokensLocked",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "tokenAddress",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "receiver",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "TokensWithdrawn",
      type: "event",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "allDepositIds",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "bnbFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "depositId",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "uint256", name: "", type: "uint256" },
      ],
      name: "depositsByTokenAddress",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "uint256", name: "", type: "uint256" },
      ],
      name: "depositsByWithdrawalAddress",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllDepositIds",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
      name: "getDepositDetails",
      outputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "address", name: "", type: "address" },
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "bool", name: "", type: "bool" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_tokenAddress", type: "address" },
      ],
      name: "getDepositsByTokenAddress",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_withdrawalAddress",
          type: "address",
        },
      ],
      name: "getDepositsByWithdrawalAddress",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_tokenAddress", type: "address" },
        { internalType: "address", name: "_walletAddress", type: "address" },
      ],
      name: "getTokenBalanceByAddress",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_tokenAddress", type: "address" },
      ],
      name: "getTotalTokenBalance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_tokenAddress", type: "address" },
        { internalType: "uint256", name: "_amount", type: "uint256" },
        { internalType: "uint256", name: "_unlockTime", type: "uint256" },
        { internalType: "bool", name: "_feeInBnb", type: "bool" },
      ],
      name: "lockTokens",
      outputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "lockedToken",
      outputs: [
        { internalType: "address", name: "tokenAddress", type: "address" },
        { internalType: "address", name: "withdrawalAddress", type: "address" },
        { internalType: "uint256", name: "tokenAmount", type: "uint256" },
        { internalType: "uint256", name: "unlockTime", type: "uint256" },
        { internalType: "bool", name: "withdrawn", type: "bool" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "lpFeePercent",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "remainingBnbFees",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "fee", type: "uint256" }],
      name: "setBnbFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "percent", type: "uint256" }],
      name: "setLpFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "tokensFees",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalBnbFees",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "address", name: "", type: "address" },
      ],
      name: "walletTokenBalance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "withdrawalAddress",
          type: "address",
        },
      ],
      name: "withdrawFees",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
      name: "withdrawTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const safuContract = new web3.eth.Contract(safuAbi, safuContractAddress);
  const generalAbi = [
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount0",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount1",
          type: "uint256",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
      ],
      name: "Burn",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount0",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount1",
          type: "uint256",
        },
      ],
      name: "Mint",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount0In",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount1In",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount0Out",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount1Out",
          type: "uint256",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
      ],
      name: "Swap",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint112",
          name: "reserve0",
          type: "uint112",
        },
        {
          indexed: false,
          internalType: "uint112",
          name: "reserve1",
          type: "uint112",
        },
      ],
      name: "Sync",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      constant: true,
      inputs: [],
      name: "DOMAIN_SEPARATOR",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "MINIMUM_LIQUIDITY",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "PERMIT_TYPEHASH",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "address", name: "", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "address", name: "to", type: "address" }],
      name: "burn",
      outputs: [
        { internalType: "uint256", name: "amount0", type: "uint256" },
        { internalType: "uint256", name: "amount1", type: "uint256" },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "factory",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getReserves",
      outputs: [
        { internalType: "uint112", name: "_reserve0", type: "uint112" },
        { internalType: "uint112", name: "_reserve1", type: "uint112" },
        { internalType: "uint32", name: "_blockTimestampLast", type: "uint32" },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "_token0", type: "address" },
        { internalType: "address", name: "_token1", type: "address" },
      ],
      name: "initialize",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "kLast",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "address", name: "to", type: "address" }],
      name: "mint",
      outputs: [
        { internalType: "uint256", name: "liquidity", type: "uint256" },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "nonces",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
        { internalType: "uint8", name: "v", type: "uint8" },
        { internalType: "bytes32", name: "r", type: "bytes32" },
        { internalType: "bytes32", name: "s", type: "bytes32" },
      ],
      name: "permit",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "price0CumulativeLast",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "price1CumulativeLast",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "address", name: "to", type: "address" }],
      name: "skim",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "uint256", name: "amount0Out", type: "uint256" },
        { internalType: "uint256", name: "amount1Out", type: "uint256" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "bytes", name: "data", type: "bytes" },
      ],
      name: "swap",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "sync",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "token0",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "token1",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  searchBtn.addEventListener("click", async () => {
    searchBtn.innerText = "Searching..";
    const tokenAddress = inputAddress.value;
    const contractGeneral = new web3.eth.Contract(generalAbi, tokenAddress);
    const symbol = await contractGeneral.methods.symbol().call((e, data) => {
      if (e) {
        console.log("Wrong Contract Address");
        inputAddress.value = "Wrong Contract Address";
        searchBtn.innerText = "Search";
      } else {
        return data;
      }
    });
    const decimals = await contractGeneral.methods
      .decimals()
      .call((e, data) => {
        return data;
      });
    const balance = await contractGeneral.methods
      .balanceOf(userAddress)
      .call((e, data) => {
        searchBtn.innerText = "Search";
        return data;
      });
    let userBalance = (balance / 10 ** decimals).toFixed(3);

    tokenSymbol.innerText = symbol;
    tokenBalance.innerHTML = `Balance <span>${numberWithCommas(
      userBalance
    )}</span>`;

    // LOGO - de facut pt Cake LP

    if (symbol == "Cake-LP") {
      tokenImg.setAttribute("src", "../img/cake.svg");
    } else {
      tokenLogo(tokenAddress);
    }

    show([nlTokenSymbol, inputAmount, inputDate, approveBtn]);

    // Input amount

    inputAmount.addEventListener("keyup", () => {
      if (Number(inputAmount.value) > userBalance) {
        inputAmount.value = userBalance;
      }
    });

    safuLock(contractGeneral, tokenAddress, symbol, decimals, balance);
  });

  inputAddress.addEventListener("click", () => {
    hide([nlTokenSymbol, inputAmount, inputDate, approveBtn, sendBtn]);
    inputAddress.value = "";
  });

  // SAFU LOCK FUNCTION

  async function safuLock(
    contractGeneral,
    tokenAddress,
    symbol,
    decimals,
    balance
  ) {
    let userAmount;
    const dateNow = new Date();
    const tomorrow = new Date(dateNow);
    tomorrow.setDate(tomorrow.getDate() + 1);
    inputDate.setAttribute("min", tomorrow.toISOString().split("T")[0]);

    approveBtn.addEventListener("click", () => {
      // Check values
      if (inputAmount.value == "" && inputDate.value == "") {
        inputAmount.style.borderColor = "red";
        inputDate.style.borderColor = "red";
        return 0;
      } else if (inputAmount.value != "" && inputDate.value == "") {
        inputDate.style.borderColor = "red";
        inputAmount.style.borderColor = "";
        return 0;
      } else if (inputAmount.value == "" && inputDate.value != "") {
        inputAmount.style.borderColor = "red";
        inputDate.style.borderColor = "";
        return 0;
      } else if (inputAmount.value != "" && inputDate.value != "") {
        // inputAmount.style.borderColor = "";
        // inputDate.style.borderColor = "";
        inputAmount.style.cssText = "border-color: gray; pointer-events: none";
        inputDate.style.cssText = "border-color: gray; pointer-events: none";
      }

      // To BigNumber

      switch (decimals) {
        case (decimals = "9"):
          bn = web3.utils.toWei(inputAmount.value, "gwei");
          userAmount = web3.utils.toBN(bn);
          break;
        case (decimals = "18"):
          bn = web3.utils.toWei(inputAmount.value, "ether");
          userAmount = web3.utils.toBN(bn);
          break;
      }

      // Approve function

      contractGeneral.methods
        .approve(safuContractAddress, userAmount)
        .send({ from: userAddress })
        .on("transactionHash", (hash) => {
          approveBtn.style.cssText =
            "border-color: gray; pointer-events: none;";
          approveBtn.innerText = "Pending..";
        })
        .on("receipt", (receipt) => {
          console.log("Success");
          console.log(receipt);
          approveBtn.innerText = "Approved";
          show([sendBtn]);
        })
        .on("error", (error) => {
          console.log(error);
          approveBtn.innerText = "Approve";
        });
    });

    let gPrice;
    let gPriceFunction = web3.eth.getGasPrice().then((data) => {
      gPrice = data;
    });

    sendBtn.addEventListener("click", () => {
      const userDate = inputDate.value;
      const timeStamp = web3.utils.toBN(parseInt(new Date(userDate) / 1000));

      // Lock function
      console.log({
        tokenAddress,
        userAmount,
        timeStamp,
        userAddress,
        gasPrice: gPrice,
        gasLimit: "2000000",
        value: web3.utils.toBN("100010000000000000"),
      });
      safuContract.methods
        .lockTokens(tokenAddress, userAmount, timeStamp, true)
        .send({
          from: userAddress,
          gasPrice: gPrice,
          gasLimit: "2000000", // 2000000 if error
          value: web3.utils.toBN("100010000000000000"),
        })
        .on("transactionHash", () => {
          sendBtn.style.cssText = "border-color: gray; pointer-events: none;";
          sendBtn.innerText = "Locking..";
        })
        .on("receipt", () => {
          sendBtn.innerText = "Success";
          successNotification.innerHTML = `You have successfully locked <span style = "color: #f2a900">${
            userAmount / 10 ** decimals
          }</span> <span style = "color: #00ab94">${symbol}</span>. <br> <a href="https://twitter.com/intent/tweet?text=There%20are%20${
            userAmount / 10 ** decimals
          }%20${symbol}%20tokens%20locked%20in%20@safulock%20smart%20contract%20until%20${userDate}." target = "_blank">Share your lock on<i class="fab fa-twitter"></i>Twitter</a>`;
        })
        .on("error", (e) => {
          alert("Error");
          console.log(e);
        });
    });
  }

  // HELPERS
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function log(x) {
    console.log(x);
  }

  function show(x) {
    x.forEach((element) => {
      element.classList.remove("nl-hide");
      element.classList.add("nl-show");
    });
  }
  function hide(x) {
    x.forEach((element) => {
      element.classList.add("nl-hide");
      element.classList.remove("nl-show");
    });
  }

  function tokenLogo(tokenAddress) {
    fetch(
      `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/${web3.utils.toChecksumAddress(
        tokenAddress
      )}/logo.png`
    ).then((url) => {
      if (url.status == "200") {
        tokenImg.setAttribute("src", url.url);
      } else if (url.status == "404") {
        tokenImg.setAttribute("src", "../img/binanceLogo.svg");
      }
    });
  }
  // END HELPERS
});
