export const enemies = {
    level1: {hp: 50, damage:{min: 5, max: 8}, bounty: 50},
    level2: {hp: 75, damage:{min: 10, max: 14}, bounty: 75},
    level3: {hp: 100, damage:{min: 15, max: 19}, bounty: 100},
    boss: {hp: 200, damage:{min: 8, max: 20}, bounty: 'win'}
}
//TODO add a getInfo method to update the info on taking damage
export class Enemy {
    constructor (props) {
        console.log (props)
       this.hp = props.hp
       this.damage = Object.assign({}, props.damage)
       this.bounty = props.bounty
    }
    takeDamage = (damage) => {
        this.hp -= damage
        if (this.hp <= 0) {
            //this.die ()
            return { bounty:this.bounty }
        } else {
            return { damage:this.getDamage () }
        }
    }
    //TODO damage should be an int
    getDamage = () => {
        let t = Math.random ()
        return (1 - t) * this.damage.min + t * this.damage.max
    }
}