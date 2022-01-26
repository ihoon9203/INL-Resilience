import React from 'react';
import './bar.css';

const BarGraph = function Bargraph(props) {
  return (
    <section id="category">
      <div>{props.category}</div>
      <progress value={props.score} max="100" />
      <span>JavaScript/jQuery</span>
    </section>
  );
};
export default BarGraph;
