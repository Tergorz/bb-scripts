/** @param {NS} ns */
export async function main(ns) {

  // -------------------- CORE ------------------ //

  switch (ns.args[0]) {
    case "purchase":
      purchase();
      break;
    case "upgrade":
      upgrade();
      break;
    case "cashout":
      cashout();
      break;
    default:
      ns.tprint("No argument");
  }

  // --------------------- HELPERS --------------------- //

  function purchase() {
    while (ns.hacknet.getPurchaseNodeCost() < (ns.getServerMoneyAvailable("home") / 2)) {
      ns.hacknet.purchaseNode();
    }
  }

  function upgrade() {
    for (let i = 0; i < ns.hacknet.numNodes(); i++) {

      if (ns.hacknet.getLevelUpgradeCost(i) != Infinity) {
        ns.hacknet.upgradeLevel(i, 199);

      }
      if (!ns.hacknet.getRamUpgradeCost(i) != Infinity) {
        ns.hacknet.upgradeRam(i, 6);

      }
      if (!ns.hacknet.getCoreUpgradeCost(i) != Infinity) {
        ns.hacknet.upgradeCore(i, 15);

      }
    }
  }

  function cashout() {
    while (ns.hacknet.numHashes() > 4) {
      ns.hacknet.spendHashes("Sell for Money");
    }
  }

}



