// test/FlowToken.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FlowToken contract", function () {
  let flowToken, owner, addr1, addr2;

  // We'll deploy with a cap of 70,000,000 FLT
  // and a blockReward of 50 FLT
  const tokenCap = 70000000;
  const tokenBlockReward = 50;

  beforeEach(async function () {
    const Token = await ethers.getContractFactory("FlowToken");
    [owner, addr1, addr2] = await ethers.getSigners();
    flowToken = await Token.deploy(tokenCap, tokenBlockReward);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await flowToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await flowToken.balanceOf(owner.address); // returns bigint
      const totalSupply = await flowToken.totalSupply();            // returns bigint
      expect(ownerBalance).to.equal(totalSupply);
    });

    it("Should set the max capped supply to the argument provided during deployment", async function () {
      const capBN = await flowToken.cap(); // returns bigint
      // tokenCap * 10^18
      const expectedCap = ethers.parseUnits(tokenCap.toString(), 18); // returns bigint
      expect(capBN).to.equal(expectedCap);
    });

    it("Should set the blockReward to the argument provided during deployment", async function () {
      const blockRewardBN = await flowToken.blockReward(); // bigint
      // tokenBlockReward * 10^18
      const expectedBR = ethers.parseUnits(tokenBlockReward.toString(), 18);
      expect(blockRewardBN).to.equal(expectedBR);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      // Transfer 50 tokens from owner to addr1
      await flowToken.transfer(addr1.address, 50n);
      const addr1Balance = await flowToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50n);

      // Transfer 50 tokens from addr1 to addr2
      await flowToken.connect(addr1).transfer(addr2.address, 50n);
      const addr2Balance = await flowToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50n);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      // With OZ 5.x, this triggers the custom error:
      //    ERC20InsufficientBalance(address account, uint256 needed, uint256 available)
      await expect(
        flowToken.connect(addr1).transfer(owner.address, 1n)
      ).to.be.revertedWithCustomError(flowToken, "ERC20InsufficientBalance");
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await flowToken.balanceOf(owner.address); // bigint

      // Transfer 100 tokens from owner to addr1
      await flowToken.transfer(addr1.address, 100n);

      // Transfer another 50 tokens from owner to addr2
      await flowToken.transfer(addr2.address, 50n);

      const finalOwnerBalance = await flowToken.balanceOf(owner.address);

      // Compare as bigints
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150n);

      const addr1Balance = await flowToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100n);

      const addr2Balance = await flowToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50n);
    });
  });
});
