import React from 'react';
import toJSON from 'enzyme-to-json';
import { render } from 'enzyme';
import Button from '../Components/FormElements/Button.js';

it('Check button snapshot', () => {
    const wrapper = render(<Button />);
    expect(toJSON(wrapper))
    .toMatchSnapshot("Button snap");
})