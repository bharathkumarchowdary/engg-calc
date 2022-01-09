import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {RcTcGraphService} from "./rc-tc-graph.service";
import {GraphData} from "./graph.data";

interface SIPrefix {
    value: number;
    viewValue: string;
}

@Component({
    selector: 'app-rc-tc',
    templateUrl: './rc-tc.component.html',
    styleUrls: ['./rc-tc.component.css']
})
export class RcTcComponent implements OnInit {
    siPrefixes: SIPrefix[] = [
        {value: 1e0, viewValue: ''},
        {value: 1e3, viewValue: 'K'},
        {value: 1e6, viewValue: 'M'},
        {value: 1e9, viewValue: 'G'},
        {value: 1e-3, viewValue: 'm'},
        {value: 1e-6, viewValue: 'u'},
    ];
    public rcTcFormGroup: FormGroup = new FormGroup({
        voltage: new FormControl(5),
        resistance: new FormControl(1),
        capacitance: new FormControl(1),
        voltagePrefix: new FormControl(1),
        resistancePrefix: new FormControl(1e3),
        capacitancePrefix: new FormControl(1e-6),
    })

    public graphData: GraphData = new GraphData()

    constructor(private rctcGraphService: RcTcGraphService) {
    }

    ngOnInit() {
        this.rctcGraphService.getRcTcGraphData(this.rcTcFormGroup.value).subscribe(data => this.graphData = data)
        this.rcTcFormGroup.valueChanges.subscribe(formValues =>
            this.rctcGraphService.getRcTcGraphData(formValues).subscribe(data => this.graphData = data)
        )
    }
}
