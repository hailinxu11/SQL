import React from 'react';
import {Card, Table, Divider, Button, Popconfirm, message} from 'antd';
import Link from 'umi/link';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';


@connect(({groups, loading}) => ({
  groupList: groups.groupList,
  loading: loading.models.groups
}))
class GroupListPage extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'groups/fetch'
    });
  }

  handleDeleteData = (id, index) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'groups/deleteData',
      payload: {
        id,
        index
      }
    });
  }

  render() {
    const {loading} = this.props;
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
        title: '操作',
        key: 'action',
        render: (text, record, index) => (
          <span>
            <Link to={{
              pathname: '/groupsManagement/info',
              query: {
                id: record.id
              }
            }}>
              详情
            </Link>
            <Divider type="vertical" />
            <Link to={{
              pathname: '/groupsManagement/edit',
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
          <Link to="/groupsManagement/add">
            <Button icon="plus" type="primary">
              新建
            </Button>
          </Link>
          <Table
            columns={columns}
            dataSource={this.props.groupList}
            rowKey={data => data.id}
            loading={loading}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default GroupListPage;
