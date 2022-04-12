import React, { useEffect, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4ThemesAnimated from '@amcharts/amcharts4/themes/animated';
import '../styles/timeseries.css';

am4core.useTheme(am4ThemesAnimated);

const TimeseriesCategorical = function TimeseriesCategoricalFunc(props) {
  const [scoreSeries, setScoreSeries] = useState([]);
  useEffect(() => {
    setScoreSeries(props.score);
    const chart = am4core.create('timeseries-categorical', am4charts.XYChart);
    console.log(props.score);
    chart.data = [];
    scoreSeries.forEach((data) => {
      chart.data.push({
        date: data.createdAt,
        score: data.score,
      });
    });
    console.log(chart.data);
    let indicator;
    function showIndicator() {
      indicator = chart.tooltipContainer.createChild(am4core.Container);
      indicator.background.fill = am4core.color('#fff');
      indicator.background.fillOpacity = 0.8;
      indicator.width = am4core.percent(100);
      indicator.height = am4core.percent(100);

      const loading = indicator.createChild(am4core.Image);
      loading.href = './assets/eclipse_loader.svg';
      loading.align = 'center';
      loading.valign = 'middle';
      loading.horizontalCenter = 'middle';
      loading.verticalCenter = 'middle';
      loading.scale = 2;
    }
    showIndicator();
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0.5;
    dateAxis.renderer.minGridDistance = 200;
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;
    // Create series
    function createSeries(field, name) {
      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = 'date';
      series.name = name;
      series.tooltipText = 'Score: [b]{valueY}[/]';
      series.strokeWidth = 2;

      series.smoothing = 'monotoneX';

      const bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.stroke = am4core.color('#fff');
      bullet.circle.strokeWidth = 2;

      return series;
    }
    const tseries = createSeries('score', props.category);
    tseries.stroke = am4core.color('#6A56C5');
    tseries.fill = am4core.color('#6A56C5');
    chart.legend = new am4charts.Legend();
    chart.cursor = new am4charts.XYCursor();
    indicator.hide();
  });
  return (
    <div id="timeseries-categorical" className="tl-categorical-chart" />
  );
};

export default TimeseriesCategorical;
