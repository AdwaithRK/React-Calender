import React from 'react';
import moment from 'moment';
import './calender.css';
import Weekdays from '../../containers/weekdays.js';
import Date from '../../containers/date.js';
import MonthNav from '../../containers/monthnav.js';
import YearNav from '../../containers/yearnav';
import { connect } from 'react-redux';
import {updateDateContext} from '../../actioncreator';
import ButtonMonthNavLeft from '../../containers/ButtonMonthNavLeftPrev';
import ButtonMonthNavRight from '../../containers/ButtonMonthNavRightNext'
import ScrollArea from 'react-scrollbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import googleCalender from '../../images/googleCalender.png';


const imgstyles ={
    content:{
        width: '40px',
}

}




export default class Calendar extends React.Component {

        componentDidMount = () => {
            window.addEventListener('wheel', this.handleOnScroll);
        }

        nextMonth = () => {
            let dateContext = Object.assign({}, this.props.dateContext);
            dateContext = moment(dateContext).add(1, "month");
            this.props.updateDateContexts(dateContext); 
        }

        prevMonth = () => {
            let dateContext = Object.assign({}, this.props.dateContext);
            dateContext = moment(dateContext).subtract(1, "month");
            this.props.updateDateContexts(dateContext);
        }

        handleOnScroll=(e)=> {
            if (e.deltaY < 0) {
            console.log('scrolling up');
            this.prevMonth();
            }
            if (e.deltaY > 0) {
                this.nextMonth();
            console.log('scrolling down');
            }
        }

     

    render() {

        return (
            <div id="scrollplease">
                

              
                <table className="table tablesize ">
                    <thead>
                        <tr >
                         <td colSpan="2">                        
                              <ButtonMonthNavLeft />
                          </td>
                          <td colSpan="1">                        
                             <img  src={googleCalender} style={imgstyles.content}/>
                          </td>
                          <td colSpan="3">
                              <MonthNav data-toggle="tooltip" data-placement="bottom" title="Go To This Month"/>
                          </td>
                          <td>
                          {/* <i className="fas fa-home change-cursor" onClick={()=>{this.props.updateDateContexts(moment())}}>Today</i> */}
                          <button type="button" class="btn calender-today-button change-cursor" data-toggle="tooltip" data-placement="bottom" title="Go To Current date" onClick={()=>{this.props.updateDateContexts(moment())}}>TODAY</button>
                          </td>
                          <td colSpan="2">                        
                              <YearNav />
                          </td>

                          <td colSpan="2">                        
                              <ButtonMonthNavRight />
                          </td>
                        </tr>
                    </thead>
                </table>
                <table className="table table-bordered tablesize">
                    <tbody >
                        <tr>
                            <Weekdays/>
                        </tr>
                           <Date />
                    </tbody>
                </table>

            </div>
        );
    }


    componentWillUnmount = () => {
        window.addEventListener('wheel', this.handleOnScroll);
    }
}





