class DataManager {

    #dataTable;
    #chartManager;
    #activeId;
    #colors;

    constructor() {
        this.#activeId = -1;
        this.#dataTable = new Map();
        this.#chartManager = new ChartManager();
        this.#buildDataTable();
        // Dark blue, light blue, dark purple, light purple, pink, sharp pink, orange, yellow
        this.#colors = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600'];
    }

    #addData = (id, data, allowCharts) => {
        this.#dataTable.set(id, { data: data, allowCharts: allowCharts });
    };

    getData = id => {
        return this.#dataTable.get(id);
    };

    #buildDataTable = () => {
        let tempData = masterDataFile[0];
        tempData.data.forEach((s, index) => {
            if (index > 0) {
                s[0] = s[0].replace('Aug', '08');
                s[0] = s[0].replace('Sep', '09');
                let tmp = s[0].split('-');
                s[0] = `${tmp[1]}-${tmp[0]}-${tmp[2]}`;
            }
        });
        this.#addData(0, tempData, { table: true, line: true, bar: false, map: false, pie: false });
        this.#addData(1, masterDataFile[1], { table: true, line: false, bar: true, map: false, pie: true });
        this.#addData(2, masterDataFile[2], { table: false, line: false, bar: false, map: true, pie: false });
        this.#addData(3, masterDataFile[3], { table: false, line: false, bar: false, map: true, pie: false });
        this.#addData(4, masterDataFile[4], { table: false, line: false, bar: false, map: true, pie: false });
    }

    setActiveDataset = id => {
        if (this.#activeId !== id) {
            document.getElementById(`data-${id}`).classList.add('active');
            if (this.#activeId != -1) {
                document.getElementById(`data-${this.#activeId}`).classList.remove('active');
            }
        }
        this.#activeId = id;
        const d = this.#dataTable.get(id);
        CM.setOverlayTitle(d.data.title);
        CM.selectChart(-1);
    }

    displayChart = (id, buttonid, sub, marginTop) => {
        CM.clearOverlay();
        CM.selectChart(buttonid);
        switch (id) {
            case 0:
                this.#chartManager.drawTable(this.#setData(id, sub), marginTop);
                break;
            case 1:
                this.#chartManager.drawLineChart(this.#setData(id, sub), marginTop);
                break;
            case 2:
                this.#chartManager.drawBarChart(this.#setData(id, sub), marginTop);
                break;
            case 3:
                this.#chartManager.drawMapChart(this.#setData(id, sub), marginTop);
                break;
            case 4:
                this.#chartManager.drawPieChart(this.#setData(id, sub), marginTop);
                break;
        }
    }

    #setData = (chartId, sub) => {
        if (this.#activeId === 0) {
            if (chartId == 0) {
                const dates = [];
                const attacks = [];
                const deaths = [];
                let headers;

                const obj = this.#dataTable.get(this.#activeId);
                obj.data.data.forEach((d, index) => {
                    if (index > 0) {
                        dates.push(d[0]);
                        attacks.push(d[1]);
                        deaths.push(d[2]);
                    } else {
                        headers = d;
                    }
                });

                const values = [
                    dates, attacks, deaths
                ];

                const data = [{
                    type: 'table',
                    header: {
                        values: [[`<b>${headers[0]}</b>`], [`<b>${headers[1]}</b>`],
                        [`<b>${headers[2]}</b>`]],
                        align: "center",
                        line: { width: 1, color: 'black' },
                        fill: { color: "grey" },
                        font: { family: "Arial", size: 16, color: "white" }

                    },
                    cells: {
                        values: values,
                        align: ['center', 'right'],
                        line: { color: "black", width: 1 },
                        font: {
                            family: "Arial", size: 14, color: ["black"],
                        }
                    }
                }];
                return data;
            }
            else if (chartId == 1) {
                const dates = [];
                const attacks = [];
                const deaths = [];
                const cumDeaths = [];
                const cumAttacks = [];

                const obj = this.#dataTable.get(this.#activeId);
                obj.data.data.forEach((d, index) => {
                    if (index > 0) {
                        dates.push(d[0]);
                        attacks.push(d[1]);
                        deaths.push(d[2]);
                        if (index > 1) {
                            const a = cumAttacks[index - 2] + d[1];
                            const b = cumDeaths[index - 2] + d[2];
                            cumAttacks.push(a);
                            cumDeaths.push(b);
                        } else if (index === 1) {
                            cumAttacks.push(d[1]);
                            cumDeaths.push(d[2]);
                        }
                    }
                });
                const trace1 = { x: dates, y: attacks, marker: { color: this.#colors[0] }, line: { width: 4 }, name: 'Attacks' };
                const trace2 = { x: dates, y: deaths, marker: { color: this.#colors[3] }, line: { width: 4 }, name: 'Deaths' };
                const trace3 = { x: dates, y: cumAttacks, marker: { color: this.#colors[5] }, line: { width: 4 }, name: 'Cumulative Attacks' };
                const trace4 = { x: dates, y: cumDeaths, marker: { color: this.#colors[7] }, line: { width: 4 }, name: 'Cumulative Deaths' };
                return [trace1, trace2, trace3, trace4];
            }
        }
        else if (this.#activeId === 1) {
            if (chartId == 0) {
                const dates = [];
                const attacks = [];
                const deaths = [];
                let headers;

                const obj = this.#dataTable.get(this.#activeId);
                obj.data.data.forEach((d, index) => {
                    if (index > 0) {
                        dates.push(d[0]);
                        attacks.push(d[1]);
                        deaths.push(d[2]);
                    } else {
                        headers = d;
                    }
                });

                const values = [
                    dates, attacks, deaths
                ];

                const data = [{
                    type: 'table',
                    header: {
                        values: [[`<b>${headers[0]}</b>`], [`<b>${headers[1]}</b>`],
                        [`<b>${headers[2]}</b>`]],
                        align: "center",
                        line: { width: 1, color: 'black' },
                        fill: { color: "grey" },
                        font: { family: "Arial", size: 16, color: "white" }
                    },
                    cells: {
                        values: values,
                        align: ['left', 'right'],
                        line: { color: "black", width: 1 },
                        font: { family: "Arial", size: 14, color: ["black"] }
                    }
                }];
                return data;
            } else if (chartId == 2) {
                // Draw Bar Chart
                const ages = [];
                const men = [];
                const wom = [];


                const obj = this.#dataTable.get(this.#activeId);
                obj.data.data.forEach((d, index) => {
                    if (index > 0) {
                        ages.push(d[0]);
                        men.push(d[1]);
                        wom.push(d[2]);
                    }
                });
                const trace1 = { x: ages, y: men, type: 'bar', marker: { color: this.#colors[1] }, name: 'Male' };
                const trace2 = { x: ages, y: wom, type: 'bar', marker: { color: this.#colors[4] }, name: 'Female', };
                const axes = {
                    xaxis: {
                        tickfont: {
                            family: 'Arial',
                            size: 16,
                            color: 'black'
                        },
                        title: {
                            text: 'Age Range',
                            font: {
                                family: 'Arial',
                                size: 18,
                                color: 'black'
                            },
                        }
                    },
                    yaxis: {
                        title: {
                            text: 'Number of Deaths per 10,000 People',
                            font: {
                                family: 'Arial',
                                size: 18,
                                color: 'black'
                            }
                        },
                        tickfont: {
                            family: 'Arial',
                            size: 16,
                            color: 'black'
                        },
                    }
                }
                const data = { data: [trace1, trace2], axes: axes };
                return data;

            } else if (chartId == 4) {
                // Draw Pie Chart
                let men = 0;
                let wom = 0;
                let labels;

                const obj = this.#dataTable.get(this.#activeId);
                obj.data.data.forEach((d, index) => {
                    if (index > 0) {
                        men += d[1];
                        wom += d[2];
                    } else {
                        labels = [d[1], d[2]];
                    }
                });
                const trace = [{
                    values: [men / (men + wom), wom / (men + wom)],
                    labels: labels,
                    type: 'pie',
                    marker: { colors: [this.#colors[1], this.#colors[4]] }
                }];
                return {data: trace, legendTitle: '  Genders', legendX:1.1, legendY: 0.9};
            }
        } else if (this.#activeId === 2) {

            const lat = [];
            const lon = [];
            const val = [];
            const markerSize = [];
            const color = [];


            let obj = this.#dataTable.get(2);
            obj.data.data.forEach(d => {
                lat.push(d[2]);
                lon.push(d[1]);
                markerSize.push(3 * d[0]);
                color.push(this.#colors[0]);
            });

            obj = this.#dataTable.get(3);
            obj.data.data.forEach(d => {
                lat.push(d[1]);
                lon.push(d[0]);
                markerSize.push(13);
                color.push(this.#colors[3]);
            });

            const data = [{
                type: 'scattermapbox',
                lat: lat,
                lon: lon,
                mode: 'markers',
                marker: {
                    size: markerSize,
                    color: color
                },
                text: ['Text']
            }];

            let centerLat = 0;
            let centerLon = 0;
            lat.forEach(e => {
                centerLat += e;
            });

            lon.forEach(e => {
                centerLon += e;
            });

            centerLat = centerLat / lat.length;
            centerLon = centerLon / lon.length;

            const layout = {
                autosize: true,
                hovermode: 'closest',
                mapbox: {
                    bearing: 0,
                    center: {
                        lat: centerLat,
                        lon: centerLon
                    },
                    style: 'light',
                    pitch: 0,
                    zoom: 14.8
                },
            };

            return { layout: layout, data: data };
        } else if (this.#activeId === 4) {
            if (chartId == 0) {
                const dates = [];
                const attacks = [];
                const deaths = [];
                let headers;

                const obj = this.#dataTable.get(this.#activeId);
                obj.data.data.forEach((d, index) => {
                    if (index > 0) {
                        const inf = new Intl.NumberFormat('en-US');
                        dates.push(d[0]);
                        attacks.push(inf.format(d[1]));
                        deaths.push(inf.format(d[2]));
                    } else {
                        headers = d;
                    }
                });

                const values = [
                    dates, attacks, deaths
                ];

                const data = [{
                    type: 'table',
                    header: {
                        values: [[`<b>${headers[0]}</b>`], [`<b>${headers[1]}</b>`],
                        [`<b>${headers[2]}</b>`]],
                        align: "center",
                        line: { width: 1, color: 'black' },
                        fill: { color: "grey" },
                        font: { family: "Arial", size: 16, color: "white" }
                    },
                    cells: {
                        values: values,
                        align: ['left', 'right'],
                        line: { color: "black", width: 1 },
                        font: { family: "Arial", size: 14, color: ["black"] }
                    }
                }];
                return data;
            } else if (chartId == 2) {
                // Draw Bar Chart
                const ages = [];
                const men = [];
                const wom = [];


                const obj = this.#dataTable.get(this.#activeId);
                obj.data.data.forEach((d, index) => {
                    if (index > 0) {
                        ages.push(d[0]);
                        men.push(d[1]);
                        wom.push(d[2]);
                    }
                });
                
                const trace1 = { x: ages, y: men, type: 'bar', marker: { color: this.#colors[1] }, name: 'Male' };
                const trace2 = { x: ages, y: wom, type: 'bar', marker: { color: this.#colors[4] }, name: 'Female', };
                const axes = {
                    xaxis: {
                        tickfont: {
                            family: 'Arial',
                            size: 16,
                            color: 'black'
                        },
                        title: {
                            text: 'Age Range',
                            font: {
                                family: 'Arial',
                                size: 18,
                                color: 'black'
                            },
                        }
                    },
                    yaxis: {
                        title: {
                            text: 'Number of Deaths per 10,000 People',
                            font: {
                                family: 'Arial',
                                size: 18,
                                color: 'black'
                            }
                        },
                        tickfont: {
                            family: 'Arial',
                            size: 16,
                            color: 'black'
                        },
                    }
                }
                const data = { data: [trace1, trace2], axes: axes };
                return data;

            } else if (chartId == 4) {
                // Draw Pie Chart
                let men = 0;
                let wom = 0;
                let total = 0;
                let labels = [];
                let trace;
                let values = [];
                let x;
                let y;
                let title;
                const obj = this.#dataTable.get(this.#activeId);
                if (sub === 0) {
                    obj.data.data.forEach((d, index) => {
                        if (index > 0) {
                            total += d[1];
                            total += d[2];
                            labels.push(d[0]);
                        }
                    });
                    obj.data.data.forEach((d, index) => {
                        if (index > 0) {
                            values.push((d[1] + d[2]) / total);
                        }
                    });
                    trace = [{
                        values: values,
                        labels: labels,
                        type: 'pie',
                        marker: { colors: this.#colors }
                    }];
                    x = 1.1;
                    y = 1.1;
                    title = '  Age Range';

                } else if (sub === 1) {
                    obj.data.data.forEach((d, index) => {
                        if (index > 0) {
                            men += d[1];
                            wom += d[2];
                        } else {
                            labels = [d[1], d[2]];
                        }
                    });
                    trace = [{
                        values: [men / (men + wom), wom / (men + wom)],
                        labels: labels,
                        type: 'pie',
                        marker: { colors: [this.#colors[1], this.#colors[4]] }
                    }];
                    x = 1.1;
                    y = 0.9;
                    title = '  Genders';
                }


                return {data: trace, legendTitle: title, legendX:x, legendY: y};
            }
        }
    };
}