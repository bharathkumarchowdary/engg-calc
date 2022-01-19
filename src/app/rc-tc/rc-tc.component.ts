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

export class GraphData {
    dataX: number[] = [];
    dataY: number[] = [];
    dataXRange: number = 0;
    dataYRange: number = 0;
    dataXLabelBase: number = 1;
    dataYLabelBase: number = 1;
    xLabels: number[] = [];
    yLabels: number[] = [];
    dataXMin: number = 0;
    dataYMin: number = 0;
    dataPoints: DataPoint[] = [];
    dataLines: Dataline[] = [];
}

@Component({
    selector: 'app-rc-tc',
    templateUrl: './rc-tc.component.html',
    styleUrls: ['./rc-tc.component.css']
})
export class RcTcComponent implements OnInit {

    public voltage: FormControl = new FormControl(5)
    public resistance: FormControl = new FormControl(1e3)
    public capacitance: FormControl = new FormControl(1e-6)

    public graphData: GraphData = new GraphData()

    constructor(private rctcGraphService: RcTcGraphService) {
    }

    ngOnInit() {
        this.rctcGraphService.getRcTcGraphData(this.voltage.value, this.resistance.value, this.capacitance.value).subscribe(data => this.graphData = data)
    }
}
