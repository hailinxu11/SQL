import React from 'react';
import {Card, Table, Divider, Button, Popconfirm, message} from 'antd';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import Link from 'umi/link';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

@connect(({userManagement}) => ({
  userList: userManagement.userList
}))
class UserListPage extends React.Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'userManagement/fetch'
    });
  }

  handleDeleteData = (id, index) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'userManagement/deleteData',
      payload: {
        id,
        index
      }
    });
  }

  render() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
        render: text => <a>{text}</a>
      },
      {
        title: '昵称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '账号名',
        dataIndex: 'number',
        key: 'number'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record, index) => (
          <span>
            <Link to={{
              pathname: '/userManagement/info',
              query: {
                id: record.id
              }
            }}>
              详情
            </Link>
            <Divider type="vertical" />
            <Link to={{
              pathname: '/userManagement/edit',
              query: {
                id: record.id
              }
            }}>
              编辑
            </Link>
            <Divider type="vertical" />
            <Popconfirm title="确定删除?" onConfirm={() => this.handleDeleteData(record.id, index)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        )
      }
    ];
    return (
      <PageHeaderWrapper>
        <Card>
          <Link to="/userManagement/add">
            <Button icon="plus" type="primary">
              新建
            </Button>
          </Link>
          <Table
            columns={columns}
            dataSource={this.props.userList}
            rowKey={data => data.id}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default UserListPage;
