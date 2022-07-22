import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Home from '../Home';
import Loader from '../../../components/elements/Loader';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn((fn) => fn()),
  useSelector: jest.fn((fn) => fn()),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: jest.fn(),
}));

const dispatch = jest.fn();

const setResetSearch = jest.fn();
const setResetGender = jest.fn();
const setResetPagination = jest.fn();
const setFilterGender = jest.fn();
const setFilterSearch = jest.fn();

describe('src/components/elements/Home', () => {
  beforeEach(() => {
    useState.mockImplementation(() => [false, setResetSearch]);
    useState.mockImplementation(() => [false, setResetGender]);
    useState.mockImplementation(() => [false, setResetPagination]);
    useState.mockImplementation(() => ['', setFilterGender]);
    useState.mockImplementation(() => ['', setFilterSearch]);
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((fn) => {
      fn({});
      return {
        data: {
          results: [
            {
              name: 'name',
            },
          ],
        },
        getAllUsers: jest.fn(),
      };
    });
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Home />);
    expect(tree).toMatchSnapshot();
  });

  test('loading', () => {
    useSelector.mockImplementationOnce(() => ({
      data: {},
    }));

    const result = Home();
    expect(result.props.children.type).toBe(Loader);
  });

  test('function getValueSearch', () => {
    const result = Home();
    result.props.children[0].props.children[0].props.onClick();
    expect(dispatch).toHaveBeenCalled();
  });

  test('function getValueGender', () => {
    const result = Home();
    result.props.children[0].props.children[1].props.onClick();
    expect(dispatch).toHaveBeenCalled();
  });

  test('function getValueGender', () => {
    const result = Home();
    result.props.children[0].props.children[2].props.onClick();
    expect(dispatch).toHaveBeenCalled();
  });

  test('function clickPagination', () => {
    const result = Home();
    result.props.children[2].props.children.props.onClick();
    expect(dispatch).toHaveBeenCalled();
  });
});
