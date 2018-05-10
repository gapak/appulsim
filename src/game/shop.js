
import {getShip} from '../game/ships';
//import _ from 'lodash';

export const shop = {
    frigate:        {cost: {points: 1}, name: "frigate",        onClick: (state) => { state.player_fleet.push(getShip('frigate', {player: state.player_name, color: state.player_color})); return state; },
        text: "Frigate is light small ship with small gun. Good against big guns targets: dreadnought and titan, weak against cruiser and battlecruiser."},
    cruiser:        {cost: {points: 2}, name: "cruiser",        onClick: (state) => { state.player_fleet.push(getShip('cruiser', {player: state.player_name, color: state.player_color})); return state; },
        text: "Сruiser is an armored small ship with two small guns. Good against frigate and battlecruiser, weak against dreadnought and battleship."},
    dreadnought:    {cost: {points: 4}, name: "dreadnought",    onClick: (state) => { state.player_fleet.push(getShip('dreadnought', {player: state.player_name, color: state.player_color})); return state; },
        text: "Dreadnought is a heavy armored carrier platform with a huge gun. Good against tanked: cruiser and battleship, weak against frigate and titan."},
    battlecruiser:  {cost: {points: 4}, name: "battlecruiser",  onClick: (state) => { state.player_fleet.push(getShip('battlecruiser', {player: state.player_name, color: state.player_color})); return state; },
        text: "battlecruiser is a strong interceptor with two guns. Good against frigate and titan, weak against tanked: cruiser and battleship."},
    battleship:     {cost: {points: 8}, name: "battleship",     onClick: (state) => { state.player_fleet.push(getShip('battleship', {player: state.player_name, color: state.player_color})); return state; },
        text: "Battleship - heavily armored ship with a lot of guns. Good against cruiser and battlecruiser, weak against dreadnought and titan."},
    titan:         {cost: {points: 16}, name: "titan",          onClick: (state) => { state.player_fleet.push(getShip('titan', {player: state.player_name, color: state.player_color})); return state; },
        text: "Titan is a huge battle station. Good against big armored targets: dreadnought and battleship, weak against frigate and battlecruiser."},
};