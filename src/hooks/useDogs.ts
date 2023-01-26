import { useReducer } from 'react';

import { type Dog, dogReducer, DogActionTypeEnum } from '../reducers/dog.reducer';

export function useDogs(initialValue: Dog[] = []) {
  const [dogs, dispatch] = useReducer(dogReducer, initialValue);

  function addDog(dog: Dog) {
    dispatch({
      type: DogActionTypeEnum.ADDED,
      payload: dog,
    });
  }

  return {
    addDog,
    dogs,
  };
}
