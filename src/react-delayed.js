import { React, Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @class ReactDelayed
 * @extends {Component}
 */
export default class ReactDelayed extends Component {

    /**
     * @constant state
     * @type {{visible: boolean}}
     */
    state = { visible: false, deferred: null };

    /**
     * @constant propTypes
     * @type {{mountAfter: function, unmountAfter: function}}
     */
    static propTypes = {
        visible: PropTypes.bool.isRequired,
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
        visible: false,
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
        this.props.visible === true && this.handleVisibility('mount');
    }

    /**
     * @method componentWillReceiveProps
     * @param {Object} nextProps
     * @return {void}
     */
    componentWillReceiveProps(nextProps) {
        this.props.visible === false && nextProps.visible === true && this.handleVisibility('mount');
        this.props.visible === true && nextProps.visible === false && this.handleVisibility('unmount');
    }

    /**
     * @method handleVisibility
     * @param {String} type
     * @return {void}
     */
    handleVisibility(type) {

        const visible = type === 'mount';
        const timeout = this.props[`${type}After`];
        const invoker = timeout === 0 ? (fn, _) => fn() : setTimeout;

        clearTimeout(this.state.deferred);
        const deferred = invoker(() => this.setState({ visible }));
        this.setState({ deferred });

    }

    /**
     * @method render
     * @return {XML}
     */
    render() {
        return this.state.visible ? this.props.children : <this.props.nodeName />;
    }

}
