import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Modal extends PureComponent {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        className: PropTypes.string,
        title: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
        isOpen: PropTypes.bool.isRequired,
        onOpen: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        stopPropagation: PropTypes.func.isRequired
    };

    /**
     * @constant defaultProps
     * @type {Object}
     */
    static defaultProps = {
        isOpen: false,
        className: '',
        onOpen: () => {},
        onClose: () => {},
        stopPropagation: event => event.stopPropagation()
    };

    /**
     * @method componentWillReceiveProps
     * @param {Object} nextProps
     * @return {void}
     */
    componentWillReceiveProps(nextProps) {
        !this.props.isOpen && nextProps.isOpen && this.props.onOpen();
    }

    /**
     * @method render
     * @return {XML}
     */
    render() {

        const { children, isOpen, className, onClose, stopPropagation } = this.props;
        const modalClassName = `modal ${isOpen ? 'open' : 'closed'} ${className}`.trim();

        return (
            <span className="modal-container">

                <section className={modalClassName} onClick={onClose.bind(this)}>

                    <section className="dialog" onClick={stopPropagation}>

                        <header>
                            <h5>{this.props.title}</h5>
                            <a className="close" onClick={onClose.bind(this)}>&times;</a>
                        </header>

                        <div className="content">
                            {children}
                        </div>

                    </section>

                </section>

            </span>
        );

    }

}
