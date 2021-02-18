import React, { Component } from 'react'
import { Card } from 'antd';
import axios from './../../axios/index';
import './detail.less'

export default class Detail extends Component {
    state = {}
    componentDidMount(){
        let orderId = this.props.match.params.orderId;
        if( orderId){
            this.getDetailInfo(orderId);;
        }
    }
    getDetailInfo = (orderId)=>{
        axios.ajax({
            url:'order/detail',
            data:{
                params:{
                    page:orderId
                }
            }
        }).then(res=>{
            if(res.code===0){
                this.setState({
                    orderInfo:res.result
                });
                this.renderMap(res.result);
            }
        })

    }
    renderMap = (result )=>{
        this.map = new window.BMapGL.Map("orderDetailMap");
         // 初始化地图,设置中心点坐标和地图级别 一般为终点
        this.addMapControl();//添加地图控件
        this.drawBikeRoute(result.position_list);//绘制路线图
        this.drawServiceArea(result.area);//绘制服务区
    }   
    //添加地图控件
    addMapControl = () => {
        let map = this.map;
        map.addControl(new window.BMapGL.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}));// 添加比例尺控件
        map.addControl(new window.BMapGL.ZoomControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}));// 添加缩放控件
    } 
    // 绘制路线图
    drawBikeRoute = (positionList)=> {
        let map = this.map;
        let startPoint = '';//起点
        let endPoint = '';//终点 
        if(positionList.length>0){
            let first = positionList[0];
            let last = positionList[positionList.length-1];
            startPoint=new window.BMapGL.Point(first.lon,first.lat);//初始坐标
            let startIcon= new window.BMapGL.Icon('/assets/start_point.png',new window.BMapGL.Size(36,42),{
                imageSize:new window.BMapGL.Size(36,42),
                anchor:new window.BMapGL.Size(36,42)
            });//自定义图标
            let startMarker = new window.BMapGL.Marker(startPoint,{icon:startIcon})
            map.addOverlay(startMarker);

            endPoint=new window.BMapGL.Point(last.lon,last.lat);//初始坐标
            let endIcon= new window.BMapGL.Icon('/assets/end_point.png',new window.BMapGL.Size(36,42),{
                imageSize:new window.BMapGL.Size(36,42),
                anchor:new window.BMapGL.Size(36,42)
            });//自定义图标
            let endMarker = new window.BMapGL.Marker(endPoint,{icon:endIcon})
            map.addOverlay(endMarker);

            //连接路线图
            let tarckPoint = [];
            for(let i =0;i<positionList.length;i++){
                let point = positionList[i];
                tarckPoint.push(new window.BMapGL.Point(point.lon,point.lat))//添加做标
            }
            let polyline = new window.BMapGL.Polyline(tarckPoint,{
                strokeColor: "#1869AD",
                strokWight:3,
                strokOpacity:1
            })
            map.addOverlay(polyline);
            map.centerAndZoom(endPoint, 11);
        }       
    }
    drawServiceArea = (positionList)=>{
        //连接路线图
        let trackPoint = [];
        for (let i = 0;i<positionList.length;i++){
            let point = positionList[i];
            trackPoint.push(new window.BMapGL.Point(point.lon,point.lat))//添加做标
        }
        //绘制服务区
        let polgon = new window.BMapGL.Polygon(trackPoint,{
            strokeColor:'#ce0000',
            strokWight:4,
            strokOpacity:1,
            fillColor: "#ff8605",
            fillOpacity: 0.4
        })
        this.map.addOverlay(polgon);
    }
    render(){
        const info = this.state.orderInfo || {}
        return (
            <div>
                <Card>
                    <div id="orderDetailMap" className='order-map' ></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <div className="detail-form">
                            <ul>
                                <li>
                                    <div className="detail-from-left">用车模式</div>
                                    <div className="detail-from-content">{info.mode===1?'服务区':'停车点'}</div>
                                </li>
                                <li>
                                    <div className="detail-from-left">订单编号</div>
                                    <div className="detail-from-content">{info.bike_sn}</div>
                                </li>
                                <li>
                                    <div className="detail-from-left">用户姓名</div>
                                    <div className="detail-from-content">{info.user_name}</div>
                                </li>
                                <li>
                                    <div className="detail-from-left">手机号码</div>
                                    <div className="detail-from-content">{info.moble}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div id="orderDetailMap"></div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <div className="detail-form">
                            <ul>
                                <li>
                                    <div className="detail-from-left">行程起点</div>
                                    <div className="detail-from-content">{info.start_location}</div>
                                </li>
                                <li>
                                    <div className="detail-from-left">行程终点</div>
                                    <div className="detail-from-content">{info.end_location}</div>
                                </li>
                                <li>
                                    <div className="detail-from-left">行程里程</div>
                                    <div className="detail-from-content">{info.distance}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}