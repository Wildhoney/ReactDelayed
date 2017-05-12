import React, { Component } from 'react';
import { render } from 'react-dom';
import Symbol from 'es6-symbol';
import Modal from './modal';
import Delayed from '../../src/react-delayed';

/**
 * @constant modalTypes
 * @type {{without: *, with: *}}
 */
const modalTypes = {
    without: Symbol('without'),
    with: Symbol('with')
};

/**
 * @class Example
 * @extends {Component}
 */
class Example extends Component {

    /**
     * @constant state
     * @type {{modal: null}}
     */
    state = { modal: null };

    /**
     * @method render
     * @return {XML}
     */
    render() {

        const isWithoutOpen = this.state.modal === modalTypes.without;
        const isWithOpen = this.state.modal === modalTypes.with;

        return (
            <main>

                <section className="buttons">
                    <button onClick={() => this.setState({ modal: modalTypes.without })}>Without &lt;Delayed /&gt;</button>
                    <button onClick={() => this.setState({ modal: modalTypes.with })}>With &lt;Delayed /&gt;</button>
                </section>

                <Modal
                    title="Without &lt;Delayed /&gt;"
                    isOpen={isWithoutOpen}
                    onClose={() => this.setState({ modal: null })}
                    >
                    {isWithoutOpen && <img src="./images/nyan.gif" alt="Nyan" />}
                </Modal>

                <Modal
                    title="With &lt;Delayed /&gt;"
                    isOpen={isWithOpen}
                    onClose={() => this.setState({ modal: null })}
                    >
                    <Delayed mounted={isWithOpen} unmountAfter={500}>
                        <img src="./images/nyan.gif" alt="Nyan" />
                    </Delayed>
                </Modal>

            </main>
        );

    }

}

document.addEventListener('DOMContentLoaded', () => {
    const mountNode = document.querySelector('section.app');
    render(<Example />, mountNode);
});
