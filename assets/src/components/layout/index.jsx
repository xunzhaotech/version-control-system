import React from 'React';
import { Layout, Menu, Icon } from 'antd';
import './index.less';
import menuConfig from 'config/menu.js';

const { Header, Sider, Content } = Layout;

let hash = location.hash;
hash = hash.split('/')[1];
hash = hash ? hash.split('?')[0] : hash;

class LayoutContent extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true
    };
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    }, () => {
      this.logoChange();
    });
  }

  onClickMenu(obj) {
    location.hash = `#${obj.key}`;
  }

  logoChange() {
    if(this.state.collapsed) {
      this.logo.innerHTML = '<h1 class="text iconfont icon--angel"></h1>';
    } else {
      this.logo.innerHTML = '<h1 class="text iconfont icon--angel">ANGEL</h1>';
    }
  }

  componentDidMount() {
    this.logo = document.getElementsByClassName('logo')[0];
    this.logoChange();
    this.setState({ hash: hash || 'view' });
  }

  componentWillReceiveProps(nextProps) {
    hash = location.hash;
    hash = hash.split('/')[1];
    hash = hash ? hash.split('?')[0] : hash;
    this.setState({ hash })
  }

  onCollapse(value) {
  }

  render() {
    const MenuItem = menuConfig.map((item, index) => {
      return (
        <Menu.Item key={item.key} key={item.key}>
          <Icon type={item.icon} />
          <span>{item.title}</span>
        </Menu.Item>
      )
    })
    return (
      <Layout className='layout' >
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" selectedKeys={[this.state.hash]} onClick={this.onClickMenu.bind(this)}>
            {MenuItem}
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
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', overflow: 'initial' }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default LayoutContent;