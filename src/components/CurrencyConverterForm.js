import React, { useState } from 'react';

const CurrencyConverterForm = ({ onConvert }) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('eur');

  const handleConvert = () => {
    onConvert(amount, currency);
  };

  return (
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
  );
};

export default CurrencyConverterForm;
