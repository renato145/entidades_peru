import React, { HTMLProps } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

const urls = [
  [
    "Lista de entidades",
    "https://www.datosabiertos.gob.pe/dataset/lista-de-entidades-del-estado-peruano",
  ],
  [
    "Población",
    "https://cloud.minsa.gob.pe/apps/onlyoffice/s/XJ3NoG3WsxgF6H8?fileId=613439",
  ],
  [
    "Shapefiles",
    "https://www.geogpsperu.com/2014/03/base-de-datos-peru-shapefile-shp-minam.html",
  ],
];

export const DataSourcesInfo: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  return (
    <div {...props}>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="self-end flex hover:underline focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50">
              <span>Ver información acerca de las fuentes de datos</span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180" : ""
                } ml-1 mt-1 w-4 h-4 transition-transform`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="mt-1 mb-0.5 pl-6 pr-2 py-2.5 bg-gray-200 ring-2 ring-gray-300 rounded-lg shadow">
              <ul className="list-decimal space-y-2 break-all">
                {urls.map(([name, url], i) => (
                  <li key={i}>
                    {name}:{" "}
                    <a href={url} target="_black" rel="noopener">
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
