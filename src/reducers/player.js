import * as types from '../types/player';

const initialState = {
  isShowing: false,
  isLoading: false,
  canPlay: false,
  isPlaying: false,
  url: '',
  muted: false,
  duration: 0,
  currentTime: 0,
  playbackRate: 1,
  volume: 1,
  episodeId: '',
  podcastId: '',
  podcastTitle: '',
  title: '',
  coverUrl600: '',
  published: ''
};

export const player = (state = initialState, action) => {
  switch (action.type) {
    case types.PLAYER_LOAD_EPISODE_DATA:
      return {
        ...state,
        isShowing: true,
        isLoading: true,
        canPlay: false,
        isPlaying: false,
        ...action.data
      };
    case types.PLAYER_CAN_PLAY:
      return {
        ...state,
        isLoading: false,
        canPlay: true,
        isPlaying: true
      };
    case types.PLAYER_PLAY:
      return {
        ...state,
        isPlaying: true
      };
    case types.PLAYER_PAUSE:
      return {
        ...state,
        isPlaying: false
      };
    case types.PLAYER_UPDATE_TIME:
      return {
        ...state,
        currentTime: action.currentTime
      };
    case types.PLAYER_CHANGE_VOLUME:
      return {
        ...state,
        volume: action.volume
      };
    case types.PLAYER_TOGGLE_MUTE:
      return {
        ...state,
        muted: !state.muted
      };
    case types.PLAYER_CHANGE_PLAYBACK_RATE:
      return {
        ...state,
        playbackRate: action.value
      };
    case types.PLAYER_EPISODE_ENDED:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
