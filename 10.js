document.addEventListener("DOMContentLoaded", () => {
  const fcur = document.getElementById("fromCurrency");
  const tcur = document.getElementById("toCurrency");
  const input = document.getElementById("amount");
  const btn = document.getElementById("convertBtn");
  const result = document.getElementById("result");

  const currencies = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD"];

  currencies.forEach((cur) => {
    let option1 = document.createElement("option");
    option1.value = cur;
    option1.textContent = cur;
    fcur.appendChild(option1);

    let option2 = document.createElement("option");
    option2.value = cur;
    option2.textContent = cur;
    tcur.appendChild(option2);
  });

  fcur.value = "USD";
  tcur.value = "INR";

  btn.addEventListener("click", async () => {
    const icon = document.getElementById("moneyIcon");

    icon.classList.add("animate-icon");

    setTimeout(() => {
      icon.classList.remove("animate-icon");
    }, 1000);
    try {
      let conversionResult = await convert();
      result.innerHTML = conversionResult;
    } catch (error) {
      console.error("Conversion failed:", error);
      result.innerHTML = "Something went wrong. Try again!";
    }
  });

  async function convert() {
    const amt = parseFloat(input.value);
    if (isNaN(amt) || amt <= 0) {
      return "Please enter a valid amount.";
    }

    const from = fcur.value;
    const to = tcur.value;

    // api from exchange arte api
    const res = await fetch(
      "https://v6.exchangerate-api.com/v6/68ce705340d23409f913f3e7/latest/USD",
    );
    const data = await res.json();
    const rates = data.conversion_rates;

    if (!rates[from] || !rates[to]) {
      return "Invalid currency selection.";
    }
    //conversion formula

    const converted = (amt / rates[from]) * rates[to];
    return `${amt} ${from} = ${converted.toFixed(2)} ${to}`;
  }
});
