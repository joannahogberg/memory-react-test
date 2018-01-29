import React from 'react';
import toJSON from 'enzyme-to-json';
import { render} from 'enzyme';
import Header from '../Components/FormElements/Header.js';

it("Update state when disableSelect is being called", () => {
    const wrapper = render(<Header />);
    expect(toJSON(wrapper))
    .toMatchSnapshot("Header snap");
});
