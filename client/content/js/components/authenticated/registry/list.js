import React from 'react/addons';
import {Navigation} from 'react-router';
import Immutable from 'immutable';
import Item from './list-item';

export default React.createClass({
    mixins: [
        React.addons.PureRenderMixin,
        Navigation
    ],

    propTypes: {
        items: React.PropTypes.object.isRequired
    },

    getDefaultProps() {
        return {
            items: Immutable.Map()
        };
    },

    render() {
        let num = 0;
        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>UUID</th>
                            <th>Name</th>
                            <th>Subscribers</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.items.toSeq().map((item) => {
                            num += 1;
                            return (<Item key={item.uuid} number={num} item={item} />);
                        }).toArray()}
                    </tbody>
                </table>
                <hr />
                <div className="row">
                    <div className="col-sm-3 col-md-11">
                        <button className="btn btn-success pull-right" onClick={this._onNew}>New</button>
                    </div>
                </div>
            </div>
        );
    },

    _onNew() {
        this.transitionTo('/home/registry/edit');
    }
});
