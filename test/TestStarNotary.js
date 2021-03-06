const StarNotary = artifacts.require("StarNotary");

let accounts;
let owner;
let instance;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

before(async () => {
    instance = await StarNotary.deployed();
});

describe('a suite of tests', function() {

// this.timeout(4000);


it('can Create a Star', async() => {
    let tokenId = 1;

    await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
});

it('lets user1 put up their star for sale', async() => {
    let user1 = accounts[1];
    let starId = 2;
    let starPrice = web3.utils.toWei(".01", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    assert.equal(await instance.starsForSale.call(starId), starPrice);
});

it('lets user1 get the funds after the sale', async() => {
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 3;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
    await instance.buyStar(starId, {from: user2, value: balance});
    let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
    let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
    let value2 = Number(balanceOfUser1AfterTransaction);
    assert.equal(value1, value2);
});

it('lets user2 buy a star, if it is put up for sale', async() => {
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 4;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    await instance.buyStar(starId, {from: user2, value: balance});
    assert.equal(await instance.ownerOf.call(starId), user2);
});

it('lets user2 buy a star and decreases its balance in ether', async() => {
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 5;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, {from: user2, value: balance, gasPrice:0});
    const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
    let value = Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar);
    assert.equal(value, starPrice);
  });

it('Look up minted star data', async () => {
    let user1 = accounts[1];
    let starId = 6;
    await instance.createStar('funky star', starId, {from: user1});
    let mintedStarName = await instance.lookUptokenIdToStarInfo(starId);
    assert.equal(mintedStarName, "funky star");
});

it('can add the star name and star symbol properly', async() => {
    assert.equal(await instance.name.call(), "Bizarre Crypto Star");
    assert.equal(await instance.symbol.call(), "BCS");
});

it('lets 2 users exchange stars', async() => {
    let user1 = accounts[1];
    let starId1 = 7;
    let user2 = accounts[2];
    let starId2 = 8;
    await instance.createStar('smiley star', starId1, {from: user1});
    await instance.createStar('grumpy star', starId2, {from: user2});
    await instance.exchangeStars(starId1, starId2, {from: user1});
    assert.equal(await instance.ownerOf.call(starId2), user1);
    assert.equal(await instance.ownerOf.call(starId1), user2);
});

it('lets a user transfer a star', async() => {
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 9;
    await instance.createStar('fat star', starId, {from: user1});
    await instance.transferStar(user2, starId, {from: user1});
    assert.equal(await instance.ownerOf.call(starId), user2);
});

});