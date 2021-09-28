class ChartManager {
    #div;
    constructor() {
        Plotly.setPlotConfig({
            mapboxAccessToken: "pk.eyJ1Ijoiamh1dGNoNDIiLCJhIjoiY2t0dzR5YXZsMmdpbjJ2cTVhYmRwNDl2aSJ9.B9kSdHA_AwhPJ1knbRk0Cg"
        });
        this.#div = document.querySelector('#output');
        this.width = 0;
        this.height = 0;
        this.marginTop = 100;
        this.setHeightAndWidth();
    };

    drawLineChart = data => {
        Plotly.newPlot(this.#div, data, {
            margin: { t: this.marginTop }, width: (window.innerWidth / 100 * 60), height: this.height,
            legend: {
                family: 'Arial',
                size: 14,
                color: 'black'
            },
            xaxis: {
                tickangle: 45,
                tickmode: 'auto', 
                nticks: 12,
                tickfont: {
                    family: 'Arial',
                    size: 11,
                    color: 'black'
                  },
                title: {
                    text: 'Date of Occurence',
                    automargin: true,
                    standoff: 40,
                    font: {
                        family: 'Arial',
                        size: 18,
                        color: 'black'
                    },
                }
            },
            yaxis: {
                title: {
                    text: 'Number of Occurences',
                    font: {
                        family: 'Arial',
                        size: 18,
                        color: 'black'
                    }
                },
                tickfont: {
                    family: 'Arial',
                    size: 12,
                    color: 'black'
                  },
            }
        });
    };

    drawBarChart = data => {
        const xaxis = data.axes.xaxis;
        const yaxis = data.axes.yaxis;
        console.log(xaxis);
        Plotly.newPlot(this.#div, data.data, {
            margin: { t: this.marginTop }, width: this.width, height: 500, xaxis, yaxis, legend: {
                family: 'Arial',
                size: 14,
                color: 'black'
            },
        });
    };

    drawTable = (data, marginTop) => {
        Plotly.newPlot(
            this.#div,
            data,
            {
                margin:
                {
                    t: marginTop
                },
                width: (window.innerWidth / 100 * 35),
                height: this.height
            }
        );
    };

    drawMapChart = data => {
        Plotly.newPlot(this.#div, data.data, data.layout)
    };
    drawPieChart = data => {
        const legendTitle = data.legendTitle;
        const content = data.data;
        const legendX = data.legendX;
        const legendY = data.legendY;
        Plotly.newPlot(this.#div, content, {
            margin: { t: this.marginTop }, width: (window.innerWidth / 100 * 40), height: this.height, 
            legend: {
                family: 'Arial',
                size: 22,
                color: 'black',
                title: {
                    text: legendTitle,

                },
                x: legendX, 
                y: legendY
            },
            font: {
                size: 14
              },
        });
    };

    setHeightAndWidth = () => {
        const e = document.getElementById('output');
        this.width = e.getBoundingClientRect().width;
        this.height = e.getBoundingClientRect().height;
    }
}

