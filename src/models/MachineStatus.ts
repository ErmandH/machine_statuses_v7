export class MachineStatus{
    speed:String;
    seedArea:String;
    seedUnit:String;
    extraOrdinaryDistanceAvg:String;
    seedPerAreaAvg:String;
    totalCalculatedArea:string;
    partial1:string;
    partial2:string;
    partial3:string;
    partial4:string;
    partial5:string;
    vacuum:String;
    fertilizerPerUnit:String;
    workingTime:string;
    totalWorkingTime:string;
    distance:string;
    totalDistance:string;
    soundStatus:String;
    machines:Array<Machines>;
    loadMachineStatus: (dataArray:string[]) => MachineStatus
}
export class Machines{
    no:string;
      statusColor:string;
      value:string;
      unit:string;
      show:boolean;
      constructor(private _no,private _statusColor,private _value,private _unit,private _show){
        this.no=this._no;
        this.statusColor=this._statusColor;
        this.value=this._value;
        this.unit=this._unit;
        this.show=this._show;
      }
}