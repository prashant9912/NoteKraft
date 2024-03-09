"use client";

import store from "notekraft/utils/redux/store";
import { Provider } from "react-redux";

/**
 * Redux provider for application
 */
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
