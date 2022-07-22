import React, { useEffect, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Table, { Tables } from '../Table';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: jest.fn(),
}));

const setSortBy = jest.fn();

describe('src/components/elements/Table', () => {
  beforeEach(() => {
    useState.mockImplementation((v) => [v, setSortBy]);
    useEffect.mockImplementation((fn) => fn());
  });

  test('render', () => {
    const data = [
      {
        title: 'Username',
        key: 'username',
      },
    ];

    const dataSource = {
      results: [
        {
          email: 'bobibasari@gmail.com',
          gender: 'male',
          name: { title: 'Mr', first: 'Bobi', last: 'Basari' },
          registered: { date: '' },
        },
      ],
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <Table column={data} dataSource={dataSource} />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('function handleSortAsc', () => {
    const result = Table({ column: [], dataSource: [] });
    result.props.children.props.sortByAsc('name');
    expect(setSortBy).toHaveBeenCalledWith('name');
  });

  test('function handleSortDesc', () => {
    const result = Table({ column: [], dataSource: [] });
    result.props.children.props.sortByDesc('name');
    expect(setSortBy).toHaveBeenCalledWith('name');
  });

  test('render Tables', () => {
    const data = [
      {
        title: 'name',
        ascDesc: true,
        key: 'name',
        data: [{ text: 'Bobi', key: 'name' }],
      },
      {
        title: 'username',
        ascDesc: false,
        key: 'username',
        data: [{ text: 'Bobi', key: 'username' }],
      },
    ];
    Tables.defaultProps.sortByAsc();
    Tables.defaultProps.sortByDesc();

    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <Tables
        data={data}
        sortBy='name'
        sortByAsc={jest.fn()}
        sortByDesc={jest.fn()}
        sortFormat='asc'
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('function sortByAsc', () => {
    const data = [
      {
        title: 'name',
        ascDesc: true,
        key: 'name',
        data: [{ text: 'Bobi', key: 'name' }],
      },
    ];
    const sortByAsc = jest.fn();
    const sortByDesc = jest.fn();

    const result = Tables({
      data,
      sortBy: 'name',
      sortByAsc,
      sortByDesc,
      sortFormat: 'desc',
    });
    result.props.children[0].props.children[0].props.children[1].props.children[0].props.onClick();
    expect(sortByAsc).toHaveBeenCalledWith('name');

    result.props.children[0].props.children[0].props.children[1].props.children[1].props.onClick();
    expect(sortByDesc).toHaveBeenCalledWith('name');
  });
});
