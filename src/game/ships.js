
import _ from 'lodash';


export const ships_old = { // old
    frigate:    {points: 1, hp: 6, armor: 0, dmg: 5, rof: 1},
    cruiser:     {points: 2, hp: 9, armor: 1, dmg: 6, rof: 2},
    dreadnought:    {points: 4, hp: 19, armor: 2, dmg: 10, rof: 2},
    battleship: {points: 8, hp: 24, armor: 4, dmg: 6, rof: 4},
    titan:      {points: 16, hp: 144, armor: 1, dmg: 24, rof: 2},
};

export const ships_rebalanced = {  // rebalanced
    frigate:    {points: 1, hp: 8,    armor: 0, dmg: 6,  rof: 1},
    cruiser:     {points: 2, hp: 13,   armor: 2, dmg: 6,  rof: 2},
    dreadnought:    {points: 4, hp: 21,   armor: 3, dmg: 15, rof: 1},
    battleship: {points: 8, hp: 36,   armor: 5, dmg: 7,  rof: 4},
    titan:      {points: 16, hp: 144, armor: 1, dmg: 24, rof: 2},
};


export const ships = { // new
    frigate:       {points: 1, hp: 8,    armor: 0, dmg: 7,  rof: 1},
    cruiser:       {points: 2, hp: 16,   armor: 2, dmg: 6,  rof: 2},
    dreadnought:   {points: 4, hp: 21,   armor: 3, dmg: 18, rof: 1},
    battlecruiser: {points: 4, hp: 34,   armor: 1, dmg: 9,  rof: 2},
    battleship:    {points: 8, hp: 39,   armor: 5, dmg: 8,  rof: 4},
    titan:         {points: 16, hp: 144, armor: 1, dmg: 24, rof: 2},
};

export const getShip = (ship_name, fleet) => {
    let ship = _.cloneDeep(ships[ship_name]);
    ship.type = ship_name;
    ship.player = fleet.player;
    ship.color = fleet.color;
    ship.fireAtFrame = false;
    return ship;
};