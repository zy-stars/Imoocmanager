import React, { Component } from 'react'
import {Button,Card,Modal} from "antd"
import "./ui.less"

export default class modals extends Component {
    state={
        showOpen1:false,
        showOpen2:false,
        showOpen3:false,
        showOpen4:false
    }
    handleModal= (type )=>{
        this.setState({
            [type]: true
        })
    }
    handleConfirm=(type) =>{
        Modal[type]({
            title:'确认',
            content:"你确定学会了React了吗？",
            onOk(){
                console.log('ok')
            },
            onCancel(){
                console.log('cancel')
            }
          })
    }
    render() {
        return (
            <div>
                <Card title='基础模态框' className='card-wrap'>
                    <Button type='primary' onClick={()=>this.handleModal("showModal1")}>Open</Button>
                    <Button type='primary' onClick={()=>this.handleModal("showModal2")}>自定义页脚</Button>
                    <Button type='primary' onClick={()=>this.handleModal("showModal3")}>顶部20px弹框</Button>
                    <Button type='primary' onClick={()=>this.handleModal("showModal4")}>水平垂直居中</Button>
                </Card>
                <Modal
                    title='React'
                    visible={this.state.showModal1}
                    onCancel={()=>{
                        this.setState({
                            showModal1:false
                        })
                    }}
                >
                    <p>很开心你已经做到这一步了，继续加油！！</p>
                </Modal>
                <Modal
                    title='React'
                    visible={this.state.showModal2}
                    okText='好的'
                    cancelText='加油'
                    onCancel={()=>{
                        this.setState({
                            showModal2:false
                        })
                    }}
                >
                    <p>很开心你已经做到这一步了，继续加油！！</p>
                </Modal>
                <Modal
                    title='React'
                    visible={this.state.showModal3}
                    style={{top:20}}
                    onCancel={()=>{
                        this.setState({
                            showModal3:false
                        })
                    }}
                >
                    <p>很开心你已经做到这一步了，继续加油！！</p>
                </Modal>
                <Modal
                    title='React'
                    wrapClassName="vertical-center-modal"
                    visible={this.state.showModal4}
                    onCancel={()=>{
                        this.setState({
                            showModal4:false
                        })
                    }}
                >
                    <p>很开心你已经做到这一步了，继续加油！！</p>
                </Modal>
                <Card title='信息确认框' className='card-wrap'>
                    <Button type='primary' onClick={()=>this.handleConfirm("confirm")}>Confirm</Button>
                    <Button type='primary' onClick={()=>this.handleConfirm("info")}>Info</Button>
                    <Button type='primary' onClick={()=>this.handleConfirm("success")}>Success</Button>
                    <Button type='primary' onClick={()=>this.handleConfirm("warning")}>Waring</Button>
                </Card>
            </div>
        )
    }
}
