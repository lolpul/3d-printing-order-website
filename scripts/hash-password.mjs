import { hash } from "bcryptjs";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = createInterface({ input, output });
const password = process.argv[2] || (await rl.question("Admin password: "));
rl.close();

if (!password || password.length < 12) {
  console.error("Password must be at least 12 characters long.");
  process.exit(1);
}

console.log(await hash(password, 12));
