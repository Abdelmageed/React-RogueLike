import { connect } from 'react-redux'
import { StatsBar as StatsBarComp } from '../Components/StatsBar'

const mapStateToProps = (state) => {
    return {
        health: state.world.hero.health,
        maxHealth: state.world.hero.maxHealth,
        xpToNext: state.world.hero.xpToNext,
        xp: state.world.hero.xp,
        damage: state.world.hero.damage,
        level: state.world.hero.level
    }
}

export const StatsBar = connect (mapStateToProps)(StatsBarComp)