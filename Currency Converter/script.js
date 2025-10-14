const currRate_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const input = document.querySelector(".amount input");
const inputmsg = document.querySelector(".amount p");
const fromCurr = document.querySelector(".from select");
const fromImg = document.querySelector(".from img");
const toCurr = document.querySelector(".to select");
const toImg = document.querySelector(".to img");
const msg = document.querySelector(".msg");
const flip = document.querySelector(".flip i");

const inputmsg0 = `<p style = "font-size: 1.2rem" ><i>Click <b style = "color: green">Convert</b> or Press <b style = "color: green">Enter</b></i></p>`;
const inputmsg1 = `<p style = "font-size: 1.2rem"><i>The amount entered is  <b style="color: red">Invalid</b></i></p>`;
const inputmsg2 = `<p style = "font-size: 1.2rem" ><i>Please enter the amount</i></p>`;
const inputmsg3 = `<p style = "font-size: 1.2rem"><i>The Result (approx.) is already  <b style="color: blue">Displayed</b></i></p>`;
const inputmsg4 = `<p style = "font-size: 1.2rem"><i>The Result (approx.) is  <b style="color: blue">Displayed</b></i></p>`;

dropdowns.forEach(select => {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if (select.name == "from" && currCode == "USD") {
            newOption.selected = true;
        }else if (select.name == "to" && currCode == "INR") {
            newOption.selected = true;
        }
    }
})

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const rounded = (number) => {
    splitNum = number.toString().split(".");
    let roundedNum;
    if (splitNum[0]!=0) {
        if (number.toString().includes("e")) {
            roundedNum = Number(Number(number).toPrecision(2));
        }else if (number.toString().includes(".")) {
            let decStr = (number-splitNum[0]).toFixed(2);
            roundedNum = Number(splitNum[0]).toLocaleString('en-US')+decStr.slice(1);
        }else{
            roundedNum = number.toLocaleString('en-US');
        }
    }else {
        roundedNum = Number(Number(number).toPrecision(2));
    }
    return roundedNum;
}

const convertCurr = () => {
    let amount = (input.value).replaceAll(",","");
    let fromCurrRate = data["inr"][fromCurr.value.toLowerCase()];
    let toCurrRate = data["inr"][toCurr.value.toLowerCase()];
    finalAmount = amount*toCurrRate/fromCurrRate;
    finalAmountRounded = rounded(finalAmount);
    amount = rounded(amount*1);
    let dateParts = data["date"].split("-");
    let date = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    msg.innerHTML = `${amount} ${fromCurr.value} = ${finalAmountRounded} ${toCurr.value}`
                     + `<br> <p style = "font-size: 1rem; line-height: 2rem; text-align: right">(Updated on : ${date})</p>`;
}

const fetchingData = async () => {
    response = await fetch(currRate_url, { cache: "no-store" });
    data = await response.json();
}

window.addEventListener("load",async () => {
    await fetchingData();
    convertCurr();
})

const checkInput = () => {
    let inputVal = (input.value).replaceAll(",","");
    let prevmsg = (msg.innerText.split(" "));
    if (isNaN(inputVal) || inputVal<0) {
        inputmsg.innerHTML = `${inputmsg1}`;
        btn.classList.remove("highlight");
        btn.disabled = true;
    }else if (inputVal == "") {
        inputmsg.innerHTML = `${inputmsg2}`;
        btn.classList.remove("highlight");
        btn.disabled = true;
    }else { 
        if (Number(rounded(inputVal*1).replaceAll(",","")) == Number(prevmsg[0].replaceAll(",","")) && fromCurr.value == prevmsg[1] && toCurr.value == prevmsg[4].slice(0,3)) {
            inputmsg.innerHTML = `${inputmsg3}` 
            btn.classList.remove("highlight");
            btn.disabled = true;
        }else {
            inputmsg.innerHTML = `${inputmsg0}`;
            btn.classList.add("highlight");
            btn.disabled = false;
        }
    }
}

input.addEventListener("input", () => {
    checkInput();
})

dropdowns.forEach(select => {
    select.addEventListener("change", (evt) => {
        checkInput();
        updateFlag(evt.target);
    })
})

flip.addEventListener("click", () => {
    [fromCurr.value,toCurr.value] = [toCurr.value,fromCurr.value];
    [fromImg.src,toImg.src] = [toImg.src,fromImg.src];
    checkInput();
})

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    convertCurr();
    inputmsg.innerHTML = `${inputmsg4}`;
    btn.classList.remove("highlight");
    btn.disabled = true;
})

window.addEventListener("keydown", (e) => {
    if (e.key=="Enter") {
        e.preventDefault();
        btn.click();
    }
})