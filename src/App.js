import React, { Component } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

import './css/App.css';

import {game_name} from './game/app_config';
import {getDefaultState, default_points, setDefaultPoints} from './game/default_state';
import {frame} from './game/frame';
import {tick} from './game/tick';

import {ships} from './game/ships';
import {sortFleet} from './game/fleets';
import {shop} from './game/shop';


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
        if (!window.confirm('Are you ready to start a new game? Your progress will be lost.')) return false;
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

        const tooltip = (state, item) =>
            <Tooltip id="tooltip">
                <div className="col-lg-12 infoBar">
                    {item.name}
                    <br />
                    {item.text ? item.text : ''}
                </div>

                {_.map(item.cost, (value, resource_key) => {
                    return <div className="row" key={resource_key}>
                        <div className="col-sm-6 infoBar">{resource_key}</div>
                        <div className="col-sm-6 infoBar">{value} / {state[resource_key]}</div>
                    </div>
                })}
            </Tooltip>;
                    


        return (
            <div className="App">
                <div className="container theme-showcase" role="main">
                    <h4>
                        <span onClick={() => { console.log(this.state); }}> Appulse Battle Simulator </span>
                        <a className="btn btn-warning" onClick={this.newGame} title='Hard Reset For Developers'> New game </a>
                        <a className="btn btn-warning" onClick={() => { setDefaultPoints(prompt('How many points?', default_points)); this.newGame(); }} title='Hard Reset For Developers'> More points </a>
                    </h4>
                    <div className="row">
                        <div className="col-sm-4 flex-container-column">
                            <h3>Points: {this.state.points}/{default_points}</h3>

                            {_.map(shop, (item, key) =>
                                (item.locked && item.locked(this.state))
                                    ? ''
                                    :
                                    <div key={key} className="panel">
                                        <OverlayTrigger delay={150} placement="right" overlay={tooltip(this.state, item)}>
                                            <div key={key} className="row slim">
                                                <span className="col-sm-3 badge">{item.name}</span>
                                                <div className="col-sm-2 slim">hp: {ships[key].hp}</div>
                                                <div className="col-sm-2 slim">arm: {ships[key].armor}</div>
                                                <div className="col-sm-3 slim">dmg: {ships[key].dmg}x{ships[key].rof}</div>
                                                <span className="col-sm-2">
                                                    <button className={(item.cost ? this.isEnough(this.state, item.cost) ? '' : 'disabled' : '')}
                                                        onClick={() => { this.onClickWrapper(item); }}> Buy </button>
                                                </span>
                                            </div>
                                        </OverlayTrigger>
                                    </div>
                            )}
                        </div>
                        <div className="col-sm-5 flex-container-column">
                            <div className="flex-container-column">
                                <div className="flex-element flex-container-row">
                                    <div className="flex-element">type</div>
                                    <div className="flex-element">hp</div>
                                    <div className="flex-element">armor</div>
                                    <div className="flex-element">dmg</div>
                                    <div className="flex-element">rof</div>
                                    <div className="flex-element">next shot</div>
                                </div>

                                {this.state.player_fleet.length > 0? <div>
                                    <h4>
                                        <span> On your base </span>
                                        <button className={(_.sum(_.values(this.state.player_fleet)) > 0 || true ? 'btn btn-danger' : 'btn btn-danger disabled')}
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
                                    { _.map(this.state.player_fleet, (ship, key) =>
                                        <div key={key} style={{backgroundColor: ship.color, opacity: (ship.hp > 0 ? 1 : 0.5)}} className="flex-element flex-container-row slim">
                                            <div className="flex-element slim">{ship.type}</div>
                                            <div className="flex-element slim">{ship.hp}</div>
                                            <div className="flex-element slim">{ship.armor}</div>
                                            <div className="flex-element slim">{ship.dmg}</div>
                                            <div className="flex-element slim">{ship.rof}</div>
                                            <div className="flex-element slim">{ship.fireAtFrame}</div>
                                        </div>
                                    )}
                                </div> : ''}

                                { _.map(_.values(this.state.in_battle_fleets), (fleet, key) =>
                                    <div key={key}>
                                        <h5>{fleet.player} fleet</h5>
                                        {_.map(fleet.ships, (ship, key) =>
                                            <div key={key} style={{backgroundColor: ship.color, opacity: (ship.hp > 0 ? 1 : 0.5)}} className="flex-element flex-container-row slim">
                                                <div className="flex-element slim">{ship.type}</div>
                                                <div className="flex-element slim">{ship.hp}</div>
                                                <div className="flex-element slim">{ship.armor}</div>
                                                <div className="flex-element slim">{ship.dmg}</div>
                                                <div className="flex-element slim">{ship.rof}</div>
                                                <div className="flex-element slim">{ship.fireAtFrame}</div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-sm-3 flex-container-column">
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
            </div>
        );
    }
}

export default App;
