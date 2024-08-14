import { Middleware } from "redux";
import { RootState } from "../store";

interface Action {
  type: string;
  payload?: any;
}

// self defined logger middleware
export const loggerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    // 類型守衛：確保 action 是 Action 型別
    if ((action as Action).type) {
      const typedAction = action as Action;

      console.log("type: ", typedAction.type);
      console.log("payload: ", typedAction.payload);
      console.log("currentState: ", store.getState());

      next(typedAction);

      console.log("next state: ", store.getState());
    } else {
      // 如果 action 沒有 type 屬性，直接傳遞
      return next(action);
    }
  };

// export const loggerMiddleware: Middleware<{}, RootState> =
//   (store) => (next) => (action) => {
//     if (!action.type) {
//       return next(action);
//     }

//     console.log("type: ", action.type);
//     console.log("payload: ", action.payload);
//     console.log("currentState: ", store.getState());

//     next(action);

//     console.log("next state: ", store.getState());
//   };
