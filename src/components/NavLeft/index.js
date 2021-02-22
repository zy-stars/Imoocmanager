import React, { Component } from 'react';
import { Menu } from 'antd';
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux';
import { switchMenu} from "./../../redux/action"
import MenuConfig from "./../../config/menuConfig";
import './index.less'

const { SubMenu } = Menu;
class NavLeft extends Component {
    state = {
        menuTreeNode:[],
        currentKey:[]
    }
    handleClick = (item)=>{
        const { dispatch } = this.props;
        let item1 = item.item.props.children.props.children
        dispatch(switchMenu(item1));//触发reducer
        this.setState({
            currentKey:item.key
        })
    }
    componentDidMount(){
        const menuTreeNode = this.renderMenu(MenuConfig);
        let currentKey = window.location.hash.replace(/#|\?.*$/g,'')
        this.setState({
            menuTreeNode,
            currentKey
        })
    }
    //菜单渲染
    renderMenu = (data) => {
        return data.map((item)=>{
            if(item.children) {
               return (
                   <SubMenu title={item.title} key={item.key}>
                       { this.renderMenu(item.children)}
                   </SubMenu>
               )
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
                </Menu.Item>
        })
    }
    render() {
        return (
            <div>
                <div className="logo">
                    <img src='/assets/logo-ant.svg' alt="/"></img>
                    <h1>Imooc MS</h1>
                </div>
                <Menu theme='dark'
                    onClick={this.handleClick}
                    selectedKeys={this.state.currentKey}
                >
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        )                                                                                                                                                                                                                          
    }
}
export default connect()(NavLeft);
