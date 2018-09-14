
import Modal from 'react-modal';

import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import {updateDateContext} from '../../actioncreator';
import DayNavLeftprev from '../../containers/DayNavLeftPrev';
import DayNavRightNext from '../../containers/DayNavRightNext';

//Modal.setAppElement(document.getElementById('adwaith')); //for modal


let modaldate="";

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
     // backgroundColor       :  'rgba(52, 52, 52, 0.8)'

    }
  };

let localStorageItem = new Array();

















export default class Dates extends  React.Component {


//state

    constructor() {
        super();

        this.state = {
        modalIsOpen: false,
        today: moment()
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


// other functions

    months = moment.months();  

    year = () =>this.props.dateContext.format("Y");

    month = () =>this.props.dateContext.format("MMMM");

    daysInMonth = () =>this.props.dateContext.daysInMonth();

    currentDate = () => this.props.dateContext.get("date");

    currentDay = () => this.props.dateContext.format("D");

    firstDayOfMonth = () => {
        let dateContext = this.props.dateContext;
        let firstDay = moment(dateContext).startOf('month').format('d'); // Day of week 0...1..5...6
        return firstDay;
    }


    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }



//for modal

    getTasks=(modaldate)=>{
        let tasksRetrived=JSON.parse(localStorage.getItem(modaldate) );
        return tasksRetrived;
    }

    clearTaskState=()=>{
        this.setState({task:""});
        this.setState({tasktime:""});
    }


    addTasks=()=>{

        console.log("in add tasks");
        localStorageItem=JSON.parse(localStorage.getItem(modaldate) );
        // let k=modaldate;
        debugger;

        if(localStorageItem==null)localStorageItem=[];

        console.log(localStorageItem);

        let taskFromState=this.state.task;
        let taskTimeFromState=this.state.tasktime;
        //console.log("task is",c);

        if(taskFromState==""||taskFromState==undefined)return;
        if(taskTimeFromState==""||taskTimeFromState==undefined){
            localStorageItem.push(taskFromState);
        }
        else localStorageItem.push(taskFromState+"@"+taskTimeFromState);

        console.log(localStorageItem);
        localStorage.setItem(modaldate,JSON.stringify(localStorageItem) );
        this.clearTaskState();
        this.openModal();
    }


    clearAllTask=()=>{
        localStorageItem=null;
        localStorage.setItem(modaldate,JSON.stringify(localStorageItem) );
        this.clearTaskState();
    }


    handleChange=(event)=>{
        debugger;
        this.setState({task: event.target.value});
    }


    onTimeChange=(event)=> {
    debugger;

    this.setState({tasktime: event.target.value});

    }


    onDayClick = (e, day) => {
        

        
        this.setState({
            selectedDay: day
        },this.openModal);

        //this.openModal();


    }



    deleteParticularTask(index){


        let tasklistfordeletion=JSON.parse(localStorage.getItem(modaldate) );
        debugger;

        tasklistfordeletion.splice(index,1);

        debugger;
        localStorage.setItem(modaldate,JSON.stringify(tasklistfordeletion) );

        this.clearTaskState();
        
        debugger;

    }



    makeList(udate){

        let tasklist=this.getTasks(udate);

        if(tasklist==undefined)return;
    
        const taskListForFrontListing=tasklist.map((tasks,index) => {
            console.log(index);
            if(index>1){return null;}
        return (

            <li key={index} className="reminder-list">{tasks}</li>
        );
        })

        return taskListForFrontListing;


    }

    // NextDay = (modaldate) => {

    //     modaldate = moment(modaldate).add(1, "d");
    // }



    render(){


            let day=this.state.selectedDay;
            let month=this.month();
            let year=this.year();

            modaldate=day+"/"+month+"/"+year;


            let tasklist=this.getTasks(modaldate);
            if(tasklist==null)tasklist=[];
            console.log("tasklist");
            debugger;

            const tasklistk=tasklist.map((tasks,index) => {
                console.log(index);
                return (
                    <li key={index} className="cell">{tasks}<i onClick={()=>{this.deleteParticularTask(index)}} className="fa fa-minus button-del-modal"></i>   </li>
                );
            });




                let blanks = [];
                for (let i = 0; i < this.firstDayOfMonth(); i++) {
                    blanks.push(<td key={i * 80} className="emptySlot">
                        {""}
                        </td>
                    );
                }




                let daysInMonth = [];

                for (let d = 1; d <= this.daysInMonth(); d++) {
                    let textClass= (d == this.currentDay() ? "text-blue": "text");
                    if(this.props.dateContext.format("YYYY-MM-DD")!==moment().format("YYYY-MM-DD"))textClass="text";
                    daysInMonth.push(
                        <td key={d} onClick={(e)=>this.onDayClick(e, d)} className="td-calender">
                            <span className={textClass}>{d}</span>
                            {this.makeList(d+"/"+month+"/"+year)}
                        </td>
                    );
                }

                var totalSlots = [...blanks, ...daysInMonth];
                let rows = [];
                let cells = [];

                totalSlots.forEach((row, i) => {
                    if ((i % 7) !== 0) {
                        cells.push(row);
                    } else {
                        let insertRow = cells.slice();
                        rows.push(insertRow);
                        cells = [];
                        cells.push(row);
                    }
                    if (i === totalSlots.length - 1) {
                        let insertRow = cells.slice();
                        rows.push(insertRow);
                    }
                });

                let trElems = rows.map((d, i) => {
                    return (
                        <tr key={i}>
                            {d}
                        </tr>
                    );
                })


                trElems.push(
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            style={customStyles}
                            transparent={true}
                        >

                            <h2 className="modal-header" ref={subtitle => this.subtitle = subtitle}>{modaldate} <i onClick={this.clearAllTask} className="fa fa-trash modal-common-button"></i>  <i onClick={this.closeModal} className="fa fa-times modal-common-button"></i>  </h2>
                            <ul>
                                {tasklistk}
                            </ul>
                            <div>Enter Tasks</div>
                            <input type="text" className="modal-text-box" value={this.state.task} onChange={this.handleChange}/>
                            <i className="fas fa-clock"></i>
                            <input type="time" className="modal-text-box" defaultValue="" value={this.state.tasktime} onChange={this.onTimeChange} id="timeInput" />
                            <i onClick={this.addTasks} className="fas fa-check modal-common-button"></i>
                            {/* <span className="tooltip"><i onClick={this.addTasks} className="fas fa-check modal-common-button"></i><span className="tooltiptext">Tooltip text</span></span> */}
                        </Modal>
                );

                return(trElems);


    }


}

































































