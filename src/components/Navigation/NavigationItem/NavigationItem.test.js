import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItem from './NavigationItem';
import { NavLink } from 'react-router-dom';

configure({ adapter: new Adapter() });

describe('<NavigationItem/>', () => {
    it('should contain one nav link', () => {
        const wrapper = shallow(<NavigationItem />);
        expect(wrapper.find(NavLink)).toHaveLength(1);
    })
})