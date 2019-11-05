import React from 'react';
import {Card, Table, Divider, Button, Popconfirm, message} from 'antd';
import Link from 'umi/link';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';


@connect(({loading, servers}) => ({
  loadingAll: loading.models.servers,
  serverList: servers.serverList
}))
class ServerListPage extends React.Component {
  constructor(props) {
    super();
    this.handleDeleteData = this.handleDeleteData.bind(this);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'servers/fetch'
    });
  }

  handleDeleteData = (id, index) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'servers/deleteData',
      payload: {
        id,
        index
      }
    });
  }

  render() {
    const {loadingAll} = this.props;
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
        render: text => <a>{text}</a>
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '地址',
        dataIndex: 'service_ip',
        key: 'service_ip'
      },
      {
        title: '端口',
        dataIndex: 'port',
        key: 'port'
      },
      {
        title: '用户',
        dataIndex: 'username',
        key: 'username'
      },
      {
        title: '库名',
        dataIndex: 'database',
        key: 'database'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record, index) => (
          <span>
            <Link to={{
              pathname: '/serverManagement/info',
              query: {
                id: record.id
              }
            }}>
              详情
            </Link>
            <Divider type="vertical" />
            <Link to={{
              pathname: '/serverManagement/edit',
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
          <Link to="/serverManagement/add">
            <Button icon="plus" type="primary">
              新建
            </Button>
          </Link>
          <Table
            columns={columns}
            dataSource={this.props.serverList}
            rowKey={data => data.id}
            loading={loadingAll}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default ServerListPage;
