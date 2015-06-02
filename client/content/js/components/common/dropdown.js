import React from 'react/addons';
import cn from 'classnames';
import map from 'lodash/collection/map';
import findWhere from 'lodash/collection/findWhere';
import forEach from 'lodash/collection/forEach';
import clone from 'lodash/lang/clone';

export default React.createClass({
    propTypes: {
        items: React.PropTypes.array
    },

    getInitialState() {
        return {
            opened: false,
            items: this.props.items ? map(this.props.items, clone) : []
        };
    },

    render() {
        let selected;
        const items = this.state.items;

        if (items && items.length) {
            selected = findWhere(items, {selected: true});
        }

        if (!selected) {
            selected = {text: '', value: ''};
        }

        const classNames = cn({
            'dropdown': true,
            'open': this.state.opened
        });

        let index = -1;

        return (
            <div className={classNames}>
                <button className="btn btn-default" type="button" onClick={this._onToggle}>
                    {selected.text}
                    <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" role="menu">
                    {map(this.props.items, i => {
                        index += 1;
                        return (
                                <li key={JSON.stringify(i.value)} role="presentation">
                                    <a role="menuitem" tabIndex="-1" href="#" onClick={this._onSelect.bind(this, index)}>{i.text}</a>
                                </li>
                                );
                    })}
                 </ul>
            </div>
        );
    },

    _onToggle() {
        this.setState({
            opened: !this.state.opened
        });
    },

    _onSelect(index) {
        const items = this.state.items;
        forEach(items, i => i.selected = false);
        items[index].selected = true;

        if (this.onChange) {
            this.onChange(clone(items[index]));
        }

        this.setState({
            opened: false,
            items: items
        });
    }
});
