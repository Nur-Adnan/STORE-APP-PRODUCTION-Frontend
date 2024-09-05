import React, { useState } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, ShoppingCartOutlined, MoneyCollectOutlined, UserAddOutlined, LogoutOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Spin } from 'antd';
import logoImage from '../assets/img/logo.png';

const MainLayout = (props) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { cartItems, loading } = useSelector((state) => state.root);
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();


  // set data to localstorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Logout Handler
  const logOutHandler = () => {
    localStorage.removeItem("pos-user");
    navigate("/");
  };

  return (
    <Layout>
      <div className='loader'>
        {loading && (
          <Spin size='large' />
        )}
      </div>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <h3 className='title'>{collapsed ? '' : (<img src={logoImage} alt="Logo" />)}</h3>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: <Link to="/home">Home</Link>,
            },
            {
              key: '2',
              icon: <ShoppingCartOutlined />,
              label: <Link to="/cart">Cart</Link>,
            },
            {
              key: '3',
              icon: <MoneyCollectOutlined />,
              label: <Link to="/bills">Bills</Link>,
            },
            {
              key: '5',
              icon: <UnorderedListOutlined />,
              label: <Link to="/items">Item</Link>,
            },
            {
              key: '6',
              icon: <LogoutOutlined />,
              label: 'Logout',
              onClick: logOutHandler,
            }

          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className='cart-count' onClick={() => navigate('/cart')}>
            <b><h2>{cartItems.length}</h2>
            </b>
            <ShoppingCartOutlined className='cart-icon' />
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;