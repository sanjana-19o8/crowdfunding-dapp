const { ethers } = require("hardhat");
var contract = '';

async function main() {
  // Grab the contract factory
  const Fundfactory = await ethers.getContractFactory("Fundfactory");

  // Start deployment, returning a promise that resolves to a contract object
  const fundFactory = await Fundfactory.deploy(); // Instance of the contract
  await fundFactory.deployed();

  contract = fundFactory.address;
  console.log("Contract deployed to address:", contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

module.exports = contract; // Export contract variable