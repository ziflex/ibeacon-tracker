import React from 'react/addons';
import cn from 'classnames';

export default React.createClass({
    propTypes: {
        items: React.PropTypes.object,
        onSelect: React.PropTypes.func,
        valueLink: React.PropTypes.object
    },
    getInitialState() {
        return {
            opened: false,
            items: this.props.items
        };
    },
    _onToggle() {
        this.setState({
            opened: !this.state.opened
        });
    },
    _onSelect(index) {
        let items = this.state.items;

        items.forEach(i => {
            i.selected = false;
        });
        items = items.update(index, (i) => {
            i.selected = true;
            return i;
        });

        const selected = items.get(index);

        if (this.props.onSelect) {
            this.props.onSelect(index, selected.value);
        }

        if (this.props.valueLink) {
            this.props.valueLink.requestChange(selected.value);
        }

        this.setState({
            opened: false,
            items: items
        });
    },
    render() {
        let selected;
        const items = this.state.items;

        if (items && items.count()) {
            selected = items.find(i => i.selected);
        }

        if (!selected) {
            selected = {text: '', value: '', selected: true };
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
                    {this.props.items.toSeq().map(i => {
                        index += 1;
                        return (
                                <li key={JSON.stringify(i)} role="presentation">
                                    <a role="menuitem" tabIndex="-1" href="#" onClick={this._onSelect.bind(this, index)}>{i.text}</a>
                                </li>
                                );
                    }).toArray()}
                 </ul>
            </div>
        );
    }
});
