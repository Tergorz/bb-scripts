export async function main(ns) {
  
  let map = netscan(ns);

  for(let i = 1; i < map.length; i++) {

    const serverData = ns.getServer(map[i]);

    if(ns.fileExists('brutessh.exe')) {
      ns.brutessh(map[i]);
    }
    if(ns.fileExists('ftpcrack.exe')) {
      ns.ftpcrack(map[i]);
    }
    if(ns.fileExists('relaysmtp.exe')) {
      ns.relaysmtp(map[i]);
    }
    if(ns.fileExists('httpworm.exe')) {
      ns.httpworm(map[i]);
    }
    if(ns.fileExists('sqlinject.exe')) {
      ns.sqlinject(map[i]);
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
