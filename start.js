import fs from "fs";
import path from "path";
import { config } from "dotenv";
import { exec, execSync } from "child_process";

config();
const { NAME, DOMAIN, PORT, USERPROFILE } = process.env;
const configPath = path.join(USERPROFILE, ".cloudflared", `config-${NAME}.yml`);
// tunnel.cmd create [name] [hostname] [localPort]
// tunnel.cmd run [name]
// tunnel.cmd delete [name]
// tunnel.cmd list

process.env.dirname = import.meta.dirname;

if (fs.existsSync("D:/#/tunnel.cmd")) {
  if (!fs.existsSync(configPath))
    execSync(`D:/#/tunnel.cmd create ${NAME} ${DOMAIN} ${PORT}`);

  const tunnel = exec(`D:/#/tunnel.cmd run ${NAME}`);
  process.on("exit", () => {
    console.log("kill tunnel");
    tunnel.kill();
  });
}


import("./.output/server/index.mjs");
console.log("https://" + DOMAIN);
