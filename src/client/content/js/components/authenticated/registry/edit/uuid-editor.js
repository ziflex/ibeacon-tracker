import React from 'react/addons';
import values from 'lodash/object/values';
import clone from 'lodash/lang/clone';
import uuid from '../../../../../../../shared/utils/uuid';

export default React.createClass({
    propTypes: {
        valueLink: React.PropTypes.object
    },

    getInitialState() {
        const parts = this.props.valueLink.value ? uuid.split(this.props.valueLink.value) : [];

        return {
            part1: parts.length >= 1 ? parts[0] : '',
            part2: parts.length >= 2 ? parts[1] : '',
            part3: parts.length >= 3 ? parts[2] : '',
            part4: parts.length >= 4 ? parts[3] : '',
            part5: parts.length >= 5 ? parts[4] : ''
        };
    },

    render() {
        return (
            <div className="row">
                <div className="col-lg-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="XXXXXXXX"
                        maxLength={8}
                        value={this.state.part1}
                        onChange={(event) => this._onChange('part1', event.target.value)}
                        />
                </div>
                <div className="col-lg-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="XXXX"
                        maxLength={4}
                        value={this.state.part2}
                        onChange={(event) => this._onChange('part2', event.target.value)}
                        />
                </div>
                <div className="col-lg-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="XXXX"
                        maxLength={4}
                        value={this.state.part3}
                        onChange={(event) => this._onChange('part3', event.target.value)}
                        />
                </div>
                <div className="col-lg-2">
                    <input
                        type="text"
                        className="form-control"

                        placeholder="XXXX"
                        maxLength={4}
                        value={this.state.part4}
                        onChange={(event) => this._onChange('part4', event.target.value)}
                        />
                </div>
                <div className="col-lg-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="XXXXXXXXXXXX"
                        maxLength={12}
                        value={this.state.part5}
                        onChange={(event) => this._onChange('part5', event.target.value)}
                        />
                </div>
            </div>
        );
    },

    _onChange(part, value) {
        this.setState({
            [part]: value
        });

        // at this moment state isn't updated yet, so we have to do it manually
        // probably it's a bug
        const state = clone(this.state);
        state[part] = value;

        if (this.props.valueLink) {
            this.props.valueLink.requestChange(values(state).join(''));
        }
    }
});
