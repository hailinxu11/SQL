import React from 'react';
import {Card, Form, Input, Button, Select} from 'antd';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
import Link from 'umi/link';


const {Option} = Select;

@connect(({files, groups, loading}) => ({
  fileList: files.fileList,
  groupList: groups.groupList,
  detail: files.detail,
  submitting: loading.effects['files/updateData']
}))
class EditFile extends React.Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'groups/fetch'
    });

    dispatch({
      type: 'files/queryById',
      payload: {
        id: this.props.location.query.id
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err) {
        const {dispatch} = this.props;
        dispatch({
          type: 'files/updateData',
          payload: {...values}
        });
      }
    });
  };

  renderOptions = values => values.map(element =>
    <Option key={element.id} value={element.id}>{element.name}</Option>);

  render() {
    const {getFieldDecorator} = this.props.form;
    const {submitting} = this.props;
    return (
      <PageHeaderWrapper>
        <Card>
          <Form labelCol={{span: 5}} wrapperCol={{span: 12}} onSubmit={this.handleSubmit}>
            <Form.Item label="id" style={{display: 'none'}}>
              {getFieldDecorator('id', {
                initialValue: `${this.props.detail.id}`
              })(<Input />)}
            </Form.Item>
            <Form.Item label="项目分支">
              {getFieldDecorator('project', {
                rules: [{required: true, message: '请填写项目分支!'}],
                initialValue: `${this.props.detail.project}`
              })(<Input />)}
            </Form.Item>
            <Form.Item label="sql文件名称">
              {getFieldDecorator('file_name', {
                rules: [{required: true, message: '请填写服务地址!'}],
                initialValue: `${this.props.detail.file_name}`
              })(<Input />)}
            </Form.Item>
            <Form.Item label="SQL文件路径">
              {getFieldDecorator('file_url', {
                rules: [{required: true, message: '请填写SQL文件路径!'}],
                initialValue: `${this.props.detail.file_url}`
              })(<Input />)}
            </Form.Item>
            <Form.Item label="文件分组">
              {getFieldDecorator('group', {
                rules: [{required: true, message: '请选择需要执行的文件组!'}],
                initialValue: this.props.detail.group
              })(<Select
                placeholder="请选择需要执行的sprint文件组"
              >
                {this.renderOptions(this.props.groupList)}
              </Select>,)}
            </Form.Item>
            <Form.Item label="执行顺序">
              {getFieldDecorator('index', {
                rules: [{required: true, message: '请填写执行顺序!'}],
                initialValue: `${this.props.detail.index}`
              })(<Input />)}
            </Form.Item>
            <Form.Item wrapperCol={{span: 12, offset: 5}}>
              <Button key="submit" type="primary" htmlType="submit" loading={submitting}>
              提交
              </Button>
              <Link to="/filesManagement">
                <Button key="cancel"
                  style={{
                    marginLeft: 80
                  }}>
                取消
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(EditFile);
