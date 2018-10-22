import React, { Component } from 'react';
import { Table, Button } from 'antd';
import Charts from './charts';
import './index.less';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className='view-content'>
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
