import React, { useEffect, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import InputSearch from '../InputSearch';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: jest.fn(),
}));

const setValue = jest.fn();

describe('src/components/elements/InputSearch', () => {
  beforeEach(() => {
    useState.mockImplementation((v) => ['value', setValue]);
    useEffect.mockImplementation((fn) => fn());
  });

  test('render', () => {
    InputSearch.defaultProps.onClick();
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<InputSearch resetValue={true} />);
    expect(tree).toMatchSnapshot();
  });

  test('function', () => {
    const event = {
      target: {
        value: 'val',
      },
    };
    const onClick = jest.fn();
    const result = InputSearch({ onClick });

    result.props.children[0].props.onChange(event);
    expect(setValue).toHaveBeenCalledWith('val');

    result.props.children[1].props.onClick();
    expect(setValue).toHaveBeenCalledWith('');

    result.props.children[2].props.onClick();
    expect(onClick).toHaveBeenCalledWith('value');
  });
});
