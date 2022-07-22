import React, { useEffect, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Pagination from '../Pagination';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: jest.fn(),
}));

const currentPage = 1;
const setCurrentPage = jest.fn();
const lastPage = 5;
const setLastPage = jest.fn();

describe('src/components/elements/Pagination', () => {
  beforeEach(() => {
    useState.mockImplementation(() => [currentPage, setCurrentPage]);
    useState.mockImplementation(() => [lastPage, setLastPage]);
    useEffect.mockImplementation((fn) => fn());
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Pagination resetValue={true} />);
    Pagination.defaultProps.onClick();
    expect(tree).toMatchSnapshot();
  });

  test('function handleClick', () => {
    const onClick = jest.fn();
    const result = Pagination({ onClick });

    result.props.children[0].props.onClick();
    expect(onClick).toHaveBeenCalledWith(1);

    result.props.children[1].props.onClick();
    expect(onClick).toHaveBeenCalledWith(1);

    result.props.children[2].props.children[0].props.onClick();
    expect(onClick).toHaveBeenCalledWith(1);

    result.props.children[3].props.onClick();
    expect(onClick).toHaveBeenCalledWith(1);

    result.props.children[4].props.onClick();
    expect(onClick).toHaveBeenCalledWith(1);
  });
});
