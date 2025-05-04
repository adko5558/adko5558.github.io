let playerName = "";
let currentScene = "chodba";

const roomMap = {
  chodba: "Chodba",
  office: "Zborovňa",
  note: "Upratovacia miestnosť",
  director: "Riaditeľňa",
  gym: "Telocvičňa",
  girls: "WC ženy",
  boys: "WC muži",
  exit: "Východ (zamknutý)",
  class5: "Učebňa 5.A",
  class6: "Učebňa 6.A",
  class7: "Učebňa 7.A",
  class8: "Učebňa 8.A",
  class9: "Učebňa 9.A",
  tabula_zmazana: "Učebna 6.A",
};

const scenes = {

    tabula_zmazana: {
    text: "Začal si mazať tabulu, no v tom sa celá zrútila, a spadla na zem! Máš podozrenie, že ju niekto zozadu odskrutkoval. Niekto tu s tebou je!",
    choices: [
          { text: "Zakričať 'KTO TU JE?'", next: "class6" },
        { text: "Pozri sa do 5.A", next: "class5" },
    ]
    },
    chodba: {
    text: "Stojíš na chodbe tvojej školy. Je tu tmavo a nikto tam nie je. Nevieš ako si sa tu ocitol, no vieš, že chceš odtialto preč! Kam teraz?",
    choices: [
      { text: "Vojdi do 6.A", next: "class6" },
      { text: "Pozri sa do 5.A", next: "class5" },
      { text: "Skontroluj upratovaciu miestnosť.", next: "note" }
    ]
  },
  class6: {
    text: "Si v triede 6.A. Na tabuli sú napísané urážky na pani Galovú. Bŕŕŕ! Nikdy si tú učiteľku nemal rád, no toto si určite nezaslúži.",
    choices: [
      { text: "Zmazať tabulu.", next: "tabula_zmazana" },
      { text: "Pozri sa von oknom.", next: "class7" },
      { text: "Prezri triedu dôkladnejšie.", next: "note" }
    ]
  },
  office: {
    text: "Zborovňa je zamknutá. Na stole je poznámka.",
    choices: [
      { text: "Prečítať poznámku", next: "note" },
      { text: "Vrátiť sa", next: "chodba" },
      { text: "Ignoruj a sadni si", next: "director" }
    ]
  },
  note: {
    text: "Poznámka vedie k upratovacej miestnosti.",
    choices: [
      { text: "Choď tam", next: "director" },
      { text: "Ignoruj", next: "chodba" },
      { text: "Skry sa pod stôl", next: "gym" }
    ]
  },
  director: {
    text: "Si v riaditeľni. Všetko je tmavé.",
    choices: [
      { text: "Skúsiť ísť do telocvične", next: "gym" },
      { text: "Vrátiť sa", next: "chodba" },
      { text: "Sadni si na gauč", next: "exit" }
    ]
  },
  gym: {
    text: "Telocvičňa je obrovská a prázdna.",
    choices: [
      { text: "Vrátiť sa", next: "chodba" },
      { text: "Hľadať východ", next: "exit" },
      { text: "Sadni si na lavičku", next: "class5" }
    ]
  },
  exit: {
    text: "Našiel si východ. Je zamknutý.",
    choices: [
      { text: "Skúsiť kód", next: "chodba" },
      { text: "Zavolaj o pomoc", next: "girls" },
      { text: "Sadni si ku dverám", next: "chodba" }
    ]
  },
  girls: {
    text: "Si na dievčenskom WC. Voda kvapká.",
    choices: [
      { text: "Vráť sa", next: "chodba" },
      { text: "Skontroluj kabínu", next: "boys" },
      { text: "Umy si ruky", next: "chodba" }
    ]
  },
  boys: {
    text: "Si na chlapčenskom WC. Je tu smrad.",
    choices: [
      { text: "Uteč preč", next: "chodba" },
      { text: "Otvor okno", next: "chodba" },
      { text: "Skontroluj zrkadlo", next: "classroom" }
    ]
  },
  class7: {
    text: "V učebni 7.A je niečo napísané na tabuli.",
    choices: [
      { text: "Prečítať nápis", next: "note" },
      { text: "Vráť sa", next: "classroom" },
      { text: "Zatvoriť dvere", next: "stachodbart" }
    ]
  },
  class5: {
    text: "Si v učebni 5.A. Niekto tu zabudol tašku.",
    choices: [
      { text: "Prezri tašku", next: "note" },
      { text: "Vrátiť sa", next: "chodba" },
      { text: "Sadni si dozadu", next: "classroom" }
    ]
  }
};

window.onload = () => {
  const saved = localStorage.getItem("nocnachodba_name");
  if (saved) document.getElementById("player-name").value = saved;
};

function startGame() {
  const nameInput = document.getElementById("player-name");
  playerName = nameInput.value.trim() || "hráč";
  localStorage.setItem("nocnachodba_name", playerName);
  document.getElementById("name-input").style.display = "none";
  document.getElementById("scene-text").style.display = "block";
  document.getElementById("choices").style.display = "block";
  showScene("chodba");
}

function showScene(key) {
  currentScene = key;
  const scene = scenes[key];

  const sceneText = document.getElementById("scene-text");
  const choices = document.getElementById("choices");
  const locationBox = document.getElementById("location-box");

  sceneText.classList.add("fade");
  choices.classList.add("fade");

  setTimeout(() => {
    sceneText.textContent = scene.text.replace("{meno}", playerName);
    choices.innerHTML = "";

    scene.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice.text;
      btn.onclick = () => showScene(choice.next);
      choices.appendChild(btn);
    });

    locationBox.textContent = "Lokácia: " + (roomMap[key] || "Neznáme miesto");

    sceneText.classList.remove("fade");
    choices.classList.remove("fade");
  }, 300);
}

function toggleHelp() {
  const popup = document.getElementById("help-popup");
  if (popup.classList.contains("show")) {
    popup.classList.remove("show");
  } else {
    popup.classList.add("show");
  }
}

function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function acceptCookies() {
  const popup = document.getElementById("cookie-popup");
  document.cookie = "cookieaccepted=true; path=/; max-age=31536000"; // 1 rok
  popup.style.display = "none";
}

window.addEventListener("load", () => {
  const accepted = getCookie("cookieaccepted");
  if (accepted !== "true") {
    document.getElementById("cookie-popup").style.display = "flex";
  }
});
