import React, { Component } from 'react';
import {Row ,Col } from "antd";
import axios from "axios"
import './index.less';
import util from "../../utils/utils";

export default class Header extends Component {
    state={
        userName:'',
        sysTime:null,
    }
    componentDidMount(){
        this.setState({
            userName:"河畔一角"
        })
        setInterval(()=>{
            let sysTime = util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000)
        this.getWeatherAPIData()
    }
    getWeatherAPIData=()=>{
      axios.get('/weather')
      .then(res=>{
          if(res.status === 200){
            let data = res.data.results[0].now
            this.setState({
                city: res.data.results[0].location.name,
                text: data.text,
                temperature: data.temperature
            })
          }
      })
    }
    render() {
        const menuType = this.props.menuType;
        return (
            <div className='header'>
                <Row className='header-top'>
                    { menuType?
                        <Col span={ 6} className='logo'>
                            <img src='\assets\logo-ant.svg' alt='' />
                            <span>IMooc 通用管理系统</span>
                        </Col>:''
                    }
                    <Col span={menuType?18:24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="/#">退出</a>
                    </Col>
                </Row>
                {
                    menuType? '':<Row className='breadcrumb'>
                    <Col span={4} className='breadcrumb-title' >
                        首页
                    </Col>
                    <Col span={20} className='weather'>
                        <span className='date'>{this.state.sysTime}</span>
                        <span className='city'>{this.state.city}</span>
                        <span className="weather-detail">
                            {this.state.text} {this.state.temperature}
                        </span>
                    </Col>
                </Row>
                }
               
            </div>
        )
    }
}
