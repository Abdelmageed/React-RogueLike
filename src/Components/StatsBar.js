import React from 'react'
export const StatsBar = (props) => {
    const style={margin:'5% 5% 0 0'}
    return (
        <div>
            <span style={style}id="healthBar">HP:{props.health}/{props.maxHealth}</span>
            <span style={style}id="xpBar">XP:{props.xp}/{props.xpToNext}</span>
            <span style={style}id="damage">Damage:{props.damage.min}-{props.damage.max}</span>
            <span style={style}id="level">Level:{props.level}</span>
            <span style={style}id="weapon">Weapon:{props.weapon.name}</span>
        </div>
    )
}