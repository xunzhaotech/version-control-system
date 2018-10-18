import React from 'react';
import { connect } from 'dva';
import { Upload, message, Button, Skeleton, Switch, Card, Icon, Avatar } from 'antd';
import ajax from 'utils/ajax';
import './index.less';
const Dragger = Upload.Dragger;

class Home extends React.Component {
  constructor() {
    super();
  }

  startIssue() {
  }

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
    return (
      <div className="app-deploy">
        <h3>发布</h3>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
        </Dragger>
        <Card title='配置信息' hoverable={true} style={{ width: 300, marginTop: 16 }} loading={false}>
          <p>
            <label className='card-label' htmlFor="">IP：</label>
            <span>106.14.154.107</span>
          </p>
          <p>
            <label className='card-label' htmlFor="">CPU：</label>
            <span>2核</span>
          </p>
          <p>
            <label className='card-label' htmlFor="">SYSTEM：</label>
            <span>Centos 7.3</span>
          </p>
          <p>
            <label className='card-label' htmlFor="">DNS：</label>
            <span>255.255.255.0</span>
          </p>        
        </Card>
      </div>  
    );
  }
}



export default Home;
