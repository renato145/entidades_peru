import React, { Suspense } from "react";
import { Provider } from "jotai";
import { Map } from "./components/Map";
import { DetailsView } from "./components/DetailsView";
import { PlotSettings } from "./components/PlotSettings";
import { DataTable } from "./components/DataTable";

export const App = () => {
  return (
    <Provider>
      <div className="container mx-auto mt-4">
        <h1 className="text-center text-4xl font-semibold">
          Entidades del estado peruano
        </h1>
        <Suspense fallback={<p>Loading...</p>}>
          <div className="mt-8 p-2 flex flex-col">
            <div className="flex flex-wrap justify-evenly">
              <Map />
              <div className="mt-1 flex-1 flex flex-wrap flex-col max-w-[300px] min-w-[200px]">
                <PlotSettings />
                <DetailsView className="mt-6" />
              </div>
              <div className="flex flex-col">
                <button className="self-end mr-2 text-sm font-medium text-blue-800 hover:text-blue-600">
                  (Ver información acerca de las fuentes de datos)
                </button>
                <DataTable className="self-center" />
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </Provider>
  );
};
