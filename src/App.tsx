import React from 'react';
import { useAtomValue} from 'jotai/utils'
import { dataAtom } from './atoms/data';

export const  App = () => {
  const data = useAtomValue(dataAtom);

  return (
    <div>
      Data: {data}
    </div>
  );
}
