import React, { Component } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4ThemesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4ThemesAnimated);

class Gauge extends Component {
  componentDidMount() {
    const { score, size } = this.props || {};
    const chart = am4core.create('chartdiv', am4charts.GaugeChart);
    const axis = chart.xAxes.push(new am4charts.ValueAxis());
    const userScore = score;
    const fontsize = parseInt(size);
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    chart.innerRadius = -50;

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
    hand.value = 0;

    const label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.y = 10;
    label.horizontalCenter = 'middle';
    label.verticalCenter = 'top';
    label.text = `Overall Score: ${userScore}`;
    label.fontSize = fontsize;
    label.fontFamily = 'Roboto';

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

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    const { style } = this.props || {};
    return <div id="chartdiv" style={style} />;
  }
}

export default Gauge;
