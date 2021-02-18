import React, { Component } from 'react'
import { HashRouter, Route, Switch} from "react-router-dom"
import App from "./App"
import Admin from "./admin"
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
import Common from "./common"

export default class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path='/login' component={Login}/>
                    <Route path='/admin' render={()=>
                        <Admin>
                            <Switch>
                                <Route path='/admin/ui/buttons' component={Buttons}/>                            
                                <Route path='/admin/ui/modals' component={Modals}/>                            
                                <Route path='/admin/ui/loadings' component={Loadings}/>                            
                                <Route path='/admin/ui/notification' component={Notice}/>                            
                                <Route path='/admin/ui/messages' component={Messages}/>                            
                                <Route path='/admin/ui/tabs' component={Tabss}/>                            
                                <Route path='/admin/ui/gallery' component={Gallerys}/>                            
                                <Route path='/admin/ui/carousel' component={Carousels}/>                            
                                <Route path='/admin/form/login' component={FormLogin}/>                            
                                <Route path='/admin/form/reg' component={Register}/>                            
                                <Route path='/admin/table/basic' component={BasicTable}/>                            
                                <Route path='/admin/table/heigh' component={HeighTable}/>                            
                                <Route path='/admin/city' component={City}/>                            
                                <Route path='/admin/order' component={Order}/>                            
                                <Route path='/admin/user' component={User}/>                            
                                <Route path='/admin/bikeMap' component={BikeMap}/>                            
                                <Route path='/admin/charts/bar' component={Bar}/>                            
                                <Route path='/admin/charts/pie' component={Pie}/>                            
                                <Route path='/admin/charts/line' component={Line}/>                            
                                <Route component={NoMatch}/>
                            </Switch>                           
                        </Admin>
                    }/>
                    <Route path='/common' render={()=>
                        <Common>
                            <Route path='/common/order/detail/:orderId' component={Detail} />    
                        </Common>
                    }/>
                    
                </App>
            </HashRouter>
        )
    }
}
