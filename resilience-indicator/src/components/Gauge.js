import React, {Component} from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class Gauge extends Component{
    componentDidMount() {
        let chart = am4core.create("chartdiv", am4charts.GaugeChart);
        let axis = chart.xAxes.push(new am4charts.ValueAxis()); 
        let userScore = this.props.score;
        axis.min = 0;
        axis.max = 100;
        axis.strictMinMax = true;
        chart.innerRadius = -50;

        let range_bad = axis.axisRanges.create();
        let range_okay = axis.axisRanges.create();
        let range_good = axis.axisRanges.create();
        // bad
        range_bad.value = 0;
        range_bad.endValue = 30;
        range_bad.axisFill.fillOpacity = 1;
        range_bad.axisFill.fill = am4core.color("#de8f6e");
        range_bad.axisFill.zIndex = -1;
        // okay
        range_okay.value = 30;
        range_okay.endValue = 70;
        range_okay.axisFill.fillOpacity = 1;
        range_okay.axisFill.fill = am4core.color("#DBD56E");
        range_okay.axisFill.zIndex = -1;
        // good
        range_good.value = 70;
        range_good.endValue = 100;
        range_good.axisFill.fillOpacity = 1;
        range_good.axisFill.fill = am4core.color("#88AB75");
        range_good.axisFill.zIndex = -1;
        let hand = chart.hands.push(new am4charts.ClockHand());
        hand.value = 0;
        

        setInterval(() => {
            var animation = new am4core.Animation(hand, {
              property: "value",
              to: userScore
            }, 1500, am4core.ease.cubicOut).start(); //Times taken to move to 70
          }, 2000);

        this.chart = chart;

      }
      componentWillUnmount() {
        if (this.chart) {
          this.chart.dispose();
        }
      }
    render(){
        return(
            <div id="chartdiv" style={this.props.style}></div>
        )
    }
};
export default Gauge;