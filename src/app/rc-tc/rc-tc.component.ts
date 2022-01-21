import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {RcTcGraphService} from "./rc-tc-graph.service";
import {GraphData} from "./graph.data";


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
        this.rctcGraphService.getRcTcGraphData(this.voltage.value, this.resistance.value, this.capacitance.value)
            .subscribe(data => this.graphData = data)
        this.voltage.valueChanges.subscribe(changedValue =>
            this.rctcGraphService.getRcTcGraphData(changedValue, this.resistance.value, this.capacitance.value)
                .subscribe(data => this.graphData = data))
        this.resistance.valueChanges.subscribe(changedValue =>
            this.rctcGraphService.getRcTcGraphData(this.voltage.value, changedValue, this.capacitance.value)
                .subscribe(data => this.graphData = data))
        this.capacitance.valueChanges.subscribe(changedValue =>
            this.rctcGraphService.getRcTcGraphData(this.voltage.value, this.resistance.value, changedValue)
                .subscribe(data => this.graphData = data))
    }
}
