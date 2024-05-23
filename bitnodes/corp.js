/** @param {NS} ns */
export async function main(ns) {
  ns.tail(); 

  const companyName = "Stiyaverse";
  const agricultureName = "Stiyagrow";
  const tobaccoName = "Stiyapuff";

  const jobs = ["Operations", "Engineer", "Business", "Management", "Research & Development"];
  const boostMaterials = ["Hardware", "Robots", "AI Cores", "Real Estate"];
  const levelUpgrades = ["Smart Factories", "Smart Storage", "FocuseWires", "Neureal Accelerators", "Speech Processor Implants", "Nuoptimal Nootropic Injector Implants", "Wilson Analystics"];
  const cities = ["Aevum", "Chongqing", "New Tokyo", "Ishima", "Volhaven", "Sector-12"];


  const materialPhases = [
    [125, 0, 75, 27000],
    [2675, 96, 2445, 119400],
    [6500, 630, 3750, 84000]
  ];


  while (true) {
    for (let i = 0; i < cities.length; i++) {
      await ns.sleep(1000);
      ns.corporation.buyTea(tobaccoName, cities[i]);
    }
  }
  






}
