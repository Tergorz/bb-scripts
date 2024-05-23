/** @param {NS} ns */
export async function main(ns) {

  ns.disableLog("gang.setMemberTask");
  ns.clearLog();
  //ns.tail();

  // ------------------------- CONSTANTS -------------------------- //

  const args = ns.args
  const members = ns.gang.getMemberNames();
  const equip = ns.gang.getEquipmentNames();
  const ascensionThresh = 1.3;

  // ------------------------- GANG LOOP -------------------------- //


  switch (args[0]) {
    case "ascend":
      await autoAscend();
      break;
    case "terrorism":
      await terrorism();
      break;
    case "train":
      await trainAll();
      break;
    case "purchase":
      await purchaseEssentials();
      break;
    case "humantraffick":
      await humanTraffic();
      break;
    case "warfare":
      await warfare();
      break;
    case "recruit":
      await recruitMember();
      break;
    default:
      break;
  }








  // --------------------------- HELPERS -------------------------- //

  async function trainAll() {
    for (let i = 0; i < members.length; i++) {
      ns.gang.setMemberTask(members[i], "Train Combat");
    }
  }

  async function humanTraffic() {
    for (let i = 0; i < members.length - 1; i++) {
      ns.gang.setMemberTask(members[i], "Human Trafficking");

    }
    ns.gang.setMemberTask(members[members.length - 1], "Vigilante Justice");
  }

  async function terrorism() {
    for (let i = 0; i < members.length - 2; i++) {
      ns.gang.setMemberTask(members[i], "Terrorism");

    }
    ns.gang.setMemberTask(members[members.length - 2], "Vigilante Justice");
    ns.gang.setMemberTask(members[members.length - 1], "Vigilante Justice");
  }

  async function warfare() {
    for (let i = 0; i < members.length; i++) {
      ns.gang.setMemberTask(members[i], "Territory Warfare");
    }
  }



  async function autoAscend() {

    ns.tprint("Beginning test of ascension.")
    for (let i = 0; i < members.length; i++) {
      if ((ns.gang.getAscensionResult(members[i]) != undefined) && ns.gang.getAscensionResult(members[i]).str > ascensionThresh) {
        ns.print("Attempting to ascend " + members[i]);
        ns.gang.ascendMember(members[i]);
        ns.gang.setMemberTask(members[i], "Train Combat");

      }
    }
  }



  async function purchaseEssentials() {
    for (let i = 0; i < members.length; i++) {
      for (let j = 0; j < equip.length; j++) {
        if (!ns.gang.getMemberInformation(members[i]).upgrades.includes(equip[j])) {
          ns.gang.purchaseEquipment(members[i], equip[j]);
        }
      }
    }
  }

  async function recruitMember() {

    while (ns.gang.canRecruitMember()) {
      let num = (ns.gang.getMemberNames()).length;

      ns.gang.recruitMember("mem" + (num + 1));

      await ns.sleep(5000);

    }

  }


}
