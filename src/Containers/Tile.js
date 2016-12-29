import { connect } from 'react-redux'
import TileComp from '../Components/Tile.js'

const mapStateToProps = (state) => {
    return {heroPosition: state.position}
}
const Tile = connect(mapStateToProps)(TileComp)

export default Tile