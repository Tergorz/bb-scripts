/** @param {NS} ns */
export async function main(ns) {

  let snum = ns.sleeve.getNumSleeves();

  switch (ns.args[0]) {
    case 'homicide':
      doHomicide(ns);
      break;
    case 'idle':
      goIdle(ns);
      break;
    case 'train':
      doWorkout(ns);
      break;
    case 'study':
      doStudy(ns);
      break;
    case 'recover':
      doRecovery(ns);
      break;
    default:
      break;
  }


  /** @param {NS} ns */
  function doHomicide(ns) {
    for (let i = 0; i < snum; i++) {
      ns.sleeve.setToCommitCrime(i, 'Homicide');
    }
  }

  /** @param {ns} ns */
  function doRecovery(ns) {
    for (let i = 0; i < snum; i++) {
      ns.sleeve.setToShockRecovery(i);
    }
  }

  /** @param {NS} ns */
  function doStudy(ns) {
    for (let i = 0; i< snum; i++) {
      ns.sleeve.setToUniversityCourse(i, "Rothman University", "Algorithms");
    }
  }

  /** @param {NS} ns */
  function doWorkout(ns) {
    ns.sleeve.setToGymWorkout(0, "Powerhouse Gym", "str");
    ns.sleeve.setToGymWorkout(1, "Powerhouse Gym", "def");
    ns.sleeve.setToGymWorkout(2, "Powerhouse Gym", "dex");
    ns.sleeve.setToGymWorkout(3, "Powerhouse Gym", "agi");
    ns.sleeve.setToGymWorkout(4, "Powerhouse Gym", "str");
    ns.sleeve.setToGymWorkout(5, "Powerhouse Gym", "dex");
  }

  /** @param {NS} ns */
  function goIdle(ns) {
    for (let i = 0; i < snum; i++) {
      ns.sleeve.setToIdle(i);
    }
  }


}

