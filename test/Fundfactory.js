const { expect } = require('chai');
const hre = require("hardhat");

describe("FundFactory", function () {
  it("should manage and display all fund raiser campaigns", async function () {
    const fundFactory = await hre.ethers.deployContract("Fundfactory");
    await fundFactory.waitForDeployment();

    console.log('Contract deployed to ', fundFactory.target);

  })
})