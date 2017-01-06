import { connect } from 'react-redux'
import { InstructionsButton as InstructionsButtonComp } from '../Components/InstructionsButton'

const mapStateToProps = (state) => {
    return {
        onClick: state.instructions.show
    }
}

export const InstructionsButton = connect (mapStateToProps)(InstructionsButtonComp)