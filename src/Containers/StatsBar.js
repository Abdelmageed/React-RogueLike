import { connect } from 'react-redux'
import { StatsBar as StatsBarComp } from '../Components/StatsBar'

const mapStateToProps = (state) => {
    return {
        health: state.world.hero.health,
        maxHealth: state.world.hero.maxHealth,
        xpToNext: state.world.hero.xpToNext,
        xp: state.world.hero.xp,
        damage: state.world.hero.weaponDamage,
        level: state.world.hero.level,
        weapon: state.world.hero.weapon
    }
}

export const StatsBar = connect (mapStateToProps)(StatsBarComp)