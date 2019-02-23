export default {
  get: () => {
    return Promise.resolve({
      data: {
        data: [
          {
            name: 'Dota 2',
            gameName: 'Dota 2',
            game_id: '29595',
            id: '29595',
            imgUrl: '',
            box_art_url: '',
            thumbnail_url: '',
            number: 2,
            user_name: 'BeyondTheSummit',
            viewer_count: 37058,
          },
          {
            name: 'Apex Legends',
            gameName: 'Apex Legends',
            game_id: '511224',
            id: '511224',
            imgUrl: '',
            box_art_url: '',
            thumbnail_url: '',
            number: 1,
            user_name: 'FemSteph',
            viewer_count: 34662,
          },
        ],
      },
    });
  },
};
