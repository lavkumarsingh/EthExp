
const express = require('express')
const app = express()
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/17ddeeba221a429f8b46919b5e956ab3'));

app.get('/', (req, res) => {
    res.send("Ethereum Explorer Docs")
})
app.get('/api/get-block-number', async(req, res) => {
    let blockNumber = await web3.eth.getBlockNumber()
    res.json({'Current block' : blockNumber})
})

app.get('/api/get-block/:blockNumber', async(req, res) => {
    let block = await web3.eth.getBlock(req.params['blockNumber'])
    res.json(block)
})

app.get('/api/get-balance/:balance', async(req, res) => {
    let balance = await web3.eth.getBalance(req.params['balance'])
    //balance = balance/1000000000000000000 + 'Ξ'
    res.json({balance})
})

app.get('/api/get-tx-count/:tx_count', async(req, res) => {
    let txCount = await web3.eth.getBlockTransactionCount(req.params['tx_count'])
    res.json({txCount})
})

app.get('/api/get-uncle-count/:uncle_count', async(req, res) => {
    let uCount = await web3.eth.getBlockUncleCount(req.params['uncle_count'])
    res.json({'Uncle count' : uCount})
})

app.get('/api/get-uncle-count/:block-number', async(req, res) => {
    let uCount = await web3.eth.getBlockUncleCount(req.params['uncle_count'])
    res.json({'Uncle count' : uCount})
})

app.get('/api/get-tx/:tx', async(req, res) => {
    let tx = await web3.eth.getTransaction(req.params['tx'])
    res.json(tx)
})

app.get('/api/get-pending-tx', async(req, res) => {
    let pTx = await web3.eth.getPendingTransactions()
    res.json({pTx})
})

app.get('/gas_price', async(req, res) => {
    let price = await web3.eth.getGasPrice()
    res.json({'Gas price' : price})
})

app.listen(3000, () => {
    console.log('api running on port 3000');
})
