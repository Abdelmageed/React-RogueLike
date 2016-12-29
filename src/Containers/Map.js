import { connect } from 'react-redux'
import MapComp from '../Components/Map'

const mapStateToProps = (state) => {
    return {
        heroPosition: state.position,
        camera: state.camera
    }
}

const Map = connect (mapStateToProps)(MapComp)

export default Map