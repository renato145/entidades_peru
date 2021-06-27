import React, { Suspense } from "react";
import { Provider } from "jotai";
import { Data } from "./components/Data";
import { Map } from "./components/Map";
import { DetailsView } from "./components/DetailsView";

export const App = () => {
  return (
    <Provider>
      <div className="container mx-auto mt-2">
        <h1 className="text-3xl font-bold">Entidades públicas - Perú</h1>
        <Suspense fallback={<p>"Loading csv data..."</p>}>
          <Data />
        </Suspense>
        <Suspense fallback={<p>"Loading map data..."</p>}>
          <div className="flex p-2 bg-gray-200">
            <Map />
            <DetailsView />
          </div>
        </Suspense>
      </div>
    </Provider>
  );
};
