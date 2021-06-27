import React, { Suspense } from "react";
import { Provider } from "jotai";
import { Map } from "./components/Map";
import { DetailsView } from "./components/DetailsView";

export const App = () => {
  return (
    <Provider>
      <div className="container max-w-screen-lg mx-auto mt-2">
        <h1 className="text-center text-3xl font-bold">Entidades públicas Perú</h1>
        <Suspense fallback={<p>Loading...</p>}>
          <div className="mt-4 p-2 flex flex-wrap justify-evenly">
            <Map />
            <DetailsView />
          </div>
        </Suspense>
      </div>
    </Provider>
  );
};
