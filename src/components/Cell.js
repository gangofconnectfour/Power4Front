import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import {sign_out} from "../actions/userActions";
import {Cell, Grid} from "react-foundation";

export default class GameCell extends Component{
    constructor(props){
        super(props)
        this.hover = this.hover.bind(this)
        this.click = this.click.bind(this)
    }

    hover(event){
        this.props.hoverColumn(this.props.column)
    }

    click(event){
        event.preventDefault()
        this.props.clickColumn(this.props.column)
    }

    render(){
        const {pawn,highlighted,yourTurn} = this.props
        return (
            <Grid className={"board-cell"} onMouseEnter={this.hover} onClick={this.click}>
                <Cell className={`pawn ${pawn === 1 ? "yellow" : pawn===2 ? "red" : ""} ${highlighted ? "highlighted" : ""}`}>

                </Cell>
            </Grid>
        )
    }
}

