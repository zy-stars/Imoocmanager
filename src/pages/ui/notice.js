import React, { Component } from 'react'
import { Card,Button,notification} from "antd"
import './ui.less'
export default class notice extends Component {
    openNofication = (type,direction) => {
        if(direction){
            notification.config({
                placement:direction
            })
        }
        notification[type]({
            message:"发工资啦",
            description:"这个月的工资已经转到你的账户"
        });
    }
    render() {
        return (
            <div>
                <Card title="通知提醒框" className='card-wrap'>
                    <Button type='primary' onClick={()=>{this.openNofication('success')}}>Success</Button>
                    <Button type='primary' onClick={()=>{this.openNofication('info')}}>Info</Button>
                    <Button type='primary' onClick={()=>{this.openNofication('warning')}}>Warning</Button>
                    <Button type='primary' onClick={()=>{this.openNofication('error')}}>error</Button>
                </Card>
                <Card title="通知提醒框" className='card-wrap'>
                    <Button type='primary' onClick={()=>{this.openNofication('success','topLeft')}}>topLeft</Button>
                    <Button type='primary' onClick={()=>{this.openNofication('info','topRight')}}>topRight</Button>
                    <Button type='primary' onClick={()=>{this.openNofication('warning','bottomLeft')}}>bottomLeft</Button>
                    <Button type='primary' onClick={()=>{this.openNofication('error','bottomRight')}}>bottomRight</Button>
                </Card>
            </div>
        )
    }
}
