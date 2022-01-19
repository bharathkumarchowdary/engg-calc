import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {RcTcGraphService} from "./rc-tc-graph.service";

export type DataPoint = {
    yDist: string;
    xDist: string;
}
type Dataline = {
    x1: string;
    y1: string;
    x2: string;
    y2: string;
}

export interface GraphData {
    dataX: number[],
    dataY: number[],
    dataXRange: number,
    dataYRange: number,
    dataXLabelBase: number,
    dataYLabelBase: number,
    xLabels: number[],
    yLabels: number[],
    dataXMin: number,
    dataYMin: number,
    dataPoints: DataPoint[],
    dataLines: Dataline[],
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

    graphData: GraphData = {
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

    constructor(private rctcGraphService: RcTcGraphService) {
    }

    ngOnInit() {
        this.rctcGraphService.getRcTcGraphData(this.voltage.value, this.resistance.value, this.capacitance.value).subscribe(data => this.graphData = data)
    }
}
