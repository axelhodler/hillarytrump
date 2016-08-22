contract('HillaryTrump', function(accounts) {
  var contract;

  function betOnTrump() {
    return contract.trump.sendTransaction({
      from: accounts[1],
      value: web3.toWei(10, "ether")
    }).then(function() {
      return contract.trumpBetter.call().then(function(trumpBetterAddress) {
        assert.equal(trumpBetterAddress, accounts[1]);
      })
    });
  }

  function betOnHillary() {
    return contract.hillary.sendTransaction({
      from: accounts[2],
      value: web3.toWei(40, "ether")
    }).then(function() {
      return contract.hillaryBetter.call().then(function(hillaryBetter) {
        assert.equal(hillaryBetter, accounts[2]);
      })
    });
  }

  beforeEach(function() {
    contract = HillaryTrump.deployed();
  });

  xit("uses the initiator as an oracle", function() {
    return contract.oracle.call().then(function(oracleAddress) {
      assert.equal(oracleAddress, accounts[0]);
    });
  });

  xit("sets the one sending 10 ether as the trump better", function() {
    return betOnTrump();
  });

  xit("sets the one sending 40 ether as the hillary better", function() {
    return betOnHillary();
  });

  it("sends the winner 50 ether after the bet is resolved", function() {
    function balanceInEth(account) {
      return web3.fromWei(web3.eth.getBalance(account), "ether").toNumber();
    }

    var trumpBetterBalance;
    return betOnTrump().then(function() {
      trumpBetterBalance = balanceInEth(accounts[1]);
      return betOnHillary().then(function() {
        return contract.resolve(1, {from: accounts[0]}).then(function() {
          assert.equal(balanceInEth(accounts[1]), trumpBetterBalance + 50);
        });
      })
    })
  });
});