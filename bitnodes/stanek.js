/** @param {NS} ns */
export async function main(ns) {

  let x = ns.args[0];
  let y = ns.args[1];

  if(!Number.isInteger(x) || !Number.isInteger(y)) {
    ns.tprint("Please enter a number");
    return;
  }

  let ram = Math.round((ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) / 2.1)
  let servers = ns.getPurchasedServers();
  ns.exec("bitnodes/chargestanek.js", "home", ram, x, y);
  
  for(let i = 0; i < servers.length; i++) {
    
    if(!ns.fileExists("bitnodes/chargestanek.js", "shelter" + i)) {
      ns.scp("bitnodes/chargestanek.js", "shelter" + i, "home");
    } else {
      ns.rm("bitnodes/chargestanek.js", "shelter" + i);
      ns.scp("bitnodes/chargestanek.js", "shelter" + i, "home");
    }
    
    
    let sram = Math.round((ns.getServerMaxRam("shelter" + i) - ns.getServerUsedRam("shelter" + i)) / 2.1)
    ns.exec("bitnodes/chargestanek.js", "shelter" + i, sram, x, y);
  }
  


  
}
