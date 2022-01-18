import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

type dataPoint = {
    yDist: string;
    xDist: string;
}
type dataLine = {
    x1: string;
    y1: string;
    x2: string;
    y2: string;
}

@Component({
    selector: 'app-rc-tc',
    templateUrl: './rc-tc.component.html',
    styleUrls: ['./rc-tc.component.css']
})
export class RcTcComponent implements OnInit {

    voltage: FormControl = new FormControl(5)
    resistance: FormControl = new FormControl(1e3)
    capacitance: FormControl = new FormControl(1e-6)
    xLabels: number[];

    dataPoints: dataPoint[];
    dataLines: dataLine[];
    dataY: number[];
    dataX: number[] = [];
    dataYRange: number = 0;
    dataXRange: number = 0;
    private dataXMin: number = 0;
    private dataYMin: number = 0;

    constructor() {
        this.dataPoints = []
        this.xLabels = []
        this.dataLines = []
        this.dataY = [
            0.00E+00,
            4.76E-01,
            9.06E-01,
            1.30E+00,
            1.65E+00,
            1.97E+00,
            2.26E+00,
            2.52E+00,
            2.75E+00,
            2.97E+00,
            3.16E+00,
            3.34E+00,
            3.49E+00,
            3.64E+00,
            3.77E+00,
            3.88E+00,
            3.99E+00,
            4.09E+00,
            4.17E+00,
            4.25E+00,
            4.32E+00,
            4.39E+00,
            4.45E+00,
            4.50E+00,
            4.55E+00,
            4.59E+00,
            4.63E+00,
            4.66E+00,
            4.70E+00,
            4.72E+00,
            4.75E+00,
            4.77E+00,
            4.80E+00,
            4.82E+00,
            4.83E+00,
            4.85E+00,
            4.86E+00,
            4.88E+00,
            4.89E+00,
            4.90E+00,
            4.91E+00,
            4.92E+00,
            4.93E+00,
            4.93E+00,
            4.94E+00,
            4.94E+00,
            4.95E+00,
            4.95E+00,
            4.96E+00,
            4.96E+00,
            4.97E+00,
        ]
    }

    ngOnInit() {
        for (let index = 0; index < 51; index++) {
            this.dataX[index] = index * this.resistance.value * this.capacitance.value / 10
        }
        this.dataXMin = Math.min(...this.dataX)
        this.dataYMin = Math.min(...this.dataY)
        this.dataYRange = Math.max(...this.dataY) - this.dataYMin
        this.dataXRange = Math.max(...this.dataX) - this.dataXMin
        for (let index = 0; index < 11; index += 1) {
            this.xLabels[index] = (((index * 10) / 100) * this.dataXRange)
            console.log(this.xLabels[index])
        }
        for (let index = 0; index < this.dataY.length; index++) {
            this.dataPoints[index] = {
                yDist: (100 - ((this.dataY[index] - this.dataYMin) * 100 / this.dataYRange)).toFixed(2).concat("%"),
                xDist: ((this.dataX[index] - this.dataXMin) * 100 / this.dataXRange).toFixed(2).concat("%")
            }
        }
        for (let index = 0; index < (this.dataY.length - 1); index++) {
            this.dataLines[index] = {
                x1: this.dataPoints[index].xDist,
                y1: this.dataPoints[index].yDist,
                x2: this.dataPoints[index + 1].xDist,
                y2: this.dataPoints[index + 1].yDist,
            }
        }
    }
}
