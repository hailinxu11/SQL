import React from 'react';
import {Card, Form, Input, Button} from 'antd';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
import Link from 'umi/link';


@connect(({servers, loading}) => ({
  serverList: servers.serverList,
  submitting: loading.effects['servers/add']
}))
class EditServer extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err) {
        const {dispatch} = this.props;
        dispatch({
          type: 'servers/add',
          payload: {...values}
        });
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {submitting} = this.props;
    return (
      <PageHeaderWrapper>
        <Card>
          <Form labelCol={{span: 5}} wrapperCol={{span: 12}} onSubmit={this.handleSubmit}>
            <Form.Item label="服务器昵称">
              {getFieldDecorator('name', {
                rules: [{required: true, message: '请填写服务器昵称!'}]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="数据库地址">
              {getFieldDecorator('service_ip', {
                rules: [{required: true, message: '请填写数据库地址!'}]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="数据库用户">
              {getFieldDecorator('username', {
                rules: [{required: true, message: '请填写数据库用户!'}]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="数据库端口">
              {getFieldDecorator('port', {
                rules: [{required: true, message: '请填写数据库端口!'}]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="数据库密码">
              {getFieldDecorator('password', {
                rules: [{required: true, message: '请填写数据库密码!'}]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="数据库库名">
              {getFieldDecorator('database', {
                rules: [{required: true, message: '请填写数据库库名!'}]
              })(<Input />)}
            </Form.Item>
            <Form.Item wrapperCol={{span: 12, offset: 5}}>
              <Button key="submit" type="primary" htmlType="submit" loading={submitting}>
              提交
              </Button>
              <Link to="/serverManagement">
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

export default Form.create()(EditServer);
