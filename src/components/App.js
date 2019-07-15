import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'
import Root from "./Root";
import PropTypes from 'prop-types'
import Topbar from "./Topbar";


const App = ({children}) => {
    return (
        <Fragment>
            <Topbar/>
            <div className={"grid-container main"}>

                {children}
            </div>
        </Fragment>

    )
}

/*
App.propTypes = {
    children: PropTypes.object.isRequired
}
*/

export default App