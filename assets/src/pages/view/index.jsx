import React, { Component } from 'react';
import { Table, Button } from 'antd';
import './index.less';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div className='view-content'>
        <iframe frameBorder={0} style={{width: '100%', height: '600px'}} src="https://g.alicdn.com/bizcharts-material/scaffold-monitor-linecharts/0.0.2/index.html#/" frameborder="0"></iframe>
      </div>
    )
  }
}

export default View;
