
import _ from 'lodash';


export const ships = { // new slow battles
    frigate:       {cost: 1, hp: 9,    armor: 0, dmg: 7,  rof: 1},
    cruiser:       {cost: 2, hp: 16,   armor: 2, dmg: 5,  rof: 2},
    dreadnought:   {cost: 4, hp: 19,   armor: 3, dmg: 19, rof: 1},
    battlecruiser: {cost: 4, hp: 32,   armor: 1, dmg: 9,  rof: 2},
    battleship:    {cost: 8, hp: 43,   armor: 4, dmg: 6,  rof: 6},
    titan:         {cost: 16, hp: 144, armor: 1, dmg: 24, rof: 2},

    satellite:     {cost: 1, hp: 15,    armor: 0, dmg: 0,  rof: 0},
    transport:     {cost: 2, hp: 30,    armor: 0, dmg: 2,  rof: 5},
    miner:         {cost: 2, hp: 20,    armor: 2, dmg: 3,  rof: 3},
    freighter:     {cost: 4, hp: 60,    armor: 0, dmg: 3,  rof: 10},
    exhumer:       {cost: 4, hp: 40,    armor: 3, dmg: 4,  rof: 4},
    colonisator:   {cost: 4, hp: 30,    armor: 4, dmg: 5,  rof: 3},
    caravan:       {cost: 8, hp: 100,   armor: 5, dmg: 0,  rof: 0},
};

export const getShip = (ship_name, fleet) => {
    let ship = _.cloneDeep(ships[ship_name]);
    ship.type = ship_name;
    ship.player = fleet.player;
    ship.color = fleet.color;
    ship.fireAtFrame = false;
    return ship;
};