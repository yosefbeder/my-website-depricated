import { Reducer } from "redux";
import { HeaderType } from "../types";

export enum Action {
  MOUNT,
  UNMOUNT,
  SCROLL,
}

type StateType = {
  headers: HeaderType[];
  activeHeader: string;
} | null;

type ActionType =
  | {
      type: Action.MOUNT;
      payload: StateType;
    }
  | { type: Action.UNMOUNT }
  | { type: Action.SCROLL; payload: string };

const initialState: StateType = null;

const reducer: Reducer<StateType, ActionType> = (
  state = initialState,
  action
) => {
  if (state === null) {
    if (action.type === Action.MOUNT) {
      return action.payload;
    }
  } else {
    if (action.type === Action.UNMOUNT) {
      return null;
    }

    if (action.type === Action.SCROLL) {
      return { ...state, activeHeader: action.payload };
    }
  }

  return state;
};

export default reducer;
