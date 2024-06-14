import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import CurrencyConverterForm from './components/CurrencyConverterForm';
import DisplayCalculation from './components/DisplayCalculation';
import Loader from './components/Loader';

function App() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConvert = (event) => {
    event.preventDefault();
    const amount = event.target.elements.amount.value;
    const currency = event.target.elements.currency.value;

    if (!amount) {
      alert('Proszę wpisać kwotę.');
      return;
    }

    if (amount <= 0) {
      alert('Wprowadź kwotę większą niż 0.');
      return;
    }

    setLoading(true);
    setResult('');

    fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`)
      .then(response => response.json())
      .then(data => {
        const rate = data?.rates?.[0]?.mid;
        if (rate) {
          const convertedAmount = (amount * rate).toFixed(2);
          setResult(`to ${convertedAmount} PLN`);
        } else {
          alert('Nie udało się pobrać kursów wymiany.');
        }
      })
      .catch(error => {
        console.error('Błąd podczas pobierania kursów wymiany:', error);
        alert('Nie udało się pobrać kursów wymiany. Spróbuj ponownie później.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main className="main">
      <div className="container">
        <Header />
        <CurrencyConverterForm onConvert={handleConvert} />
        <Loader loading={loading} />
        <DisplayCalculation result={result} />
      </div>
    </main>
  );
}

export default App;



