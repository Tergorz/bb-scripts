/** @param {NS} ns */
export async function main(ns) {

  let map = netscan(ns);

  for (let i = 0; i < map.length; i++) {
    ns.killall(map[i]);
  }


}

function netscan(ns) {
  let hostnames = ['home'];

  for (let i = 0; i < hostnames.length; i++)

    hostnames.push(...ns.scan(hostnames[i]).filter(hostname => !hostnames.includes(hostname)))

  return hostnames;


}
