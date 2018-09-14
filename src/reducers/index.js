import moment from 'moment';

let initialstate= {dateContext:moment()};




export function DateContext (state=initialstate, action) {
    console.log(initialstate);
    debugger;
    switch (action.type) {
        case 'UPDATE_DATE_CONTEXT':
            return {dateContext:action.payload};
            break;
        default:
            return state;
            break;
    }
}