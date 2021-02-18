import React, { Component } from 'react'
import moment from "moment"
import {Card,Form,Button,Input,Checkbox,Radio,Select,Switch,DatePicker,TimePicker,Upload,Icon,message, InputNumber} from "antd"
import TextArea from 'antd/lib/input/TextArea'

const FormItem = Form.Item
const RadionGroup = Radio.Group
const { Option } = Select

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };
const offsetLayout = {
    wrapperCol: {
        xs: 24,
        sm: {
            span: 12,
            offset:4
        }
    }
}
class Register extends Component {
    state = {}
    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue()
        message.success(`${userInfo.userName}恭喜，当前密码是${userInfo.userPwd}`)
        // console.log(JSON.stringify(userInfo))
    }
    handleReset = () => {
        this.props.form.resetFields();
    }
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };  
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Card title='注册表单'>
                    <FormItem layout='horizontal'>
                        <FormItem label='用户名' { ...formItemLayout }>
                            {
                                getFieldDecorator('userName',{
                                    initialValue:'',
                                    rules:[{
                                        required:true,
                                        message:'请输入用户名'
                                    }] 
                                })(
                                   <Input  placeholder='请输入用户名'/>
                                )
                            }
                        </FormItem>
                        <FormItem label='密码' { ...formItemLayout }>
                            {
                                getFieldDecorator('userPwd',{
                                    initialValue:'',
                                    rules:[{
                                        required:true,
                                        message:'请输入密码'
                                    }] 
                                })(
                                   <Input type='password' placeholder='请输入密码'/>
                                )
                            }
                        </FormItem>
                        <FormItem label='性别' { ...formItemLayout }>
                            {
                                getFieldDecorator('sex',{
                                    initialValue:'1',
                                    rules:[
                                        {
                                            required:true
                                        }
                                    ]
                                })(
                                   <RadionGroup>
                                       <Radio value='1' >男</Radio>
                                       <Radio value='2'>女</Radio>
                                   </RadionGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label='年龄' { ...formItemLayout }>
                            {
                                getFieldDecorator('age',{
                                    initialValue:'18',
                                })(
                                   <InputNumber/>
                                )
                            }
                        </FormItem>
                        <FormItem label='当前状态' { ...formItemLayout }>
                            {
                                getFieldDecorator('selects',{
                                    initialValue:'1',
                                })(
                                   <Select>
                                       <Option value='1'>好好学习</Option>
                                       <Option value='2'>天天向上</Option>
                                       <Option value='3'>快乐学习</Option>
                                       <Option value='4'>高薪就业</Option>
                                   </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label='爱好' { ...formItemLayout }>
                            {
                                getFieldDecorator('intrest',{
                                    initialValue: ['1','2'],
                                })(
                                   <Select mode='multiple'>
                                       <Option value='1'>羽毛球</Option>
                                       <Option value='2'>健身</Option>
                                       <Option value='3'>篮球</Option>
                                       <Option value='4'>足球</Option>
                                       <Option value='5'>排球</Option>
                                       <Option value='6'>唱歌</Option>
                                       <Option value='7'>乒乓球</Option>
                                       <Option value='8'>游泳</Option>
                                   </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label='是否已婚' { ...formItemLayout }>
                            {
                                getFieldDecorator('isMarred',{
                                    initialValue:true,
                                    valuePropName:'checked'
                                })(
                                   <Switch/>
                                )
                            }
                        </FormItem>
                        <FormItem label='生日' { ...formItemLayout }>
                            {
                                getFieldDecorator('bir',{
                                    initialValue:moment('2019-02-09'),
                                })(
                                   <DatePicker
                                     showTime
                                     format='YYYY-MM-DD HH:mm:ss'/>
                                )
                            }
                        </FormItem>
                        <FormItem label='地址' { ...formItemLayout }>
                            {
                                getFieldDecorator('address',{
                                    initialValue:'北京海淀区奥林匹克公园',
                                })(
                                  <TextArea autoSize={{ minRows: 3, maxRows: 5 }}/>
                                )
                            }
                        </FormItem>
                        <FormItem label='早起时间' { ...formItemLayout }>
                            {
                                getFieldDecorator('time',{
                                   
                                })(
                                  <TimePicker/>
                                )
                            }
                        </FormItem>
                        <FormItem label='头像' { ...formItemLayout }>
                            {
                                getFieldDecorator('load',{
                                   
                                })(
                                  <Upload 
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    showUploadList={false}
                                    onChange={this.handleChange}
                                  >   
                                   { this.state.imageUrl?<img src={this.state.imageUrl} alt=''/> :<Icon type='plus'/>}                                 
                                  </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem  { ...offsetLayout }>
                            {
                                getFieldDecorator('load',{
                                   
                                })(
                                   <Checkbox>我已经阅读了<a href='/#'>协议</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem  { ...offsetLayout }>
                            <Button type='primary' onClick={()=>this.handleSubmit()} >注册</Button>
                            
                            <Button onClick={()=>this.handleReset()} >重置</Button>
                        </FormItem>
                    </FormItem>
                </Card>
            </div>
        )
    }
}
export default Form.create()(Register);