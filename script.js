function timeCount() {
  const newYear = new Date("January 1, 2025 00:00");
  const now = new Date();
  const diff = newYear - now;

  const msInSecond = 1000;
  const msInMinute = 60 * 1000;
  const msInHour = 60 * 60 * 1000;
  const msInDay = 24 * 60 * 60 * 1000;

  const showDay = Math.floor(diff / msInDay);
  document.querySelector(".endDays").textContent = showDay;

  const showHour = Math.floor((diff % msInDay) / msInHour);
  document.querySelector(".endHours").textContent = showHour;

  const showMinute = Math.floor((diff % msInHour) / msInMinute);
  document.querySelector(".endMinutes").textContent = showMinute;

  const showSecond = Math.floor((diff % msInMinute) / msInSecond);
  document.querySelector(".endSeconds").textContent = showSecond;

  if (diff <= 0) {
    document.querySelector(".endDays").textContent = 0;
    document.querySelector(".endHours").textContent = 0;
    document.querySelector(".endMinutes").textContent = 0;
    document.querySelector(".endSeconds").textContent = 0;
    clearInterval(timerToNewYear);
    changeHeading();
    startSong();
  }
}

let timerToNewYear = setInterval(timeCount, 1000);

function changeHeading() {
  const heading = document.querySelector("h1");
  heading.textContent = "HAPPY NEW YEAR!!!";
  heading.classList.add("happy");
}

const btn = document.querySelector("#btnPlay");
const audio = document.querySelector("#song");

function startSong() {
  audio.play();
}

btn.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

let snowmax = 100;
let snowcolor = new Array(
  "#AAAACC",
  "#DDDDFF",
  "#CCCCDD",
  "#F3F3F3",
  "#F0FFFF",
  "#FFFFFF",
  "#EFF5FF"
);
let snowtype = new Array(
  "Arial Black",
  "Arial Narrow",
  "Times",
  "Comic Sans MS"
);
let snowletter = "*";
let sinkspeed = 0.8;
let snowmaxsize = 50;
let snowminsize = 10;
let snowingzone = 1;
let snow = new Array();
let marginbottom;
let marginright;
let timer;
let i_snow = 0;
let x_mv = new Array();
let crds = new Array();
let lftrght = new Array();
let browserinfos = navigator.userAgent;
let ie5 =
  document.all && document.getElementById && !browserinfos.match(/Opera/);
let ns6 = document.getElementById && !document.all;
let opera = browserinfos.match(/Opera/);
let browserok = ie5 || ns6 || opera;
function randommaker(range) {
  rand = Math.floor(range * Math.random());
  return rand;
}
function initsnow() {
  if (ie5 || opera) {
    marginbottom = document.body.clientHeight;
    marginright = document.body.clientWidth;
  } else if (ns6) {
    marginbottom = window.innerHeight;
    marginright = window.innerWidth;
  }
  let snowsizerange = snowmaxsize - snowminsize;
  for (i = 0; i <= snowmax; i++) {
    crds[i] = 0;
    lftrght[i] = Math.random() * 15;
    x_mv[i] = 0.03 + Math.random() / 10;
    snow[i] = document.getElementById("s" + i);
    snow[i].style.fontFamily = snowtype[randommaker(snowtype / length)];
    snow[i].size = randommaker(snowsizerange) + snowminsize;
    snow[i].style.fontSize = snow[i].size + "px";
    snow[i].style.color = snowcolor[randommaker(snowcolor.length)];
    snow[i].sink = (sinkspeed * snow[i].size) / 5;
    if (snowingzone == 1) {
      snow[i].posx = randommaker(marginright - snow[i].size);
    }
    if (snowingzone == 2) {
      snow[i].posx = randommaker(marginright / 2 - snow[i].size);
    }
    if (snowingzone == 3) {
      snow[i].posx =
        randommaker(marginright / 2 - snow[i].size) + marginright / 4;
    }
    if (snowingzone == 4) {
      snow[i].posx =
        randommaker(marginright / 2 - snow[i].size) + marginright / 2;
    }
    snow[i].posy = randommaker(
      2 * marginbottom - marginbottom - 2 * snow[i].size
    );
    snow[i].style.left = snow[i].posx + "px";
    snow[i].style.top = snow[i].posy + "px";
  }
  movesnow();
}
function movesnow() {
  for (i = 0; i <= snowmax; i++) {
    crds[i] += x_mv[i];
    snow[i].posy += snow[i].sink;
    snow[i].style.left = snow[i].posx + lftrght[i] * Math.sin(crds[i]) + "px";
    snow[i].style.top = snow[i].posy + "px";
    if (
      snow[i].posy >= marginbottom - 2 * snow[i].size ||
      parseInt(snow[i].style.left) > marginright - 3 * lftrght[i]
    ) {
      if (snowingzone == 1) {
        snow[i].posx = randommaker(marginright - snow[i].size);
      }
      if (snowingzone == 2) {
        snow[i].posx = randommaker(marginright / 2 - snow[i].size);
      }
      if (snowingzone == 3) {
        snow[i].posx =
          randommaker(marginright / 2 - snow[i].size) + marginright / 4;
      }
      if (snowingzone == 4) {
        snow[i].posx =
          randommaker(marginright / 2 - snow[i].size) + marginright / 2;
      }
      snow[i].posy = 0;
    }
  }
  let timer = setTimeout("movesnow()", 25);
}
for (i = 0; i <= snowmax; i++) {
  document.write(
    "<span id='s" +
      i +
      "' style='position:absolute;top:-" +
      snowmaxsize +
      "px;'>" +
      snowletter +
      "</span>"
  );
}
if (browserok) {
  window.onload = initsnow;
}
