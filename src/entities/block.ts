import Transaction from "./transaction";
import * as crypto from "crypto";

class Block {
  public nonce = Math.round(Math.random() * 99999999);
  public solutionValue: number = 0;

  constructor(
    public prevHash: string,
    public transaction: Transaction,
    public timeStamp = Date.now()
  ) {}

  get hash() {
    const dataString = JSON.stringify(this);
    const hashFunction = crypto.createHash("SHA256");
    hashFunction.update(dataString).end();
    return hashFunction.digest("hex");
  }
}

export default Block;
