import { connect } from 'react-redux';
import Calender  from '../components/calender';
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
)(Calender);