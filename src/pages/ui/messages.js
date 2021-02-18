import React, { Component } from 'react'
import { Card,Button,message} from "antd"
import './ui.less'

export default class messages extends Component {
    showMessage = (type) =>{
        message[type]('恭喜你，你已经走到这啦！')
    }
    render() {              
        return (
            <div>
                <Card title='全局提示框' className='card-wrap'>
                    <Button type='primary' onClick={()=>this.showMessage('success')}>Success</Button>
                    <Button type='primary' onClick={()=>this.showMessage('info')}>Info</Button>
                    <Button type='primary' onClick={()=>this.showMessage('warning')}>Waring</Button>
                    <Button type='primary' onClick={()=>this.showMessage('error')}>Error</Button>
                    <Button type='primary' onClick={()=>this.showMessage('loading')}>Loaing</Button>
                </Card>
            </div>
        )
    }
}
