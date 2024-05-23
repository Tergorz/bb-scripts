/** @param {NS} ns */
export async function main(ns) {
  let target = ns.args[0];
  let threads = ns.args[1];
  let delay = ns.args[2];

  while(true) {
    while(ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target) * 0.8) {
      await ns.sleep(2500)
    }
    await ns.hack(target, { threads: threads });
	}
  
}
