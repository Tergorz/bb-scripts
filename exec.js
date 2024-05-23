/** @param {NS} ns */
export async function main(ns) {
  const files = ["hack.js", "weaken.js", "grow.js"];

  let targ = ns.args[0];
  let target;
  const hosts = getHosts(ns);


  if (targ != undefined) {
    target = targ;
    ns.tprint(target);
  } else {
    target = getTarget(ns, hosts);
    ns.tprint(target);
  }







  let homeram = ns.getServerMaxRam("home");
  let homeweakenthreads = parseInt(homeram / 16);
  let homegrowthreads = parseInt(homeram / 16);


  for (let i = 1 /*1 ohne home*/; i < hosts.length; i++) {

    let ram = ns.getServerMaxRam(hosts[i]);
    let hthreads = ram / 8;
    let wthreads = ram / 8;
    let gthreads = ram / 4;

    ns.killall("home");
    ns.killall(hosts[i]);
    ns.rm("hack.js", hosts[i]);
    ns.rm("weaken.js", hosts[i]);
    ns.rm("grow.js", hosts[i]);
    ns.scp(files, hosts[i]);


    //NO RAM
    if (ram == 0 || !ns.hasRootAccess(hosts[i])) {
      continue;
    }
    //PURCHASED SERVERS
    if (hosts[i].includes("shelter")) {
      ns.exec("grow.js", hosts[i], ram / 4, target, ram / 4, i);
      await ns.sleep(500);
      ns.exec("weaken.js", hosts[i], ram / 4, target, ram / 4, i);
      await ns.sleep(500);
      continue;
    }

    //HACKNET SERVERS
    if (hosts[i].includes("hacknet")) {
      continue;
    }

    //LOW RAM
    if (ram == 4) {
      ns.exec("hack.js", hosts[i], 1, target, 1, i);
      ns.exec("weaken.js", hosts[i], 1, target, 1, i);
      continue;
    }

    //REGULAR
    if (ns.hasRootAccess(hosts[i])) {
      ns.exec("hack.js", hosts[i], hthreads, target, hthreads, i);
    }
    ns.exec("weaken.js", hosts[i], wthreads, target, wthreads, i);
    ns.exec("grow.js", hosts[i], gthreads, target, gthreads, i);
  }

  //HOME
  while (ns.getServerUsedRam("home") < ns.getServerMaxRam("home")) {
    ns.exec("grow.js", "home", homegrowthreads, target, homegrowthreads, 1338);
    await ns.sleep(2500);
    ns.exec("weaken.js", "home", homeweakenthreads, target, homeweakenthreads, 1339);
    await ns.sleep(25000);
  }


}

function getHosts(ns) {
  let hostnames = ['home'];

  for (let i = 0; i < hostnames.length; i++)

    hostnames.push(...ns.scan(hostnames[i]).filter(hostname => !hostnames.includes(hostname)))

  return hostnames;


}

function getTarget(ns, hosts) {
  let hskill = ns.getHackingLevel();
  let target = hosts.filter(h => ns.getServerRequiredHackingLevel(h) < hskill / 3);
  if (!target.length) { target = hosts; }
  target = target.filter(h => ns.getServer(h).hasAdminRights);
  target = target.sort(function (a, b) {
    let aMoney = ns.getServerMaxMoney(a);
    let bMoney = ns.getServerMaxMoney(b);
    return bMoney - aMoney;
  })[0];
  return target;
}







/*
n00dles 1
foodnstuff 1
sigma-cosmetics 5
joesguns 10
nectar-net 20
hong-fang-tea 30
harakiri-sushi 40
neo-net 50
(CSEC 55/0)
zer0 75
max-hardware 80
iron-gym 100
phantasy 100
silver-helix 150
omega-net 192
(avmnite-02h 208/0)
crush-fitness 265
johnson-ortho 288
the-hub 311
computek 320
(I.I.I.I 363/0)
rothman-uni 371
netlink 424
catalyst 431
summit-uni 447
syscore 632
zb-institute 728
*/

// ______ 0 - 7 ______ //
// "home","n00dles 1","foodnstuff 1","sigma-cosmetics 5","joesguns 10","hong-fang-tea 30","harakiri-sushi 40","iron-gym 100"

// ______ 8 - 15 ______ //
//"zer0 75","max-hardware 80","nectar-net 20","CSEC 55/0","phantasy 100","neo-net 50","silver-helix 150","omega-net 192"

// ______ 16 - 23 ______ //
//"crush-fitness 265","the-hub 311","computek 320","netlink 424","johnson-ortho 288","avmnite-02h 208","zb-institute 728","syscore 632" 

// ______ 24 - 31 ______ //
//"I.I.I.I 363","summit-uni 447","catalyst 431","rothman-uni 371","lexo-corp","alpha-ent","aevum-police","millenium-fitness"

// ______ 32 - 39 ______ //
//"rho-construction","aerocorp","snap-fitness","global-pharm","galactic-cyber","deltaone","omnia","unitalife"

// ______ 40 - 51 ______ //
//"univ-energy","zeus-med","solaris","defcomm","icarus","infocomm","nova-med","taiyang-digital","zb-def","run4theh111z","microdyne","titan-labs"

// ______ 52 - 62? ______ //
//"applied-energetics","stormtech","vitalife","fulcrumtech","helios","omnitek","4sigma","kuai-gong",".","blade","powerhouse-fitness"

// ______ 63 - 69 ______ //
//"b-and-a","clarkinc","nwo","ecorp","megacorp","fulcrumassets","The-Cave"
