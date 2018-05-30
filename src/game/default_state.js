
import _ from 'lodash';

// getFleets, getBattle, getRandomFleet, getRendomBattle,
import {generateSingleEnemyFleet, generateNextWave, sortFleet} from '../game/fleets';


export var default_points = 32;
export const setDefaultPoints = (points) => { default_points = points; };


const default_state = {

    matrix_show: '',

    player_name: "ThePlayer",
    player_color: "#111111",
    points: 3.0,

    player_fleet: [],
    in_battle_fleets: {},
    in_space_fleets: {},

    messages: [],

    game_speed: 60000,
    frame_rate: 60,
    game_speed_multiplier: 1,
    frame: 0,
    tick: 0,
    game_paused: true,
    game_end: false,
    game_end_score: 0
};

export const getDefaultState = () => {
    let state = _.cloneDeep(default_state);
    //state.points = default_points; //getRendomBattle(); //getBattle();
    //state.in_battle_fleets = generateSingleEnemyFleet(); //getRendomBattle(); //getBattle();
    state.in_battle_fleets[state.player_name] = {player: state.player_name, color:  state.player_color, ships: []};

    //let fleet = generateNextWave(1);
    //fleet.Enemy.flight_timer = 2;
    //state.in_space_fleets = fleet;//generateSingleEnemyFleet(); //getRendomBattle(); //getBattle();
    return state;
};