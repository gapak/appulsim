
import _ from 'lodash';

// getFleets, getBattle, getRandomFleet, getRendomBattle,
import {generateSingleEnemyFleet} from '../game/fleets';

const default_state = {

    matrix_show: '',

    player_name: "ThePlayer",
    player_color: "#fafafa",
    points: 32,

    player_fleet: [],
    in_battle_fleets: {},

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
    let state = _.cloneDeep(default_state);
    state.in_battle_fleets['Enemy'] = generateSingleEnemyFleet(); //getRendomBattle(); //getBattle();
    return state;
};