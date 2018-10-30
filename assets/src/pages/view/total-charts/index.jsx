import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";

class Series extends React.Component {
  constructor() {
    super();
  }
  render() {
    let data = this.props.totalDataSource;
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["memory", "total"],
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
