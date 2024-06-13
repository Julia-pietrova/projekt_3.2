import React, { useState } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('eur');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConvert = () => {
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
        <header className="header">
          <div className="image-container">
            <img
              src="https://ocdn.eu/pulscms-transforms/1/r6lk9kuTURBXy8yZWM0MWEwNC05NDc2LTRiMjQtYjYzYy02ZjkxMWJmMDU0NmQuanBlZ5GVAs0CZwDDw94AAaEwAQ"
              alt="pieniądze"
            />
          </div>
          <div className="title-container">
            <h1>Przelicznik walut</h1>
          </div>
        </header>
        <div className="form-container">
          <div className="input-group">
            <input
              type="number"
              placeholder="Kwota"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="select-group">
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="eur">Euro (EUR)</option>
              <option value="usd">US Dollar (USD)</option>
              <option value="chf">Frank Szwajcarski (CHF)</option>
            </select>
          </div>
          <div className="button-group">
            <button type="button" onClick={handleConvert}>
              Przelicz
            </button>
          </div>
        </div>
        {loading && <div className="loader">Loading...</div>}
        <div className="result-container">
          {result}
        </div>
      </div>
    </main>
  );
}

export default App;

