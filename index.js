const BASE_URL =
  "https://latest.currency-api.pages.dev/v1/currencies";

let img = document.querySelectorAll("img")

const btn = document.querySelector("#exc-btn")

let dropdown = document.querySelectorAll("select")



for (let opt of dropdown) {
  for (let currCode in countryList) {
    let newOpt = document.createElement("option")
    newOpt.innerText = currCode
    newOpt.value = currCode

    opt.appendChild(newOpt)

    if (opt.name === "from" && currCode === "USD") {
      newOpt.selected = "selected"
    } else if (opt.name === "to" && currCode === "PKR") {
      newOpt.selected = "selected"
    }
  }

  opt.addEventListener("change", (evt) => {
    updateFlaf(evt.target)
  })
}

function updateFlaf(element) {
  let currCode = element.value
  console.log(currCode)
  let countryCode = countryList[currCode]

  let newLink = `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");
  img.src = newLink;

}

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector("#amount")
  let ammVal = amount.value;
  if (ammVal == "" || ammVal < 1) {
    ammVal = 1;
    amount.value = "1"
  }

  let from = document.querySelector("#fromCountry").value;
  let to = document.querySelector("#toCountry").value;

  console.log("Amount:", ammVal);
  console.log("From:", from);
  console.log("To:", to);

let URL = `${BASE_URL}/${from.toLowerCase()}.json`;

let response = await fetch(URL);

let data = await response.json();

console.log(data);

let rate = data[from.toLowerCase()][to.toLowerCase()];
let result = ammVal * rate;

console.log(result);

let msg = document.querySelector("#msg")

msg.innerText = `${ammVal} ${from} is equal to ${result} ${to}.`

})