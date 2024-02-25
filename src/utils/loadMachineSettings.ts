import { MachineSettings, Motor } from "../models/MachineSettings";
import { MachineStatus } from "../models/MachineStatus";
import { getSettingsArray } from "./getDataArray";
import { loadMachineStatuses } from "./loadMachineStatus";

function loadMachineSettings(){
	const dataArray = getSettingsArray()
	const machineStatus = loadMachineStatuses();
	let machineSettings : MachineSettings = new MachineSettings()
	const actualNumberOfUnit = Number(dataArray[5]);
	
	machineSettings.period = Number(dataArray[1]);
	machineSettings.discHoleNumber = Number(dataArray[2]);
	machineSettings.distanceBetweenSeeds = Number(dataArray[3]);
	machineSettings.targetFertilizerWeight = Number(dataArray[4]);
	machineSettings.numberOfUnit = actualNumberOfUnit
	machineSettings.distanceBetweenUnits = Number(dataArray[6]);
	machineSettings.soundWarning= Number(dataArray[7]);
	for (let i = 0; i < actualNumberOfUnit; i++) {	
		machineStatus.machines[i].show = dataArray[8 + i] === '1'
	}
	const afterUnitsIndex = 20
	machineSettings.motorCount= Number(dataArray[afterUnitsIndex]); // 20
	machineSettings.motors = [];
	let index;
	for (index = 1; index <= machineSettings.motorCount; index++) {
		const isEnabled = dataArray[afterUnitsIndex + index] === '1'
		machineSettings.motors.push(new Motor(isEnabled))
	}
	const afterMotorsIndex = afterUnitsIndex + 5
	machineSettings.unitSeedOfArea= Number(dataArray[afterMotorsIndex]);
	machineSettings.wheelDiameter=Number(dataArray[afterMotorsIndex + 1]); // 26
	machineSettings.numberOfSignals= Number(dataArray[afterMotorsIndex + 2]);
	machineSettings.tolerance = Number(dataArray[afterMotorsIndex + 3]);
	machineSettings.multiplier = Number(dataArray[afterMotorsIndex + 10]);
	
	machineSettings.engineSignalOnATour= Number(dataArray[afterMotorsIndex + 11]);
	machineSettings.fertilizerStartTorque= Number(dataArray[afterMotorsIndex + 13]);
	machineSettings.fertilizerCalibrationRPM= Number(dataArray[afterMotorsIndex + 14]);
	machineSettings.fertilizerCalibrationTour= Number(dataArray[afterMotorsIndex + 15]);
	machineSettings.distanceRPM1= Number(dataArray[afterMotorsIndex + 4]);
	machineSettings.engineStep1= Number(dataArray[ afterMotorsIndex + 5]);
	machineSettings.distanceRPM2=Number(dataArray[afterMotorsIndex + 6]);
	machineSettings.engineStep2= Number(dataArray[afterMotorsIndex + 7]);
	machineSettings.distanceRPM3= Number(dataArray[afterMotorsIndex + 8]);
	machineSettings.engineStep3= Number(dataArray[afterMotorsIndex + 9]);
	return machineSettings;
}

export default loadMachineSettings