import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @class ReactDelayed
 * @extends {Component}
 */
export default class ReactDelayed extends Component {

    /**
     * @constant state
     * @type {{mounted: boolean}}
     */
    state = { mounted: false, deferred: null };

    /**
     * @constant propTypes
     * @type {{mountAfter: function, unmountAfter: function}}
     */
    static propTypes = {
        mounted: PropTypes.bool.isRequired,
        mountAfter: PropTypes.number.isRequired,
        unmountAfter: PropTypes.number.isRequired,
        children: PropTypes.node.isRequired,
        nodeName: PropTypes.string.isRequired
    };

    /**
     * @constant defaultProps
     * @type {{mountAfter: number, unmountAfter: number}}
     */
    static defaultProps = {
        mounted: false,
        mountAfter: 0,
        unmountAfter: 0,
        children: <span />,
        nodeName: 'span'
    };

    /**
     * @method componentDidMount
     * @return {void}
     */
    componentDidMount() {
        // this.props.mounted === true && this.handleVisibility('mount');
    }

    /**
     * @method componentWillReceiveProps
     * @param {Object} nextProps
     * @return {void}
     */
    componentWillReceiveProps(nextProps) {
        this.props.mounted === false && nextProps.mounted === true && this.handleVisibility('mount');
        this.props.mounted === true && nextProps.mounted === false && this.handleVisibility('unmount');
    }

    /**
     * @method handleVisibility
     * @param {String} type
     * @return {void}
     */
    handleVisibility(type) {

        const mounted = type === 'mount';
        const timeout = this.props[`${type}After`];
        const invoker = timeout === 0 ? (fn, _) => fn() : setTimeout;

        clearTimeout(this.state.deferred);
        const deferred = invoker(() => this.setState({ mounted }), timeout);
        this.setState({ deferred });

    }

    /**
     * @method render
     * @return {XML}
     */
    render() {
        return this.state.mounted ? this.props.children : <this.props.nodeName />;
    }

}
