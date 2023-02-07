`use strict`;
const amountIpEl = document.getElementById(`amount`);
const currencyFromEl = document.getElementById(`from`);
const currencyToEl = document.getElementById(`to`);

const swapBtnEl = document.getElementById(`swap`);

const resultNameEl = document.getElementById(`currency-name`);
const resultValueEl = document.getElementById(`currency-value`);
const resultOverviewEl = document.getElementById(`conversion-overview`);

const url = `https://v6.exchangerate-api.com/v6/cd1aa08f39c0381a8d053fcc/latest/`;

function currencyConversion() {
  const amountIp = amountIpEl.value;
  const currencyFrom = currencyFromEl.value;
  const currencyTo = currencyToEl.value;
  const currencyToText = currencyToEl.options[currencyToEl.selectedIndex].text;
  fetch(url + `${currencyFrom}`)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.conversion_rates[currencyTo];
      resultNameEl.innerText = `${amountIp} ${currencyFrom} =`;
      resultValueEl.innerText = `${(rate * amountIp).toFixed(
        2
      )} ${currencyToText}`;
      resultOverviewEl.innerText = `1 ${currencyFrom} = ${rate} ${currencyTo}\n1 ${currencyTo} = ${(
        1 / rate
      ).toFixed(4)} ${currencyFrom}`;
    });
}
currencyConversion();

function swapCurrency() {
  const temp = currencyFromEl.value;
  currencyFromEl.value = currencyToEl.value;
  currencyToEl.value = temp;
  currencyConversion();
}

amountIpEl.addEventListener(`input`, currencyConversion);
currencyFromEl.addEventListener(`change`, currencyConversion);
currencyToEl.addEventListener(`change`, currencyConversion);
swapBtnEl.addEventListener(`click`, swapCurrency);
