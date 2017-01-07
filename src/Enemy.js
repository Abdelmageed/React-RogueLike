export const enemies = {
    level1: {hp: 35, damage:{min: 5, max: 8}, bounty: 50},
    level2: {hp: 65, damage:{min: 10, max: 14}, bounty: 100},
    level3: {hp: 95, damage:{min: 15, max: 19}, bounty: 150},
    boss: {hp: 400, damage:{min: 20, max: 25}, bounty: 'win'}
}
export class Enemy {
    constructor (props) {
       this.hp = props.hp
       this.damage = Object.assign({}, props.damage)
       this.bounty = props.bounty
    }
    takeDamage = (damage) => {
        this.hp -= damage
        if (this.hp <= 0) {
            return { bounty:this.bounty }
        } else {
            return { damage:this.getDamage () }
        }
    }
    getDamage = () => {
        let t = Math.random ()
        return Math.round((1 - t) * this.damage.min + t * this.damage.max, 10)
    }
    getInfo = () => {
        return `Enemy Attack:${this.damage.min}-${this.damage.max} Health:${this.hp}`
    }
}