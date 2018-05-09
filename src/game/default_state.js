
import _ from 'lodash';

import {getFleets, getRandomFleet} from '../game/fleets';

const default_state = {

    matrix_show: '',

    points: 32,

    player_ships: {frigate: 0, cruiser: 0, battlecruiser: 0, dreadnought: 0, battleship: 0, titan: 0},
   // ships_in_battle: getFleets(),
    ships_in_battle: getRandomFleet(),
    messages: [],
    battle_step: 'start',

    game_speed: 60000,
    frame_rate: 60,
    game_speed_multiplier: 1,
    frame: 0,
    tick: 0,
    game_paused: true,
    game_end: false
};

export const getDefaultState = () => {
    return _.cloneDeep(default_state);
};