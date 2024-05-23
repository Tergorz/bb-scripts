/** @param {NS} ns */
export async function main(ns) {

  let map = netscan(ns);
  for (let i = 1; i < map.length; i++) {
    

    const serverData = ns.getServer(map[i]);

    if (!ns.hasRootAccess(map[i])) {

      if (ns.getServerNumPortsRequired(map[i]) <= serverData.openPortCount) {
        ns.nuke(map[i]);
        ns.tprint(map[i] + " has been nuked.");
      } else {
        
      }

    }

    /*if(!serverData.backdoorInstalled) {
      ns.installBackdoor(target);
    } */
  }

}

function netscan(ns) {
  let hostnames = ['home'];

  for (let i = 0; i < hostnames.length; i++)

  hostnames.push(...ns.scan(hostnames[i]).filter(hostname => !hostnames.includes(hostname)))

  return hostnames;
  
  
}
