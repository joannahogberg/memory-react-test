import React from 'react';
import { shallow, mount } from 'enzyme';
import Select from '../../Components/FormElements/Select.js';

it('Check class if disabled is set to true', () => {
    const wrapper = shallow(<Select disabled={true}/>);
    expect(wrapper.find('select').props().className).toContain('pointer-events-none')
})