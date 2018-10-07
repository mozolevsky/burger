import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Backdrop from './Backdrop'
import classes from './Backdrop.css'

configure({ adapter: new Adapter() });

describe('<Backdrop />', () => {
    it('should be visible', () => {
        const wrapper = shallow(<Backdrop show={true}/>);
        expect(wrapper.find('div')).toHaveLength(1);
    })
    
    it('should be invisible', () => {
        const wrapper = shallow(<Backdrop/>);
        expect(wrapper.find('div')).toHaveLength(0);
    })

    it('should have specific css class', () => {
        const wrapper = shallow(<Backdrop show={true}/>);
        expect(wrapper.find('div').hasClass(classes.Backdrop)).toEqual(true);
    })
})