
import moment from 'moment';
import React from 'react';

export default class Weekdays extends React.Component {

        weekdaysShort = moment.weekdaysShort();

        render(){

             let classForWeekDay;

             console.log("weekday:",moment().format("ddd"));

             



             let weekdays = this.weekdaysShort.map((day) => {

                    if(moment().format("ddd")==day){
                        classForWeekDay="today week-day"
                    }
                    else{
                        classForWeekDay="week-day"
                    }

                    if(this.props.dateContext.format("YYYY-MM-DD")!==moment().format("YYYY-MM-DD"))classForWeekDay="week-day";

                    return (
                        <td key={day} className={classForWeekDay}>{day}</td>
                    )

                    });

            return(
                weekdays
            );    
        }

}