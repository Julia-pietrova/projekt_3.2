import './CurrencyConverterForm.css';

const CurrencyConverterForm = ({ onConvert }) => {
  return (
    <form className="form-container" onSubmit={onConvert}>
      <div className="input-group">
        <input
          type="number"
          placeholder="Kwota"
          name="amount"
        />
      </div>
      <div className="select-group">
        <select name="currency">
          <option value="eur">Euro (EUR)</option>
          <option value="usd">US Dollar (USD)</option>
          <option value="chf">Frank Szwajcarski (CHF)</option>
        </select>
      </div>
      <div className="button-group">
        <button type="submit">
          Przelicz
        </button>
      </div>
    </form>
  );
};

export default CurrencyConverterForm;


