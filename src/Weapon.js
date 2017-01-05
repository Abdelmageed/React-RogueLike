export const weapons = {
    Dagger: {
        name: 'Dagger',
        dmgMod: 1.2
    },
    ShortSword: {
        name: 'Short Sword',
        dmgMod: 1.4
    },
    LongSword: {
        name: 'Long Sword',
        dmgMod: 1.6
    }

}
export class Weapon {
    constructor(props) {
        this.name = props.name
        this.dmgMod = props.dmgMod
    }
}