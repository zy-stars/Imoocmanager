import React, { Component } from 'react'
import { HashRouter, Route, Switch,Redirect} from "react-router-dom"
import App from "./App"
import Admin from "./admin"
import Home from './pages/home'
import Login from "./pages/login"
import Buttons from "./pages/ui/button"
import Modals from "./pages/ui/modals"
import Loadings from "./pages/ui/loadings"
import Messages from "./pages/ui/messages"
import Tabss from "./pages/ui/tabs"
import Gallerys from "./pages/ui/gallery"
import Carousels from "./pages/ui/carousel" 
import Notice from "./pages/ui/notice"
import FormLogin from "./pages/form/login"
import Register from "./pages/form/register"
import BasicTable from "./pages/table/basicTable"
import HeighTable from "./pages/table/heighTable"
import City from "./pages/city"
import Order from "./pages/order"
import Detail from "./pages/order/detail"
import NoMatch from "./pages/noMatch"
import User from './pages/user'
import BikeMap from './pages/map/bikeMap'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
import RichText from './pages/rich'
import Permission from './pages/permission'
import Common from "./common"

export default class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path='/login' component={Login}/>
                        <Route path='/common' render={()=>
                            <Common>
                                <Route path='/common/order/detail/:orderId' component={Detail} />    
                            </Common>
                        }/>
                        <Route path='/' render={()=>
                            <Admin>
                                <Switch>
                                    <Route path='/home' component={Home}/>                            
                                    <Route path='/ui/buttons' component={Buttons}/>                            
                                    <Route path='/ui/modals' component={Modals}/>                            
                                    <Route path='/ui/loadings' component={Loadings}/>                            
                                    <Route path='/ui/notification' component={Notice}/>                            
                                    <Route path='/ui/messages' component={Messages}/>                            
                                    <Route path='/ui/tabs' component={Tabss}/>                            
                                    <Route path='/ui/gallery' component={Gallerys}/>                            
                                    <Route path='/ui/carousel' component={Carousels}/>                            
                                    <Route path='/form/login' component={FormLogin}/>                            
                                    <Route path='/form/reg' component={Register}/>                            
                                    <Route path='/table/basic' component={BasicTable}/>                            
                                    <Route path='/table/heigh' component={HeighTable}/>                            
                                    <Route path='/city' component={City}/>                            
                                    <Route path='/order' component={Order}/>                            
                                    <Route path='/user' component={User}/>                            
                                    <Route path='/bikeMap' component={BikeMap}/>                            
                                    <Route path='/charts/bar' component={Bar}/>                            
                                    <Route path='/charts/pie' component={Pie}/>                            
                                    <Route path='/charts/line' component={Line}/>                            
                                    <Route path='/rich' component={RichText}/>                            
                                    <Route path='/permission' component={Permission}/>                            
                                    <Redirect to='/home'/>
                                    <Route component={NoMatch}/>
                                </Switch>                           
                            </Admin>
                        }/>
                      
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}
