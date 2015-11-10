import React from 'react/addons';
import {Input, ButtonToolbar, OverlayTrigger, Popover} from 'react-bootstrap';
import isEmpty from 'lodash/lang/isEmpty';

export default React.createClass({
    propTypes: {
        validationError: React.PropTypes.string,
        popoverPosition: React.PropTypes.oneOf([
            'bottom',
            'top',
            'left',
            'right'
        ])
    },
    _validationState() {
        return isEmpty(this.props.validationError) ? 'success' : 'error';
    },
    render() {
        let component = null;
        const input = (<Input
            hasFeedback
            {...this.props}
            bsStyle={this._validationState()}
            />);

        if (this.props.validationError) {
            const popover = (
                <Popover title="Error">
                    {this.props.validationError}
                </Popover>
            );

            const placement = this.props.popoverPosition || 'top';

            component = (
                <OverlayTrigger trigger="hover" placement={placement} overlay={popover}>
                    {input}
                </OverlayTrigger>
            );
        } else {
            component = input;
        }

        return (
            <ButtonToolbar>
                {component}
            </ButtonToolbar>
        );
    }
});
