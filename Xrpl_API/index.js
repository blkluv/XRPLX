import express from 'express'
import xrpl from 'xrpl'

const app = express();
const PORT = 8080

function getNet() {
  return "wss://s.altnet.rippletest.net:51233/"
} 


async function mintToken(addrssofmint, nft) {
 
  let net = getNet()
  const standby_wallet = xrpl.Wallet.fromSeed(addrssofmint)
  const client = new xrpl.Client(net)
  await client.connect()

    const map = new Map()
  map.set('art','https://ipfs.io/ipfs/QmQ6pkp4xcdbdabp5XCeJYuQBV5cnQnTf7CVpf34rpHUDN')
  map.set('cityilluminati','https://ipfs.io/ipfs/QmaJRr4onE83XLZAFSpP7o6eGeHWZ8yC43gK3FLFn3UH35')
  map.set('collectiable1','https://ipfs.io/ipfs/QmVNXV98TvYQx5v9WK1EZeBnEfrJyg6RMYCowA7r8ERYeK')
  map.set('collectiables','https://ipfs.io/ipfs/QmY68rpxsJ9X78pwNdBq7rZfPgv6r3P3GeViVioQHnSYze')
  map.set('location','https://ipfs.io/ipfs/Qmcdr22tpwBYQixVoW6BbpVpcXD1sQ31G1q4GbQ5niXZ5K')
  map.set('mcdonald','https://ipfs.io/ipfs/QmPcHjZY7qzye6RVu2FnPK7aHjz6c19s9VJWkcUVKhtF7Q')
  map.set('movietheatre','https://ipfs.io/ipfs/Qmc66EPoV2PnEASXLp5cUYuonq5vhp6CaDPAoHpEKZwfXX')
  map.set('voucher','https://ipfs.io/ipfs/QmRyqZP8QXzV1cymp1XFDkkQzqrJKk4GJM5SJSabyfYxRE')
  // Note that you must convert the token URL to a hexadecimal 
  // value for this transaction.
  // ------------------------------------------------------------------------
  const transactionJson = {
    "TransactionType": "NFTokenMint",
    "Account": standby_wallet.classicAddress,
    "URI": xrpl.convertStringToHex(map.get(nft)),
    "Flags": parseInt('8'),
    "TransferFee": parseInt( '500'),
    "NFTokenTaxon": 0 //Required, but if you have no use for it, set to zero.
  }

  // ----------------------------------------------------- Submit signed blob 
  const tx = await client.submitAndWait(transactionJson, { wallet: standby_wallet} )
  const nfts = await client.request({
    method: "account_nfts",
    account: standby_wallet.classicAddress
  })

  // ------------------------------------------------------- Report results
  console.log(tx)
  console.log('----------------------------------------')
  console.log( tx.result.meta.TransactionResult)

  client.disconnect()
  return(tx.result.hash)
}


  app.get('/mintnft/:address/:nft', async (req, res) => {
	const detailofnft= await  mintToken(req.params.address,req.params.nft)
	console.log(detailofnft)
	res.send(detailofnft)
  })

  app.listen(process.env.PORT || PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))