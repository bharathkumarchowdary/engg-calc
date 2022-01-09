import {Injectable} from '@angular/core';
import {of} from "rxjs";
import {GraphData} from "./graph.data";


export class RcTcFormData {
    voltage: number = 0;
    resistance: number = 0;
    capacitance: number = 0;
    voltagePrefix: number = 0
    resistancePrefix: number;
    capacitancePrefix: number;

    constructor(voltage: number, resistance: number, capacitance: number,
                voltagePrefix: number, resistancePrefix: number, capacitancePrefix: number) {
        this.voltage = voltage;
        this.resistance = resistance;
        this.capacitance = capacitance;
        this.voltagePrefix = voltagePrefix;
        this.resistancePrefix = resistancePrefix;
        this.capacitancePrefix = capacitancePrefix;
    }
}

@Injectable({
    providedIn: 'root'
})
export class RcTcGraphService {

    private graphData: GraphData = new GraphData()

    constructor() {
    }

    getRcTcGraphData(rcTcFormData: RcTcFormData) {
        this.graphData = new GraphData()
        for (let index = 0; index < 51; index++) {
            this.graphData.dataX[index] = index * rcTcFormData.resistance * rcTcFormData.resistancePrefix * rcTcFormData.capacitance * rcTcFormData.capacitancePrefix / 10
            this.graphData.dataY[index] = rcTcFormData.voltage * rcTcFormData.voltagePrefix * (1 - Math.exp(-1 * this.graphData.dataX[index] / (rcTcFormData.resistance * rcTcFormData.resistancePrefix * rcTcFormData.capacitance * rcTcFormData.capacitancePrefix)))
        }
        this.graphData.dataXRange = Math.max(...this.graphData.dataX) - Math.min(...this.graphData.dataX)
        this.graphData.dataYRange = Math.max(...this.graphData.dataY) - Math.min(...this.graphData.dataY)
        if ((1e0 <= this.graphData.dataYRange) && (this.graphData.dataYRange < 1e3)) {
            this.graphData.dataYLabelBase = 1
        } else if ((1e-3 <= this.graphData.dataYRange) && (this.graphData.dataYRange < 1)) {
            this.graphData.dataYLabelBase = 1e-3
        } else if ((1e3 <= this.graphData.dataYRange) && (this.graphData.dataYRange < 1e6)) {
            this.graphData.dataYLabelBase = 1e3
        }
        if ((1e-3 <= this.graphData.dataXRange) && (this.graphData.dataXRange < 1)) {
            this.graphData.dataXLabelBase = 1e-3
        } else if ((1e-6 <= this.graphData.dataXRange) && (this.graphData.dataXRange < 1e-3)) {
            this.graphData.dataXLabelBase = 1e-6
        } else if ((1e-9 <= this.graphData.dataXRange) && (this.graphData.dataXRange < 1e-6)) {
            this.graphData.dataXLabelBase = 1e-9
        } else if ((1e-12 <= this.graphData.dataXRange) && (this.graphData.dataXRange < 1e-9)) {
            this.graphData.dataXLabelBase = 1e-12
        } else if ((1e-15 <= this.graphData.dataXRange) && (this.graphData.dataXRange < 1e-12)) {
            this.graphData.dataXLabelBase = 1e-15
        }
        this.graphData.xLabels.splice(0, this.graphData.xLabels.length)
        for (let index = 1; index <= 10; index += 1) {
            this.graphData.xLabels.push(Number(((((index * 10) / 100) * this.graphData.dataXRange) / this.graphData.dataXLabelBase).toFixed(2)))
        }
        this.graphData.yLabels.splice(0, this.graphData.yLabels.length)
        for (let index = 1; index <= 10; index += 1) {
            this.graphData.yLabels.push(Number(((((index * 10) / 100) * this.graphData.dataYRange) / this.graphData.dataYLabelBase).toFixed(2)))
        }
        for (let index = 0; index < this.graphData.dataY.length; index++) {
            this.graphData.dataPoints[index] = {
                yDist: (100 - ((this.graphData.dataY[index] - this.graphData.dataYMin) * 100 / this.graphData.dataYRange)).toFixed(2).concat("%"),
                xDist: ((this.graphData.dataX[index] - this.graphData.dataXMin) * 100 / this.graphData.dataXRange).toFixed(2).concat("%")
            }
        }
        for (let index = 0; index < (this.graphData.dataY.length - 1); index++) {
            this.graphData.dataLines[index] = {
                x1: this.graphData.dataPoints[index].xDist,
                y1: this.graphData.dataPoints[index].yDist,
                x2: this.graphData.dataPoints[index + 1].xDist,
                y2: this.graphData.dataPoints[index + 1].yDist,
            }
        }
        return of(this.graphData)
    }
}
