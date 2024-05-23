/** @param {NS} ns */
export async function main(ns) {

  let arg = ns.args[0];
  let srv = ns.getPurchasedServers();
  if (srv.length == 0) {
    if (ns.getServerMoneyAvailable("home") > ((ns.getPurchasedServerCost(4)) * ns.getPurchasedServerLimit())) {
      for (let i = 0; i < ns.getPurchasedServerLimit(); i++) {
        ns.purchaseServer("shelter" + i, 4);
      }
      return;

    }

  } else if (arg == "remove") {
    for (let i = 0; i < srv.length; i++) {
      ns.deleteServer(srv[i]);
    }
    return;


  } else if (arg == "upgrade") {


    for (let i = 0; i < srv.length; i++) {
      if (ns.getServerMoneyAvailable("home") > (ns.getPurchasedServerUpgradeCost(srv[i], ns.getServerMaxRam(srv[i]) * 2))) {
        ns.upgradePurchasedServer(srv[i], ns.getServerMaxRam(srv[i]) * 2);
        ns.tprint("\n Upgraded " + srv[i] + " to :" + ns.getServerMaxRam(srv[i]) + "GB");
      }

    }
    return;

  } else if (arg == "info") {
    if (srv.length == 0) {
      ns.tprint("Purchase cost: " + (ns.getPurchasedServerCost(4) * ns.getPurchasedServerLimit()).toLocaleString());
      return;

    } else {
      let sum = 0;
      for (let i = 0; i < srv.length; i++) {
        sum = sum + (ns.getPurchasedServerUpgradeCost(srv[i], ns.getServerMaxRam(srv[i]) * 2));
      }
      ns.tprint("Upgrade cost: " + sum.toLocaleString());
      return;
    }

  } else if (arg == "share") {
    for (let i = 0; i < srv.length; i++) {
      if (!ns.fileExists("share.js", srv[i])) {
        ns.scp("share.js", srv[i]);
      }
      ns.exec("share.js", srv[i], Math.floor(((ns.getServerMaxRam(srv[i]) - ns.getServerUsedRam(srv[i])) / 4)));
    }
    ns.tprint("Running share on all shelters");
    return;
  } else if (arg = "fullupgrade") {

    while (ns.getPurchasedServerUpgradeCost(srv[srv.length - 1]) != Infinity) {

      for (let i = 0; i < srv.length; i++) {
        if (ns.getServerMoneyAvailable("home") > (ns.getPurchasedServerUpgradeCost(srv[i], ns.getServerMaxRam(srv[i]) * 2))) {
          ns.upgradePurchasedServer(srv[i], ns.getServerMaxRam(srv[i]) * 2);
          ns.tprint("\n Upgraded " + srv[i] + " to :" + ns.getServerMaxRam(srv[i]) + "GB");
        }
      }
    }

  }
}
