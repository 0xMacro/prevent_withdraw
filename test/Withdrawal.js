const { expect } = require("chai")

describe("Withdraw contract", function () {

  let withdrawContract
  let withdrawAttacker
  let owner
  
  beforeEach(async function () {
    WithdrawContractFactory = await ethers.getContractFactory("WithdrawContract")
    ;[owner] = await ethers.getSigners()
    withdrawContract = await WithdrawContractFactory.deploy(owner.address)
    await withdrawContract.deployed()
    WithdrawAttackerFactory = await ethers.getContractFactory("WithdrawAttacker")
    withdrawAttacker = await WithdrawAttackerFactory.deploy()
    await withdrawAttacker.deployed()
  })

  it("owner should get their cut", async function () {

    // give the contract 1 eth
    await withdrawContract.contribute({value: ethers.utils.parseEther("100")})

    //the owner expects a cut of 1% of that on each withdrawal
    const expectedCut = ethers.utils.parseEther("1");

    //check how much the owner has to start with
    const initialOwnerBalance = await ethers.provider.getBalance(owner.address)

    //make the withdrawal 
    await withdrawContract.withdraw(withdrawAttacker.address)

    //check the owner's balance increased by approximately the expected amount
    const tolerance = ethers.utils.parseEther("0.06");
    const finalOwnerBalance = await ethers.provider.getBalance(owner.address)
    const amountReceived = finalOwnerBalance.sub(initialOwnerBalance);
    expect(amountReceived).to.be.closeTo(expectedCut, tolerance)
  })
})
