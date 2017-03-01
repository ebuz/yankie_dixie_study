import { connect } from 'react-redux';
import MicSetup from '../components/MicSetup';
import { getAudioContext, getMic } from '../actions';


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setupMic: () => {
            dispatch(getAudioContext());
            dispatch(getMic());
        }
    }
};

export default connect(null, mapDispatchToProps)(MicSetup);
