

import moment from 'moment';
import React from 'react';

export default class MonthNav extends React.Component{

       state = {
        showMonthPopup: false,
    }

    months = moment.months();

    month = () => {
        return this.props.dateContext.format("MMMM");
    }


    setMonth = (month) => {
        let monthNo = this.months.indexOf(month);
        let dateContext = Object.assign({}, this.props.dateContext);
        dateContext = moment(dateContext).set("month", monthNo);
        this.props.updateDateContexts(dateContext);
    }


    onSelectChange = (e, data) => {
        this.setMonth(data);
    }
    SelectList = (props) => {
        let popup = props.data.map((data) => {
            return (
                <div key={data}>
                    <a href="#" onClick={(e)=> {this.onSelectChange(e, data)}} >
                        {data}
                    </a>
                </div>
            );
        });

        return (
            <div className="month-popup" >
                {popup}
            </div>
        );
    }

    onChangeMonth = (e, month) => {
        this.setState({
            showMonthPopup: !this.state.showMonthPopup
        });
    }

        MonthNav = () => {
                return (
                    <span className="label-month"
                        onClick={(e)=> {this.onChangeMonth(e, this.month())}} data-toggle="tooltip" data-placement="bottom" title="Click to change month">
                        {this.month()}
                        {this.state.showMonthPopup &&
                        <this.SelectList data={this.months} />
                        }
                    </span>
                );
        }

    render(){

        let nav=this.MonthNav();


        return(nav);
    }


}