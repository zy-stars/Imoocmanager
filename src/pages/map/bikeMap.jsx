import React, { Component } from 'react';
import { Card,Form } from "antd";
import BaseForm from './../../components/BaseForm'
import axios from './../../axios';

export default class BikeMap extends Component {
    state={}
    map ={}
    formList=[{
        type:'城市'
    },{
        type:'时间查询'
    },{
        type:'SELECT',
        label:'订单状态',
        field:'order_status',
        placeholder:'全部',
        initialValue:'0',
        list:[{id:'0',name:'全部'},{id:'1',name:'进行中'},{id:'2',name:'结束'}]
    }
    ] 
    requestList=()=>{
        axios.ajax({
            url:'/map/bike_list',
            data:{
                params:this.params
            }
        }).then(res=>{
            if(res.code === 0){
                this.setState({
                    total_count:res.result.total_count
                })
                this.renderMap(res);
            }

        })
    }
    //查询表单
    handleFilterSubmit = (filterParams)=>{
        this.params = filterParams;
        this.requestList()
    }
   //渲染地图数据
   renderMap = (res)=>{
        let list =res.result.route_list;//路线
        this.map =  new window.BMapGL.Map("container");
        let gps1 = list[0].split(',');//经纬度组成的数组
        let startPoint = new window.BMapGL.Point(gps1[0],gps1[1]);
        let gps2 = list[list.length-1].split(',')
        let endPoint = new window.BMapGL.Point(gps2[0],gps2[1]);
        this.map.centerAndZoom(endPoint, 11);  // 初始化地图,设置中心点坐标和地图级别
        //添加起始图标
        let startPointIcon = new window.BMapGL.Icon("/assets/start_point.png", new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        });
        
        var bikeMarkerStart = new window.BMapGL.Marker(startPoint, { icon: startPointIcon });
        this.map.addOverlay(bikeMarkerStart);

        let endPointIcon = new window.BMapGL.Icon("/assets/end_point.png", new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)//偏移量
        });
        var bikeMarkerEnd = new window.BMapGL.Marker(endPoint, { icon: endPointIcon });
        this.map.addOverlay(bikeMarkerEnd);//通过addOverlay添加
        //绘制车辆行驶路线
        let routeList = [];
        list.forEach((item)=>{
            let p = item.split(",");
            let point = new window.BMapGL.Point(p[0], p[1]);
            routeList.push(point);
        })
       let polyLine = new window.BMapGL.Polyline(routeList, {
            strokeColor: "#ef4136",
            strokeWeight: 2,
            strokeOpacity: 1
        });
        this.map.addOverlay(polyLine);
        // 服务区路线
        let serviceList = res.result.service_list;
        let servicePointist = [];
        serviceList.forEach((item) => {
            servicePointist.push(new window.BMapGL.Point(item.lon, item.lat));
        })
        
        let polyServiceLine = new window.BMapGL.Polyline(servicePointist, {
            strokeColor: "#ef4136",
            strokeWeight: 2,
            strokeOpacity: 1
        });
        this.map.addOverlay(polyServiceLine);
        // 添加地图中的自行车
        let bikeList = res.result.bike_list;
        let bikeIcon = new window.BMapGL.Icon("/assets/bike.jpg", new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        });
        bikeList.forEach((item) => {
            let p = item.split(",");
            let point = new window.BMapGL.Point(p[0], p[1]);
            let bikeMarker = new window.BMapGL.Marker(point, { icon: bikeIcon });
            this.map.addOverlay(bikeMarker);
        })
    }
   componentDidMount(){
       this.requestList();
   }
    render() {
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <div>共{this.state.total_count}辆车</div>
                    <div id="container" style={{height:500}}>

                    </div>
                </Card>
            </div>
        )
    }
}
