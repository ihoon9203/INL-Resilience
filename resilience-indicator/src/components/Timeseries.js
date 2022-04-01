/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4ThemesAnimated from '@amcharts/amcharts4/themes/animated';
import '../styles/timeseries.css';

am4core.useTheme(am4ThemesAnimated);

const totalScoreObj = {};
const dateParser = (time) => {
  const dateString = time.split('T')[0];
  const year = dateString.split('-')[0];
  const month = dateString.split('-')[1] - 1;
  const day = dateString.split('-')[2];

  const date = new Date(year, month, day);
  return date;
};
const Timeseries = function TimeseriesFunc(props) {
  const [healthSeries, setHealthSeries] = useState([]);
  const [emergencySeries, setEmergencySeries] = useState([]);
  const [financeSeries, setFinanceSeries] = useState([]);
  const [cyberSeries, setCyberSeries] = useState([]);
  useEffect(() => {
    const chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.data = [];
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
    setHealthSeries(props.health);
    setEmergencySeries(props.emergency);
    setFinanceSeries(props.finance);
    setCyberSeries(props.cyber);
    const finalHealthDate = new Date(0, 0, 0);
    const finalFinanceDate = new Date(0, 0, 0);
    const finalEmergencyDate = new Date(0, 0, 0);
    const finalCyberDate = new Date(0, 0, 0);
    let finalHealth; let finalFinance; let finalEmergency; let
      finalCyber;
    healthSeries.forEach((item) => {
      const thisDay = dateParser(item.createdAt);
      chart.data.push({
        date: thisDay,
        health: item.score,
      });
      if (totalScoreObj[thisDay] === undefined) {
        totalScoreObj[thisDay] = [item.score];
      } else {
        totalScoreObj[thisDay].push(item.score);
      }
      if (thisDay > finalHealthDate) {
        finalHealth = item.score;
      }
    });
    financeSeries.forEach((item) => {
      const thisDay = dateParser(item.createdAt);
      chart.data.push({
        date: thisDay,
        finance: item.score,
      });
      if (totalScoreObj[thisDay] === undefined) {
        totalScoreObj[thisDay] = [item.score];
      } else {
        totalScoreObj[thisDay].push(item.score);
      }
      if (thisDay > finalFinanceDate) {
        finalFinance = item.score;
      }
    });
    emergencySeries.forEach((item) => {
      const thisDay = dateParser(item.createdAt);
      chart.data.push({
        date: thisDay,
        emergency: item.score,
      });
      if (totalScoreObj[thisDay] === undefined) {
        totalScoreObj[thisDay] = [item.score];
      } else {
        totalScoreObj[thisDay].push(item.score);
      }
      if (thisDay > finalEmergencyDate) {
        finalEmergency = item.score;
      }
    });
    cyberSeries.forEach((item) => {
      const thisDay = dateParser(item.createdAt);
      chart.data.push({
        date: thisDay,
        cyber: item.score,
      });
      if (totalScoreObj[thisDay] === undefined) {
        totalScoreObj[thisDay] = [item.score];
      } else {
        totalScoreObj[thisDay].push(item.score);
      }
      if (thisDay > finalCyberDate) {
        finalCyber = item.score;
      }
    });
    // put node that links timeseries to today
    chart.data.push({
      date: Date.now(),
      health: finalHealth,
      emergency: finalEmergency,
      finance: finalFinance,
      cyber: finalCyber,
    });
    // ordering the total data by the createdAt
    const totalData = chart.data.sort((a, b) => a.date - b.date);
    // get total score timeseries
    const dailyData = {
      health: -1, emergency: -1, finance: -1, cyber: -1,
    };
    let taken = 0;
    let totalAvgScore = 0;
    totalData.forEach((item) => {
      // get date data
      if (item.health !== undefined) {
        dailyData.health = item.health;
      }
      if (item.finance !== undefined) {
        dailyData.finance = item.finance;
      }
      if (item.emergency !== undefined) {
        dailyData.emergency = item.emergency;
      }
      if (item.cyber !== undefined) {
        dailyData.cyber = item.cyber;
      }
      Object.entries(dailyData).forEach((entry) => {
        if (entry[1] !== -1) {
          taken += 1;
          totalAvgScore += entry[1];
        }
      });
      chart.data.push({
        date: item.date,
        total: Math.floor(totalAvgScore / taken),
      });
      totalAvgScore = 0;
      taken = 0;
    });
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
      series.tooltipText = 'Total Score: [b]{valueY}[/]';
      series.strokeWidth = 2;

      series.smoothing = 'monotoneX';

      const bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.stroke = am4core.color('#fff');
      bullet.circle.strokeWidth = 2;

      return series;
    }

    const hseries = createSeries('health', 'Health');
    hseries.stroke = am4core.color('#D01F4E');
    hseries.fill = am4core.color('#D01F4E');
    hseries.strokeOpacity = 0.5;
    const cseries = createSeries('cyber', 'Cyber Security');
    cseries.stroke = am4core.color('#8EC341');
    cseries.fill = am4core.color('#8EC341');
    cseries.strokeOpacity = 0.5;
    const eseries = createSeries('emergency', 'Emergency');
    eseries.stroke = am4core.color('#C67022');
    eseries.fill = am4core.color('#C67022');
    eseries.strokeOpacity = 0.5;
    const fseries = createSeries('finance', 'Finance');
    fseries.stroke = am4core.color('#0A529F');
    fseries.fill = am4core.color('#0A529F');
    fseries.strokeOpacity = 0.5;
    const tseries = createSeries('total', 'Total');
    tseries.stroke = am4core.color('#6A56C5');
    tseries.fill = am4core.color('#6A56C5');
    chart.legend = new am4charts.Legend();
    chart.cursor = new am4charts.XYCursor();
    indicator.hide();
  });
  return (
    <div id="chartdiv" className="tl-chart" />
  );
};

export default Timeseries;
