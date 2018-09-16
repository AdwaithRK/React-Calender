import React from 'react';
import moment from 'moment';

export default class DayNavLeftPrev extends React.Component{


        // prevDay = () => {
        //     let dateContext = Object.assign({}, this.props.dateContext);
        //     dateContext = moment(dateContext).subtract(1, "d");
        //     this.props.updateDateContexts(dateContext);
        // }

        render(){

                return (

                <div>

                <i className="prev fa fa-fw fa-chevron-left month-nav-left-bar change-cursor" onClick={(e)=> {this.props.prevDate()}} data-toggle="tooltip" data-placement="bottom" title="Previous day">
                </i>

                </div>
                )

        }


}


// onModalPrevDate=()=>{
//         debugger;
//        c=moment(this.props.dateContext).subtract(1,"day");
//        this.props.updateDateContext(c);
//        a=c.format("D");
//        onDayClick(a)


//    }