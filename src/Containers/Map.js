import { connect } from 'react-redux'
import MapComp from '../Components/Map'

const mapStateToProps = (state) => {
//    console.log (state.camera)
    return {
        heroPosition: state.hero.position,
        camera: state.camera
    }
}

const Map = connect (mapStateToProps)(MapComp)

export default Map