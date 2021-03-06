import React from 'react';
import {Card, Form, Input, Button, message} from 'antd';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
import Link from 'umi/link';
import {routerRedux} from 'dva/router';

@connect(({userManagement}) => ({
  userList: userManagement.userList
}))
class UserAd extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err) {
        const {dispatch} = this.props;
        dispatch({
          type: 'userManagement/add',
          payload: {...values}
        });
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <PageHeaderWrapper>
        <Card>
          <Form labelCol={{span: 5}} wrapperCol={{span: 12}} onSubmit={this.handleSubmit}>
            <Form.Item label="昵称">
              {getFieldDecorator('name', {
                rules: [{required: true, message: '昵称!'}]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="账号名">
              {getFieldDecorator('number', {
                rules: [{required: true, message: '账号名!'}]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="密码">
              {getFieldDecorator('password', {
                rules: [{required: true, message: '请填写密码!'}]
              })(<Input />)}
            </Form.Item>
            <Form.Item wrapperCol={{span: 12, offset: 5}}>
              <Button key="submit" type="primary" htmlType="submit" >
              提交
              </Button>
              <Link to="/userManagement">
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

export default Form.create()(UserAd);
