import React from 'react';
import { connect } from 'dva';
import { Upload, message, Card, Icon } from 'antd';
import ajax from 'utils/ajax';
import './index.less';
const Dragger = Upload.Dragger;

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      machineInfo: {}
    }
  }

  startIssue() {
  }

  async componentDidMount() {
    let res = await ajax('getServerInfo');
    this.setState({ machineInfo: res.data });
  }

  //发布
  render() {
    const props = {
      name: 'file',
      action: '/system/api/issue/file/',
      accept: '.gz',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
        }
        if (info.file.status === 'done') {
          message.success(info.file.response.message)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        }
      },
    };
    let machineInfo = this.state.machineInfo;
    return (
      <div className="app-deploy">
        <h3>发布</h3>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
        </Dragger>
        <Card title='配置信息' hoverable={true} style={{ width: 500, marginTop: 16 }} loading={false}>
          <p>
            <label className='card-label' htmlFor="">网络：</label>
            <span>{machineInfo.network && machineInfo.network.eno1[0].address}</span>
          </p>
          <p>
            <label className='card-label' htmlFor="">CPU：</label>
            <span>{machineInfo.cpus && machineInfo.cpus.length}核 </span>
            <span>{machineInfo.cpus && machineInfo.cpus[0].model}</span>
          </p>
          <p>
            <label className='card-label' htmlFor="">架构：</label>
            <span>{machineInfo.arch}</span>
          </p>
          <p>
            <label className='card-label' htmlFor="">内存总量：</label>
            <span>{(machineInfo.totalmem / 1024 / 1024 / 1024).toFixed(2)} GB</span>
          </p>
          <p>
            <label className='card-label' htmlFor="">平台：</label>
            <span>{machineInfo.platform}</span>
          </p>
          <p>
            <label className='card-label' htmlFor="">主机名：</label>
            <span>{machineInfo.hostName}</span>
          </p>
        </Card>
      </div>
    );
  }
}



export default Home;
