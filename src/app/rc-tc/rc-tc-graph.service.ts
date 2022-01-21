import {Injectable} from '@angular/core';
import {of} from "rxjs";
import {GraphData} from "./graph.data";


@Injectable({
    providedIn: 'root'
})
export class RcTcGraphService {

    private graphData: GraphData = new GraphData()

    constructor() {
    }

    getRcTcGraphData(voltage: number, resistance: number, capacitance: number) {
        this.graphData = new GraphData()
        for (let index = 0; index < 51; index++) {
            this.graphData.dataX[index] = index * resistance * capacitance / 10
            this.graphData.dataY[index] = voltage * (1 - Math.exp(-1 * this.graphData.dataX[index] / (resistance * capacitance)))
        }
        this.graphData.dataXRange = Math.max(...this.graphData.dataX) - Math.min(...this.graphData.dataX)
        this.graphData.dataYRange = Math.max(...this.graphData.dataY) - Math.min(...this.graphData.dataY)
        if ((1e-3 < this.graphData.dataXLabelBase) && (this.graphData.dataXRange < 1)) {
            this.graphData.dataXLabelBase = 1e-3
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
