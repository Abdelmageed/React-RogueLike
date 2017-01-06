import { connect } from 'react-redux'
import { HUD as HUDComp } from '../Components/HUD'

const mapStateToProps = (state) => {
    return {
        camera: state.camera,
        showInstructions: state.instructions.isShown,
        hideInstructions: state.instructions.hide
    }
}

export const HUD = connect (mapStateToProps)(HUDComp)