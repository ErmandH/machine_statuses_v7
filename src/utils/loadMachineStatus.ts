import { MachineStatus, Machines } from "../models/MachineStatus";
import { getDataArray, getSettingsArray } from "./getDataArray";
import getNumberOfUnit from "./getNumberOfUnit";


// export function loadMachineStatuses() {
//   const dataArray = getDataArray();
//   const receivedData = localStorage.getItem('data');

//   // Beklenen uzunlukta olup olmadığını kontrol et
//   if (dataArray.length < 55) {
//     throw new Error(`Missing data: dataArray is not of expected length.\nReceived data: ${receivedData}`);
//   }

//   // Verilerin sayısal olup olmadığını kontrol et
//   function isNumber(value) {
//     return !isNaN(parseFloat(value)) && isFinite(value);
//   }

//   const machineStatus = new MachineStatus();
//   machineStatus.machines = new Array<Machines>();

//   if (!isNumber(dataArray[1])) throw new Error(`Invalid data: speed\nReceived data: ${receivedData}`);
//   machineStatus.speed = dataArray[1];

//   if (!isNumber(dataArray[2])) throw new Error(`Invalid data: seedArea\nReceived data: ${receivedData}`);
//   machineStatus.seedArea = dataArray[2];

//   machineStatus.seedUnit = dataArray[3] == "1" ? "da" : dataArray[3] == "2" ? "ha" : "";
//   if (machineStatus.seedUnit === "") throw new Error(`Invalid data: seedUnit\nReceived data: ${receivedData}`);

//   if (!isNumber(dataArray[4])) throw new Error(`Invalid data: extraOrdinaryDistanceAvg\nReceived data: ${receivedData}`);
//   machineStatus.extraOrdinaryDistanceAvg = dataArray[4];

//   if (!isNumber(dataArray[5])) throw new Error(`Invalid data: seedPerAreaAvg\nReceived data: ${receivedData}`);
//   machineStatus.seedPerAreaAvg = dataArray[5];

//   if (!isNumber(dataArray[6])) throw new Error(`Invalid data: totalCalculatedArea\nReceived data: ${receivedData}`);
//   machineStatus.totalCalculatedArea = dataArray[6];

//   if (!isNumber(dataArray[7])) throw new Error(`Invalid data: partial1\nReceived data: ${receivedData}`);
//   machineStatus.partial1 = dataArray[7];

//   if (!isNumber(dataArray[8])) throw new Error(`Invalid data: partial2\nReceived data: ${receivedData}`);
//   machineStatus.partial2 = dataArray[8];

//   if (!isNumber(dataArray[9])) throw new Error(`Invalid data: partial3\nReceived data: ${receivedData}`);
//   machineStatus.partial3 = dataArray[9];

//   if (!isNumber(dataArray[10])) throw new Error(`Invalid data: partial4\nReceived data: ${receivedData}`);
//   machineStatus.partial4 = dataArray[10];

//   if (!isNumber(dataArray[11])) throw new Error(`Invalid data: partial5\nReceived data: ${receivedData}`);
//   machineStatus.partial5 = dataArray[11];

//   if (!isNumber(dataArray[51])) throw new Error(`Invalid data: totalDistance\nReceived data: ${receivedData}`);
//   machineStatus.totalDistance = dataArray[51];

//   if (!isNumber(dataArray[52])) throw new Error(`Invalid data: distance\nReceived data: ${receivedData}`);
//   machineStatus.distance = dataArray[52];

//   if (!isNumber(dataArray[53])) throw new Error(`Invalid data: totalWorkingTime\nReceived data: ${receivedData}`);
//   machineStatus.totalWorkingTime = dataArray[53];

//   if (!isNumber(dataArray[54])) throw new Error(`Invalid data: workingTime\nReceived data: ${receivedData}`);
//   machineStatus.workingTime = dataArray[54];

//   if (!isNumber(dataArray[12])) throw new Error(`Invalid data: vacuum\nReceived data: ${receivedData}`);
//   machineStatus.vacuum = dataArray[12];

//   if (!isNumber(dataArray[13])) throw new Error(`Invalid data: fertilizerPerUnit\nReceived data: ${receivedData}`);
//   machineStatus.fertilizerPerUnit = dataArray[13];

//   for (var i = 0; i < 12; i++) {
//     const color = dataArray[14 + i] == "0" ? "#fff" : dataArray[38 + i] == "1" ? "#eb3232" : "#0bac0b";
//     if (!isNumber(dataArray[26 + i])) throw new Error(`Invalid data: distance for machine ${i + 1}\nReceived data: ${receivedData}`);
//     const distance = dataArray[26 + i];
//     machineStatus.machines.push(new Machines(i + 1, color, distance, "cm", true));
//   }

//   const settingsArray = getSettingsArray();
//   for (var i = 0; i < 12; i++) {
//     machineStatus.machines[i].show = settingsArray[8 + i] === '1';
//   }

//   return machineStatus;
// }

export function loadMachineStatuses() {
  const dataArray = getDataArray();


  const machineStatus = new MachineStatus();
  machineStatus.machines = new Array<Machines>();
  machineStatus.speed = dataArray[1];
  machineStatus.seedArea = dataArray[2];
  machineStatus.seedUnit = dataArray[3] == "1" ? "da" : dataArray[3] == "2" ? "ha" : "";
  machineStatus.extraOrdinaryDistanceAvg = dataArray[4];
  machineStatus.seedPerAreaAvg = dataArray[5];
  machineStatus.totalCalculatedArea = dataArray[6];
  machineStatus.partial1 = dataArray[7];
  machineStatus.partial2 = dataArray[8];
  machineStatus.partial3 = dataArray[9];
  machineStatus.partial4 = dataArray[10];
  machineStatus.partial5 = dataArray[11];
  machineStatus.totalDistance = dataArray[51]
  machineStatus.distance = dataArray[52]
  machineStatus.totalWorkingTime = dataArray[53]
  machineStatus.workingTime = dataArray[54]
  machineStatus.vacuum = dataArray[12];
  machineStatus.fertilizerPerUnit = dataArray[13];

  machineStatus.machines = new Array<Machines>();
  for (var i = 0; i < 12; i++) {
    machineStatus.machines.push(new Machines(i + 1, dataArray[14 + i] == "0" ? "#fff" : dataArray[38 + i] == "1" ? "#eb3232" : "#0bac0b", dataArray[26 + i], "cm", true));
  }

  const settingsArray = getSettingsArray()
  if (settingsArray) {
    for (var i = 0; i < 12; i++) {
      machineStatus.machines[i].show = settingsArray[8 + i] === '1'
    } //
  }

  return machineStatus
}

