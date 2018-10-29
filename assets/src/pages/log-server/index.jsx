import React, { Component } from 'react';
import { Table, Button, Switch, Select, DatePicker } from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
moment.locale('zh-cn');
import ajax from 'utils/ajax';
import Scroll from 'components/scroll';
import './index.less';
const { RangePicker } = DatePicker;
const Option = Select.Option;

class LogServer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logInfo: '当前没有日志信息'
    };
  }

  onChangeSwich(checked) {
    this.setState({ checked },() => {
      if(this.state.checked) {
        this.time = setInterval(this.getLogInfo.bind(this), 1000 * 60 * 5);
      } else {
        clearInterval(this.time);
      }
    });
  }
  componentWillUnmount() {
    clearInterval(this.time);
  }
  onChangeSelect(value) {
    this.setState({ selectValue: value });
  }
  componentDidMount() {
    this.getLogInfo();
  }
  async getLogInfo() {
    let res = await ajax('getLogInfo', {
      type: "2",
      time: '2018-10-27-16-26'
    });
    this.setState({ logInfo: res.data }, () => {
      this.scrollDeep();
    });
  }
  //滚动条默认滚到底部
  scrollDeep() {
    let logs = document.querySelector('.log-content');
    logs.scrollTop = logs.scrollHeight;
  }
  render() {
    return (
      <div className='log-server'>
        <div className='log-server-header'>
          <Select value={this.state.selectValue} placeholder='请选择日志类型' onChange={this.onChangeSelect.bind(this)} className='log-type'>
            <Option key={0}>历史日志</Option>
            <Option key={1}>在线日志</Option>
          </Select>
          {
            this.state.selectValue == 0 ? <RangePicker locale={locale}/> : null
          }
          <div className='log-switch'>
            <label>持续刷新</label>
            <Switch checked={this.state.checked} onChange={this.onChangeSwich.bind(this)}/>
          </div>

        </div>
        <div style={{whiteSpace: 'pre-wrap'}} className='log-content' >{this.state.logInfo}</div>
      </div>
    )
  }
}

export default LogServer;
