/** @param {NS} ns */
export async function main(ns) {
  
  let arg = ns.args[0];
  ns.tprint(arg);
  if(arg == "?") {
    
    help(ns)

  } else if (arg == "besttarget") {
    
    besttarget(ns);
    
  } else if(arg == "karma"){

    getKarma(ns);

  } else {

    hoststatus(ns, arg);

  }
  
  
 
}


// ------------------------------ HELPERS ---------------------------- //

function help(ns) {
  ns.tprint("\n ______________________________ \n Parameters for misc: \n \n besttarget: Prints the best current target \n $hostname: Status of given host \n \n")
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
  if(!target.length) { target = hosts; }
  target = target.filter(h => ns.getServer(h).hasAdminRights);
  target = target.sort(function(a,b) {
    let aMoney = ns.getServerMaxMoney(a);
    let bMoney = ns.getServerMaxMoney(b);
    return bMoney - aMoney; 
  })[0];
  return target;
}

function besttarget(ns) {
  const hosts = getHosts(ns);
  const target = getTarget(ns, hosts);
  
  ns.tprint("\n \n " + "Best current target: " + target);
}

function hoststatus(ns, arg) {
  let host = arg;
  let growth = ns.getServerGrowth(host);
  let current = ns.getServerMoneyAvailable(host);
  let max = ns.getServerMaxMoney(host);
  let basesec = ns.getServerBaseSecurityLevel(host);
  let currentsec = ns.getServerSecurityLevel(host);
  let minsec = ns.getServerMinSecurityLevel(host);


  ns.tprint("\n \n" + host + " finance status \n------------------------------" + "\n Available: " + current.toLocaleString() + "\n Maximum:   " + max.toLocaleString() + "\n \n Growth:    " + growth.toLocaleString() + "\n \n" +
  "\n" + host + " security status \n------------------------------" + "\n Current: " + currentsec.toLocaleString() + "\n Minimum: " + minsec.toLocaleString() + "\n \n Base:    " + basesec.toLocaleString() + "\n \n");

}

function getKarma(ns) {
  ns.tprint("\n --------------------------------- \n Current Karma: " + ns.heart.break());
}
