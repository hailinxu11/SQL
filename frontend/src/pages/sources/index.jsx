import React from 'react';
import {Card, Table, Button, Popconfirm, message, Form, Modal, Divider, Upload, Icon} from 'antd';
import Link from 'umi/link';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
import AliyunOSSUpload from './AliyunOSSUpload';

@connect(({sources, loading}) => ({
  fileList: sources.sourceList,
  loadingAll: loading.models.sources
}))
class SourceListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalAddInfoVisible: false};
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'sources/fetch'
    });
  }

  handleDeleteData = id => {
    const {dispatch} = this.props;
    dispatch({
      type: 'sources/deleteData',
      payload: {
        id
      }
    }).then(response => {
      if(response.code === 200) {
        message.success(response.msg);
        dispatch({
          type: 'sources/fetch'
        });
      } else {
        message.error(response.msg);
      }
    });
  }

  changeGroup=values => {
    const {dispatch} = this.props;
    dispatch({
      type: 'files/fetch',
      payload: {g_id: values}
    });
  }

  submitUpload = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err) {
        const {dispatch} = this.props;
        dispatch({
          type: 'sources/add',
          payload: {...values}
        });
      }
    });
  };

  handleUpload=() => {
    this.setState({modalAddInfoVisible: true});
  }

  handleDown = record => {
    const {dispatch} = this.props;
    dispatch({
      type: 'sources/download',
      payload: {
        id: record.id,
        name: record.name
      }
      // callback: response => {

      //   // 这块是下载的重点
      //   const blob = new Blob([response]);// 创建blob对象
      //   const aLink = document.createElement('a');// 创建a链接
      //   aLink.style.display = 'none';
      //   aLink.href = blob;
      //   aLink.download = 'fileName';
      //   document.body.appendChild(aLink);
      //   aLink.click();
      //   document.body.removeChild(aLink);// 点击完成后记得删除创建的链接
      // }
    });
    // .then(data => {
    //   console.log(window.URL);
    //   const blobUrl = window.URL.createObjectURL(data);
    //   const a = document.createElement('a');
    //   a.style.display = 'none';
    //   a.download = record.name;
    //   a.href = blobUrl;
    //   a.click();
    //   document.body.removeChild(a);
    // });
  }

  handleHtml = id => {
    const {dispatch} = this.props;
    dispatch({
      type: 'sources/html',
      payload: {
        id
      }
    });
  }

  handleWord = id => {
    const {dispatch} = this.props;
    dispatch({
      type: 'sources/word',
      payload: {
        id
      }
    });
  }


  render() {
    const {getFieldDecorator} = this.props.form;
    const {loadingAll} = this.props;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const props = {
      name: 'file',
      multiple: true,
      action: 'api/jira/data/',
      headers: {
        'Access-Token': currentUser.token
      },
      accept: '.csv',
      onChange(info) {
        const {status} = info.file;
        if(status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }
        if(status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if(status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    };

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
            <Popconfirm title="确定生成html文件?" onConfirm={() => this.handleHtml(record.id)}>
              <a> 生成html文件</a>
            </Popconfirm>
            <Divider type="vertical" />
            <Popconfirm title="确定生成word文件?" onConfirm={() => this.handleWord(record.id)}>
              <a> 生成word文件</a>
            </Popconfirm>
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
          <Button icon="plus" type="primary" onClick={this.handleUpload}>
              新建
          </Button>
          <Modal title="新增信息"
            visible={this.state.modalAddInfoVisible}
            onCancel={() => {
              this.setState({modalAddInfoVisible: false});
            }}
            // onOk={this.submitUpload}
          >
            <Form onSubmit={this.handleSubmit} labelCol={{span: 4}}>
              <Form.Item label="file">{getFieldDecorator('file')(<Upload {...props}>
                <Button>
                  <Icon type="upload" /> 选择上传文件
                </Button>
              </Upload>)}
              </Form.Item>
            </Form>
          </Modal>

          <Table
            columns={columns}
            dataSource={this.props.fileList}
            rowKey={data => data.id}
            loading={loadingAll}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default Form.create()(SourceListPage);
