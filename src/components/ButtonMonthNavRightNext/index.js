import React from 'react';
import moment from 'moment';

export default class ButtonMonthNavRight extends React.Component{

        nextMonth = () => {
            let dateContext = Object.assign({}, this.props.dateContext);
            dateContext = moment(dateContext).add(1, "month");
            this.props.updateDateContexts(dateContext);
            
        }


        render(){

                return (

                <div>

                <i className="prev fa fa-fw fa-chevron-right change-cursor" onClick={(e)=> {this.nextMonth()}} data-toggle="tooltip" data-placement="bottom" title="Go To Next Month">
                </i>
                </div>
                )

        }


}