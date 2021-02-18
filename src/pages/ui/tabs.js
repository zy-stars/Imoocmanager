import React, { Component } from 'react'
import { Card, message,Tabs,Icon} from "antd"
import './ui.less'

const { TabPane } = Tabs;
export default class Tabss extends Component {
    newTabIndex=0;
    state={}
    handleCallback = (key) => {
        message.info('Hi,您选择了页签'+key)
    }
    onchange = (activeKey) => {
        this.setState({
            activeKey
        })
    }
    onEdit = (targetKey,action) =>{
        this[action](targetKey);
    }
    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title:activeKey , content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
      }
      remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.setState({ panes, activeKey });
      }
    componentWillMount(){
        const panes = [
            {
                title:'Tab 1',
                content: 'Tab 1',
                key:'1'
            },
            {
                title:'Tab 2',
                content: 'Tab 2',
                key:'2'
            },
            {
                title:'Tab 3',
                content: 'Tab 3',
                key:'3'
            }
        ];
        this.setState({
            panes,
            activeKey:panes[0].key
        })
    }
    render() {
        return (
            <div>
                <Card title='tabs页签' className='card-wrap'>
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab="Tab 1" key="1">欢迎学习react课程</TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>好好学习react课程</TabPane>
                        <TabPane tab="Tab 3" key="3">react是非常受欢迎的框架</TabPane>
                    </Tabs>
                </Card>
                <Card title='tabs带图的页签' className='card-wrap'>
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab={<span><Icon type='plus'/>Tab 1</span>} key="1">欢迎学习react课程</TabPane>
                        <TabPane tab={<span><Icon type='edit'/>Tab 2</span>} key="2">好好学习react课程</TabPane>
                        <TabPane tab={<span><Icon type='delete'/>Tab 3</span>} key="3">react是非常受欢迎的框架</TabPane>
                    </Tabs>
                </Card>
                <Card title='tabs动态生成的页签' className='card-wrap'>
                    <Tabs defaultActiveKey="1" 
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    onEdit={this.onEdit}
                    type='editable-card'
                    >
                        {
                            this.state.panes.map(value=>{
                                return <TabPane 
                                    tab={value.title}
                                    key={value.key}
                                >{value.content}</TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}
