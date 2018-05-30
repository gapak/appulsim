
import _ from 'lodash';

import {default_points} from '../game/default_state';
import {generateNextWave, getFleetSpeed} from '../game/fleets';

export const rules = {
    matrix_show: {onFrame: (state) => { state.matrix_show = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); return state; }},

    optimize_chat: {
        onTick: (state) => {
            state.messages = _.slice(state.messages, 0, 100);
            return state;
        }
    },

    passive: {
        onTick: (state) => {
            if (state.points < 1) state.points += 0.1;
            return state;
        }
    },

    solar: {
        onTick: (state) => {
            let satellites_count = _.filter(state.in_battle_fleets[state.player_name].ships, ['type', 'satellite']).length;
            let energy_gen = satellites_count * 0.1;

            state.points = (state.points + energy_gen) < default_points
                ? state.points + energy_gen
                : default_points;

            return state;
        }
    },

    waves: {
        onTick: (state) => {
            if (state.tick % 10 === 0) {
                let fleet = generateNextWave((state.tick / 10)+1);
                fleet.flight_timer = state.tick + Math.floor(2 / getFleetSpeed(fleet.ships));
                state.in_space_fleets[fleet.player] = fleet;
            }
            return state;
        }
    },

    flight: {
        onTick: (state) => {
            _.each(state.in_space_fleets, (fleet, key) => {
                if(fleet.flight_timer === state.tick) {
                    if (state.in_battle_fleets[key]) {
                        state.in_battle_fleets[key].ships = state.in_battle_fleets[key].ships.concat(fleet.ships);
                    }
                    else {
                        state.in_battle_fleets[key] = fleet;
                    }
                    delete state.in_space_fleets[key];
                }
            });
            return state;
        }
    },

    battle: {
        onTick: (state) => {
            if (_.keys(state.in_battle_fleets).length < 2) return state;

            _.forEach(_.keys(state.in_battle_fleets), (fleet_id) => {

                state.in_battle_fleets[fleet_id].ships = _.filter(state.in_battle_fleets[fleet_id].ships, (ship) => { return ship.hp > 0; });

                _.forEach(_.keys(state.in_battle_fleets[fleet_id].ships), (ship_id) => {
                    let fire_at = state.frame + Math.floor(_.random(59 - (59 * state.in_battle_fleets[fleet_id].ships[ship_id].speed), 59));
                    //let fire_at = state.frame + _.random(0, 59);
                    state.in_battle_fleets[fleet_id].ships[ship_id].fireAtFrame = fire_at;
                });

                if (state.in_battle_fleets[fleet_id].ships.length < 1) {
                    delete state.in_battle_fleets[fleet_id];
                }
            });

            if (_.keys(state.in_battle_fleets).length === 1) {
                let winner_fleet = _.sample(state.in_battle_fleets);
                let points = _.sumBy(winner_fleet.ships, function(ship) { return ship.hp > 0 ? ship.cost : 0; });

                if (winner_fleet.player !== state.player_name) {
                    state.game_end = true;
                    state.game_end_score = state.frame;
                }

                state.messages.unshift({
                    background: winner_fleet.color,
                    text: 'Battle End! Winner: ' + winner_fleet.player + ' with ' + points + " points (" + points * 100/default_points + "%)."});
                return state;
            }

            return state;
        },

        onFrame: (state) => {
            if (state.in_battle_fleets.length < 2) return state;

            let ships_list = [];
            
            _.forEach(_.keys(state.in_battle_fleets), (fleet_id) => {
                let fleet = state.in_battle_fleets[fleet_id];
                ships_list = ships_list.concat(_.filter(fleet.ships, function(ship) { return (ship.fireAtFrame === state.frame && ship.hp > 0); }));
            });

            let ships_order = _.shuffle(ships_list);

         //   console.log(ships_order);

            ships_order.forEach((ship, bad_id) => {
                let player_id = ship.player;
                let ship_id = _.indexOf(state.in_battle_fleets[player_id].ships, ship);
                state.in_battle_fleets[player_id].ships[ship_id].fireAtFrame = false;
                if (ship.hp < 1) return false;

                for (let i = 0; i < ship.rof; i++) {
                    let target = findTarget(state, ship.player);

                    if (target !== false) {
                        let opponent_id = target.player;
                        let target_id = _.indexOf(state.in_battle_fleets[opponent_id].ships, target);
                     //   console.log(target);
                        let transversal_velocity = state.in_battle_fleets[player_id].ships[ship_id].speed / state.in_battle_fleets[opponent_id].ships[target_id].speed;
                        //let velocity_mod =  (transversal_velocity + 1) / 2;
                        let roll = _.random(1, Math.floor(100 * transversal_velocity));

                        if (roll > _.random(1, 50)) {
                            let dmg = ship.dmg - target.armor;
                            state.in_battle_fleets[opponent_id].ships[target_id].hp -= dmg;
                            state.messages.unshift({
                                background: "linear-gradient(to right, " + state.in_battle_fleets[player_id].ships[ship_id].color + " , " + state.in_battle_fleets[opponent_id].color + ")",
                                text: ship.type + " shot " + dmg + " to " + state.in_battle_fleets[opponent_id].ships[target_id].type});
                        }
                        else {
                            state.messages.unshift({
                                background: "transparent",
                                text: ship.type + " miss to " + state.in_battle_fleets[opponent_id].ships[target_id].type});
                        }

                    }
                }

            });

            return state;
        }
    }
};


function findTarget(state, player) {
    let fleets_list = _.filter(_.values(state.in_battle_fleets), function(fleet) { return _.filter(fleet.ships, (ship) =>  { return (ship.player !== player && ship.hp > 0); }).length > 0; });

  //  console.log("findTarget", player, fleets_list, state.in_battle_fleets);

    if (fleets_list.length === 0) return false;

    let targets = [];

    let fleet = _.sample(fleets_list);// state.in_battle_fleets[fleet_id];

    _.forEach(_.keys(fleet.ships), (ship_id) => {
        let ship = state.in_battle_fleets[fleet.player].ships[ship_id];
        if (ship.player !== player && ship.hp > 0) {
            targets.push(ship);
        }
    });

  //  console.log("findTarget", fleet, targets);

    if (targets.length === 0) return false;
    return _.sample(targets);
}