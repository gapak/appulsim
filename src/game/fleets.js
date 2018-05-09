
import _ from 'lodash';
import {getShip} from '../game/ships';

export const fleets = [
    {player: 'dark',       color: '#555555', fleet: {frigate: 0, cruiser: 0, battlecruiser: 0, dreadnought: 0, battleship: 0, titan: 2}},
    {player: 'grey2',       color: '#888888', fleet: {frigate: 0, cruiser: 0, battlecruiser: 0, dreadnought: 0, battleship: 4, titan: 0}},
    {player: 'grey3',       color: '#aaaaaa', fleet: {frigate: 0, cruiser: 0, battlecruiser: 0, dreadnought: 8, battleship: 0, titan: 0}},
    {player: 'grey4',         color: '#bbbbbb', fleet: {frigate: 0, cruiser: 0, battlecruiser: 8, dreadnought: 0, battleship: 0, titan: 0}},
    {player: 'grey5',       color: '#cccccc', fleet: {frigate: 0, cruiser: 16, battlecruiser: 0, dreadnought: 0, battleship: 0, titan: 0}},
    {player: 'grey6',       color: '#eeeeee', fleet: {frigate: 32, cruiser: 0, battlecruiser: 0, dreadnought: 0, battleship: 0, titan: 0}},
    
    {player: 'blue',        color: '#aaaaff', fleet: {frigate: 0, cruiser: 0, battlecruiser: 0, dreadnought: 4, battleship: 2, titan: 0}},
    {player: 'magenta1',    color: '#ee77ee', fleet: {frigate: 0, cruiser: 0, battlecruiser: 8, dreadnought: 0, battleship: 2, titan: 0}},
    {player: 'magenta2',    color: '#ffaaff', fleet: {frigate: 0, cruiser: 8, battlecruiser: 0, dreadnought: 0, battleship: 2, titan: 0}},
    {player: 'green',       color: '#aaffaa', fleet: {frigate: 16, cruiser: 0, battlecruiser: 0, dreadnought: 0, battleship: 2, titan: 0}},
    {player: 'deep_blue',   color: '#88bbbb', fleet: {frigate: 0, cruiser: 0, battlecruiser: 8, dreadnought: 4, battleship: 0, titan: 0}},
    {player: 'light_blue',  color: '#aaffff', fleet: {frigate: 0, cruiser: 8, battlecruiser: 0, dreadnought: 4, battleship: 0, titan: 0}},
    {player: 'yellow',      color: '#ffffaa', fleet: {frigate: 16, cruiser: 0, battlecruiser: 0, dreadnought: 4, battleship: 0, titan: 0}},
    {player: 'dark_red',    color: '#ee8888', fleet: {frigate: 16, cruiser: 0, battlecruiser: 8, dreadnought: 0, battleship: 0, titan: 0}},
    {player: 'red',         color: '#ffaaaa', fleet: {frigate: 16, cruiser: 8, battlecruiser: 0, dreadnought: 0, battleship: 0, titan: 0}},

    {player: 'white',       color: '#efefef', fleet: {frigate: 8, cruiser: 4, battlecruiser: 1, dreadnought: 1, battleship: 1, titan: 0}},

    {player: 'gapak',       color: '#0ba00d', fleet: {frigate: 6, cruiser: 5, battlecruiser: 1, dreadnought: 2, battleship: 1, titan: 0}},
    {player: '4epen',       color: '#81D5BD', fleet: {frigate: 12, cruiser: 2, battlecruiser: 0, dreadnought: 0, battleship: 2, titan: 0}},
    {player: 'roilegan',    color: '#aaaa42', fleet: {frigate: 8, cruiser: 2, battlecruiser: 1, dreadnought: 0, battleship: 0, titan: 1}},
    {player: 'naddyson',    color: '#00ffff', fleet: {frigate: 6, cruiser: 1, battlecruiser: 0, dreadnought: 2, battleship: 0, titan: 1}},
    {player: 'merkulov',    color: 'purple',  fleet: {frigate: 8, cruiser: 0, battlecruiser: 2, dreadnought: 0, battleship: 0, titan: 1}},
    {player: 'lojmax',      color: '#ff00ff', fleet: {frigate: 4, cruiser: 2, battlecruiser: 1, dreadnought: 1, battleship: 0, titan: 1}},
    {player: 'aldekein',    color: '#aa66bb', fleet: {frigate: 0, cruiser: 4, battlecruiser: 0, dreadnought: 0, battleship: 3, titan: 0}},
    {player: 'Mira',        color: '#0ABAB5', fleet: {frigate: 0, cruiser: 0, battlecruiser: 3, dreadnought: 1, battleship: 0, titan: 1}},
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
    let ships = [];
        _.each(fleet.fleet, (ship_count, ship_name) => {
            for (let i = 0; i < ship_count; i++) {
                ships.push(getShip(ship_name, fleet));
            }
    });
    return ships;
};
