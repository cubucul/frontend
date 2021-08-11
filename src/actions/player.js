import * as types from '../types/player';
import { addEpisodeToHistory, updateEpisodeTimeInHistory } from './history';

const loadEpisodeData = (data) => ({
  type: types.PLAYER_LOAD_EPISODE_DATA,
  data
});

export const playerPlay = () => ({
  type: types.PLAYER_PLAY
});

export const playerPause = () => ({
  type: types.PLAYER_PAUSE
});

export const playerCanPlay = () => ({
  type: types.PLAYER_CAN_PLAY
});

export const playerUpdateTime = (episodeId, currentTime) => (dispatch) => {
  dispatch({
    type: types.PLAYER_UPDATE_TIME,
    currentTime
  });
  dispatch(updateEpisodeTimeInHistory(episodeId, currentTime));
};

export const playerChangeVolume = (volume) => ({
  type: types.PLAYER_CHANGE_VOLUME,
  volume
});

export const playerToggleMute = () => ({
  type: types.PLAYER_TOGGLE_MUTE
});

export const playerChangePlaybackRate = (value) => ({
  type: types.PLAYER_CHANGE_PLAYBACK_RATE,
  value
});

export const playerEpisodeEnded = () => ({
  type: types.PLAYER_EPISODE_ENDED
});

export const playerPlayControl = (selectedEpisodeData) => (dispatch, getState) => {
  const { episodeId: selectedEpisodeId } = selectedEpisodeData;
  const { player, history } = getState();
  const { playing, episodeId: playingEpisodeId } = player;
  const episodeDataFromHistory = history.find(e => e.episodeId === selectedEpisodeId);
  const currentTime = episodeDataFromHistory ? episodeDataFromHistory.currentTime : 0;

  if (playing && playingEpisodeId === selectedEpisodeId) {
    dispatch(playerPause());
  } else if (!playing && selectedEpisodeId === playingEpisodeId) {
    dispatch(playerPlay());
  } else {
    dispatch(loadEpisodeData({
      ...selectedEpisodeData,
      currentTime
    }));

    if (!episodeDataFromHistory) {
      dispatch(addEpisodeToHistory({
        ...selectedEpisodeData,
        currentTime
      }));
    }
  }
};
