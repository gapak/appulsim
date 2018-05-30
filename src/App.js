import React, { Component } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import Footer from './footer.js'

import './css/App.css';

import {game_name} from './game/app_config';
import {getDefaultState, default_points, setDefaultPoints} from './game/default_state';
import {frame} from './game/frame';
import {tick} from './game/tick';

import {ships, avg_dmg, avg_armor, avg_speed} from './game/ships';
import {sortFleet} from './game/fleets';
import {shop} from './game/shop';
import {data} from './game/data';


class App extends Component {
    constructor(props) {
        super(props);

        this.timerID = null;

        this.playGame = this.playGame.bind(this);
        this.pauseGame = this.pauseGame.bind(this);
        this.setGameSpeed = this.setGameSpeed.bind(this);
        this.tick = this.tick.bind(this);
        this.newGame = this.newGame.bind(this);

        this.state = getDefaultState();

    }


    componentDidMount() {
        console.log('App '+game_name+' componentDidMount');
        var app_state = JSON.parse(localStorage.getItem(game_name+"_app_state"));
        this.setState(app_state ? app_state : getDefaultState());
        this.playGame();
    }

    playGame(speed_multiplier = false) {
        clearInterval(this.timerID);
        this.timerID = setInterval(
            () => this.frame(),
            Math.floor(this.state.game_speed / this.state.frame_rate / (speed_multiplier ? speed_multiplier : this.state.game_speed_multiplier))
        );
        this.setState({game_paused: false});
    }

    pauseGame() {
        clearInterval(this.timerID);
        this.setState({game_paused: true});
    }

    setGameSpeed(speed) {
        if (!this.state.game_paused) this.playGame(speed);
        this.setState({game_speed_multiplier: speed});
    }

    newGame() {
       // if (!window.confirm('Are you ready to start a new game? Your progress will be lost.')) return false;
        localStorage.setItem(game_name+"_app_state", null);
        let new_state = getDefaultState();
        this.setState(new_state);
        this.playGame(new_state.game_speed_multiplier);
    }

    frame() {
        let state = this.state;

        if (state.frame % state.frame_rate === 0) {
            state = this.tick(state);
            state.tick++;
        }

        state = frame(this.state);
        state.frame++;

    //    localStorage.setItem(game_name+"_app_state", JSON.stringify(state));
        this.setState(state);
        if (state.game_end) this.pauseGame();
    }

    tick(initial_state) {
        let state = tick(initial_state);
     //   localStorage.setItem(game_name+"_app_state", JSON.stringify(state));
        return state; // this.setState(state);
    }


    onClickWrapper(item) {
        if (item.cost) {
            if (this.isEnough(this.state, item.cost)) {
                if (item.onClick) this.setState(item.onClick(this.chargeCost(this.state, item.cost)));

            }
            else { return false; }
        }
        else {
            if (item.onClick) this.setState(item.onClick(this.state));
        }
    }

    drawCost(cost) {
        let text = '';
        _.each(cost, (value, resource) => {
            if (value > 0) {
                text += resource + ': ' + value + ' ';
            }
        });
        return text;
    };

    isEnough(state, cost) {
        let enough = true;
        _.each(cost, (value, resource_key) => {
            if (state[resource_key] < value) enough = false;
        });
        return enough;
    }

    chargeCost(state, cost) {
        if (!this.isEnough(this.state, cost)) return false;
        _.each(cost, (value, resource_key) => {
            state[resource_key] -= value;
        });
        return state;
    }


    render() {

        const speedBonus = ship => ((ship.speed / avg_speed) + 1) / 2;

        //const xhp = ship => Math.pow(ship.hp * Math.pow(1 + (1 / avg_dmg * ship.armor), (1 + 0.01 * ship.hp)), 1.01) / ship.cost;
        const ehp = ship => speedBonus(ship) * ship.hp * (1 + (1.15 / avg_dmg) * ship.armor) / ship.cost;
        const dpr = ship => speedBonus(ship) * (ship.dmg - avg_armor) * ship.rof / ship.cost;


        const badge = (state, item, child) => <OverlayTrigger delay={150} placement="bottom" overlay={tooltip(state, item)}>{child}</OverlayTrigger>;


        const tooltip = (state, item) =>
            <Tooltip id="tooltip">
                <div>
                    <div className="col-lg-12 infoBar">
                        <strong>{item.name}</strong>
                        <br />
                        <p>{item.text ? item.text : ''}</p>
                        <strong>{item.text2 ? item.text2 : ''}</strong>
                    </div>

                    {_.map(item.cost, (value, resource_key) => {
                        return <div className="row" key={resource_key}>
                            <div className="col-sm-6 infoBar">{resource_key}</div>
                            <div className="col-sm-6 infoBar">{value} / {state[resource_key]}</div>
                        </div>
                    })}
                </div>
            </Tooltip>;

        const shop_subcomponent = <div className="col-sm-6 flex-container-column">
            <h3>Points: {this.state.points}/{default_points}</h3>
            <div className="row">
                {badge(this.state, data.speed, <div className="col-sm-1 slim badge">speed</div>)}
                <div className="col-sm-1 slim badge">{badge(this.state, data.hp, <span>hp</span>)}</div>
                <div className="col-sm-1 slim badge">{badge(this.state, data.arm, <span>arm</span>)}</div>
                <div className="col-sm-1 slim badge">{badge(this.state, data.dmg, <span>dmg</span>)}</div>
                <div className="col-sm-1 slim badge">{badge(this.state, data.rof, <span>rof</span>)}</div>
                <div className="col-sm-3 slim"></div>
                <div className="col-sm-1 slim badge">{badge(this.state, data.ehp, <span>ehp</span>)}</div>
                <div className="col-sm-1 slim badge">{badge(this.state, data.dpr, <span>dpr</span>)}</div>
                <div className="col-sm-1 slim badge">{badge(this.state, data.ratio, <span>ratio</span>)}</div>
                <div className="col-sm-1 slim badge">{badge(this.state, data.mult, <span>mult</span>)}</div>
            </div>

            {_.map(shop, (item, key) =>
                (item.locked && item.locked(this.state))
                    ? ''
                    :
                    <div key={key} className="panel">
                        {badge(this.state, item,
                            <div className="slim">
                                <div className="row slim">
                                    <span className="col-sm-5 badge">{item.name}</span>
                                    <span className="col-sm-4">
                                        <button className={(item.cost ? this.isEnough(this.state, item.cost) ? '' : 'disabled' : '')}
                                            onClick={() => { this.onClickWrapper(item); }}> Buy for {item.cost.points} {item.cost.points === 1 ? 'point' : 'points'}
                                        </button>
                                    </span>
                                </div>
                                <div className="row slim">
                                    <div className="col-sm-1 slim">{ships[key].speed}</div>
                                    <div className="col-sm-1 slim">{ships[key].hp}</div>
                                    <div className="col-sm-1 slim">{ships[key].armor}</div>
                                    <div className="col-sm-1 slim">{ships[key].dmg}</div>
                                    <div className="col-sm-1 slim">{ships[key].rof}</div>
                                    <div className="col-sm-3 slim"></div>
                                    <div className="col-sm-1 slim">{ehp(ships[key]).toFixed(2)}</div>
                                    <div className="col-sm-1 slim">{dpr(ships[key]).toFixed(2)}</div>
                                    <div className="col-sm-1 slim">{(dpr(ships[key])/ehp(ships[key])).toFixed(2)}</div>
                                    <div className="col-sm-1 slim">{(dpr(ships[key])*ehp(ships[key])).toFixed(2)}</div>
                                </div>
                            </div>
                        )}
                    </div>
            )}
        </div>;

        const fleets_generator = (fleet, player, header) => <div className="col-sm-6" key={player}>
            {header}
            <div className="flex-element flex-container-row">
                {badge(this.state, data.type, <div className="flex-element badge">type</div>)}
                {badge(this.state, data.speed, <div className="flex-element badge">speed</div>)}
                {badge(this.state, data.hp, <div className="flex-element badge">hp</div>)}
                {badge(this.state, data.arm, <div className="flex-element badge">arm</div>)}
                {badge(this.state, data.dmg, <div className="flex-element badge">dmg</div>)}
                {badge(this.state, data.rof, <div className="flex-element badge">rof</div>)}
                {badge(this.state, data.next, <div className="flex-element badge">next</div>)}
            </div>
            {_.map(fleet.ships, (ship, key) =>
                <div key={key} className="flex-element flex-container-row slim">
                    <div className="flex-element slim" style={{backgroundColor: ship.color, opacity: (ship.hp > 0 ? 1 : 0.4)}}>{ship.type}</div>
                    <div className="flex-element slim">{ship.speed}</div>
                    <div className="flex-element slim">{ship.hp}</div>
                    <div className="flex-element slim">{ship.armor}</div>
                    <div className="flex-element slim">{ship.dmg}</div>
                    <div className="flex-element slim">{ship.rof}</div>
                    <div className="flex-element slim">{ship.fireAtFrame}</div>
                </div>
            )}
        </div>;


        const player_fleet_subcomponent = <div>
            <h4>
                <span> On your base </span>
                <button className={((_.sum(_.values(this.state.player_fleet)) > 0 && this.state.points === 0) || true ? 'btn btn-danger' : 'btn btn-danger disabled')}
                        onClick={() => {
                            let battle = this.state.in_battle_fleets;
                            battle[this.state.player_name] = {player: this.state.player_name, color: this.state.player_color, ships: sortFleet(this.state.player_fleet)};
                            this.setState({
                                in_battle_fleets: battle,
                                player_fleet: [],
                            });
                        }}> Sent Ships to Battle
                </button>
            </h4>
            {fleets_generator({player: this.state.player_name, ships: this.state.player_fleet}, 'player')}
        </div>;



        const fleet_headers = {
            space:  fleet => <h5>{fleet.player} fleet arrival in {fleet.flight_timer - this.state.tick + 1} minutes</h5>,
            battle: fleet => <h5>{fleet.player} fleet</h5>,
        };
        const in_battle_fleets_subcomponent = _.map(_.values(this.state.in_battle_fleets), (fleet, player) => fleets_generator(fleet, player, fleet_headers.battle(fleet)));
        const in_space_fleets_subcomponent = _.map(_.values(this.state.in_space_fleets), (fleet, player) => fleets_generator(fleet, player, fleet_headers.space(fleet)));


        return (
            <div className="App">
                <div className="fat" role="main">
                    <h4 className="fat">
                        <span onClick={() => { console.log(this.state); }}> Appulse Battle Simulator </span>
                        <a className="btn btn-warning hidden" onClick={this.newGame} title='Hard Reset For Developers'> New game </a>
                        <a className="btn btn-warning hidden" onClick={() => { setDefaultPoints(prompt('How many points?', default_points)); this.newGame(); }} title='Hard Reset For Developers'> More points </a>
                    </h4>
                    <div className="row fat">
                        {!this.state.game_end ?
                            <div className="col-sm-10 col">
                                {shop_subcomponent}
                                <div className="col">
                                    <h3>Fleets</h3>
                                    {this.state.player_fleet.length > 0 ? player_fleet_subcomponent : ''}
                                    {in_battle_fleets_subcomponent}
                                    {in_space_fleets_subcomponent}
                                </div>
                            </div>
                            :
                            <div className="col-sm-10 col">
                                <h2>Game End! Score: {this.state.game_end_score}</h2>
                                <h3><a className="btn btn-warning" onClick={this.newGame} title='Try One More Time'> New Game </a></h3>
                            </div>
                        }

                        <div className="col-sm-2 flex-container-column">
                            <div>
                                <div className="flex-element flex-container-column">
                                    <div className="flex-element">
                                        <h4>Round: {this.state.tick} Turn: {this.state.frame} </h4>
                                    </div>
                                    <div className="flex-element">
                                            <span onClick={() => {
                                                if (this.state.game_paused) {
                                                    this.playGame();
                                                } else {
                                                    this.pauseGame();
                                                }
                                            }}>
                                                <span className={classNames('glyphicon', (this.state.game_paused ? 'glyphicon-play' : 'glyphicon-pause'))} style={{width: 28, height: 28}}></span>
                                            </span>
                                        <span>
                                                {[1, 4, 16, 64].map((speed, index) => {
                                                    return <span key={index}>
                                                        {this.state.game_speed_multiplier === speed
                                                            ? <button className="" style={{width: 42, height: 28}}><u>{{0: 'x1', 1: 'x4',  2: 'x16',  3: 'x64'}[index]}</u></button>
                                                            : <button className="" style={{width: 42, height: 28}} onClick={() => {
                                                            this.setGameSpeed(speed); }}>{{0: 'x1', 1: 'x4',  2: 'x16',  3: 'x64'}[index]}
                                                        </button>}
                                                    </span>
                                                })}
                                            </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                { _.map(this.state.messages, (message, key) =>
                                    <div key={key} style={{background: message.background}} className="flex-element">
                                        {message.text}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <Footer newGame={this.newGame}/>
            </div>
        );
    }
}

export default App;
