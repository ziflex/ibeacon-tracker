import React from '../../../../../../../node_modules/react/addons';
import values from 'lodash/object/values';

export default React.createClass({
    propTypes: {
        valueLink: React.PropTypes.object
    },

    getInitialState() {
        const parts = this.props.valueLink.value ? this.props.valueLink.value.split('-') : [];

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
                        type="number"
                        className="form-control"
                        min="10000000"
                        max="99999999"
                        step="1"
                        placeholder="XXXXXXXX"
                        value={this.state.part1}
                        onChange={(event) => this._onChange('part1', event.target.value)}
                        />
                </div>
                <div className="col-lg-2">
                    <input
                        type="number"
                        className="form-control"
                        min="1000"
                        max="9999"
                        step="1"
                        placeholder="XXXX"
                        value={this.state.part2}
                        onChange={(event) => this._onChange('part2', event.target.value)}
                        />
                </div>
                <div className="col-lg-2">
                    <input
                        type="number"
                        className="form-control"
                        min="1000"
                        max="9999"
                        step="1"
                        placeholder="XXXX"
                        value={this.state.part3}
                        onChange={(event) => this._onChange('part3', event.target.value)}
                        />
                </div>
                <div className="col-lg-2">
                    <input
                        type="number"
                        className="form-control"
                        min="1000"
                        max="9999"
                        step="1"
                        placeholder="XXXX"
                        value={this.state.part4}
                        onChange={(event) => this._onChange('part4', event.target.value)}
                        />
                </div>
                <div className="col-lg-3">
                    <input
                        type="number"
                        className="form-control"
                        min="100000000000"
                        max="999999999999"
                        step="1"
                        placeholder="XXXXXXXXXXXX"
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

        if (this.props.valueLink) {
            this.props.valueLink.requestChange(values(this.state).join('-'));
        }
    }
});
