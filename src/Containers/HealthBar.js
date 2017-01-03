import { connect } from 'react-redux'
import { HealthBar as HealthBarComp } from '../Components/HealthBar'

const mapStateToProps = (state) => {
    return {
        health: state.world.hero.health
    }
}

export const HealthBar = connect (mapStateToProps)(HealthBarComp)