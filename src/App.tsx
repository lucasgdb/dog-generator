import { useReducer, useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from './components/Button';
import { ImageWithLoader } from './components/ImageWithLoader';
import { type Dog, DogActionTypeEnum, dogReducer } from './reducers/dog.reducer';
import { api } from './services/api.service';

type Response = {
  status: string;
  message: string;
};

function App() {
  const [loading, setLoading] = useState(false);

  const [dogs, dispatch] = useReducer(dogReducer, []);

  async function getRandomDog() {
    const response = await api.get<Response>('/breeds/image/random');

    const dog: Dog = {
      id: self.crypto.randomUUID(),
      url: response.data.message,
    };

    return dog;
  }

  function addDog(dog: Dog) {
    dispatch({
      type: DogActionTypeEnum.ADDED,
      payload: dog,
    });
  }

  async function generateRandomDog() {
    try {
      setLoading(true);

      const dog = await getRandomDog();

      addDog(dog);
    } catch (err) {
      console.error(err);
      toast.error('Houve um erro. Tente novamente!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col p-4">
      <div className="flex justify-center">
        <Button onClick={generateRandomDog} disabled={loading}>
          Gerar cachorrinho
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        {dogs.map((dog) => (
          <div key={dog.id} className="w-52 h-52">
            <ImageWithLoader src={dog.url} className="rounded w-full h-full" />
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
