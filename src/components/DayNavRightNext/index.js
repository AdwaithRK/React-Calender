import React from 'react';
import moment from 'moment';

export default class DayNavRightNext extends React.Component{


 
    //    NextDay = (modaldate) => {

    //         modaldate = moment(modaldate).add(1, "d");
    //     }
        render(){

                return (

                <div>

                <i className="prev fa fa-fw fa-chevron-right change-cursor" onClick={(e)=> {this.NextDay()}} >
                </i>

                </div>
                )

        }


}