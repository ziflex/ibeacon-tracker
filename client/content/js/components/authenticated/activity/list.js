import React from 'react/addons';
import {Navigation} from 'react-router';
import Immutable from 'immutable';
import Item from './list-item';
import ActivityActions from '../../../actions/activity';

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
        let index = -1;
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.items.toSeq().map((item) => {
                            index += 1;
                            return (<Item key={item.uuid} index={index} item={item} />);
                        }).toArray()}
                    </tbody>
                </table>
                <hr />
                <div className="row">
                    <div className="col-sm-3 col-md-11">
                        <button className="btn btn-success pull-right" onClick={this._onRefresh}>Refresh</button>
                    </div>
                </div>
            </div>
        );
    },

    _onRefresh() {
        ActivityActions.find();
    }
});
