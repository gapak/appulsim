
import _ from 'lodash';


export const ships = { // new slow battles
    frigate:       {cost: 1, speed: 0.9, hp: 9,    armor: 0, dmg: 5,  rof: 1}, // Light

    destroyer:     {cost: 2, speed: 0.7, hp: 13,   armor: 1, dmg: 4,  rof: 3}, // Rapid Fire

    cruiser:       {cost: 4, speed: 0.5, hp: 42,   armor: 2, dmg: 6,  rof: 2}, // HP & Armor
    dreadnought:   {cost: 4, speed: 0.3, hp: 34,   armor: 3, dmg: 12, rof: 1}, // Big Gun & Armor

    battlecruiser: {cost: 8, speed: 0.6, hp: 92,   armor: 2, dmg: 10, rof: 2}, // Big Gun
    battleship:    {cost: 8, speed: 0.2, hp: 98,   armor: 3, dmg: 6,  rof: 3}, // Armor
    carrier:       {cost: 8, speed: 0.4, hp: 120,  armor: 1, dmg: 5,  rof: 4}, // Rapid Fire & HP

    titan:        {cost: 16, speed: 0.1, hp: 318,  armor: 1, dmg: 13, rof: 2}, // Big Gun & HP


    /*
    satellite:     {cost: 1, speed: 0.9, hp: 15,    armor: 0, dmg: 0,  rof: 0},
    transport:     {cost: 2, speed: 0.9, hp: 30,    armor: 0, dmg: 0,  rof: 0},
    miner:         {cost: 2, speed: 0.9, hp: 20,    armor: 2, dmg: 4,  rof: 2},
    freighter:     {cost: 4, speed: 0.9, hp: 60,    armor: 0, dmg: 0,  rof: 0},
    exhumer:       {cost: 4, speed: 0.9, hp: 40,    armor: 3, dmg: 5,  rof: 4},
    colonisator:   {cost: 4, speed: 0.9, hp: 30,    armor: 4, dmg: 5,  rof: 1},
    caravan:       {cost: 8, speed: 0.9, hp: 100,   armor: 4, dmg: 0,  rof: 0},
    */
};

export const allowed_ships = {
    frigate: true,
    destroyer: true,
    cruiser: true,
    dreadnought: true,
    battlecruiser: true,
    battleship: true,
    carrier: true,
    titan: true,
};

let ships_count = 0;
let sum_dmg = 0;
let sum_armor = 0;
_.each(ships, (ship) => {
    ships_count += (16 / ship.cost);
    sum_dmg += ship.dmg * (16 / ship.cost);
    sum_armor += ship.armor * (16 / ship.cost);
});
export const avg_dmg = sum_dmg / ships_count;
export const avg_armor = sum_armor / ships_count;
//export const avg_dmg = _.sumBy(_.values(ships), 'dmg') / _.keys(ships).length;
console.log('avg_dmg:', avg_dmg);
console.log('avg_armor:', avg_armor);

export const getShip = (ship_name, fleet) => {
    let ship = _.cloneDeep(ships[ship_name]);
    ship.type = ship_name;
    ship.player = fleet.player;
    ship.color = fleet.color;
    ship.fireAtFrame = false;
    return ship;
};