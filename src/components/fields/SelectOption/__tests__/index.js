import React, { useEffect, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SelectOption from '../SelectOption';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: jest.fn(),
}));

const open = false;
const setOpen = jest.fn();
const value = '';
const setValue = jest.fn();

describe('src/components/elements/SelectOption', () => {
  beforeEach(() => {
    useState.mockImplementation(() => [open, setOpen]);
    useState.mockImplementation(() => [value, setValue]);
    useEffect.mockImplementation((fn) => fn());
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SelectOption />);
    SelectOption.defaultProps.onClick();
    expect(tree).toMatchSnapshot();
  });

  test('function handleClick', () => {
    const onClick = jest.fn();

    useState.mockImplementationOnce(() => [true, setOpen]);
    useState.mockImplementationOnce(() => ['male', setValue]);

    const result = SelectOption({ resetValue: true, optionList: [], onClick });
    result.props.children[0].props.onClick();
    expect(setOpen).toHaveBeenCalledWith(false);

    console.log(result.props.children[1].props.children[0].props.onClick);
    result.props.children[1].props.children[0].props.onClick('male');
    expect(onClick).toHaveBeenCalled();
  });
});
