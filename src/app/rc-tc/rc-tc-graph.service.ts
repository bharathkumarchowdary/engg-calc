import {Injectable} from '@angular/core';
import {GraphData} from './rc-tc.component'
import {of} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class RcTcGraphService {

    private graphData: GraphData = {
        dataX: [],
        dataY: [],
        dataYRange: 0,
        dataXRange: 0,
        dataXLabelBase: 1,
        dataYLabelBase: 1,
        xLabels: [],
        yLabels: [],
        dataXMin: 0,
        dataYMin: 0,
        dataPoints: [],
        dataLines: [],
    };

    constructor() {
    }

    getRcTcGraphData(voltage: number, resistance: number, capacitance: number) {
        this.graphData = {
            dataX: [],
            dataY: [],
            dataYRange: 0,
            dataXRange: 0,
            dataXLabelBase: 1,
            dataYLabelBase: 1,
            xLabels: [],
            yLabels: [],
            dataXMin: 0,
            dataYMin: 0,
            dataPoints: [],
            dataLines: [],
        };
        for (let index = 0; index < 51; index++) {
            this.graphData.dataX[index] = index * resistance * capacitance / 10
            this.graphData.dataY[index] = voltage * (1 - Math.exp(-1 * this.graphData.dataX[index] / (resistance * capacitance)))
        }
        this.graphData.dataXRange = Math.max(...this.graphData.dataX) - Math.min(...this.graphData.dataX)
        this.graphData.dataYRange = Math.max(...this.graphData.dataY) - Math.min(...this.graphData.dataY)
        if ((1e-3 < this.graphData.dataXLabelBase) && (this.graphData.dataXRange < 1)) {
            this.graphData.dataXLabelBase = 1e-3
        }
        for (let index = 0; index < 11; index += 1) {
            this.graphData.xLabels[index] = Number(((((index * 10) / 100) * this.graphData.dataXRange) / this.graphData.dataXLabelBase).toFixed(3))
        }
        for (let index = 0; index < 11; index += 1) {
            this.graphData.yLabels[index] = Number(((((index * 10) / 100) * this.graphData.dataYRange) / this.graphData.dataYLabelBase).toFixed(3))
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
