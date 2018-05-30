
import {ships, getShip} from '../game/ships';
//import _ from 'lodash';

export const shop = {
    satellite:        {cost: {points: ships.satellite.cost}, name: "satellite",        onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('satellite', {player: state.player_name, color: state.player_color})); return state; },
        text: "Солнечные спуткики вырабатываю 0.1 point каждый раунд.",
        text2: "Легкая цель для медленных кораблей с высоким уроном."},
    frigate:        {cost: {points: ships.frigate.cost}, name: "frigate",        onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('frigate', {player: state.player_name, color: state.player_color})); return state; },
        text: "Скоростные фрегаты - отличные перехватчики и корабли поддержки.",
        text2: "Очень высокая скорость, очень высокие повреждения."},
    destroyer:        {cost: {points: ships.destroyer.cost}, name: "destroyer",        onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('destroyer', {player: state.player_name, color: state.player_color})); return state; },
        text: "Хрупкие, разрушительные и маневренные, дестроеры ускоряют любой бой.",
        text2: "Высокая скорость, очень высокие повреждения, скорострельный огонь."},
    cruiser:      {cost: {points: ships.cruiser.cost}, name: "cruiser",    onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('cruiser', {player: state.player_name, color: state.player_color})); return state; },
        text: "Сбалансированный военный корабль, готовый к любой ситуации.",
        text2: "Тяжелая броня, высокая скорость, высокие повреждения, скорострельный огонь."},
    dreadnought:  {cost: {points: ships.dreadnought.cost}, name: "dreadnought",  onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('dreadnought', {player: state.player_name, color: state.player_color})); return state; },
        text: "Неповоротливый тяжело-бронированный корабль для позиционной войны.",
        text2: "Большой размер, очень тяжелая броня, большие пушки."},
    battlecruiser:    {cost: {points: ships.battlecruiser.cost}, name: "battlecruiser",    onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('battlecruiser', {player: state.player_name, color: state.player_color})); return state; },
        text: "Тяжелый перехватчик для охоты на бронированные флоты. ",
        text2: "Тяжелая броня, высокая скорость, высокие повреждения, большие пушки."},
    battleship:     {cost: {points: ships.battleship.cost}, name: "battleship",     onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('battleship', {player: state.player_name, color: state.player_color})); return state; },
        text: "Венец военной техники, усыпанный пушками и броней.",
        text2: "Очень большой размер, очень тяжелая броня."},
    carrier:    {cost: {points: ships.carrier.cost}, name: "carrier",    onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('carrier', {player: state.player_name, color: state.player_color})); return state; },
        text: "Платформа-носитель, с которой взлетает шесть фрегатов.",
        text2: "Очень большой размер, высокие повреждения и скорострельный огонь."},
    titan:          {cost: {points: ships.titan.cost}, name: "titan",          onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('titan', {player: state.player_name, color: state.player_color})); return state; },
        text: "Огромная боевая станция, уничтожитель крупных бронированных кораблей.",
        text2: "Очень большой размер, очень большие пушки."},


    /*
    transport:         {cost: {points: ships.transport.cost}, name: "Transport",          onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('transport', {player: state.player_name, color: state.player_color})); return state; },
        text: "Small Civil Transport."},
    miner:         {cost: {points: ships.miner.cost}, name: "Miner",          onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('miner', {player: state.player_name, color: state.player_color})); return state; },
        text: "Small Miner."},
    freighter:         {cost: {points: ships.freighter.cost}, name: "Freighter",          onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('freighter', {player: state.player_name, color: state.player_color})); return state; },
        text: "Big Civil Transport."},
    exhumer:         {cost: {points: ships.exhumer.cost}, name: "Exhumer",          onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('exhumer', {player: state.player_name, color: state.player_color})); return state; },
        text: "Big Miner"},
    colonisator:         {cost: {points: ships.colonisator.cost}, name: "Colonisator",          onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('colonisator', {player: state.player_name, color: state.player_color})); return state; },
        text: "Planet Colonisator."},
    caravan:         {cost: {points: ships.caravan.cost}, name: "Caravan",          onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('caravan', {player: state.player_name, color: state.player_color})); return state; },
        text: "Interstellar Caravan."},
        */


};