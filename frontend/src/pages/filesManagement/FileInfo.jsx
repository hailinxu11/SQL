import React from 'react';
import {Card, Form, Select, Badge, Button, Descriptions} from 'antd';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
import Link from 'umi/link';

@connect(({servers}) => ({
  serverList: servers.serverList,
  detail: servers.detail
}))
class InfoServer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'servers/queryById',
      payload: {
        id: this.props.location.query.id
      }
    });
  }

  render() {
    return (
      <PageHeaderWrapper>
        <Card style={{paddingLeft: 180}}>
          <Descriptions title="服务器详情" size="1">
            <Descriptions.Item label="服务器昵称">{this.props.detail.name}</Descriptions.Item>
          </Descriptions>
          <Descriptions size="1">
            <Descriptions.Item label="数据库用户">{this.props.detail.username}</Descriptions.Item>
          </Descriptions>
          <Descriptions size="1">
            <Descriptions.Item label="数据库地址">{this.props.detail.service_ip}</Descriptions.Item>
          </Descriptions>
          <Descriptions size="1">
            <Descriptions.Item label="数据库端口">{this.props.detail.port}</Descriptions.Item>
          </Descriptions>
          <Descriptions size="1">
            <Descriptions.Item label="数据库密码">{this.props.detail.password}</Descriptions.Item>
          </Descriptions>
          <Descriptions size="1">
            <Descriptions.Item label="数据库库名">{this.props.detail.database}</Descriptions.Item>
          </Descriptions>
          <Link to="/serverManagement">
            <Button key="cancel"
              style={{
                marginLeft: 80
              }}>
                返回
            </Button>
          </Link>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(InfoServer);
