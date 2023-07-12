import React, { useState } from 'react';

function App() {
  const [numbers, setNumbers] = useState([]);

  const handleFetchNumbers = async () => {
    const urls = [
      'http://20.244.56.144/numbers/primes',
      'http://abc.com/fibo'
      
    
    ];

    try {
      const response = await fetch(`http://localhost:8008/numbers?url=${urls.join('&url=')}`);
      const data = await response.json();
      const mergedNumbers = data.numbers || [];

      setNumbers(mergedNumbers);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  return (
    <div>
      <button onClick={handleFetchNumbers}>Fetch Numbers</button>
      {numbers.length > 0 && (
        <div>
          <h3>Merged Unique Integers (Ascending Order)</h3>
          <ul>
            {numbers.map((number) => (
              <li key={number}>{number}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
