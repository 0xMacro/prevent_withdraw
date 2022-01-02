const { expect } = require("chai")

describe("Withdraw contract", function () {

  let withdrawContract
  let withdrawAttacker
  let owner
  
  beforeEach(async function () {
    WithdrawContractFactory = await ethers.getContractFactory("WithdrawContract")
    ;[owner] = await ethers.getSigners()
    withdrawContract = await WithdrawContractFactory.deploy(owner)
    await withdrawContract.deployed()
    WithdrawAttackerFactory = await ethers.getContractFactory("WithdrawAttacker")
    withdrawAttacker = await WithdrawAttackerFactory.deploy()
    await withdrawAttacker.deployed()
  })

  it("can be attacked", async function () {
    await withdrawContract.withdraw(withdrawAttacker.address)
  })
})
