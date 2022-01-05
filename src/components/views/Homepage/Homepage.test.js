import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const component = shallow(<HomepageComponent users={{}} fetchPublishedPosts={() => {}} />);
    expect(component).toBeTruthy();
  });
});
