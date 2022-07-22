import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import PageNotFound from '../PageNotFound';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn((fn) => fn()),
}));

const navigate = jest.fn();

describe('src/components/elements/PageNotFound', () => {
  beforeEach(() => {
    useNavigate.mockImplementation(() => navigate);
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PageNotFound />);
    expect(tree).toMatchSnapshot();
  });

  test('function handleClick', () => {
    const result = PageNotFound();
    result.props.children[1].props.onClick();
    expect(navigate).toHaveBeenCalled();
  });
});
