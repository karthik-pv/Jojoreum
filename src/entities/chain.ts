import * as crypto from "crypto";
import Block from "./block";
import Transaction from "./transaction";

class Chain {
  public static singletonInstance = new Chain();

  chain: Block[];
  constructor() {
    this.chain = [new Block(null, new Transaction(100, "genesis", "Jojo"))];
  }

  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  mine(nonce: number) {
    let possibleSolution = 0;
    console.log("Mining ...");
    while (true) {
      const MD5Hashing = crypto.createHash("MD5");
      MD5Hashing.update((nonce + possibleSolution).toString()).end();
      const attempt = MD5Hashing.digest("hex");
      if (attempt.substring(0, 4) === "0000") {
        console.log(`Solution is ${possibleSolution}`);
        break;
      }
      possibleSolution += 1;
    }
    return possibleSolution;
  }

  addBlock(
    transaction: Transaction,
    senderPublicKey: string,
    signature: Buffer
  ) {
    const verifierFunction = crypto.createVerify("SHA256");
    verifierFunction.update(transaction.toString());
    const isValid = verifierFunction.verify(senderPublicKey, signature);
    if (isValid) {
      const newBlock = new Block(this.lastBlock.hash, transaction, Date.now());
      newBlock.solutionValue = this.mine(newBlock.nonce);
      this.chain.push(newBlock);
      console.log(newBlock);
    }
  }
}

export default Chain;
