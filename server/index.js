const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "042053fbf434a2b37c76d4044a9bcc4711daa7378fa5bce2d5c237fcd14bcaaaeead2c37f65bf654444bf6231ed35bd1ceea8443b4c3e8d1cda5d4409c797cdf80": 100,
  "04f9ecea1cabd8e575cb6debccdf5936bae0548356f432d1104dc901e8c3a0718bb54376f58e24547306cb02cdb2cc335ae5ac8f9b77a94e39f476e2fdee15eea1": 50,
  "0448188bc3887c8f2bf6f96bf484bb413d7e094ec2c2deb73091b67d49807ee28d51af49c436e092ba9cf6e9f6c72d3742aca6a9659161d40033d71ff39b0212db": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
