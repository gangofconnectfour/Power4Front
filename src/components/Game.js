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
        this.leftHoz = this.leftHoz.bind(this)
        this.rightHoz = this.rightHoz.bind(this)
        this.diagonalLeftTop = this.diagonalLeftTop.bind(this)
        this.diagonalLeftBot = this.diagonalLeftBot.bind(this)
        this.diagonalRightTop = this.diagonalRightTop.bind(this)
        this.diagonalRightBot = this.diagonalRightBot.bind(this)

        const board = Array(42)
        for(var i=0;i<board.length;i++) board[i]={pawn:0,highlighted:false}
        this.state = {board:[...board],highlightedCell:false,yourTurn:true}
    }

    componentDidMount(){

    }

    leftHoz(board, row, column, pawnOwner){
        const targetCell = row*7+column
        // console.log(typeof row, typeof column);
        if(row<0 || column<0 || row>=6 || column >= 7) return 0
        console.log(`leftHoz: ${row}x7+${column} = ${targetCell}`, board[targetCell]);
        if(board[targetCell].pawn === pawnOwner)
            return this.rightHoz(board, row, column-1, pawnOwner) + 1
        return 0


    }

    rightHoz(board, row, column, pawnOwner){

        const targetCell = row*7+column
        // console.log(typeof row, typeof column);
        if(row<0 || column<0 || row>=6 || column >= 7) return 0
        console.log(`rightHoz: ${row}x7 + ${column} = ${targetCell}`,board[targetCell]);
        if(board[targetCell].pawn === pawnOwner)
            return this.rightHoz(board, row, column+1, pawnOwner) + 1
        return 0
    }

    diagonalLeftTop(board, row, column, pawnOwner){
        const targetCell = row*6+column
        if(row<0 || column<0 || !board[targetCell]) return 0
        console.log("diagonalLeftTop:", row, column, board[targetCell])
        if(board[targetCell].pawn === pawnOwner) return this.diagonalLeftTop(board, row-1, column+1, pawnOwner) + 1
        return 0
    }

    diagonalLeftBot(board, row, column, pawnOwner){
        const targetCell = row*6+column
        if(row<0 || column<0 || !board[targetCell]) return 0
        console.log("diagonalLeftBot:", row, column, board[targetCell])
        if(board[targetCell].pawn === pawnOwner) return this.diagonalLeftBot(board, row+1, column-1, pawnOwner) + 1
        return 0
    }

    diagonalRightTop(board, row, column, pawnOwner){
        const targetCell = row*6+column
        if(row<0 || column<0 || !board[targetCell]) return 0
        console.log("diagonalRightTop:", row, column, board[targetCell])
        if(board[targetCell].pawn === pawnOwner) return this.diagonalRightTop(board, row+1, column-1, pawnOwner) + 1
        return 0
    }

    diagonalRightBot(board, row, column, pawnOwner){
        const targetCell = row*6+column
        if(row<0 || column<0 || targetCell > 41 || !board[targetCell]) return 0
        console.log("diagonalRightBot:", row, column, board[targetCell])
        if(board[targetCell].pawn === pawnOwner) return this.diagonalRightBot(board, row-1, column+1, pawnOwner) + 1
        return 0
    }


    conditionVictory(board, targetCell, pawnOwner){
        let currentStreak = 1
        const [row, column] = [Math.floor(targetCell/7), targetCell%7]
        console.log(board, row, column, targetCell);
        const hoz = this.leftHoz(board, row, column-1, pawnOwner) + this.rightHoz(board, row, column+1, pawnOwner)
        // const diagLeft = this.diagonalLeftTop(board, row-1, column+1, pawnOwner) + this.diagonalLeftBot(board, row+1, column-1, pawnOwner)
        // const diagRight = this.diagonalRightTop(board, row+1, column-1, pawnOwner) + this.diagonalRightBot(board, row-1, column+1, pawnOwner)

        console.log(hoz);
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

    findFreeRow(column){
        const walkColumn = this.state.board.filter((cell,index) => index%7===column).reverse()
        return walkColumn.findIndex(cell => {
            return cell.pawn === 0
        }) % 7
    }

    clickColumn(column){
        if(!this.state.yourTurn) return
        let targetColumn = column
        let targetRow = this.findFreeRow(targetColumn)
        if(targetRow===-1) return

        const targetCell = 35-targetRow*7+targetColumn
        const newBoard = [...this.state.board]
        // newBoard[targetCell].pawn = this.state.yourTurn ? 1 : 2
        newBoard[targetCell].pawn = 1
        if(this.state.highlightedCell)
            newBoard[this.state.highlightedCell].highlighted = false


        this.sendMessage(newBoard.map(n => n.pawn))
        this.setState({board:newBoard,highlightedColumn:false,highlightedCell:false,yourTurn:false})
        // this.setState({board:newBoard,highlightedColumn:false,highlightedCell:false,yourTurn:!this.state.yourTurn})
        // this.conditionVictory(this.state.board, targetCell, this.state.board[targetCell].pawn)
    }

    onMessageReceive(response, topic) {
        let column = response.body.hit

        let targetRow = this.findFreeRow(column)
        if(targetRow===-1) {
            const availableColumn = []
            for (var i = 0; i < 7; i++) {
                const tryColumn = this.findFreeRow(i)
                if (tryColumn !== -1) availableColumn.push(i)
            }
            if(availableColumn.length===0) return
            column = availableColumn[Math.round(Math.random()*6)]
            targetRow = this.findFreeRow(column)
        }

        const targetCell = 35-targetRow*7+column
        const newBoard = [...this.state.board]
        newBoard[targetCell].pawn = 2
        if(this.state.highlightedCell)
            newBoard[this.state.highlightedCell].highlighted = false

        // this.conditionVictory(newBoard, targetRow, column, 2)
        this.setState({board:newBoard,highlightedColumn:false,highlightedCell:false,yourTurn:true})

    }

    sendMessage (board) {
        try {
            console.log("before send",board);
            this.clientRef.sendMessage("/app/hello", JSON.stringify({input: board}));
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
                <SockJsClient url='http://alexandre.lairan.fr/rtc' topics={['/topic/greetings']}
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