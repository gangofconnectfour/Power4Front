import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import {sign_out} from "../actions/userActions";
import GameCell from "./Cell"


class Game extends Component{
    constructor(props){
        super(props)
        this.hoverColumn = this.hoverColumn.bind(this)
        this.clickColumn = this.clickColumn.bind(this)

        const board = Array(42)
        for(var i=0;i<board.length;i++) board[i]={pawn:0,highlighted:false}
        this.state = {board:[...board],highlightedCell:false,yourTurn:true}
    }

    hoverColumn(column){
        if(column===this.state.highlightedCell%7)
            return

        const walkColumn = this.state.board.filter((cell,index) => index%7===column).reverse()
        const targetRow = walkColumn.findIndex(cell => {
            return (cell.pawn === 0 && !cell.highlighted)
        }) % 7
        if(targetRow === -1) return

        const targetCell = 35-targetRow*7+column
        const newBoard = [...this.state.board]

        newBoard[targetCell].highlighted = true
        if(this.state.highlightedCell)
            newBoard[this.state.highlightedCell].highlighted = false

        this.setState({board:newBoard,highlightedColumn:column,highlightedCell:targetCell})
    }

    clickColumn(column){
        const walkColumn = this.state.board.filter((cell,index) => index%7===column).reverse()
        const targetRow = walkColumn.findIndex(cell => {
            return cell.pawn === 0
        }) % 7
        if(targetRow === -1) return

        const targetCell = 35-targetRow*7+column
        const newBoard = [...this.state.board]
        newBoard[targetCell].pawn = this.state.yourTurn ? 1 : 2
        if(this.state.highlightedCell)
            newBoard[this.state.highlightedCell].highlighted = false

        this.setState({board:newBoard,highlightedColumn:false,highlightedCell:false,yourTurn:!this.state.yourTurn})
    }

    render(){
        return (
            <Fragment>
                <h4>Turn of : {this.state.yourTurn ? "Yellow" : "Red"}</h4>
                <div className={"board"}>
                {
                    this.state.board.map((cell,index) =>
                        <GameCell column={index%7} row={Math.floor(index/7)} pawn={cell.pawn} highlighted={cell.highlighted}
                                  hoverColumn={this.hoverColumn} clickColumn={this.clickColumn}
                                  key={index}  {...this.props}  />
                    )
                }
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state,ownProps) {
    return {
        // auth: state.app.auth,

    };
}
export default connect(mapStateToProps)(Game)