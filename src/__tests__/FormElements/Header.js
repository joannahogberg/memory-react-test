import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';
import Header from '../../Components/FormElements/Header.js';

it("Check snapshot for header", () => {
    const wrapper = shallow(<Header />);
    expect(toJSON(wrapper))
    .toMatchSnapshot("Header snap");
});

it("Look for h1", () => {
    const wrapper = shallow(<Header />);
    const h1 = wrapper.find('h1')
    expect(h1.text()).toContain('Memory Game')
    expect(h1.props().className).toContain('text-center')
});

it("Check that button and list is rendered when lgamesPlayed > 0", () => {
    const onClick = jest.fn();
    const games = 2;
    const wrapper = mount(<Header gamesPlayed={games} onClick={onClick}/>);
    const btn = wrapper.find('button')
    const list = wrapper.find('ul').children();
    expect(btn.text()).toEqual('CLEAR STATS')
    expect(list).toHaveLength(3)
    btn.simulate('click')
    expect(onClick).toHaveBeenCalled()   
});
