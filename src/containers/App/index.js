import React from 'react';
import { Layout, PageHeader } from 'antd';
import './App.less';
import Calculator from '../Calculator';

const { Header, Footer, Content } = Layout;

function App() {
  return (
  <div className="App">
    <Layout className="layout">
      <Header>
        <PageHeader className='page-header-title' title="Calculator" subTitle="Quolum Assignment" />
      </Header>
      <Content style={{ padding: '40px 50px' }}>
        <div className="site-layout-content">
          <Calculator />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>©2020 Created by Nikhil Patel</Footer>
    </Layout>
  </div>
  );
}

export default App;
