import React from 'react';
import {Card, Form, Select, Badge, Button, Descriptions} from 'antd';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
import Link from 'umi/link';

@connect(({userManagement}) => ({
  detail: userManagement.detail
}))
class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'userManagement/queryById',
      payload: {
        id: this.props.location.query.id
      }
    });
  }

  render() {
    return (
      <PageHeaderWrapper>
        <Card style={{paddingLeft: 180}}>
          <Descriptions title="用户详情" size="1">
            <Descriptions.Item label="昵称">{this.props.detail.name}</Descriptions.Item>
          </Descriptions>
          <Descriptions size="1">
            <Descriptions.Item label="账号">{this.props.detail.number}</Descriptions.Item>
          </Descriptions>
          <Descriptions size="1">
            <Descriptions.Item label="创建时间">{this.props.detail.create_time}</Descriptions.Item>
          </Descriptions>
          <Link to="/userManagement">
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

export default Form.create()(UserInfo);
