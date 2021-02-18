import React, { Component } from 'react'
import { Card,Table,Modal,Button,message } from "antd"
import axios from "./../../axios"
import Utils  from "./../../utils/utils"
export default class BasicTable extends Component {
    state = {}
    params = {
        page:1
    }
    componentDidMount(){
        const dataSource= [
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'北京',
                time:'09:00'
            },
            {
                id:'1',
                userName:'Tom',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'北京',
                time:'09:00'
            },
            {
                id:'2',
                userName:'Lily',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'北京',
                time:'09:00'
            }
        ]
        dataSource.map((item,index)=>{
            item.key = index;
            return item
        })
        this.setState({
            dataSource
        })
        this.request()
    }
    //动态获取mock数据
    request = () => {
        let _this = this
        axios.ajax({
            url:'/data',
                data:{
                    params:{
                        page:this.params.page
                    }
                }
        }).then(res=>{
            if(res.code === 0){
                res.result.list.map((item, index) => {
                   item.key = index;
                   return item
                })
                this.setState({
                    dataSource2:res.result.list,
                    selectedRowKeys:[],
                    selectedRows:null,
                    pagination: Utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        this.request();
                    })
                })
            }
        })
    }
    onRowClick = (record,index) => {
        let selectKey = [index];
        Modal.info({
            title:'信息',
            content:`用户名:${record.userName}`
        })
        this.setState({
            selectedRowKeys:selectKey,//记录选中的行的索引值
            selectedItem:record //选中的行中的项
        })
    }
    handleDelete = () => {
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item)=>{
            return ids.push(item.id)
        })
        Modal.confirm({
            title:'删除提示',
            content:`您确定要删除这些数据吗？${ids.join(',')}`,
            onOk:() => {
                message.success('删除成功');
                this.request();//重置
            }
        })
    }
    render() {
        const columns = [ 
          {
            title:'id',
            dataIndex:'id'
          },
          {
            title:'用户名',
            dataIndex:'userName'
          },
          {
            title:'性别',
            dataIndex:'sex',
            render(sex){
                return sex === 1 ?'男':'女'
            }
          },
          {
            title:'状态',
            dataIndex:'state',
            render(state){
                let config = {
                    '1':'咸鱼一条',
                    '2':'风华浪子',
                    '3':'北大才子',
                    '4':'创业者',
                    '5':'百度FE',
                }
                return config[state];
            }
          },
          {
            title:'爱好',
            dataIndex:'interest',
            render(state){
                let config = {
                    '1':'打羽毛球',
                    '2':'打篮球',
                    '3':'打网球',
                    '4':'打排球',
                    '5':'游泳',
                    '6':'爬山',
                    '7':'健身',
                    '8':'学习',
                }
                return config[state];
            }
          },
          {
            title:'生日',
            dataIndex:'birthday'
          },
          {
            title:'地址',
            dataIndex:'address'
          },
          {
            title:'早起时间',
            dataIndex:'time'
          }
        ]
        const rowSelection = {
            type:'radio',
            selectedRowKeys: this.state.selectedRowKeys
        }
        const rowCheckSelection = {
            type:'checkbox',
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys,selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows,
                })
            }
        }
        return (
            <div>
                <Card title='基础表格'>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource}
                        bordered
                        pagination={false}//去除分页
                    />
                </Card>

                <Card title='动态数据渲染表格' style={{margin:"10px 0"}}>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        bordered
                        pagination={false}//去除分页
                    />
                </Card>

                <Card title='Mock-单选' style={{margin:"10px 0"}}>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record,index) => {
                            return {
                                onClick:()=>{
                                    this.onRowClick(record,index);
                                }
                            };
                        }}
                        pagination={false}//去除分页
                    />
                </Card>
                <Card title='Mock-复选框' style={{margin:"10px 0"}}>
                    <div style={{marginBottom: 10}}>
                        <Button onClick={()=>{this.handleDelete()}}>删除</Button>
                    </div>
                    <Table
                        columns={columns}
                        rowSelection={rowCheckSelection}
                        dataSource={this.state.dataSource2}
                        bordered
                        onRow={(record,index) => {
                            return {
                                onClick:()=>{
                                    this.onRowClick(record,index);
                                }
                            };
                        }}
                        pagination={false}//去除分页
                    />
                </Card>
                <Card title='Mock-分页' style={{margin:"10px 0"}}>
                    <Table
                        columns={columns}
                        rowSelection={rowCheckSelection}
                        dataSource={this.state.dataSource2}
                        bordered
                        pagination={this.state.pagination}//去除分页
                    />
                </Card>
            </div>
        )
    }
}
