import React, { Component } from 'react'
import { Card,Form ,Input,Button,message,Icon, Checkbox} from "antd"
const FormItem = Form.Item;
class FormLogin extends Component {
  handleSubmit = () => {
        //判断校验字段
        this.props.form.validateFields((err, values) => {
          if (!err) {
            message.success(`${values.userName}恭喜，当前密码是${values.userPwd}`)
          }
        });
      };
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Card title='登录行内表单'>
                    <Form layout='inline'>
                        <FormItem>
                            <Input  prefix={<Icon type='user'/>} placeholder='请输入用户名'/>
                        </FormItem>
                        <FormItem>
                            <Input prefix={<Icon type='lock'/>} placeholder='请输人密码'/>
                        </FormItem>
                        <FormItem>
                            <Button type='primary'>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title='登录水平表单' style={{marginTop:10}}>
                <Form style={{width:300}}>
                        <FormItem>
                            {
                                getFieldDecorator('userName',{
                                    initialValue:'',
                                    rules:[{
                                        required:true,
                                        message:'请输入用户名'
                                    },{
                                        min:5,max:10,
                                        message:'长度不在范围内 '

                                    },{
                                        pattern:new RegExp('^\\w+$','g'),
                                        message:'用户名必须为字母或者数字'
                                    }] 
                                })(
                                   <Input  prefix={<Icon type='user'/>} placeholder='请输入用户名'/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                        {
                                getFieldDecorator('userPwd',{
                                    initialValue:'',
                                    rules:[{
                                        required:true,
                                        message:'密码不能为空'
                                    }] 
                                })(
                                   <Input prefix={<Icon type='lock'/>} placeholder='请输密码'/>
                                )
                            }                           
                        </FormItem>
                        <FormItem>
                            <Button type='primary' onClick={()=>{this.handleSubmit()}}>登录</Button>
                        </FormItem>
                        <FormItem>
                        {
                                getFieldDecorator('userPwd',{
                                    initialValue:true,
                                    valuePropName:'checked'
                                })(
                                   <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href='/#' style={{float:"right"}}>忘记密码</a>                         
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(FormLogin);