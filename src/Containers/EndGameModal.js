import { connect } from 'react-redux'
import { EndGameModal as EndGameModalComp } from '../Components/EndGameModal'
import { hideEndGameModal } from '../Actions'
const mapStateToProps = (state) => {
    return {
        show: state.world.showEndGameModal,
        win: state.world.win
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hide: ()=>{
            dispatch (hideEndGameModal())
        }
    }
}

export const EndGameModal = connect (mapStateToProps,mapDispatchToProps)(EndGameModalComp)