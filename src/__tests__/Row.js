import React from 'react';
import toJSON from 'enzyme-to-json';
import { render } from 'enzyme';
import Row from '../Components/FormElements/Row.js';

it('Check snapshot for Main', () => {
    const wrapper = render(<Row />);
    expect(toJSON(wrapper))
  .toMatchSnapshot("Row snap");
})
