export type Dog = {
  id: string;
  url: string;
};

export enum DogActionTypeEnum {
  ADDED = 'added',
}

type Action = {
  type: DogActionTypeEnum;
  payload: Dog;
};

export function dogReducer(dogs: Dog[], action: Action) {
  switch (action.type) {
    case DogActionTypeEnum.ADDED:
      return [...dogs, action.payload];

    default:
      throw Error('Unknown action: ' + action.type);
  }
}
