import { connect } from 'react-redux'
import  HeroComp from '../Components/Hero.js'

const mapStateToProps = (state) => {
    return {
        position: state.position
    }
}
const Hero = connect (mapStateToProps)(HeroComp)

export default Hero