import * as crypto from "crypto";
import Transaction from "./transaction";
import Chain from "./chain";

class Wallet {
  public publicKey: string;
  public privateKey: string;

  constructor() {
    const RSAFunction = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });

    this.publicKey = RSAFunction.publicKey;
    this.privateKey = RSAFunction.privateKey;
  }

  sendMoney(amount: number, payeePublicKey: string) {
    const transaction = new Transaction(amount, this.publicKey, payeePublicKey);

    const signFunction = crypto.createSign("SHA256");
    signFunction.update(transaction.toString()).end();

    const signature = signFunction.sign(this.privateKey);
    Chain.singletonInstance.addBlock(transaction, this.publicKey, signature);
  }
}

export default Wallet;
