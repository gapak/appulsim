
import {ships, getShip} from '../game/ships';
//import _ from 'lodash';

export const shop = {
    frigate:        {cost: {points: ships.frigate.cost}, name: "frigate",        onClick: (state) => { state.player_fleet.push(getShip('frigate', {player: state.player_name, color: state.player_color})); return state; },
        text: "Frigate is light small ship with small gun. Good against big guns targets: dreadnought and titan, weak against cruiser and battlecruiser."},
    destroyer:        {cost: {points: ships.destroyer.cost}, name: "destroyer",        onClick: (state) => { state.player_fleet.push(getShip('destroyer', {player: state.player_name, color: state.player_color})); return state; },
        text: "destroyer is an armored small ship with two small guns. Good against frigate and battlecruiser, weak against dreadnought and battleship."},
    cruiser:      {cost: {points: ships.cruiser.cost}, name: "cruiser",    onClick: (state) => { state.player_fleet.push(getShip('cruiser', {player: state.player_name, color: state.player_color})); return state; },
        text: "cruiser is a heavy armored carrier platform with a huge gun. Good against tanked: cruiser and battleship, weak against frigate and titan."},
    dreadnought:  {cost: {points: ships.dreadnought.cost}, name: "dreadnought",  onClick: (state) => { state.player_fleet.push(getShip('dreadnought', {player: state.player_name, color: state.player_color})); return state; },
        text: "dreadnought is a strong interceptor with two guns. Good against frigate and titan, weak against tanked: cruiser and battleship."},
    battlecruiser:    {cost: {points: ships.battlecruiser.cost}, name: "battlecruiser",    onClick: (state) => { state.player_fleet.push(getShip('battlecruiser', {player: state.player_name, color: state.player_color})); return state; },
        text: "battlecruiser is a heavy armored carrier platform with a huge gun. Good against tanked: cruiser and battleship, weak against frigate and titan."},
    battleship:     {cost: {points: ships.battleship.cost}, name: "battleship",     onClick: (state) => { state.player_fleet.push(getShip('battleship', {player: state.player_name, color: state.player_color})); return state; },
        text: "battleship - heavily armored ship with a lot of guns. Good against cruiser and battlecruiser, weak against dreadnought and titan."},
    carrier:    {cost: {points: ships.carrier.cost}, name: "carrier",    onClick: (state) => { state.player_fleet.push(getShip('carrier', {player: state.player_name, color: state.player_color})); return state; },
        text: "battlecruiser is a heavy armored carrier platform with a huge gun. Good against tanked: cruiser and battleship, weak against frigate and titan."},
    titan:          {cost: {points: ships.titan.cost}, name: "titan",          onClick: (state) => { state.player_fleet.push(getShip('titan', {player: state.player_name, color: state.player_color})); return state; },
        text: "Titan is a huge battle station. Good against big armored targets: dreadnought and battleship, weak against frigate and battlecruiser."},


    /*
    transport:         {cost: {points: ships.transport.cost}, name: "Transport",          onClick: (state) => { state.player_fleet.push(getShip('transport', {player: state.player_name, color: state.player_color})); return state; },
        text: "Small Civil Transport."},
    miner:         {cost: {points: ships.miner.cost}, name: "Miner",          onClick: (state) => { state.player_fleet.push(getShip('miner', {player: state.player_name, color: state.player_color})); return state; },
        text: "Small Miner."},
    freighter:         {cost: {points: ships.freighter.cost}, name: "Freighter",          onClick: (state) => { state.player_fleet.push(getShip('freighter', {player: state.player_name, color: state.player_color})); return state; },
        text: "Big Civil Transport."},
    exhumer:         {cost: {points: ships.exhumer.cost}, name: "Exhumer",          onClick: (state) => { state.player_fleet.push(getShip('exhumer', {player: state.player_name, color: state.player_color})); return state; },
        text: "Big Miner"},
    colonisator:         {cost: {points: ships.colonisator.cost}, name: "Colonisator",          onClick: (state) => { state.player_fleet.push(getShip('colonisator', {player: state.player_name, color: state.player_color})); return state; },
        text: "Planet Colonisator."},
    caravan:         {cost: {points: ships.caravan.cost}, name: "Caravan",          onClick: (state) => { state.player_fleet.push(getShip('caravan', {player: state.player_name, color: state.player_color})); return state; },
        text: "Interstellar Caravan."},
        */


};