import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

am4core.addLicense("ch-custom-attribution");

const PieChart = ({}) => {
  const loadChart = () => {
    // Create chart instance
    let chart = am4core.create("pie-plot", am4charts.PieChart);

    // Add data
    chart.data = [
      { sector: "Agriculture", size: 10.6 },
      { sector: "Mining and Quarrying", size: 9.6 },
      { sector: "Manufacturing", size: 23.2 },
    ];

    // Add label
    chart.innerRadius = 40;
    let label = chart.seriesContainer.createChild(am4core.Label);
    label.html = `<div><h6 style="font-size:12px;">Results</h6><h6 style="text-align:center;">56%</h6></div>`;
    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.textAlign = "center";
    label.fontSize = 15;

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "size";
    pieSeries.dataFields.category = "sector";

    pieSeries.ticks.template.disabled = true;
    pieSeries.alignLabels = false;
    pieSeries.labels.disabled = true;
    pieSeries.labels.template.text = "";
    pieSeries.labels.template.radius = am4core.percent(-40);
    pieSeries.labels.template.fill = am4core.color("white");

    // Custom legend
    var color1 = chart.colors.getIndex(0);
    var color2 = chart.colors.getIndex(3);
    var color3 = chart.colors.getIndex(6);

    var legend = new am4charts.Legend();
    legend.parent = chart.chartContainer;
    legend.align = "right";
    legend.position = "right";
    legend.fontSize = 12;
    legend.valueLabels.template.text = "{percent}%";
    legend.data = [
      {
        name: "Completed",
        fill: color1,
        percent: "56",
      },
      {
        name: "In progress",
        fill: color2,
        percent: "56",
      },
      {
        name: "To do",
        fill: color3,
        percent: "56",
      },
    ];
    // Animate chart data
  };

  useEffect(() => {
    loadChart();
  }, []);

  return (
    <>
      <div id="pie-plot" style={{ height: "150px", width: "100%" }}></div>
    </>
  );
};

export default PieChart;
