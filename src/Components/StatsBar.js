import React from 'react'
import { ProgressBar } from 'react-bootstrap'
export const StatsBar = (props) => {
    const containerStyle={ width: '15%', float:'left'}
    const progressStyle = {width:'90%', float:'right'}
    const healthRatio = props.health / props.maxHealth
    const healthBarColor = (healthRatio >= 0.5)? 'success' : (healthRatio >= 0.25)? 'warning' : 'danger'
    return (
        <div>
            <span id="healthBar" style={containerStyle}>
                <span style={{width:'10%', float:'left'}}>HP:</span>
                <ProgressBar  bsStyle={healthBarColor} style={progressStyle}label={`${props.health}/${props.maxHealth}`} now={healthRatio*100}></ProgressBar>
            </span>
            <span id="xpBar" style={containerStyle}>
            <span style={{width:'10%', float:'left'}}>XP:</span>
                <ProgressBar style={progressStyle}label={`lv.${props.level} ${props.xp}/${props.xpToNext}`} now={props.xp/props.xpToNext*100}></ProgressBar>
            </span>
            <span style={containerStyle}id="damage">Damage:{props.damage.min}-{props.damage.max}</span>
            <span style={containerStyle}id="weapon">Weapon:{props.weapon.name}</span>
                    <span style={containerStyle}id="dungeon">Dungeon:{props.dungeon}</span>

        </div>
    )
}