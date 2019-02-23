/* eslint-disable */
import React from 'react';
import { render, cleanup, wait } from 'react-testing-library';
import regeneratorRuntime, { async } from 'regenerator-runtime';
import axios from 'axios';
import TwitchData from './twitchApi';

jest.mock('axios');

afterEach(cleanup);

describe('<TwitchData /> Component', () => {
  test('The Api is called', () => {
    const axiosSpy = jest.spyOn(axios, 'get');
    render(<TwitchData />);
    expect(axiosSpy).toHaveBeenCalled();
  });
  test('Data is displayed on page load', async () => {
    const { getByTestId } = render(<TwitchData />);
    await wait(() => {
      const streamList = getByTestId('streamListTest');
      expect(streamList.textContent).toContain('BeyondTheSummit');
      expect(streamList.textContent).toContain('FemSteph');
      expect(streamList.textContent).toContain('Dota 2');
      expect(streamList.textContent).toContain('Apex Legends');
      expect(streamList.textContent).toContain('37,058');
      expect(streamList.textContent).toContain('34,662');
    });
  });
});
