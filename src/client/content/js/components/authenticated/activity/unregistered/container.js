import React from 'react/addons';
import List from './list';
import ActivityActions from '../../../../actions/activity';

export default React.createClass({
    propTypes: {
        items: React.PropTypes.object
    },
    _onRefresh() {
        ActivityActions.findUnregistered();
    },
    render() {
        return (
            <div>
                <List items={this.props.items} />
                <hr />
                <div className="row">
                    <div className="col-sm-3 col-md-11">
                        <button className="btn btn-primary" onClick={this._onRefresh}>Refresh</button>
                    </div>
                </div>
            </div>
        );
    }
});
