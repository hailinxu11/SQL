import React from 'react';
import {Card, Table, Button, Popconfirm, message, Form, Select, Divider} from 'antd';
import Link from 'umi/link';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';

const {Option} = Select;

@connect(({files, groups, loading}) => ({
  fileList: files.fileList,
  groupList: groups.groupList,
  loading: loading.models.files
}))
class FileListPage extends React.Component {
  constructor(props) {
    super();
    this.state = {submitLoading: false};
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'files/fetch',
      payload: {g_id: ''}
    });
    dispatch({
      type: 'groups/fetch'
    });
  }

  handleDeleteData = (id, index) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'files/deleteData',
      payload: {
        id,
        index
      }
    });
  }

  renderOptions = values => values.map(element =>
    <Option key={element.id} value={element.id}> {element.name}</Option>);


  changeGroup=values => {
    const {dispatch} = this.props;
    dispatch({
      type: 'files/fetch',
      payload: {g_id: values}
    });
  }

    handleSubmit = e => {
      e.preventDefault();
      this.setState({submitLoading: true});
      this.props.form.validateFields((err, values) => {
        if(!err) {
          const {dispatch} = this.props;
          dispatch({
            type: 'files/download',
            payload: {...values}
          }).then(res => {
            this.setState({submitLoading: false});
            if(res.code === 200) {
              message.success(res.msg);
            } else {
              message.error(res.msg);
            }
          });
        }
      });
    };

    render() {
      const {getFieldDecorator} = this.props.form;
      const {loading} = this.props;
      const columns = [
        {
          title: '序号',
          dataIndex: 'id',
          key: 'id',
          render: text => <a>{text}</a>
        },
        {
          title: '项目',
          dataIndex: 'project',
          key: 'project'
        },
        {
          title: 'sql文件名称',
          dataIndex: 'file_name',
          key: 'file_name'
        },
        {
          title: 'sql文件路径',
          dataIndex: 'file_url',
          key: 'file_url'
        },
        {
          title: '分组名称',
          dataIndex: 'group_name',
          key: 'group_name'
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          key: 'create_time'
        },
        {
          title: '执行顺序',
          dataIndex: 'index',
          key: 'index'
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record, index) => (
            <span>
              <Link to={{
                pathname: '/filesManagement/info',
                query: {
                  id: record.id
                }
              }}>
              详情
              </Link>
              <Divider type="vertical" />
              <Link to={{
                pathname: '/filesManagement/edit',
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
            <Link to="/filesManagement/add">
              <Button icon="plus" type="primary">
              新建
              </Button>
            </Link>
            <Form labelCol={{span: 5}} wrapperCol={{span: 12}} onSubmit={this.handleSubmit}
              style={{float: 'right', width: '80%'}}>
              <Form.Item label="文件分组">
                {getFieldDecorator('g_id', {
                  rules: [{required: true, message: '请选择需要执行的文件组!'}]
                })(<Select
                  placeholder="请选择需要执行的sprint文件组"
                  style={{width: '60%'}}
                  onChange={this.changeGroup}>
                  {this.renderOptions(this.props.groupList)}
                </Select>,)}
                <Button key="submit" type="primary" htmlType="submit" style={{display: 'inline-block', marginLeft: '50px'}} loading={this.state.submitLoading}>
              文件分组整合
                </Button>
              </Form.Item>

            </Form>
            <Table
              columns={columns}
              dataSource={this.props.fileList}
              rowKey={data => data.id}
              loading={loading}
            />
          </Card>
        </PageHeaderWrapper>
      );
    }
}
export default Form.create()(FileListPage);
