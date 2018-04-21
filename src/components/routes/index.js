import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../../containers/Home'
import Login from '../../containers/login/'
import Signup from '../../containers/signup/'
import Confirm from '../../containers/confirm/'
import ChangePassword from '../../containers/ChangePassword'
import NotFound from '../../containers/NotFound'
import ToolCostSummaryByPlant from '../../containers/ToolCostSummaryByPlant'
import Wait from '../../containers/Wait'
import AppliedRoute from '../../components/AppliedRoute'
import ScriptCheck from '../../containers/ScriptCheck'
import ErrorModal from '../../containers/modal/error'
import InfoModal from '../../containers/modal/info'
//Use fragments (React v16.2+ only!) https://stackoverflow.com/questions/31284169/parse-error-adjacent-jsx-elements-must-be-wrapped-in-an-enclosing-tag
const Routes = props => (
<Switch>
  {props.authenticated ?
    [

       <Route exact path="/error"  exact component={Login}/>,
        <Route path="/" component={ErrorModal}/>,
        <Route component={NotFound} />
        ]
:
[
        <Route path="/info" component={InfoModal}/>,
        <Route path="/error" component={ErrorModal}/>,
        <Route path="/signup" component={Signup}/>,
        <Route path="/confirm" component={Confirm}/>,
        <Route path="/" component={Login}/>
    ]
      }
  </Switch>

  )

  export default Routes

  /*

const Routes = props => (
  <Switch>
       <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/topics" component={Topics}/>

    <AppliedRoute path='/' exact
      component={ Login }/>
    <AppliedRoute path='/wait' exact component={Wait} />
    <AppliedRoute path='/scriptCheck' exact component={ScriptCheck}  />
    <AppliedRoute path='/error' exact component={ErrorModal} />
   <AppliedRoute path='/home' exact component={Home} />
    <AppliedRoute path='/login' exact component={Login} />
    <AppliedRoute path='/signup' exact component={Signup} />
    <AppliedRoute path='/confirm' exact component={Confirm} />
    <AppliedRoute path='/changePassword' exact component={ChangePassword} />
    <AppliedRoute path='/tcsbyplant' exact component={ToolCostSummaryByPlant} />
    <Route component={NotFound} />
  </Switch>
  )

  */