type DataPoint = {
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