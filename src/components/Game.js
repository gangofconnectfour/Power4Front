import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import {sign_out} from "../actions/userActions";
import GameCell from "./Cell"
import SockJsClient from 'react-stomp';



class Game extends Component{
    constructor(props){
        super(props)
        this.hoverColumn = this.hoverColumn.bind(this)
        this.clickColumn = this.clickColumn.bind(this)
        this.onMessageReceive = this.onMessageReceive.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.conditionVictory = this.conditionVictory.bind(this)

        const board = Array(42)
        for(var i=0;i<board.length;i++) board[i]={pawn:0,highlighted:false}
        this.state = {board:[...board],highlightedCell:false,yourTurn:true}
    }


    leftHoz(board, row, column, pawnOwner, repeat){
        if(repeat > 6) return repeat
        if(column < 0) return repeat
        if(board[row*column].pawn !== pawnOwner || board[row*column].pawn === 0) return repeat
        return this.leftHoz(board, row, column-1, pawnOwner, repeat+1)
    }

    rightHoz(board, row, column, pawnOwner, repeat){
        if(repeat > 6) return repeat
        if(column > 6) return repeat
        if(board[row*column].pawn !== pawnOwner || board[row*column].pawn === 0) return repeat
        return this.rightHoz(board, row, column+1, pawnOwner, repeat+1)
    }

    diagonalLeftTop(board, row, column, pawnOwner, repeat){
        if(repeat > 6) return repeat
        if(column > 6 || row < 0) return repeat
        if(board[row*column].pawn !== pawnOwner || board[row*column].pawn === 0) return repeat
        return this.diagonalLeftTop(board, row-1, column+1, pawnOwner, repeat+1)
    }

    diagonalLeftBot(board, row, column, pawnOwner, repeat){
        if(repeat > 6) return repeat
        if(column < 0 || row > 5) return repeat
        if(board[row*column].pawn !== pawnOwner || board[row*column].pawn === 0) return repeat
        return this.diagonalLeftBot(board, row+1, column-1, pawnOwner, repeat+1)
    }

    diagonalRightTop(board, row, column, pawnOwner, repeat){
        if(repeat > 6) return repeat
        if(column < 0 || row > 5) return repeat
        if(board[row*column].pawn !== pawnOwner || board[row*column].pawn === 0) return repeat
        return this.diagonalRightTop(board, row+1, column-1, pawnOwner, repeat+1)
    }

    diagonalRightBot(board, row, column, pawnOwner, repeat){
        if(repeat > 6) return repeat
        if(column > 6 || row < 0) return repeat
        if(board[row*column].pawn !== pawnOwner || board[row*column].pawn === 0) return repeat
        console.log("diagrightbot",repeat);
        return this.diagonalRightBot(board, row-1, column+1, pawnOwner, repeat+1)
    }


    conditionVictory(board, row, column, pawnOwner){
        let currentStreak = 1
        console.log(board);
        const hoz = this.leftHoz(board, row, column, pawnOwner, 0) + this.rightHoz(board, row, column, pawnOwner, 0)
        const diagLeft = this.diagonalLeftTop(board, row, column, pawnOwner, 0) + this.diagonalLeftBot(board, row, column, pawnOwner, 0)
        const diagRight = this.diagonalRightTop(board, row, column, pawnOwner, 0) + this.diagonalRightBot(board, row, column, pawnOwner, 0)

        console.log(hoz, diagLeft, diagRight);
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
        if(!this.state.yourTurn) return
        const walkColumn = this.state.board.filter((cell,index) => index%7===column).reverse()
        const targetRow = walkColumn.findIndex(cell => {
            return cell.pawn === 0
        }) % 7
        if(targetRow === -1) return

        const targetCell = 35-targetRow*7+column
        const newBoard = [...this.state.board]
        newBoard[targetCell].pawn = 1
        if(this.state.highlightedCell)
            newBoard[this.state.highlightedCell].highlighted = false


        this.sendMessage(newBoard.map(n => n.pawn))
        this.conditionVictory(newBoard, targetRow, column, 1)
        this.setState({board:newBoard,highlightedColumn:false,highlightedCell:false,yourTurn:false})
    }

    onMessageReceive(response, topic) {
        const column = JSON.parse(response.body).hit

        const walkColumn = this.state.board.filter((cell,index) => index%7===column).reverse()
        const targetRow = walkColumn.findIndex(cell => {
            return cell.pawn === 0
        }) % 7
        if(targetRow === -1) return

        const targetCell = 35-targetRow*7+column
        const newBoard = [...this.state.board]
        newBoard[targetCell].pawn = 2
        if(this.state.highlightedCell)
            newBoard[this.state.highlightedCell].highlighted = false

        this.conditionVictory(newBoard, targetRow, column, 2)
        this.setState({board:newBoard,highlightedColumn:false,highlightedCell:false,yourTurn:true})

    }

    sendMessage (board) {
        try {
            this.clientRef.sendMessage("/app/hello", JSON.stringify(board));
            console.log("oui");
            return true;
        } catch(e) {
            console.log("fuck");
            return false;
        }
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
                <SockJsClient url='http://localhost:8090/rtc' topics={['/topic/greetings']}
                              onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
                              onConnect={ () => { console.log("connected"); this.setState({ clientConnected: true }) } }
                              onDisconnect={ () => { console.log("disconnected"); this.setState({ clientConnected: false }) } }
                              debug={ false }/>
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