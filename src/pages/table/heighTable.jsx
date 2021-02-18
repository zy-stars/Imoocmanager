import React, { Component } from 'react'
import { Card,Table,Modal,Badge,Button,message} from "antd"
import axios from "./../../axios"
import Utils  from "./../../utils/utils"
export default class BasicTable extends Component {
    state = {}
    params = {
        page:1
    }
    componentDidMount(){
        this.request()
    }
    
    request = ()=>{
      let _this = this;
      axios.ajax({
          url:'/data2',
          data:{
              params:{
                  page:this.params.page
              }
          }
      }).then((res)=>{
          if(res.code === 0){
              res.result.list.map((item, index) => {
                return  item.key = index;
              })
              this.setState({
                  dataSource:res.result.list,
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
    //排序
    handleChange = (pagination,filters,sorter) => {
        console.log(sorter)
        this.setState({
            sortOrder:sorter.order
        })
    }
    handleDelete = (item) => {
        // let id = item.id;
        Modal.confirm({
            title:'确认',
            content:'您确认要删除此条数据吗？',
            onOk:()=>{
                message.success('删除成功');
                this.request();
            }
        })
    }
    render() {
        const columns = [ 
          {
            title:'id',
            dataIndex:'id',
            width: 80
          },
          {
            title:'用户名',
            dataIndex:'userName',
            width: 80
          },
          {
            title:'性别',
            dataIndex:'sex',
            render(sex){
                return sex === 1 ?'男':'女'
            },
            width: 80
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
            },
            width: 120
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
            },
            width: 80
          },
          {
            title:'生日',
            dataIndex:'birthday',
            width: 120
          },
          {
            title:'地址',
            dataIndex:'address',
            width: 80
          },
          {
            title:'早起时间',
            dataIndex:'time',
            width: 120
          }
        ]
        const columns2 = [ 
            {
              title:'id',
              dataIndex:'id',
              width: 80,
              fixed:"left"
            },
            {
              title:'用户名',
              dataIndex:'userName',
              width: 80,
              fixed:"left"
            },
            {
              title:'性别',
              dataIndex:'sex',
              render(sex){
                  return sex === 1 ?'男':'女'
              },
              width: 80
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
              },
              width: 120
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
              },
              width: 80
            },
            {
              title:'生日',
              dataIndex:'birthday',
              width: 120
            },
            {
                title:'生日',
                dataIndex:'birthday1',
                width: 120
              },
              {
                title:'生日',
                dataIndex:'birthday2',
                width: 120
              },
              {
                title:'生日',
                dataIndex:'birthday3',
                width: 120
              },
              {
                title:'生日',
                dataIndex:'birthday4',
                width: 120
              },
              {
                title:'生日',
                dataIndex:'birthday5',
                width: 120
              },
              {
                title:'生日',
                dataIndex:'birthday6',
                width: 120
              },
              {
                title:'生日',
                dataIndex:'birthday7',
                width: 120
              },
              {
                title:'生日',
                dataIndex:'birthday8',
                width: 120
              },
              {
                title:'生日',
                dataIndex:'birthday9',
                width: 120
              },
              {
                title:'生日',
                dataIndex:'birthday10',
                width: 120
              },
              
            {
              title:'地址',
              dataIndex:'address',
              width: 80,
              fixed:"right"
            },
            {
              title:'早起时间',
              dataIndex:'time',
              width: 120,
              fixed:"right"
            }
          ]
        const columns3 = [ 
            {
              title:'id',
              dataIndex:'id',
              width: 80
            },
            {
              title:'用户名',
              dataIndex:'userName',
              width: 80
            },
            {
              title:'性别',
              dataIndex:'sex',
              render(sex){
                  return sex === 1 ?'男':'女'
              },
              width: 80
            },
            {
                title:'年龄',
                dataIndex:'age',
                width: 80,
                sorter:(a,b) =>{
                    return a.age - b.age
                },
                sortOrder:this.state.sortOrder
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
              },
              width: 120
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
              },
              width: 80
            },
            {
              title:'生日',
              dataIndex:'birthday',
              width: 120
            },
            {
              title:'地址',
              dataIndex:'address',
              width: 80
            },
            {
              title:'早起时间',
              dataIndex:'time',
              width: 120
            }
          ]
          const columns4 = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '年龄',
                dataIndex: 'age'
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子',
                        '4': '百度FE',
                        '5': '创业者'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(abc) {
                    let config = {
                        '1': <Badge status="success" text="成功"/>,
                        '2': <Badge status="error" text="报错" />,
                        '3': <Badge status="default" text="正常" />,
                        '4': <Badge status="processing" text="进行中" />,
                        '5': <Badge status="warning" text="警告" />
                    }
                    return config[abc];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '操作',
                render:(text,item)=>{
                    return <Button size="small" onClick={(item) => { this.handleDelete(item) }}>删除</Button>
                }
            }
        ]
        return (
            <div>
                <Card title='头部固定'>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource}
                        bordered
                        pagination={false}//去除分页
                        scroll = { {y:240}}
                    />
                </Card>

                <Card title='左侧固定' style={{margin:"10px 0"}}>
                    <Table
                        columns={columns2}
                        dataSource={this.state.dataSource}
                        bordered
                        pagination={false}//去除分页
                        scroll = { {x :2165 }}
                    />
                </Card>
                <Card title='排序' style={{margin:"10px 0"}}>
                    <Table
                        columns={columns3}
                        dataSource={this.state.dataSource}
                        bordered
                        pagination={false}//去除分页
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="操作按钮" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns4}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}
