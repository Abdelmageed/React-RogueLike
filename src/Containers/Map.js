import { connect } from 'react-redux'
import MapComp  from '../Components/Map'

const mapStateToProps = (state) => {
    return {
        position: state.position
    }
}

const Map = connect (mapStateToProps)(MapComp)

export default Map