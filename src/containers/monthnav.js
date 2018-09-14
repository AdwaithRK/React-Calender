
import { connect } from 'react-redux';
import MonthNav from '../components/monthNav';
import {updateDateContext} from '../actioncreator';

const mapStateToProps=state=>{
    return{
    dateContext: state.dateContext,
    }
}


const mapDispatchToProps=dispatch=>{
    return{
        updateDateContexts: (dateContext) => dispatch(updateDateContext(dateContext)),
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MonthNav);