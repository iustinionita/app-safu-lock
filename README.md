## Safu Locker - App on Binance Smart Chain

Probably the easiest way to lock your crypto tokens for a chosen period of time.

#### Requirements

- Please make sure you have MetaMask installed.
- Your wallet should have at least 0.2 BNB to pay for the Smart Contract and Network fees
- Any BEP-20 token in your wallet

------------


##### MetaMask TEST WALLET

**Please add this wallet to your MetaMask to test my project!**

Click on your **Profile Picture** > **Import Account**. Make sure you import the **Private Key**!

Private Key: **96500e6540837bcff174fd383ff5e7ca0aa2d0ee07685edb9fa91f65b12a6049**

> Note: If it's the first time you install MetaMask you have to setup your account first and then you can import my wallet

------------


### How does it work?

`Home page` - If you are looking for the locks for a specific Bep-20 token, insert the contract address of that token into the search field and click the "Search" button. If there are any locks for that token, results will be displayed at the bottom of the page.

`View page` - This page is not shown in the Navigation bar, as this page is only used to display information about a specific lock selected from your search results (if any). If you are the owner of that lock and the locking time expired, you can claim back your tokens by clicking "Withdraw Funds".

`New lock` - Here you can lock your Bep-20 tokens for the desired period of time. First, search for the contract address of your tokens. If the contract is found, the token name and your balance is shown in the results section. Then type how many tokens you wish to lock and select the lock expiry date. If you are ready, click the "Approve" button and confirm the transaction in your MetaMask - this transaction is free of charge. After the transactions will be successfully approved you should see a new button "Create Lock". Click on it and approve the transaction in your MetaMask - this transaction will cost you 0.1 BNB for the Smart Contract fee + any Network fees. If the transaction is successful, please share it on Twitter :) .

> **This is the BUSD token contract address. You can use it to test my app!**
`0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee` 

Now you should be able to see your lock in the search results from the Home page.

*Note: Your new lock is now visible on the [Presentation Website](https://iustinionita.github.io/safu-lock/ "Presentation Website") under "Latest Lock" section*

### Used technologies

To build this app I have used `HMTL`, `CSS` / `SCSS` and `Vanilla Javascript`. Because this app is interacting with a Smart Contract I had to integrate the `Web3` library to handle all the functionality and integration with MetaMask.
