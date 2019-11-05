import React from 'react';
import {Card, Form, Select, Badge, Button, Descriptions} from 'antd';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
import Link from 'umi/link';

@connect(({groups}) => ({
  groupList: groups.groupList,
  detail: groups.detail
}))
class InfoGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'groups/queryById',
      payload: {
        id: this.props.location.query.id
      }
    });
  }

  render() {
    return (
      <PageHeaderWrapper>
        <Card style={{paddingLeft: 180}}>
          <Descriptions title="名称" size="1">
            <Descriptions.Item label="名称">{this.props.detail.name}</Descriptions.Item>
          </Descriptions>
          <Descriptions size="1">
            <Descriptions.Item label="服务地址">{this.props.detail.address}</Descriptions.Item>
          </Descriptions>
          <Descriptions size="1">
            <Descriptions.Item label="url">{this.props.detail.url}</Descriptions.Item>
          </Descriptions>
          <Link to="/groupsManagement">
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

export default Form.create()(InfoGroup);
