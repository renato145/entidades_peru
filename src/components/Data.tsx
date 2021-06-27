import React from "react";
import { useAtomValue } from "jotai/utils";
import { dataAtom } from "../atoms/data";

export const Data: React.FC = () => {
  const data = useAtomValue(dataAtom);

  return (
    <div>
      Data:
      <div>
        {data.slice(0, 2).map((entity, i) => (
          <p key={i}>{JSON.stringify(entity)}</p>
        ))}
      </div>
    </div>
  );
};
