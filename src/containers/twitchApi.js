/* eslint-disable */
import React, { useState, useEffect } from 'react';
import regeneratorRuntime, { async } from 'regenerator-runtime';
import ClientId from '../clientId';

const TwtichData = () => {
  const [apiData, setApiData] = useState('');
  const [originalData, setOriginalData] = useState('');
  const [streamList, setStreamList] = useState(null);
  async function Api() {
    try {
      /* Get the top streams */
      const getStreams = 'https://api.twitch.tv/helix/streams?first=50';
      const request = await fetch(getStreams, {
        headers: { 'Client-ID': ClientId },
        method: 'GET',
      });
      const streamData = await request.json();
      const getGames = 'https://api.twitch.tv/helix/games/top?first=100';
      /* Get game names and box art urls */
      const request2 = await fetch(getGames, {
        headers: { 'Client-ID': ClientId },
        method: 'GET',
      });
      const gameData = await request2.json();
      /* Add numbers, game names, and box art urls to the streamData.data array */
      streamData.data.forEach((item, index) => {
        item.number = index + 1;
        const filterGameData = gameData.data.filter(game => game.id === item.game_id);
        if (filterGameData.length < 1) {
          item.imgUrl = '';
          item.gameName = 'Unknown';
          return;
        }
        item.imgUrl = filterGameData[0].box_art_url;
        item.gameName = filterGameData[0].name;
      });
      setApiData(streamData.data);
      setOriginalData(streamData.data);
    } catch (error) {
      setApiData(null);
      alert('Data failed to load, please try again');
    }
  }
  const filterStreams = event => {
    let streams = originalData.slice(0);
    streams = streams.filter(
      item => item.user_name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1,
    );
    setApiData(streams);
  };
  const formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };
  useEffect(
    () => {
      if (apiData === '') {
        Api();
        return;
      }
      setStreamList(
        apiData.length < 1
          ? null
          : apiData.map(item => (
            <li
              key={item.user_name}
              className="streamLi"
              onClick={() => window.open(`https://www.twitch.tv/${item.user_name}`)}
            >
              <div className="internalDiv">
                {`${item.number}.`} {item.user_name} - Viewer Count:{' '}
                {formatNumber(item.viewer_count)}
                <br /> <br />
                Currently Streaming: {item.gameName}
                <br />
                <img
                  src={item.imgUrl.replace('{width}x{height}', '125x125')}
                  alt="Box Art is Unavailable"
                />
                <br /> <br />
                Screen Shot:
                <br />
                <img
                  src={item.thumbnail_url.replace('{width}x{height}', '350x300')}
                  alt="Screen Shot is Unavailable"
                />
              </div>
            </li>
          )),
      );
    },
    [apiData],
  );
  return (
    <div>
      <div id="inputDiv">
        <input
          type="text"
          placeholder="Search for a Stream"
          onChange={event => filterStreams(event)}
        />
      </div>
      <div>
        <ul id="gameUl">{streamList}</ul>
      </div>
    </div>
  );
};
export default TwtichData;
