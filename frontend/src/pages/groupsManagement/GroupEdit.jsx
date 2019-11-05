import React from 'react';
import {Card, Form, Input, Button} from 'antd';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
import Link from 'umi/link';


@connect(({groups, loading}) => ({
  groupList: groups.groupList,
  detail: groups.detail,
  submitting: loading.effects['groups/updateData']
}))
class EditGroup extends React.Component {
  componentDidMount() {
    const {dispatch} = this.props;
    if(this.props.location.query.id) {
      dispatch({
        type: 'groups/queryById',
        payload: {
          id: this.props.location.query.id
        }
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err) {
        const {dispatch} = this.props;
        dispatch({
          type: 'groups/updateData',
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
            <Form.Item label="服务器id" style={{display: 'none'}}>
              {getFieldDecorator('id', {
                rules: [{required: false}],
                initialValue: `${this.props.detail.id}`
              })(<Input />)}
            </Form.Item>
            <Form.Item label="名称">
              {getFieldDecorator('name', {
                rules: [{required: true, message: '请填写名称!'}],
                initialValue: `${this.props.detail.name}`
              })(<Input />)}
            </Form.Item>
            <Form.Item wrapperCol={{span: 12, offset: 5}}>
              <Button key="submit" type="primary" htmlType="submit" loading={submitting}>
              提交
              </Button>
              <Link to="/groupsManagement">
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

export default Form.create()(EditGroup);
