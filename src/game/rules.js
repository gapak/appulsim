
import _ from 'lodash';

export const rules = {
    matrix_show: {onFrame: (state) => { state.matrix_show = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); return state; }},

    battle: {
        onTick: (state) => {
            if (state.battle_step !== 'battle') return state;

        //    console.log('battle tick', state.in_battle_fleets);

            _.forEach(_.keys(state.in_battle_fleets), (fleet_id) => {
                let fleet = state.in_battle_fleets[fleet_id];
             //   console.log(fleet_id, fleet);
                _.forEach(_.keys(fleet.fleet), (ship_id) => {
                    let ship = state.in_battle_fleets[fleet_id].fleet[ship_id];
              //     console.log(fleet_id, ship_id, ship);
                    state.in_battle_fleets[fleet_id].fleet[ship_id].fireAtFrame = ship.hp > 0 ? state.frame + _.random(0, 59) : false;
                });
            });
            return state;
        },

        onFrame: (state) => {
            if (state.battle_step !== 'battle') return state;

            let ships_list = [];
            
            _.forEach(_.keys(state.in_battle_fleets), (fleet_id) => {
                let fleet = state.in_battle_fleets[fleet_id];
                ships_list = ships_list.concat(_.filter(fleet.fleet, function(ship) { return (ship.fireAtFrame === state.frame && ship.hp > 0); }));
            });

            let ships_order = _.shuffle(ships_list);

         //   console.log(ships_order);

            ships_order.forEach((ship, bad_id) => {
                let player_id = ship.player;
                let ship_id = _.indexOf(state.in_battle_fleets[player_id].fleet, ship);
                state.in_battle_fleets[player_id].fleet[ship_id].fireAtFrame = false;
                if (ship.hp < 1) return false;

                for (let i = 0; i < ship.rof; i++) {
                    let target = findTarget(state, ship.player);

                    if (target === false) {
                        state.battle_step = 'end';

                        let points = _.sumBy(state.in_battle_fleets[player_id].fleet, function(ship) { return ship.hp > 0 ? ship.points : 0; });

                        state.messages.unshift({
                            background: "white",
                            text: 'Battle End! Winner: ' + ship.player + ' with ' + points + " points (" + points * 100/32 + "%)."});
                        return state;
                    }
                    else {
                        let opponent_id = target.player;
                        let target_id = _.indexOf(state.in_battle_fleets[opponent_id].fleet, target);
                     //   console.log(target);
                        let dmg = ship.dmg - target.armor;
                        state.in_battle_fleets[opponent_id].fleet[target_id].hp -= dmg;
                        state.messages.unshift({
                            background: "linear-gradient(to right, " + state.in_battle_fleets[player_id].fleet[ship_id].color + " , " + state.in_battle_fleets[opponent_id].color + ")",
                            text: ship.type + " shot to " + state.in_battle_fleets[opponent_id].fleet[target_id].type + " and deal " + dmg});
                    }
                }

            });

            return state;
        }
    }
};


function findTarget(state, player) {
    let fleets_list = _.filter(_.values(state.in_battle_fleets), function(fleet) { return _.filter(fleet.fleet, (ship) =>  { return (ship.player !== player && ship.hp > 0); }).length > 0; });

  //  console.log("findTarget", player, fleets_list, state.in_battle_fleets);

    if (fleets_list.length === 0) return false;

    let targets = [];

    let fleet = _.sample(fleets_list);// state.in_battle_fleets[fleet_id];

    _.forEach(_.keys(fleet.fleet), (ship_id) => {
        let ship = state.in_battle_fleets[fleet.player].fleet[ship_id];
        if (ship.player !== player && ship.hp > 0) {
            targets.push(ship);
        }
    });

  //  console.log("findTarget", fleet, targets);

    if (targets.length === 0) return false;
    return _.sample(targets);
}