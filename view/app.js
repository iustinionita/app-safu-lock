$(document).ready(() => {
    particlesJS.load('particles-js', '../particlesjs-config.json', function() {});
    $(this).scrollTop(0);
    $(window).scroll(() => {
        if ($(this).scrollTop() > 35) {
            $("nav").css({"transform": "translateY(-100%)","opacity": "0", "pointer-events": "none"});
        }
        else {
            $("nav").css({"transform": "translateY(0)","opacity": "1", "pointer-events": "all"});
        }
    });

    $(".navMobileBtn").on("click", (e) => {
        $(".navMobile").toggleClass("mobileActiveNav");
    });

    let navLinks = $(".navMobile > ul > li");
    $(navLinks).each(function () {
        $(this).on("click", () => {
            $(".navMobile").removeClass("mobileActiveNav");
        })
    })


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const lockId = urlParams.get("lockid");
const viewLockPage = document.querySelector(".viewLockPage");
const connectBtn = document.querySelector(".connectBtn");
const connectBtnMobile = document.querySelector(".connectBtnMobile");
const loadingView = document.querySelector(".loadingView");
let userAddress;

//SET NETWORK
if(typeof web3 !== "undefined") {
    web3 = new Web3(web3.currentProvider);
    window.ethereum.on('chainChanged', function(networkId){
        location.reload();
        // console.log('Network changed to', networkId);
      });
    window.ethereum.on('accountsChanged', function(status){
        location.reload();
    });
    let netVersion = web3.eth.net.getId().then(async function (data) {
        if (data == '56') {
            console.log("BSC", data);
        } else {
            console.log("Not BSC", data);
            // DE ADAUGAT MESAJ  DE WRONG NETWORK
        }
    });
    cnct();
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545")); // TESTNET (https://data-seed-prebsc-1-s1.binance.org:8545/ MAINNET)
    // web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/")); // MAIN NET (https://data-seed-prebsc-1-s1.binance.org:8545/ MAINNET)
    cnct();
}

// END SET NETWORK

// CONNECT METAMASK

function cnct () {
    web3.eth.getAccounts((err, accounts) => {
        if( err != null) {
            console.log(err)
        }
        else if (accounts.length == 0) {
            console.log("Not connected");
            connectBtn.addEventListener("click", () => {
                ethereum.request({method: 'eth_requestAccounts'}).then(async function (result) {let res = await result; if(res != null) {}});
            });
            connectBtnMobile.addEventListener("click", () => {
                ethereum.request({method: 'eth_requestAccounts'}).then(async function (result) {let res = await result; if(res != null) {}});
            });
        }
        else {
            console.log("Connected " + accounts[0]);
            // connectBtn.innerText = accounts[0];
            userAddress = accounts[0];
            connectBtn.innerHTML = "Connected";
            connectBtn.style.cssText = "background-color: #00AB94;"
            connectBtnMobile.innerHTML = "Connected";
            connectBtnMobile.style.cssText = "background-color: #00AB94;"
        }
    })
}

// END CONNECT METAMASK


const safuAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"unlockTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"depositId","type":"uint256"}],"name":"TokensLocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensWithdrawn","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allDepositIds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bnbFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"depositId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"depositsByTokenAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"depositsByWithdrawalAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllDepositIds","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getDepositDetails","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"}],"name":"getDepositsByTokenAddress","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_withdrawalAddress","type":"address"}],"name":"getDepositsByWithdrawalAddress","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"getTokenBalanceByAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"}],"name":"getTotalTokenBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_unlockTime","type":"uint256"},{"internalType":"bool","name":"_feeInBnb","type":"bool"}],"name":"lockTokens","outputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lockedToken","outputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"withdrawalAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"internalType":"uint256","name":"unlockTime","type":"uint256"},{"internalType":"bool","name":"withdrawn","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpFeePercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"remainingBnbFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"fee","type":"uint256"}],"name":"setBnbFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"percent","type":"uint256"}],"name":"setLpFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokensFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBnbFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"walletTokenBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"withdrawalAddress","type":"address"}],"name":"withdrawFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const safuContract = new web3.eth.Contract(safuAbi, '0xd6E4b6b3A1b615ee0b0621C71ed81F1d2fA630A0'); // MAIN NET
const generalAbi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];

safuContract.methods.getDepositDetails(lockId).call((e, data) => {
    // console.log(data);
    getTokenInfo(lockId, data[0], data[1],data[2],data[3],data[4]);    
})

async function getTokenInfo(id, address, owner, amount, timestamp, withdraw) {
    const contractGeneral = new web3.eth.Contract(generalAbi, address);
    const decimal = await contractGeneral.methods.decimals().call((e, data) => {return data});
    const symbol = await contractGeneral.methods.symbol().call((e, data) => {return data});
    // console.log({
    //     id,
    //     address,
    //     owner,
    //     amount,
    //     timestamp,
    //     withdraw,
    //     decimal,
    //     symbol
    // });

    let tokenAmount = (amount / (10**decimal)).toFixed(2);
    let tokenWth;
    if(withdraw == false) {
        tokenWth = "UNCLAIMED";
    } else {
        tokenWth = "CLAIMED";
    }
    let tokenStatus;
    const dateNow = parseInt(Date.now() / 1000); 
    let date = (new Date(timestamp * 1000)).toUTCString(); date = date.split(' ').slice(1, 4).join(' ');
    if (dateNow < timestamp) {
        tokenStatus = "LOCKED";
    } else {
        tokenStatus = "UNLOCKED";
    }
    

    newDiv = document.createElement("div");
    newDiv.setAttribute("class", "viewLockWrapper");
    newDiv.innerHTML = `
    <div class="vptoken">
    <p class="vptitle"><span class="vpamount">${numberWithCommas(tokenAmount)}</span><span>${symbol}</span> token</p>
    <p class="vpid"><span>${id}</span> lock id </p>
    </div>
    <div class="vpdetails">
    <p class="vpstatus"><span>${tokenStatus}</span> status</p>
    <p class="vpdate">${date}</p>
    <p class="vpwth"><span>${tokenWth}</span> funds</p>
    </div>
    <div class="vbuttons">
    <ul>
    <li><a href="https://bscscan.com/address/${owner}" target="_blank" id="vowner">Owner</a></li>
    <li><a href="#" id="vwth">Withdraw Funds</a></li>
    <li><a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Flocker.safu-lock.com%2Fview%2F%3Flockid%3D${id}&text=There%20are%20${tokenAmount}%20${symbol}%20tokens%20locked%20in%20%40safulock%20smart%20contract%20until%20${date}.%20Check%20it%20here%3A%20" target="_blank" id="vtoken"><i class="fab fa-twitter"></i> Share</a></li>
    </ul>
    </div>
    `;
    loadingView.remove();
    viewLockPage.appendChild(newDiv);

    //Withdraw
    const wthButton = document.querySelector("#vwth");
    let isOwner;
    if(userAddress == owner && withdraw == false && dateNow > timestamp) {
        wthButton.addEventListener("click", async function withdraw() {
            wthButton.innerText = "Withdraw Initiated";
            const vpwth = document.querySelector("p.vpwth > span");
            safuContract.methods.withdrawTokens(id).send({from: userAddress})
            .on("transactionHash", (hash) => {
                const vtxh = document.querySelector(".vtxh");
                console.log("TransactionHash", hash);
                const newTx = document.createElement("p");
                newTx.setAttribute("class", "vtxh");
                newTx.innerHTML = `
                <span>Tx Hash </span><a href="https://bscscan.com/tx/${hash}">${hash}</a><i class="fas fa-external-link-alt"></i>
                `;
                viewLockPage.appendChild(newTx);
            })
            .on("receipt", (receipt) => {
                console.log("Last Receipt", receipt);
                wthButton.innerText = "Successful";
                wthButton.style.cssText = "pointer-events: none; border-color: grey;"
                vpwth.innerText = "CLAIMED";

            })
            .on("error", (error, receipt) => {
                wthButton.innerText = "Withdraw Funds";
                vpwth.innerText = "UNCLAIMED";
            });
    })
    } else if(withdraw == true) {
        wthButton.innerText = "Tokens Claimed";
        wthButton.style.cssText = "pointer-events: none; color: grey; border-color: grey;";
    } else if (userAddress != owner) {
        wthButton.innerText = "Withdraw - Owner only";
        wthButton.style.cssText = "pointer-events: none; color: grey; border-color: grey;";
    } else {
        wthButton.style.cssText = "pointer-events: none; color: grey; border-color: grey;";
    }
}







// HELPERS
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// END HELPERS


// withdrawBtn.addEventListener("click", async function withdraw() {
//     contract.methods.withdrawTokens(lockId).send({from: userAddress}).then(await function (err, data) {
//         if(!err) {
//             window.location.reload();
//         }
//     })
// });


});