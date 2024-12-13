import Wallet from "./entities/wallet";
import Chain from "./entities/chain";

const Jojo = new Wallet();
const Beatle = new Wallet();
const Stone = new Wallet();

Jojo.sendMoney(150, Beatle.publicKey);
Beatle.sendMoney(200, Stone.publicKey);
Stone.sendMoney(300, Jojo.publicKey);

console.log(Chain.singletonInstance);
