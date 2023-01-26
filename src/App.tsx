import { useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from './components/Button';
import { ImageWithLoader } from './components/ImageWithLoader';
import { useDogs } from './hooks/useDogs';
import { api } from './services/api.service';

type Response = {
  status: string;
  message: string;
};

function App() {
  const [loading, setLoading] = useState(false);

  const { addDog, dogs } = useDogs();

  async function generateRandomDog() {
    try {
      setLoading(true);

      const response = await api.get<Response>('/breeds/image/random');

      addDog({
        id: self.crypto.randomUUID(),
        url: response.data.message,
      });
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
          <ImageWithLoader key={dog.id} src={dog.url} className="rounded w-52 h-52" />
        ))}
      </div>
    </main>
  );
}

export default App;
