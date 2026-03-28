"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Navigation from "./Navigation";
import Session from "./account/Session";
import "bootstrap/dist/css/bootstrap.min.css";
export default function KambazLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <Session>
        <div id="wd-kambaz" className="d-flex">
          <Navigation />
          <div className="flex-fill p-4" style={{ marginLeft: "120px" }}>{children}</div>
        </div>
      </Session>
    </Provider>
  );
}