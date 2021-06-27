import React, { Suspense } from "react";
import { Provider } from "jotai";
import { Data } from "./components/Data";
import { Map } from "./components/Map";

export const App = () => {
  return (
    <Provider>
      <div>
        some page
        <Suspense fallback={<p>"Loading csv data..."</p>}>
          <Data />
        </Suspense>
        <Suspense fallback={<p>"Loading map data..."</p>}>
          <Map />
        </Suspense>
      </div>
    </Provider>
  );
};
