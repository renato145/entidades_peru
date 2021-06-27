import React, { Suspense } from "react";
import { Provider } from "jotai";
import { Data } from "./components/Data";

export const App = () => {
  return (
    <Provider>
      <div>
        some page
        <Suspense fallback={<p>"Loading..."</p>}>
          <Data />
        </Suspense>
      </div>
    </Provider>
  );
};
