import Modal from 'react-modal';

import moment from 'moment';
import React from 'react';
import {
    connect
} from 'react-redux';
import {
    updateDateContext
} from '../../actioncreator';
import DayNavLeftprev from '../../containers/DayNavLeftPrev';
import DayNavRightNext from '../../containers/DayNavRightNext';

Modal.setAppElement(document.getElementById('root')); //for modal


let modaldate = "";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0',
        // backgroundColor       :  'rgba(52, 52, 52, 0.8)'

    }
};

let localStorageItem = new Array();

let editing_text;
let editing_date;
let delete_index_editing;














export default class Dates extends React.Component {


        //state

        constructor() {
            super();

            this.state = {
                modalIsOpen: false,
                EditingModalIsOpen: false,
                today: moment(),
                EditCurrentTask: false,
                invalidTask: false,
            };

            this.openModal = this.openModal.bind(this);
            //this.afterOpenModal = this.afterOpenModal.bind(this);
            this.closeModal = this.closeModal.bind(this);
        }


        // other functions

        months = moment.months();

        year = () => this.props.dateContext.format("Y");

        month = () => this.props.dateContext.format("MMMM");

        daysInMonth = () => this.props.dateContext.daysInMonth();

        currentDate = () => this.props.dateContext.get("date");

        currentDay = () => this.props.dateContext.format("D");

        firstDayOfMonth = () => {
            let dateContext = this.props.dateContext;
            let firstDay = moment(dateContext).startOf('month').format('d'); // Day of week 0...1..5...6
            return firstDay;
        }

        setInvalidTask = () => {
            this.setState({
                invalidTask: true
            });
        }

        unsetInvalidTask = () => {
            this.setState({
                invalidTask: false
            });
        }


        openModal() {
            this.setState({
                modalIsOpen: true
            });
        }

        openEditingModal = (event) => {
            event.stopPropagation();
            //console.log("hello 2nd modal")
            this.setState({
                EditingModalIsOpen: true
            });

            editing_date = event.target.getAttribute('value');
            delete_index_editing = event.target.getAttribute('index');
            //debugger;
            editing_text = event.target.textContent;

            //debugger;
        }

        // afterOpenModal() {
        //     this.subtitle.style.color = '#f00';
        // }

        closeModal() {
            this.clearTaskState();
            this.setState({
                modalIsOpen: false
            });
        }

        closeEditingModal = () => {
            //debugger;
            this.setState({
                EditCurrentTask: false
            });
            this.setState({
                EditingModalIsOpen: false
            });
            this.unsetInvalidTask();
        }



        //for modal

        getTasks = (modaldate) => {
            //debugger;
            let tasksRetrived = JSON.parse(localStorage.getItem(modaldate));
            return tasksRetrived;
        }

        clearTaskState = () => {
            this.setState({
                task: ""
            });
            this.setState({
                tasktime: ""
            });
        }


        addTasks = () => {

            console.log("in add tasks");
            localStorageItem = JSON.parse(localStorage.getItem(modaldate));
            // let k=modaldate;

            let taskToggleVariable;
            //debugger;

            if (localStorageItem == null) localStorageItem = [];

            console.log(localStorageItem);

            let taskFromState = this.state.task;
            let taskTimeFromState = this.state.tasktime;
            //console.log("task is",c);

            if (taskFromState == "" || taskFromState == undefined || !(/\S/.test(taskFromState))) {
                this.setInvalidTask();
                return;
            }
            this.unsetInvalidTask();
            if (taskTimeFromState == "" || taskTimeFromState == undefined) {
                localStorageItem.push(taskFromState);
                taskToggleVariable = taskFromState;
            } else {
                localStorageItem.push(taskFromState + "@" + taskTimeFromState);
                taskToggleVariable = taskFromState + "@" + taskTimeFromState;
            }

            localStorage.setItem(taskToggleVariable, "0");

            console.log(localStorageItem);
            localStorage.setItem(modaldate, JSON.stringify(localStorageItem));
            this.clearTaskState();
            this.openModal();
        }


        clearAllTask = () => {
            localStorageItem = null;
            localStorage.setItem(modaldate, JSON.stringify(localStorageItem));
            this.clearTaskState();
        }


        handleChange = (event) => {
            // debugger;
            this.setState({
                task: event.target.value
            });
            this.unsetInvalidTask();
        }


        onTimeChange = (event) => {
            //debugger;

            this.setState({
                tasktime: event.target.value
            });

        }


        onDayClick = (day) => {
            this.setState({
                selectedDay: day
            }, this.openModal);

            //this.openModal();
        }

        prevMonthForModal = () => {
            let dateContext = Object.assign({}, this.props.dateContext);
            dateContext = moment(dateContext).subtract(1, "month");
            this.props.updateDateContexts(dateContext);
            let endOfMonth = moment(dateContext).endOf('month').format("D");
            this.onDayClick(endOfMonth);
        }


        onModalPrevDate = () => {
            let startOfMonth = moment(this.props.dateContext).startOf('month').format("D");
            //debugger;
            this.closeModal();
            let d = this.state.selectedDay;
            if (d == startOfMonth) {
                this.prevMonthForModal();
                return;
            }
            //debugger;
            let dateContext = Object.assign({}, this.props.dateContext);
            //let j=this.props.dateContext;
            let c = moment(dateContext).set("date", d);
            let f = moment(c).subtract(1, "day");
            //this.props.updateDateContexts(c);
            let a = f.format("D");
            this.onDayClick(a);
        }

        nextMonthForModal = () => {
            let dateContext = Object.assign({}, this.props.dateContext);
            dateContext = moment(dateContext).add(1, "month");
            this.props.updateDateContexts(dateContext);
            let startOfMonth = moment(dateContext).startOf('month').format("D");
            this.onDayClick(startOfMonth);

        }

        onModalNextDate = () => {
            let endOfMonth = moment(this.props.dateContext).endOf('month').format("D");
            //debugger;
            this.closeModal();
            let d = this.state.selectedDay;

            if (d == endOfMonth) {
                this.nextMonthForModal();
                return;
            }
            //debugger;
            let dateContext = Object.assign({}, this.props.dateContext);
            //let j=this.props.dateContext;
            let c = moment(dateContext).set("date", d);
            let f = moment(c).add(1, "day");
            //this.props.updateDateContexts(c);
            let a = f.format("D");
            this.onDayClick(a);
        }



        deleteParticularTask = (index) => {


            let tasklistfordeletion = JSON.parse(localStorage.getItem(modaldate));
            //debugger;

            tasklistfordeletion.splice(index, 1);

            //debugger;
            localStorage.setItem(modaldate, JSON.stringify(tasklistfordeletion));

            this.clearTaskState();

            //debugger;

        }


        deleteParticularTaskEditingModal = (index) => {


            let tasklistfordeletion = JSON.parse(localStorage.getItem(editing_date));
            //debugger;

            tasklistfordeletion.splice(index, 1);

            //debugger;
            localStorage.setItem(editing_date, JSON.stringify(tasklistfordeletion));

            this.closeEditingModal();

            //this.clearTaskState();
            this.forceUpdate();

            //debugger;

        }






        makeList(udate) {

            let tasklist = this.getTasks(udate);

            if (tasklist == undefined) return;
            let key = 0;

            const taskListForFrontListing = tasklist.map((tasks, index) => {
                let taskcheck = localStorage.getItem(tasks);
                if (taskcheck == "1") {
                    return;
                }
                console.log(index);
                if (key >= 2) {
                    return null;
                }
                key++;
                //debugger;
                return (

                    <
                    li key = {
                        index
                    }
                    className = "reminder-list"
                    onClick = {
                        (event) => {
                            this.openEditingModal(event)
                        }
                    }
                    value = {
                        udate
                    }
                    index = {
                        index
                    }
                    data-toggle = "tooltip"
                    data-placement = "bottom"
                    title = "Edit Task" > {
                        tasks
                    } </li>
                );
            })



            return taskListForFrontListing;


        } //change here 3;


        EditCurrentTaskFn = () => {
            this.setState({
                EditCurrentTask: true,
            })

        }

        CloseEditCurrentTaskFn = () => {
            this.setState({
                EditCurrentTask: false,
            })

            this.clearTaskState();

        }


        replaceEditedTask = () => {

            //debugger;

            let tasksi = JSON.parse(localStorage.getItem(editing_date));

            //debugger;

            if (this.state.task == "" || this.state.task == undefined) {
                editing_text = tasksi[delete_index_editing];
                this.CloseEditCurrentTaskFn();
                return;
            }

            tasksi[delete_index_editing] = this.state.task;

            localStorage.setItem(editing_date, JSON.stringify(tasksi));

            modaldate = editing_date;

            editing_text = this.state.task;

            this.CloseEditCurrentTaskFn();

            //this.clearTaskState();

        }


        toggleStrike = (taski) => {

            //debugger;

            let check = localStorage.getItem(taski.tasks);

            if (check == "0") {
                localStorage.setItem(taski.tasks, "1");
            } else {
                localStorage.setItem(taski.tasks, "0");
            }

            this.forceUpdate();

        }


        toggleStrikek = (taski) => {

            //debugger;

            let check = localStorage.getItem(taski);

            if (check == "0") {
                localStorage.setItem(taski, "1");
            } else {
                localStorage.setItem(taski, "0")
            }

            this.closeEditingModal();

            this.forceUpdate();

        }





        // NextDay = (modaldate) => {

        //     modaldate = moment(modaldate).add(1, "d");
        // }



        render() {


            let day = this.state.selectedDay;
            let month = this.month();
            let year = this.year();

            modaldate = day + "/" + month + "/" + year;


            let tasklist = this.getTasks(modaldate);
            if (tasklist == null) tasklist = [];
            console.log("tasklist");
            //debugger;

            const tasklistk = tasklist.map((tasks, index) => {
                console.log(index);
                let classforTaskList;
                // debugger;
                let taskCheckingStrike = tasks;
                let strikecheck = localStorage.getItem(taskCheckingStrike);
                if (strikecheck == "0") {
                    classforTaskList = null;
                }
                if (strikecheck == "1") {
                    classforTaskList = "strike";
                }
                return ( <li key = {
                        index
                    }
                    className = "cell"> < span className = {
                        classforTaskList
                    } > {
                        tasks
                    } </span><i class="far fa-dot-circle done-undone change-cursor" data-toggle="tooltip" data-placement="bottom" title="Done/Undone" onClick={()=>{this.toggleStrike({tasks})} }></i><i onClick={()=>{this.deleteParticularTask(index)}} className="fa fa-minus button-del-modal change-cursor" data-toggle="tooltip " data-placement="bottom " title="Delete"></i>   </li>
                );
            }); //change here 2

            // this.onModalPrevDate();


            let blanks = [];
            for (let i = 0; i < this.firstDayOfMonth(); i++) {
                blanks.push( <td key = {i * 80}
                    className = "emptySlot" > {
                        ""
                    } </td>
                );
            }




            let daysInMonth = [];

            for (let d = 1; d <= this.daysInMonth(); d++) {
                let textClass = (d == this.currentDay() ? "text-blue" : "text");
                if (this.props.dateContext.format("YYYY-MM-DD") !== moment().format("YYYY-MM-DD")) textClass = "text";
                daysInMonth.push( <td key = {d}
                        onClick = {
                            (e) => this.onDayClick(d)
                        }
                        className = "td-calender"
                        data-toggle = "tooltip"
                        data-placement = "bottom"
                        title = "Click to add tasks" >
                        <span className = {
                            textClass
                        } > {
                            d
                        } </span> {
                        this.makeList(d + "/" + month + "/" + year)
                    } </td>
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
            return ( <tr key = {i} > {d} </tr>
            );
        })

        let classNameForEditingText;


        trElems.push( <Modal isOpen = {this.state.modalIsOpen} style = {customStyles} transparent = {true} >

                <h2 className = "modal-header" ref = {subtitle => this.subtitle = subtitle} >
                < DayNavLeftprev prevDate = {
                    this.onModalPrevDate
                }
                /> {modaldate} <i onClick={this.clearAllTask} className=" change-cursor fa fa-trash modal-common-button change-cursor" data-toggle="tooltip" data-placement="bottom" title="Delete all tasks"></i > < DayNavRightNext NextDay = {
                    this.onModalNextDate
                }
                /> <i onClick={this.closeModal} className="fa fa-times modal-common-button change-cursor" data-toggle="tooltip" data-placement="bottom" title="Close"></i > </h2>

                <div className = "modal-body" >
                <ul > {
                    tasklistk
                } </ul>

                <div class = "enter-task-section" >

                { /* <div>Enter Tasks</div> */ } 
                <input type = "text" className = "modal-text-box" placeholder = "Enter Tasks" value = {this.state.task} onChange = {this.handleChange}
                  maxlength = "50"
                 autoFocus />
                <span className = "time-section" >
                <i className = "fas fa-clock time-glyfi-style" > </i> 
                <input type = "time"
                className = "modal-text-box"
                defaultValue = ""
                value = {
                    this.state.tasktime
                }
                onChange = {
                    this.onTimeChange
                }
                id = "timeInput" />
                </span> </div > { /* <span className="tooltip"><i onClick={this.addTasks} className="fas fa-check modal-common-button"></i><span className="tooltiptext">Tooltip text</span></span> */ } </div>

                <div className = "modal-footer" >

                {this.state.invalidTask ? <span> Invalid Task </span> :null} 
                    <button type = "button"
                    class = "btn btn-primary save-style" > < i onClick = {
                        this.addTasks
                    }
                    className = "fas fa-check modal-common-button"
                    data-toggle = "tooltip"
                    data-placement = "bottom"
                    title = "Save Entered Task" > Save </i></button>
                    </div>

                    </Modal>
                );


                trElems.push( <Modal isOpen = {
                        this.state.EditingModalIsOpen
                    }
                    style = {
                        customStyles
                    }
                    transparent = {
                        true
                    } >
                    <div className = "modal-header Editing Editing-Modal-Upper" >

                    <div className = "modal-header-buttons" > {
                        this.state.EditCurrentTask ? null : <i className = "fas fa-check change-cursor task-done-button-modal"
                        onClick = {
                            () => {
                                this.toggleStrikek(editing_text)
                            }
                        }
                        data-toggle = "tooltip"
                        data-placement = "bottom"
                        title = "Task Done" > </i>} 
                        <i onClick = {this.deleteParticularTaskEditingModal}
                        className = "fa fa-trash modal-common-button editing-modal-trash change-cursor"
                        data-toggle = "tooltip"
                        data-placement = "bottom"
                        title = "Delete Task" > </i> 
                        <i onClick = {
                            this.closeEditingModal
                        }
                        className = "fa fa-times close-editing-modal change-cursor"
                        data-toggle = "tooltip"
                        data-placement = "bottom"
                        title = "Close" > </i>                  </div>

                        {
                            this.state.EditCurrentTask ? < input type = "text"
                            className = "modal-text-box Editing-task-input"
                            defaultValue = {
                                editing_text
                            }
                            onChange = {
                                this.handleChange
                            }
                            maxLength = "30"
                            autoFocus /> : <span className = "Editing-task" > {
                                    editing_text
                                } </span>}

                                </div>

                                <i className = "fas fa-pencil-alt Pencil-Editing-Modal change-cursor"
                            onClick = {
                                this.EditCurrentTaskFn
                            }
                            data-toggle = "tooltip"
                            data-placement = "bottom"
                            title = "Edit Task" > </i>

                            <div className = "modal-footer Editing" >
                            <div className = "Editing-Modal-Time-Section" >
                            <i className = "far fa-clock Editing-Clock-Style" > </i> 
                            <span className = "Editing-Clock-Text" > {
                                editing_date
                            } </span> 
                            </div> 
                            </div>



                            {
                                this.state.EditCurrentTask ? < button type = "button"
                                class = "btn btn-primary Editing-save-button"
                                onClick = {
                                    this.replaceEditedTask
                                }
                                data-toggle = "tooltip"
                                data-placement = "bottom"
                                title = "Save edited task" > Save </button> : null}




                                    </Modal>

                            );

                            return (trElems);


                        }


                    }