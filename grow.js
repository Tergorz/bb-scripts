/** @param {NS} ns */
export async function main(ns) {
	let target = ns.args[0];
  let threads = ns.args[1];
  let delay = ns.args [2];

  while(true) {
    while(ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target) + 2) {
      await ns.sleep(2500)
    }
    await ns.grow(target, { threads: threads });
	}
}
