import object from '../Models/model';

function findMatches(wordToMatch, videos) {
  return videos.filter((item) => {
    const regex = new RegExp(wordToMatch, 'gi');
    return item.title.match(regex) || item.playlist.match(regex);
  });
}


function sortPlaylist(data, data2, state) {
  const sortedAll = data2.data.allSongs.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  let duplicate = '';
  let array = [];
  sortedAll.forEach((item) => {
    if (item.title === duplicate) {
    } else {
      array.push(item);
    }
    duplicate = item.title;
  });
  if (state.playlistState === 'All') {
    if (state.search !== '') {
      const search = [...array];
      array = findMatches(state.search, search);
    }

    return [array];
  }
  if (state.playlistState === 'Playlists') {
    return data;
  }
  if (state.playlistState === 'Day') {
    let dayArray = [];
    let date = '';
    const dayPlaylist = [];
    array.forEach((item, index) => {
      const current = new Date(item.publishedAt).toDateString();
      if (date !== current && index === 0) {
        item.playlist = current;
        dayArray.push(item);
      }
      if (date === current) {
        item.playlist = date;
        dayArray.push(item);
      }
      if (date !== current && index !== 0) {
        dayPlaylist.push(dayArray);
        dayArray = [];
      }
      date = new Date(item.publishedAt).toDateString();
    });
    return dayPlaylist;
  }
}

export default { sortPlaylist };
