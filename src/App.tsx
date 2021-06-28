import React, { Suspense } from "react";
import { Provider } from "jotai";
import { Map } from "./components/Map";
import { DetailsView } from "./components/DetailsView";
import { PlotSettings } from "./components/PlotSettings";

export const App = () => {
  return (
    <Provider>
      <div className="container max-w-screen-lg mx-auto mt-2">
        <h1 className="text-center text-3xl font-bold">
          Entidades públicas Perú
        </h1>
        <Suspense fallback={<p>Loading...</p>}>
          <div className="mt-4 p-2 flex flex-col">
            <div className="flex flex-wrap justify-evenly">
              <Map />
              <div className="ml-2 flex-1 flex flex-wrap flex-col max-w-[300px]">
                <DetailsView />
                <PlotSettings className="mt-6" />
              </div>
            </div>
            <div className="mt-2 self-center">Some table with details</div>
          </div>
        </Suspense>
      </div>
    </Provider>
  );
};
