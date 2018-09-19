import React from 'React';
import { Layout, Menu, Icon } from 'antd';
import './index.less';
const { Header, Sider, Content } = Layout;


class LayoutContent extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout className='layout'>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="0">
              <Icon type="appstore" />
              <span>应用部署</span>
            </Menu.Item>
            <Menu.Item key="1">
              <Icon type="deployment-unit" />
              <span>应用列表</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="file-text" />
              <span>日志服务</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="area-chart" />
              <span>总览</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle.bind(this)}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default LayoutContent;