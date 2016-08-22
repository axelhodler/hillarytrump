contract HillaryTrump {
  address public oracle;
  address public trumpBetter;
  address public hillaryBetter;

  function HillaryTrump() {
    oracle = tx.origin;
  }

  function trump() {
    if (msg.value == 10000000000000000000) {
      trumpBetter = msg.sender;
    }
  }

  function hillary() {
    if (msg.value == 40000000000000000000) {
      hillaryBetter = msg.sender;
    }
  }

  function resolve(uint winner) {
    if (winner == 1) {
      if (!trumpBetter.send(this.balance)) {
        throw;
      }
    } else {
      if (!hillaryBetter.send(this.balance)) {
        throw;
      }
    }
  }
}