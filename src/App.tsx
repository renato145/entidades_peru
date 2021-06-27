import React, { Suspense } from "react";
import { Provider } from "jotai";
import { Map } from "./components/Map";
import { DetailsView } from "./components/DetailsView";

export const App = () => {
  return (
    <Provider>
      <div className="container mx-auto mt-2">
        <h1 className="text-3xl font-bold">Entidades públicas - Perú</h1>
        <Suspense fallback={<p>Loading...</p>}>
          <div className="mt-2 p-2 flex flex-wrap bg-gray-200">
            <Map />
            <DetailsView />
          </div>
        </Suspense>
      </div>
    </Provider>
  );
};
