import {
    connect
}
from 'react-redux'
import {
    TileInfo as TileInfoComp
}
from '../Components/TileInfo'

const mapStateToProps = (state) => {
    return {
        info: state.world.hud.info
    }
}

export const TileInfo = connect(mapStateToProps)(TileInfoComp)
