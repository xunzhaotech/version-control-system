import React, { Component } from 'react';
import { Table, Button, Switch, Select, DatePicker } from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
moment.locale('zh-cn');
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
    this.setState({ checked });
  }
  onChangeSelect(value) {
    this.setState({ selectValue: value });
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
        <div className='log-content'>{this.state.logInfo}</div>
      </div>
    )
  }
}

export default LogServer;
