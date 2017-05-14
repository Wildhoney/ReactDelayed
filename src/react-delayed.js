import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @constant types
 * @type {{mount: string, unmounted: string}}
 */
const types = {
    MOUNT: 'mount',
    UNMOUNT: 'unmount'
};

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
        children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
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
        this.props.mounted === true && this.handleVisibility(types.MOUNT);
    }

    /**
     * @method componentWillReceiveProps
     * @param {Object} nextProps
     * @return {void}
     */
    componentWillReceiveProps(nextProps) {
        this.props.mounted === false && nextProps.mounted === true && this.handleVisibility(types.MOUNT);
        this.props.mounted === true && nextProps.mounted === false && this.handleVisibility(types.UNMOUNT);
    }

    /**
     * @method handleVisibility
     * @param {String} type
     * @return {void}
     */
    handleVisibility(type) {

        const mounted = type === types.MOUNT;
        const timeout = this.props[`${type}After`];
        const invoker = timeout === 0 ? fn => fn() : setTimeout;

        clearTimeout(this.state.deferred);
        const deferred = invoker(() => this.setState({ mounted }), timeout);
        this.setState({ deferred });

    }

    /**
     * @method render
     * @return {XML}
     */
    render() {
        const isFunction = typeof this.props.children === 'function';
        return this.state.mounted ? (isFunction ? this.props.children() : this.props.children) : <this.props.nodeName />;
    }

}
