
import { connect } from 'react-redux';
import Dates from '../components/date';
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
)(Dates);