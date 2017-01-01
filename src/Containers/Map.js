import { connect } from 'react-redux'
import MapComp from '../Components/Map'

const mapStateToProps = (state) => {
//    console.log (state.camera)
    return {
        heroPosition: state.world.hero.position,
        camera: state.camera,
        map: state.world.levels[state.world.activeLevel]
    }
}

const Map = connect (mapStateToProps)(MapComp)

export default Map