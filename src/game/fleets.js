
import _ from 'lodash';
import {ships, getShip, allowed_ships} from '../game/ships';
import {default_points} from '../game/default_state';

export const fleets = [

    {player: 'dark',        color: '#555555', ships: {frigate: 0, cruiser: 0, battlecruiser: 0, dreadnought: 0, battleship: 0, titan: 2}},
    {player: 'grey2',       color: '#888888', ships: {frigate: 0, cruiser: 0, battlecruiser: 0, dreadnought: 0, battleship: 4, titan: 0}},
    {player: 'grey3',       color: '#aaaaaa', ships: {frigate: 0, cruiser: 0, battlecruiser: 0, dreadnought: 8, battleship: 0, titan: 0}},
    {player: 'grey4',       color: '#bbbbbb', ships: {frigate: 0, cruiser: 0, battlecruiser: 8, dreadnought: 0, battleship: 0, titan: 0}},
    {player: 'grey5',       color: '#cccccc', ships: {frigate: 0, cruiser: 16, battlecruiser: 0, dreadnought: 0, battleship: 0, titan: 0}},
    {player: 'grey6',       color: '#eeeeee', ships: {frigate: 32, cruiser: 0, battlecruiser: 0, dreadnought: 0, battleship: 0, titan: 0}},


//{player: 'another_blue',color: '#33ffee', ships: {frigate: 16, cruiser: 0, battlecruiser: 4, dreadnought: 0, battleship: 0, titan: 0}},
    ///*

    {player: 'blue',        color: '#aaaaff', ships: {frigate: 0, cruiser: 0, battlecruiser: 0, dreadnought: 4, battleship: 2, titan: 0}},
    {player: 'magenta1',    color: '#ee77ee', ships: {frigate: 0, cruiser: 0, battlecruiser: 4, dreadnought: 0, battleship: 2, titan: 0}},
    {player: 'magenta2',    color: '#ffaaff', ships: {frigate: 0, cruiser: 8, battlecruiser: 0, dreadnought: 0, battleship: 2, titan: 0}},
    {player: 'green',       color: '#aaffaa', ships: {frigate: 16, cruiser: 0, battlecruiser: 0, dreadnought: 0, battleship: 2, titan: 0}},
    {player: 'deep_blue',   color: '#88bbbb', ships: {frigate: 0, cruiser: 0, battlecruiser: 4, dreadnought: 4, battleship: 0, titan: 0}},
    {player: 'light_blue',  color: '#aaffff', ships: {frigate: 0, cruiser: 8, battlecruiser: 0, dreadnought: 4, battleship: 0, titan: 0}},
    {player: 'another_blue',color: '#33ffee', ships: {frigate: 0, cruiser: 8, battlecruiser: 4, dreadnought: 0, battleship: 0, titan: 0}},
    {player: 'yellow',      color: '#ffffaa', ships: {frigate: 16, cruiser: 0, battlecruiser: 0, dreadnought: 4, battleship: 0, titan: 0}},
    {player: 'dark_red',    color: '#ee8888', ships: {frigate: 16, cruiser: 0, battlecruiser: 4, dreadnought: 0, battleship: 0, titan: 0}},
    {player: 'red',         color: '#ffaaaa', ships: {frigate: 16, cruiser: 8, battlecruiser: 0, dreadnought: 0, battleship: 0, titan: 0}},

    {player: 'white',       color: '#efefef', ships: {frigate: 8, cruiser: 4, battlecruiser: 1, dreadnought: 1, battleship: 1, titan: 0}},

    {player: 'gapak',       color: '#0ba00d', ships: {frigate: 6, cruiser: 5, battlecruiser: 1, dreadnought: 2, battleship: 1, titan: 0}},
    {player: '4epen',       color: '#81D5BD', ships: {frigate: 12, cruiser: 2, battlecruiser: 0, dreadnought: 0, battleship: 2, titan: 0}},
    {player: 'roilegan',    color: '#aaaa42', ships: {frigate: 8, cruiser: 2, battlecruiser: 1, dreadnought: 0, battleship: 0, titan: 1}},
    {player: 'naddyson',    color: '#00ffff', ships: {frigate: 6, cruiser: 1, battlecruiser: 0, dreadnought: 2, battleship: 0, titan: 1}},
    {player: 'merkulov',    color: 'purple',  ships: {frigate: 8, cruiser: 0, battlecruiser: 2, dreadnought: 0, battleship: 0, titan: 1}},
    {player: 'lojmax',      color: '#ff00ff', ships: {frigate: 4, cruiser: 2, battlecruiser: 1, dreadnought: 1, battleship: 0, titan: 1}},
    {player: 'aldekein',    color: '#aa66bb', ships: {frigate: 0, cruiser: 4, battlecruiser: 0, dreadnought: 0, battleship: 3, titan: 0}},
    {player: 'Mira',        color: '#0ABAB5', ships: {frigate: 0, cruiser: 0, battlecruiser: 3, dreadnought: 1, battleship: 0, titan: 1}},
    //*/

];

export const getRandomFleet = () => {
    return getFleet(_.sample(fleets));
};

export const getFleets = () => {
    let ships = [];
    _.each(fleets, (fleet) => {
        ships = ships.concat(getFleet(fleet));
    });
    return ships;
};

export const getFleet = (fleet) => {
  //  console.log('getFleet', fleet);
    let ships = [];
        _.each(fleet.ships, (ship_count, ship_name) => {
            for (let i = 0; i < ship_count; i++) {
                ships.push(getShip(ship_name, fleet));
            }
    });
    return ships;
};

export const getBattle = () => {
    let in_battle_fleets = [];
    _.each(fleets, (fleet) => {
        let builded_fleet = _.clone(fleet);
        builded_fleet.ships = getFleet(builded_fleet);
        in_battle_fleets[fleet.player] = builded_fleet;
    });
 //   console.log(in_battle_fleets);
    return in_battle_fleets;
};

export const getRendomBattle = () => {
    let in_battle_fleets = [];
    let fleet = _.sample(fleets);
    let builded_fleet = _.clone(fleet);
    builded_fleet.ships = getFleet(builded_fleet);
    in_battle_fleets[fleet.player] = builded_fleet;
//   console.log(in_battle_fleets);
    return in_battle_fleets;
};

export const generateSingleEnemyFleet = () => {
    let fleet = {player: 'Enemy', flight_timer: 0, color: '#'+_.random(11, 99)+''+_.random(11, 99)+''+_.random(11, 99), ships: []};

    let ships_list = _.filter(_.keys(ships), (ship) => { return (allowed_ships[ship]) } );
    //ships_list = _.filter(ships_list, (ship) => {
    //    return ships_list.length === 1 ? true : _.random(1, 1 + _.keys(ships).length - ships_list.length) !== 1; } );
    let points = default_points;

    console.log(ships_list);

    while(points > 0) {
        let ship_key = _.sample(ships_list);
        if (ships[ship_key].cost <= points && _.random(1, Math.ceil(1 + ships[ship_key].cost/2)) === 1) {
            points -= ships[ship_key].cost;
            fleet.ships.push(getShip(ship_key, fleet));
        }
    }
    fleet.ships = sortFleet(fleet.ships);
    return {'Enemy': fleet};
};


const genColor = () => '#'+_.random(11, 99)+''+_.random(11, 99)+''+_.random(11, 99);

const enemies = {
    elend: {name: "El'en Da'ar", color: genColor(), allowed_ships: {frigate: true, destroyer: true, cruiser: true, battlecruiser: true, carrier: true}},
    caran: {name: 'Lacaran', color: genColor(),     allowed_ships: {frigate: true, destroyer: true, cruiser: true, battlecruiser: true, carrier: true}},
    repub: {name: 'Republicon', color: genColor(),  allowed_ships: {frigate: true, dreadnought: true, battlecruiser: true, battleship: true, carrier: true, titan: true}},
    malor: {name: 'Malor', color: genColor(),       allowed_ships: {frigate: true, destroyer: true, dreadnought: true, battleship: true, titan: true}},
    domna: {name: 'Domnators', color: genColor(),   allowed_ships: {frigate: true, cruiser: true, dreadnought: true, battleship: true, titan: true}},
};


export const generateNextWave = (n) => {
    let enemy = _.sample(enemies);

    let fleet = {player: enemy.name, flight_timer: 0, color: enemy.color, ships: []};

    let ships_list = _.filter(_.keys(ships), (ship) => { return (enemy.allowed_ships[ship]) } );
    //ships_list = _.filter(ships_list, (ship) => {
    //    return ships_list.length === 1 ? true : _.random(1, 1 + _.keys(ships).length - ships_list.length) !== 1; } );
    let points = n;

    console.log(ships_list);

    while(points > 0) {
        let ship_key = _.sample(ships_list);
        if (ships[ship_key].cost <= points && _.random(1, Math.ceil(1 + ships[ship_key].cost/2)) === 1) {
            points -= ships[ship_key].cost;
            fleet.ships.push(getShip(ship_key, fleet));
        }
    }
    fleet.ships = sortFleet(fleet.ships);
    return fleet;
};



export const sortFleet = (ships) => {
    return _.orderBy(ships, ['cost', 'dmg', 'rof', 'armor', 'hp'], ['desc', 'desc', 'desc', 'desc', 'desc']);
};


export const getFleetSpeed = (ships) => {
    return _.min(_.map(ships, 'speed'));
};


