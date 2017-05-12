import test from 'ava';
import { mount } from 'enzyme';
import React, { Component } from 'react';
import delay from 'async-delay';
import { spy } from 'sinon';
import Delayed from '../src/react-delayed';

test.beforeEach(t => {

    class Nested extends Component {

        /**
         * @method componentDidMount
         * @return {void}
         */
        componentDidMount() {}

        /**
         * @method componentWillUnmount
         * @return {void}
         */
        componentWillUnmount() {}

        /**
         * @method render
         * @return {XML}
         */
        render() {
            return <h1>&lt;Delayed /&gt;</h1>
        }

    }

    /**
     * @constant lifecycle
     * @type {{componentDidMount: *}}
     */
    t.context.lifecycle = {
        componentDidMount: spy(Nested.prototype, 'componentDidMount'),
        componentWillUnmount: spy(Nested.prototype, 'componentWillUnmount')
    };

    /**
     * @method createComponent
     * @param {Object} props
     * @return {XML}
     */
    t.context.createComponent = props => <Delayed {...props}><Nested /></Delayed>;

});

test('It should be able to delay mounting;', async t => {

    mount(t.context.createComponent({ mounted: true, mountAfter: 100 }));
    t.is(t.context.lifecycle.componentDidMount.callCount, 0);
    await delay(200);
    t.is(t.context.lifecycle.componentDidMount.callCount, 1);
    t.context.lifecycle.componentDidMount.reset();

    const wrapper = mount(t.context.createComponent({ mounted: false, mountAfter: 100 }));
    t.is(t.context.lifecycle.componentDidMount.callCount, 0);
    wrapper.setProps({ mounted: true });
    t.is(t.context.lifecycle.componentDidMount.callCount, 0);
    await delay(200);
    t.is(t.context.lifecycle.componentDidMount.callCount, 1);

});

test('It should be able to delay unmounting;', async t => {

    const wrapper = mount(t.context.createComponent({ mounted: true, unmountAfter: 100 }));

    t.is(t.context.lifecycle.componentWillUnmount.callCount, 0);
    wrapper.setProps({ mounted: false });
    t.is(t.context.lifecycle.componentWillUnmount.callCount, 0);
    await delay(200);
    t.is(t.context.lifecycle.componentWillUnmount.callCount, 1);

});
