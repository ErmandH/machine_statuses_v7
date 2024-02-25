export class MachineSettings {
	period: number;
	discHoleNumber: number;
	distanceBetweenSeeds: number;
	targetFertilizerWeight: number;
	numberOfUnit:number;
	distanceBetweenUnits:number;
	soundWarning: number;
	tolerance:number;
	wheelDiameter: number;
	numberOfSignals: number;
	fertilizerStartTorque: number;
	fertilizerCalibrationRPM: number;
	fertilizerCalibrationTour: number;
	multiplier: number;
	engineSignalOnATour: number;
	unitSeedOfArea: number;
	distanceRPM1: number;
	distanceRPM2: number;
	distanceRPM3: number;
	engineStep1: number;
	engineStep2: number;
	engineStep3: number;
	motorCount: number;
	motors: Motor[]
}

export class Motor{
	public enabled: boolean;
	constructor(enabled: boolean){
		this.enabled = enabled
	}
}