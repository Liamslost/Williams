// frontend/src/TestComponent.tsx
import { useEffect, useState } from 'react';
import { fetchHello } from './api/api'; // Adjust the path if needed

const TestComponent = () => {
  const [message, setMessage] = useState<string>('Loading...');

  useEffect(() => {
    async function testAPI() {
      try {
        const data = await fetchHello();
        setMessage(data.message);
      } catch (error) {
        console.error('Error fetching API:', error);
        setMessage('Error fetching data');
      }
    }
    testAPI();
  }, []);

  return (
    <div className="p-4">
      <h1 className="bg-blue-300 text-xl font-bold">API Test</h1>
      <p className='bg-red-300'>{message}</p>
    </div>
  );
};

export default TestComponent;
