import React from 'react'
export const StatsBar = (props) => {
    return (
        <div>
            <span id="healthBar">HP:{props.health}/{props.maxHealth}</span>
            <span id="xpBar">XP:{props.xp}/{props.xpToNext}</span>
            <span id="damage">Damage:{props.damage.min}-{props.damage.max}</span>
            <span id="level">Level:{props.level}</span>
        </div>
    )
}