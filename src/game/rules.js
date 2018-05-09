
import _ from 'lodash';

export const rules = {
    matrix_show: {onFrame: (state) => { state.matrix_show = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); return state; }},

    battle: {
        onTick: (state) => {
            if (state.battle_step !== 'battle') return state;

            state.ships_in_battle.forEach((ship, id) => {
                state.ships_in_battle[id].fireAtFrame = ship.hp > 0 ? state.frame + _.random(0, 59) : false;
            });

            return state;
        },

        onFrame: (state) => {
            if (state.battle_step !== 'battle') return state;

            let ships_order = _.shuffle(_.filter(state.ships_in_battle, function(ship) { return (ship.fireAtFrame === state.frame && ship.hp > 0); }));

        //    console.log(ships_order);

            ships_order.forEach((ship, bad_id) => {
                let ship_id = _.indexOf(state.ships_in_battle, ship);
                state.ships_in_battle[ship_id].fireAtFrame = false;
                if (ship.hp < 1) return false;

                for (let i = 0; i < ship.rof; i++) {
                    let target = findTarget(state, ship.player);
                    if (target === false) {
                        state.battle_step = 'end';

                        let points = _.sumBy(state.ships_in_battle, function(ship) { return ship.hp > 0 ? ship.points : 0; });

                        state.messages.unshift({
                            background: "white",
                            text: 'Battle End! Winner: ' + ship.player + ' with ' + points + " points (" + points * 100/32 + "%)."});
                        return state;
                    }
                    else {
                        //console.log(target);
                        let dmg = ship.dmg - state.ships_in_battle[target].armor;
                        state.ships_in_battle[target].hp -= dmg;
                        state.messages.unshift({
                            background: "linear-gradient(to right, " + state.ships_in_battle[ship_id].color + " , " + state.ships_in_battle[target].color + ")",
                            text: ship.type + " shot to " + state.ships_in_battle[target].type + " and deal " + dmg});
                    }
                }

            });

            return state;
        }
    }
};


function findTarget(state, player) {
    let targets = _.filter(state.ships_in_battle, function(ship) { return (ship.player !== player && ship.hp > 0); });
    if (targets.length === 0) return false;
    let target = _.sample(targets);
    let target_id = _.indexOf(state.ships_in_battle, target);

 //   console.log(targets, target, target_id);

    return target_id;
    //return _.findIndex(state.ships_in_battle, function(ship) { return (ship.player !== player && ship.hp > 0); });
}