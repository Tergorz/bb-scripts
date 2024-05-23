/** @param {NS} ns */
export async function main(ns) {

  const args = ns.args;

  switch (args[0]) {
    case "programs":
      buyPrograms(ns);
      break;
    case "train":
      doTrain(ns);
      break;
    case "join":
      joinAllFactions(ns);
      break;
    case "mults":
      getBitnodesMultipliers(ns);
      break;
    case "neuro":
      upgradeNeuro(ns);
      break;
    case "destory":
      destoryWD(ns);
      break;
    default:
      break;
  }





  /** @param {NS} ns */
  function buyPrograms(ns) {
    ns.singularity.purchaseTor();
    let prog = ns.singularity.getDarkwebPrograms();
    for (let i = 0; i < prog.length; i++) {
      if (ns.singularity.getDarkwebProgramCost(prog[i]) < ns.getServerMoneyAvailable('home')) {
        ns.singularity.purchaseProgram(prog[i]);
      }
    }
  }

  /** @param {NS} ns */
  function doTrain(ns) {
    switch (args[1]) {
      case "str":
        ns.singularity.gymWorkout("Powerhouse Gym", "str", false);
        break;
      case "def":
        ns.singularity.gymWorkout("Powerhouse Gym", "def", false);
        break;
      case "dex":
        ns.singularity.gymWorkout("Powerhouse Gym", "dex", false);
        break;
      case "agi":
        ns.singularity.gymWorkout("Powerhouse Gym", "agi", false);
        break;
      default:
        ns.singularity.gymWorkout("Powerhouse Gym", "str", false);
        break;
    }


  }


  /** @param {NS} ns */
  function joinAllFactions(ns) {
    let invites = ns.singularity.checkFactionInvitations();
    for (let i = 0; i < invites.length; i++) {
      ns.singularity.joinFaction(invites[i]);
    }
  }

  /** @param {NS} ns */
  function getBitnodesMultipliers(ns) {
    const mults = ns.getBitNodeMultipliers();
    ns.tprintf("INFO\n\n \n Bitnodes Multipliers: \n \n \n" +
      " Server Max Money: " + mults.ServerMaxMoney +
      "\n Server Growth Rate: " + mults.ServerGrowthRate +
      "\n Script Hack Money: " + mults.ScriptHackMoneyGain +
      "\n Purchased Server Limit: " + mults.PurchasedServerLimit +
      "\n Purchased Server Softcap: " + mults.PurchasedServerSoftcap +
      "\n \n Hack Exp Gain: " + mults.HackExpGain +
      "\n Hacking Level Multiplier:" + mults.HackingLevelMultiplier +
      "\n Strength Level Multiplier: " + mults.StrengthLevelMultiplier +
      "\n Defense Level Multiplier: " + mults.DefenseLevelMultiplier +
      "\n Dexterity Level Multiplier: " + mults.DexterityLevelMultiplier +
      "\n Agility Level Multiplier: " + mults.AgilityLevelMultiplier +
      "\n \n Gang Softcap: " + mults.GangSoftcap +
      "\n Corps Softcap: " + mults.CorporationSoftcap +
      "\n Bladeburner Rank: " + mults.BladeburnerRank +
      "\n Bladeburners Skill Cost: " + mults.BladeburnerSkillCost +
      "\n \n Augmentation Money Cost: " + mults.AugmentationMoneyCost +
      "\n Augmentation Rep Cost: " + mults.AugmentationRepCost +
      "\n \n Daedalus Augs Requirement: " + mults.DaedalusAugsRequirement +
      "\n World Daemon Difficulty: " + mults.WorldDaemonDifficulty
    );

  }

  /** @param {NS} ns */
  async function upgradeNeuro(ns) {

    let neurofluxLevel = 0;
    while (true) {
      const augmentList = ns.singularity.getOwnedAugmentations();
      for (var i = 0; i < augmentList.length; i++) {
        if (augmentList[i].startsWith("Neuroflux Governor")) {
          neurofluxLevel = augmentList[i].substring(augmentList[i].lastIndexOf(" "));
        }
      }
      ns.singularity.purchaseAugmentation("Sector-12", "NeuroFlux Governor - Level " + neurofluxLevel);
      if (ns.singularity.getAugmentationPrice("NeuroFlux Governor - Level " + neurofluxLevel) > ns.getServerMoneyAvailable("home") || ns.singularity.getAugmentationRepReq("NeuroFlux Governor - Level " + neurofluxLevel) > ns.singularity.getFactionRep("Sector-12")) {
        break;
      }
      await ns.sleep(1000);
    }





  }
  /** @param {NS} ns */
  function destoryWD(ns) {
    let tarbn = ns.args[1];
    ns.singularity.destroyW0r1dD43m0n(tarbn);
  }





}
