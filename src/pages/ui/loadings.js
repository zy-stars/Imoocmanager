import React, { Component } from 'react'
import { Card,Spin,Icon,Alert} from "antd"
import './ui.less'
export default class loadings extends Component {
    render() {
        const icon = <Icon type='loading' style={{fontSize:24}}/>
        const iconLoaing = <Icon type='loading'  style={{fontSize:24}}/>
        return (
            <div>
                <Card title='Spin用法' className='card-wrap'>
                    <Spin size='small'/>
                    <Spin style={{margin:'0 10px'}}/>
                    <Spin size='large'/>
                    <Spin indicator={icon}  spinning={true} style={{marginLeft: 10}}/>
                </Card>
                <Card title='内容遮罩' className='card-wrap'>
                    <Alert
                        message='React'
                        description='欢迎来到React高级课程实战'
                        type='info'
                    />
                     
                    <Spin>
                        <Alert
                        message='React'
                        description='欢迎来到React高级课程实战'
                        type='warning'
                    />
                    </Spin>
                    <Spin tip='加载中'>
                        <Alert
                        message='React'
                        description='欢迎来到React高级课程实战'
                        type='warning'
                    />
                    </Spin>
                    <Spin indicator={iconLoaing}>
                        <Alert
                        message='React'
                        description='欢迎来到React高级课程实战'
                        type='warning'
                    />
                    </Spin>
                </Card>
            </div>
        )
    }
}
