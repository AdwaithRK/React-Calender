import React from 'react';
import moment from 'moment';

export default class ButtonMonthNavLeft extends React.Component{


        prevMonth = () => {
            let dateContext = Object.assign({}, this.props.dateContext);
            dateContext = moment(dateContext).subtract(1, "month");
            this.props.updateDateContexts(dateContext);
        }

        render(){

                return (

                <div>

                <i className="prev fa fa-fw fa-chevron-left month-nav-left-bar change-cursor" onClick={(e)=> {this.prevMonth()}} >
                </i>

                </div>
                )

        }


}