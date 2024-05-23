/** @param {NS} ns */
export async function main(ns) {
  let x = ns.args[0];
  let y = ns.args[1];
  while(true) {
    await ns.stanek.chargeFragment(x, y)
  }
}
