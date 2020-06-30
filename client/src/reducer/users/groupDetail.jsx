const SET_DETAIL_DATA = "groupDetail/SET_DEATIL_DATA";
const TOGGLE_RECRUIT = "groupDetail/TOGGLE_RECRUIT";
const TOGGLE_REGISTERATION = "groupDetail/TOGGLE_REGISTERATION";

export const set_detail_data = (groupData) => ({
  type: SET_DETAIL_DATA,
  groupData,
});

export const toggle_recruit = (isRecruiting) => ({
  type: TOGGLE_RECRUIT,
  isRecruiting,
});

export const toggle_registeration = (changedNowPersonnel) => ({
  type: TOGGLE_REGISTERATION,
  changedNowPersonnel,
});

export const initialState = {};

export const groupDetail = (state, action) => {
  switch (action.type) {
    case SET_DETAIL_DATA:
      return action.groupData;

    case TOGGLE_RECRUIT:
      const isRecruiting = !action.isRecruiting;
      return { ...state, isRecruiting };

    case TOGGLE_REGISTERATION:
      const { changedNowPersonnel } = action;
      return { ...state, now_personnel: changedNowPersonnel };

    default:
      return state;
  }
};
