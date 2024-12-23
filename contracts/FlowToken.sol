// contracts/FlowToken.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract FlowToken is ERC20Capped, ERC20Burnable{
    address payable public owner;
    uint256 public blockReward;

    constructor(uint256 cap, uint256 reward) 
        ERC20("FlowToken", "FLT")
        ERC20Capped(cap * (10 ** decimals()))
    {
        owner = payable(msg.sender);
        uint256 decimalsMultiplier = 10 ** decimals();
        _mint(owner, 70000000 * decimalsMultiplier);
        blockReward = reward * decimalsMultiplier;
    }
    
    function _mintMinerReward() internal {
        // account of the node who is include the block into the blockchain
        if (block.coinbase != address(0)) {
            _mint(block.coinbase, blockReward);
        }
    }

    function setBlockReward(uint256 reward) public onlyOwner {
        blockReward = reward * (10 ** decimals());
    }

    function destroy() public onlyOwner {
        selfdestruct(owner);
    }

    modifier onlyOwner {
        // if not true then send that message
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // This hook replaces _beforeTokenTransfer in OZ v5
    // Called internally before minting, burning, or transferring
    function _update(address from, address to, uint256 amount) 
        internal 
        virtual 
        override(ERC20, ERC20Capped) 
    {
        // Only mint miner reward if the transfer is not minting (from != 0x0)
        // & not transferring to block.coinbase 
        // & totalSupply + blockReward <= cap()
        if (from != address(0) && to != block.coinbase && block.coinbase != address(0) && 
            ERC20.totalSupply() + blockReward <= cap()
        ) {
            _mintMinerReward();
        }
        super._update(from, to, amount);
    }
}