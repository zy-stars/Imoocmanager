import React, { Component } from 'react'
import { Card, Button, Form, Modal, message } from 'antd';
import axios from './../../axios/index';
import BaseForm from '../../components/BaseForm'
import ETable from './../../components/ETable'
import Utils from '../../utils/utils';
const FormItem = Form.Item

export default class Order extends Component {
    state = {
        orderInfo:{},
        orderConfirmVisble:false
    }
    params={page:1}
    formList=[
        {
            type:'SELECT',
             label:'城市',
             field:'city_id',
             placeholder:'全部',
             initialValue:'1',
             width:80,
             list:[{id:'0',name:'全部'},{id:'1',name:'北京'},{id:'2',name:'天津'},{id:'3',name:'深圳'},
             ]
        },
        {
            type:'时间查询',

        },
        {
            type:'SELECT',
             label:'订单状态',
             field:'order_status',
             initialValue:'1',
             placeholder:'全部',
             width:80,
             list:[{id:'0',name:'全部'},{id:'1',name:'进行中'},{id:'2',name:'结束行程'},
             ]
        },
    ]
    componentDidMount(){
        this.requestList()
    }
    handleFilter = (params)=>{
        this.params = params;
        this.requestList();
    }
    requestList= ()  => {
        let _this = this;
        axios.requestList(_this,'/order/list',this.params,true);
    }
    //点击结束订单按钮
    handleConfirm = () =>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'信息',
                content:'请选择一条订单进行结束'
            })
            return 
        }
        axios.ajax({
            url:'/order/ebike_info',
            data:{
                params:{
                    orderId:item.id
                }
            }
        }).then((res)=>{
            this.setState({
                orderInfo:res.result,
                orderConfirmVisble:true
            })
        })
        this.setState({
            orderConfirmVisble:true
        })
    }
    //点击弹框的ok 
    handleFinishOrder =()=> {
        let item = this.state.selectedItem
        axios.ajax({
            url:'/order/finish_order',
            data:{
                params:{
                    orderId:item.id
                }
            }
        }).then((res)=>{
            if(res.code === 0){
                message.success('订单结束成功');
                this.setState({
                orderInfo:res.result,
                orderConfirmVisble:false
            })
                this.requestList()
            }
        })
    }
    // //点击数据选中
    // onRowClick = (record,index) => {
    //     let selectKey = [index];
    //     this.setState({
    //         selectedRowKeys:selectKey,//记录选中的行的索引值
    //         selectedItem:record //选中的行中的项
    //     })
    // }
    //订单详情
    openOrderDetail = ()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'信息',
                content:'请选择订单查询'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`,'_blank') 
    }
    render() {
        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn',
                width: 120
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn',
                width: 120
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                width: 80
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
                width: 120
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                },
                width: 80
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time',
                width: 80
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: 80

            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
                width: 120
            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
                width: 120
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{sapn:19}
        }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card>
                    <Button type='primary' onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type='primary' style={{marginLeft:10}}
                        onClick={this.handleConfirm}
                    >结束订单</Button>
                </Card>
                <div>
                    <ETable
                         updataSelectedItem = { Utils.updateSelectedItem.bind(this)}
                         columns = {columns}
                         dataSource = {this.state.list}
                         selectedRowKeys = { this.state.selectedRowKeys}
                         pagination = { this.state.pagination}
                         rowSelection = 'checkbox'
                         selectedItem={this.state.selectedItem}
                         selectedIds={this.state.selectedIds}
                         
                    />
                </div>
                <Modal
                    title='结束订单'
                    visible = {this.state.orderConfirmVisble}
                    onCancel = { ()=>{
                        this.setState({
                            orderConfirmVisble:false
                        })
                    }}
                    onOk = { this.handleFinishOrder}
                    width={600}
                >
                    <Form layout="horizontal">
                        <FormItem label='车辆编号' {...formItemLayout} key='1'>
                            {this.state.orderInfo.bike_sn} 
                        </FormItem>
                        <FormItem label='剩余电量'  {...formItemLayout} key='2'>
                            {this.state.orderInfo.battery+"%"}
                        </FormItem>
                        <FormItem label='行程开始时间'  {...formItemLayout} key='3'>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label = '当前位置'  {...formItemLayout} key='4'>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}
