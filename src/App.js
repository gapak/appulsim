import React, { Component } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { Tooltip, OverlayTrigger, Modal } from 'react-bootstrap';
import Footer from './footer.js'

import './css/App.css';

import {game_name} from './game/app_config';
import {getDefaultState} from './game/default_state';
import {frame} from './game/frame';
import {tick} from './game/tick';

import {ships} from './game/ships';
import {getFleet, getRandomFleet} from './game/fleets';
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
        new_state.ships_in_battle = getRandomFleet();
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

        localStorage.setItem(game_name+"_app_state", JSON.stringify(state));
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
        let state = this.state;


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

                <div className="flex-element flex-container-row">
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
                            {[1, 2, 4, 8, 16, 32, 64].map((speed, index) => {
                                return <span key={index}>
                                    {this.state.game_speed_multiplier === speed
                                        ? <button className="" style={{width: 42, height: 28}}><u>{{0: 'x1', 1: 'x2', 2: 'x4', 3: 'x8', 4: 'x16', 5: 'x32', 6: 'x64'}[index]}</u></button>
                                        : <button className="" style={{width: 42, height: 28}} onClick={() => {
                                        this.setGameSpeed(speed); }}>{{0: 'x1', 1: 'x2', 2: 'x4', 3: 'x8', 4: 'x16', 5: 'x32', 6: 'x64'}[index]}
                                    </button>}
                                </span>
                            })}
                        </span>
                    </div>

                    <div className="flex-element">
                        {this.state.matrix_show}
                    </div>
                </div>

                <h2>Appulse Battle Simulator</h2>
                <div className="row">
                    <div className="col-sm-3 flex-container-column">
                        <h3><button className={(_.sum(_.values(this.state.player_ships)) > 0 ? 'btn btn-danger' : 'btn btn-danger disabled')}
                                    onClick={() => {
                                        let player_fleet = getFleet({player: 'Player', color: '#ffffff', fleet: this.state.player_ships});
                                        this.setState({
                                            battle_step: 'battle',
                                            player_ships: {frigate: 0, cruiser: 0, battlecruiser: 0, dreadnought: 0, battleship: 0, titan: 0},
                                            ships_in_battle: this.state.ships_in_battle.concat(player_fleet)
                                        });
                                    }}>Sent Ships to Battle</button>
                        </h3>
                        <h3>Points: {this.state.points}/32</h3>

                        {_.map(shop, (item, key) =>
                            (item.locked && item.locked(this.state))
                                ? ''
                                :
                                <div key={key} className="panel">
                                    <span className="badge alignleft">{this.state.player_ships[key]}</span>
                                    <OverlayTrigger delay={150} placement="right" overlay={tooltip(this.state, item)}>
                                        <button
                                            className={(item.cost ? this.isEnough(this.state, item.cost) ? '' : 'disabled' : '')}
                                            onClick={() => { this.onClickWrapper(item); }}>
                                            {item.name}
                                        </button>
                                    </OverlayTrigger>

                                    <div key={key} className="flex-container-row slim">
                                        <div className="flex-element slim">hp: {ships[key].hp}</div>
                                        <div className="flex-element slim">armor: {ships[key].armor}</div>
                                        <div className="flex-element slim">damage: {ships[key].dmg}x{ships[key].rof}</div>
                                    </div>
                                </div>
                        )}
                    </div>
                    <div className="col-sm-6 flex-container-column">
                        <div className="flex-element flex-container-row">
                            <div className="flex-element">type</div>
                            <div className="flex-element">hp</div>
                            <div className="flex-element">armor</div>
                            <div className="flex-element">dmg</div>
                            <div className="flex-element">rof</div>
                            <div className="flex-element">next shot</div>
                        </div>
                        { _.map(this.state.ships_in_battle, (ship, key) =>
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
                    <div className="col-sm-3 flex-container-column">
                        { _.map(this.state.messages, (message, key) =>
                            <div key={key} style={{background: message.background}} className="flex-element">
                                {message.text}
                            </div>
                        )}
                    </div>
                </div>
            <Footer newGame={this.newGame}/>
            </div>
        );
    }
}

export default App;
