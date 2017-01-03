import { connect } from 'react-redux'
import { HUD as HUDComp } from '../Components/HUD'

const mapStateToProps = (state) => {
    return {
        height: state.camera.top
    }
}

export const HUD = connect (mapStateToProps)(HUDComp)