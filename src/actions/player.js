import * as types from '../types/player';
import { addEpisodeToHistory, updateEpisodeTimeInHistory, setIsArchived } from './history';
import { selectEpisodeById, selectCurrentTimeById, isEpisodeArchived } from '../selectors/history';
import { playerIsPlayingSelector, playerEpisodeIdSelector } from '../selectors/player';

const loadEpisodeData = (data) => ({
  type: types.PLAYER_LOAD_EPISODE_DATA,
  data
});

const playerPlay = () => ({
  type: types.PLAYER_PLAY
});

const playerPause = () => ({
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

export const playerEpisodeEnded = (episodeId) => (dispatch) => {
  dispatch({
    type: types.PLAYER_EPISODE_ENDED
  });
  dispatch(setIsArchived(episodeId, true));
};

export const playerPlayControl = (selectedEpisodeData) => (dispatch, getState) => {
  const { episodeId: selectedEpisodeId } = selectedEpisodeData;
  const state = getState();

  const isPlaying = playerIsPlayingSelector(state);
  const playingEpisodeId = playerEpisodeIdSelector(state);
  const episode = selectEpisodeById(state, selectedEpisodeId);
  const isArchived = isEpisodeArchived(state, selectedEpisodeId);
  const currentTime = selectCurrentTimeById(state, selectedEpisodeId);

  const episodeData = { ...selectedEpisodeData, currentTime };

  if (isPlaying && playingEpisodeId === selectedEpisodeId) {
    dispatch(playerPause());
  } else if (!isPlaying && playingEpisodeId === selectedEpisodeId) {
    dispatch(playerPlay());
  } else {
    if (isArchived) {
      dispatch(updateEpisodeTimeInHistory(selectedEpisodeId, 0));
      dispatch(loadEpisodeData({ ...selectedEpisodeData, currentTime: 0 }));
      dispatch(setIsArchived(selectedEpisodeId, false));
    } else {
      dispatch(loadEpisodeData(episodeData));
    }

    if (!episode) {
      dispatch(addEpisodeToHistory(episodeData));
    }
  }
};
