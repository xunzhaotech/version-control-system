import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import ajax from 'utils/ajax';
import './index.less';
const { Column, ColumnGroup } = Table;
const data = [{
  key: '1',
  appName: '微应用',
  createTime: '2018-09-10 10:30:22',
  updateTime: '2018-10-20 11:20:39',
  name: '伟光',
  version: '1.0.2',
}, {
  key: '2',
  appName: '快应用',
  createTime: '2018-09-10 10:30:22',
  updateTime: '2018-10-20 11:20:39',
  name: '伟光',
  version: '1.0.3',
}, {
  key: '3',
  appName: '小程序',
  createTime: '2018-09-10 10:30:22',
  updateTime: '2018-10-20 11:20:39',
  name: '伟光',
  version: '1.0.5',
}];

class AppList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  componentDidMount() {
    this.getAppList();
  }

  async getAppList() {
    let res = await ajax('getAppList', {
      pageSize: 10,
      pageNum: 1
    });
    this.setState({ dataSource: res.data });
  }
  
  render() {
    return (
      <div className='app-list'>
        <Table dataSource={this.state.dataSource} rowkey='_id'>
          <Column title="应用名称" dataIndex="name" key="name" />
          <Column title="创建时间" dataIndex="createTime" key="createTime" />
          <Column title="pid" dataIndex="pid" key="pid" />
          <Column title="状态" dataIndex="status" key="status" render={(text, record) => {
            return (
              text == 0 ? '停止' : '启动'
            )
          }}/>
          {/* <Column title="更新时间" dataIndex="updateTime" key="updateTime" /> */}
          {/* <Column title="发布人" dataIndex="name" key="name" /> */}
          <Column title="版本" dataIndex="version" key="version" render={(text) => {
            return (
              <Tag color="green">{text}</Tag>
            )
          }}/>
          <Column title="action" key="action" render={(text, record) => (
              <span>
                <a href="javascript:;">启动</a>
                <Divider type="vertical" />
                <a href="javascript:;">停止</a>
              </span>
            )}
          />
        </Table>
      </div>
    )
  }
}

export default AppList
