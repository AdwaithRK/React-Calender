
import moment from 'moment';
import React from 'react';


export default class YearNav extends React.Component{


    year = () => {
        return this.props.dateContext.format("Y");
    }

    state = {
        showYearNav: true
    }

    showYearEditor = () => {
        this.setState({
            showYearNav: true
        });
    }

    setYear = (year) => {
        let dateContext = Object.assign({}, this.props.dateContext);
        dateContext = moment(dateContext).set("year", year);
        // this.setState({
        //     dateContext: dateContext
        // })
        this.props.updateDateContexts(dateContext);
    }
    onYearChange = (e) => {
        this.setYear(e.target.value);
        //this.props.onYearChange && this.props.onYearChange(e, e.target.value);
    }

    onKeyUpYear = (e) => {
        if (e.which === 13 || e.which === 27) {
            this.setYear(e.target.value);
            this.setState({
                showYearNav: false
            })
        }
    }

    YearNav = () => {
        return (
            this.state.showYearNav ?
            <input
                value = {this.year()}
                className="editor-year"
                ref={(yearInput) => { this.yearInput = yearInput}}
                onKeyUp= {(e) => this.onKeyUpYear(e)}
                onChange = {(e) => this.onYearChange(e)}
                type="number"
                placeholder="year"/>
            :
            <span
                className="label-year"
                onDoubleClick={(e)=> { this.showYearEditor()}}>
                {this.year()}
            </span>
        );
    }


    render(){
        let Nav=this.YearNav();
        return(Nav)
    }


}    