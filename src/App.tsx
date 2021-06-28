import React, { Suspense } from "react";
import { Provider } from "jotai";
import { Map } from "./components/Map";
import { DetailsView } from "./components/DetailsView";
import { PlotSettings } from "./components/PlotSettings";
import { DataTable } from "./components/DataTable";

export const App = () => {
  return (
    <Provider>
      {/* <div className="container max-w-screen-lg mx-auto mt-2"> */}
      <div className="container mx-auto mt-2">
        <h1 className="text-center text-4xl font-semibold">
          Entidades públicas Perú
        </h1>
        <Suspense fallback={<p>Loading...</p>}>
          <div className="mt-8 p-2 flex flex-col">
            <div className="flex flex-wrap justify-evenly">
              <Map />
              <div className="mt-1 flex-1 flex flex-wrap flex-col max-w-[300px] min-w-[200px]">
                <PlotSettings/>
                <DetailsView className="mt-6" />
              </div>
              <DataTable className="self-center" />
            </div>
          </div>
        </Suspense>
      </div>
    </Provider>
  );
};
