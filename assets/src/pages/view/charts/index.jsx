import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";

class Series extends React.Component {
  render() {
    const data = [
      {
        time: "00:00:00",
        app: 13.0,
        demo: 35.9
      },
      {
        time: "01:00:00",
        app: 97.0,
        demo: 23.9
      },
      {
        time: "02:00:00",
        app: 27.0,
        demo: 3.9
      },
      {
        time: "03:00:00",
        app: 75.0,
        demo: 3.9
      },
      {
        time: "04:00:00",
        app: 726.0,
        demo: 32.9
      },
      {
        time: "05:00:00",
        app: 725.0,
        demo: 43.9
      },
      {
        time: "06:00:00",
        app: 27.0,
        demo: 33.9
      },
      {
        time: "07:00:00",
        app: 217.0,
        demo: 43.9
      },
      {
        time: "08:00:00",
        app: 71.0,
        demo: 3.9
      },
      {
        time: "09:00:00",
        app: 712.0,
        demo: 3.9
      },
      {
        time: "10:00:00",
        app: 7.0,
        demo: 22.9
      },
      {
        time: "11:00:00",
        app: 700.0,
        demo: 3.9
      },
      {
        time: "12:00:00",
        app: 1.0,
        demo: 3.9
      },
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["app", "demo"],
      // 展开字段集
      key: "date",
      // key字段
      value: "dateTime" // value字段
    });
    const cols = {
      month: {
        range: [0, 1]
      }
    };
    return (
      <Chart height={400} data={dv} scale={cols} width={800}>
        <Legend />
        <Axis name="time" />
        <Axis
          name="dateTime"
        />
        <Tooltip
          // g2-tooltip={{
          //   backgroundColor: '',
          // }}
          crosshairs={{
            type: "y"
          }}
        />
        <Geom
          type="line"
          position="time*dateTime"
          size={2}
          color={"date"}
          style={{
            lineWidth: 1  
          }}
        />
      </Chart>
    );
  }
}

export default Series;
