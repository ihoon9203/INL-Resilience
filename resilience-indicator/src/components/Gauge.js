import React, { useEffect, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4ThemesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4ThemesAnimated);

const Gauge = function GaugeFunc(props) {
  const [style, setStyle] = useState(null);
  const [score, setScore] = useState(0);
  useEffect(() => {
    setScore(props.score);
    setStyle(props.style);
    const chart = am4core.create('chartdiv', am4charts.GaugeChart);
    const axis = chart.xAxes.push(new am4charts.ValueAxis());
    const userScore = score;
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    chart.startAngle = 160;
    chart.endAngle = 380;
    const rangeBad = axis.axisRanges.create();
    const rangeOkay = axis.axisRanges.create();
    const rangeGood = axis.axisRanges.create();
    // bad
    rangeBad.value = 0;
    rangeBad.endValue = 30;
    rangeBad.axisFill.fillOpacity = 1;
    rangeBad.axisFill.fill = am4core.color('#de8f6e');
    rangeBad.axisFill.zIndex = -1;
    // okay
    rangeOkay.value = 30;
    rangeOkay.endValue = 70;
    rangeOkay.axisFill.fillOpacity = 1;
    rangeOkay.axisFill.fill = am4core.color('#DBD56E');
    rangeOkay.axisFill.zIndex = -1;
    // good
    rangeGood.value = 70;
    rangeGood.endValue = 100;
    rangeGood.axisFill.fillOpacity = 1;
    rangeGood.axisFill.fill = am4core.color('#88AB75');
    rangeGood.axisFill.zIndex = -1;
    const hand = chart.hands.push(new am4charts.ClockHand());
    hand.pin.radius = 30;
    hand.fill = am4core.color('#07519E');
    hand.stroke = am4core.color('#07519E');
    hand.startWidth = 30;
    hand.value = 0;

    const label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fill = am4core.color('#ffffff');
    label.x = am4core.percent(50);
    label.y = -20;
    label.horizontalCenter = 'middle';
    label.textAlign = 'center';
    label.text = userScore;
    label.fontSize = '2em';
    label.fontFamily = 'Roboto';
    if (window.innerWidth > 500) {
      chart.innerRadius = -40;
      hand.pin.radius = 30;
    } else {
      chart.innerRadius = -20;
      hand.pin.radius = 10;
      label.fontSize = '0.7em';
      hand.startWidth = 10;
      label.y = -7;
    }

    setInterval(() => {
      new am4core.Animation(
        hand,
        {
          property: 'value',
          to: userScore,
        },
        1500,
        am4core.ease.cubicOut,
      ).start(); // Times taken to move to 70
    }, 2000);
  });
  return (
    <div id="chartdiv" style={style} />
  );
};

export default Gauge;
