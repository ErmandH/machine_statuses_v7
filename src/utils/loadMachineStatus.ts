import { MachineStatus, Machines } from "../models/MachineStatus";
import { getDataArray, getSettingsArray } from "./getDataArray";
import getNumberOfUnit from "./getNumberOfUnit";

export function loadMachineStatuses(){
  const dataArray = getDataArray();
	const machineStatus = new MachineStatus();
	machineStatus.machines=new Array<Machines>();
    machineStatus.speed=dataArray[1];
    machineStatus.seedArea=dataArray[2];
    machineStatus.seedUnit=dataArray[3]=="1"?"da":dataArray[3]=="2"?"ha":"";
    machineStatus.extraOrdinaryDistanceAvg=dataArray[4];
    machineStatus.seedPerAreaAvg=dataArray[5];
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
    machineStatus.vacuum=dataArray[12];
    machineStatus.fertilizerPerUnit=dataArray[13];
    machineStatus.machines=new Array<Machines>();
    for(var i=0; i< getNumberOfUnit(); i++){
      machineStatus.machines.push(new Machines(i+1,dataArray[14+i]=="0"?"#fff":dataArray[38+i]=="1"?"#eb3232":"#0bac0b",dataArray[26+i],"cm",true));
    }
    const settingsArray = getSettingsArray()
    for(var i=0; i< getNumberOfUnit(); i++){
      machineStatus.machines[i].show = settingsArray[8 + i] === '1'
    }
    return machineStatus
}