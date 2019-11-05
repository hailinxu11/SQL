import React from 'react';
import {Card, Table, Button, Popconfirm, message, Form, Modal, Divider, Upload, Icon} from 'antd';
import Link from 'umi/link';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';

@connect(({newfiles, loading}) => ({
  newfileList: newfiles.newfileList,
  loadingAll: loading.models.newfiles
}))
class NewfileListPage extends React.Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'newfiles/fetch'
    });
  }


  handleDown = recode => {
    const {dispatch} = this.props;
    dispatch({
      type: 'newfiles/download',
      payload: {
        id: recode.id,
        name: recode.name
      }
    });
  }

  handleDeleteData = id => {
    const {dispatch} = this.props;
    dispatch({
      type: 'newfiles/deleteData',
      payload: {
        id
      }
    }).then(response => {
      if(response.code === 200) {
        message.success(response.msg);
        dispatch({
          type: 'newfiles/fetch'
        });
      } else {
        message.error(response.msg);
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
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record, index) => (
          <span>
            <a onClick={() => this.handleDown(record)}>下载</a>
            <Divider type="vertical" />
            <Popconfirm title="确定删除?" onConfirm={() => this.handleDeleteData(record.id)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        )
      }
    ];

    return (
      <PageHeaderWrapper>
        <Card>
          <Table
            columns={columns}
            dataSource={this.props.newfileList}
            rowKey={data => data.id}
            loading={loadingAll}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default Form.create()(NewfileListPage);
