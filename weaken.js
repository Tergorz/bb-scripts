/** @param {NS} ns */
export async function main(ns) {
  let target = ns.args[0];
  let threads = ns.args[1];
  let delay = ns.args [2];

  while(true) {
    await ns.weaken(target, { threads: threads });
	}
}
