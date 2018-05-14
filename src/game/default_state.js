
import _ from 'lodash';

// getFleets, getBattle, getRandomFleet, getRendomBattle,
import {generateSingleEnemyFleet} from '../game/fleets';


export var default_points = 32;
export const setDefaultPoints = (points) => { default_points = points; };


const default_state = {

    matrix_show: '',

    player_name: "ThePlayer",
    player_color: "#fafafa",
    points: default_points,

    player_fleet: [],
    in_battle_fleets: {},

    messages: [],

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
    state.points = default_points; //getRendomBattle(); //getBattle();
    state.in_battle_fleets = generateSingleEnemyFleet(); //getRendomBattle(); //getBattle();
    return state;
};