import React, { Component } from 'react';
import { Table, Button } from 'antd';
import Charts from './charts';
import TotalCharts from './total-charts';
import moment from 'moment';
import ajax from 'utils/ajax';
import './index.less';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalDataSource: []
    };
  }

  componentDidMount() {
    this.getMacheine();
  }

  //24小时获取内存信息
  async getMacheine() {
    let res = await ajax('getMacheine', {
      pageNum: 1,
      pageSize: 24
    });
    let totalDataSource = res.data.map((item) => {
      return {
        total: Number((item.totalmem / 1024 / 1024 / 1024).toFixed(2)),
        memory: Number(((item.totalmem - item.freemem) / 1024 / 1024 / 1024).toFixed(2)),
        time: moment(item.time).format('HH:mm')
      }
    });
    this.setState({ totalDataSource });
  }

  render() {
    return (
      <div className='view-content'>
        <div className='data-line'>
          <h3 style={{textAlign: 'center'}}>最近24小时内存信息</h3>
          <div className='charts-layout'>
            <TotalCharts totalDataSource={this.state.totalDataSource}/>
          </div>
        </div>
        <div className='data-line'>
          <h3 style={{textAlign: 'center'}}>最近一周访问量统计</h3>
          <div className='charts-layout'>
            <Charts />
          </div>
        </div>
      </div>
    )
  }
}

export default View;
