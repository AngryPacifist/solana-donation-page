const express = require('express');
const { Connection, clusterApiUrl, PublicKey } = require('@solana/web3.js');
const { encodeURL } = require('@solana/pay');
const BigNumber = require('bignumber.js');

const app = express();
const port = 3000;

const connection = new Connection(clusterApiUrl('mainnet-beta'));

// Replace with your valid Solana public key
const recipient = new PublicKey('BZTx18qmTDC4ivNaKwy3giSdqHUtDqsCAwSBtf1Gffym');

app.get('/donate', async (req, res) => {
  const amount = req.query.amount ? new BigNumber(req.query.amount) : new BigNumber(1); // Default to 1 SOL if not specified
  const label = "Donate to Outis";
  const message = "Thank you for your support!";
  
  const url = encodeURL({ recipient, amount, label, message });

  // Log the URL to check if it's generated correctly
  console.log("Encoded URL: ", url.toString());

  res.send(`
    <html>
      <body>
        <h1>Donate SOL</h1>
        <p>Scan the QR code below to donate:</p>
        <img src="https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url.toString())}&size=150x150" alt="QR Code"/>
        <p>Or click <a href="${url.toString()}">here</a> to donate.</p>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Donation page running at http://localhost:${port}/donate`);
});
