import React from 'react';
import { render, cleanup, fireEvent, wait } from 'react-testing-library';
import regeneratorRuntime, { async } from 'regenerator-runtime'; /* eslint-disable-line */
import axios from 'axios';
import TwitchData from './twitchApi';

jest.mock('axios');

afterEach(cleanup);

describe('<TwitchData /> Component', () => {
  console.error = jest.fn(); /* eslint-disable-line */
  /* Using this until there is a simpler work-around for testing async/await
   without triggering the new `act` warning */
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
  test('Typing in the input box filteres the data', async () => {
    const { getByTestId } = render(<TwitchData />);
    await wait(() => {
      const input = getByTestId('testInput');
      const streamList = getByTestId('streamListTest');
      fireEvent.change(input, { target: { value: '' } });
      expect(streamList.textContent).toContain('BeyondTheSummit');
      expect(streamList.textContent).toContain('FemSteph');

      fireEvent.change(input, { target: { value: 'OverwatchLeague' } });
      expect(streamList.textContent).not.toContain('BeyondTheSummit');
      expect(streamList.textContent).not.toContain('FemSteph');

      fireEvent.change(input, { target: { value: 'FemSteph' } });
      expect(streamList.textContent).toContain('FemSteph');
      expect(streamList.textContent).not.toContain('BeyondTheSummit');
    });
  });
});
