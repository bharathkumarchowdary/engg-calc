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
    xLabels: number[] = [];

    dataPoints: dataPoint[] = [];
    dataLines: dataLine[] = [];
    dataY: number[] = [];
    dataX: number[] = [];
    dataYRange: number = 0;
    dataXRange: number = 0;
    private dataXMin: number = 0;
    private dataYMin: number = 0;
    private dataXLabelBase: number = 1;

    constructor() {
    }

    ngOnInit() {
        for (let index = 0; index < 51; index++) {
            this.dataX[index] = index * this.resistance.value * this.capacitance.value / 10
            this.dataY[index] = this.voltage.value * (1 - Math.exp(-1 * this.dataX[index] / (this.resistance.value * this.capacitance.value)))
        }
        this.dataXMin = Math.min(...this.dataX)
        this.dataYMin = Math.min(...this.dataY)
        this.dataYRange = Math.max(...this.dataY) - this.dataYMin
        this.dataXRange = Math.max(...this.dataX) - this.dataXMin
        if ((1e-3 < this.dataXLabelBase) && (this.dataXRange < 1)) {
            this.dataXLabelBase = 1e-3
        }
        for (let index = 0; index < 11; index += 1) {
            this.xLabels[index] = Number(((((index * 10) / 100) * this.dataXRange) / this.dataXLabelBase).toFixed(3))
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
