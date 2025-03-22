const menuHome = document.querySelector("#menuHome");
const menuGame = document.querySelector("#menuGame");
const menuJukebox = document.querySelector("#menuJukebox");
const menuPhoto = document.querySelector("#menuPhoto");
const contentFrame = document.querySelector("#contentFrame");

const homeChange = () => {
  contentFrame.setAttribute("src", "./home.html");
  menuHome.style = "background: #fff; color: #000";
  menuGame.style = "background: #ddd; color: #181818";
  menuJukebox.style = "background: #ddd; color: #181818";
  menuPhoto.style = "background: #ddd; color: #181818";
};
const gameChange = () => {
  contentFrame.setAttribute("src", "./game.html");
  menuHome.style = "background: #ddd; color: #181818";
  menuGame.style = "background: #fff; color: #000";
  menuJukebox.style = "background: #ddd; color: #181818";
  menuPhoto.style = "background: #ddd; color: #181818";
};
const photoChange = () => {
  contentFrame.setAttribute("src", "./photo.html");
  menuHome.style = "background: #ddd; color: #181818";
  menuGame.style = "background: #ddd; color: #181818";
  menuJukebox.style = "background: #ddd; color: #181818";
  menuPhoto.style = "background: #fff; color: #000";
};
const jukeboxChange = () => {
  contentFrame.setAttribute("src", "./jukebox.html");
  menuHome.style = "background: #ddd; color: #181818";
  menuGame.style = "background: #ddd; color: #181818";
  menuJukebox.style = "background: #fff; color: #000";
  menuPhoto.style = "background: #ddd; color: #181818";
};

menuHome.addEventListener("click", homeChange);
menuGame.addEventListener("click", gameChange);
menuJukebox.addEventListener("click", jukeboxChange);
menuPhoto.addEventListener("click", photoChange);

document.addEventListener("DOMContentLoaded", () => {
  const imagePreview = document.getElementById("imagePreview");
  const imageUpload = document.getElementById("imageUpload");

  // div 클릭 시 파일 업로드 창 열기
  imagePreview.addEventListener("click", () => {
    imageUpload.click();
  });

  // 파일 선택 시 이미지 변경
  imageUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.style.backgroundImage = `url(${e.target.result})`;
      };
      reader.readAsDataURL(file);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const todaySpan = document.querySelector(".zero"); // TODAY 숫자
  const totalSpan = document.querySelector(".today span:nth-child(4)"); // TOTAL 숫자

  const todayKey = "visit_today";
  const totalKey = "visit_total";
  const lastVisitKey = "last_visit_date";

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식

  // LocalStorage에서 기존 방문 데이터 가져오기
  let todayVisits = parseInt(localStorage.getItem(todayKey)) || 0;
  let totalVisits = parseInt(localStorage.getItem(totalKey)) || 0;
  let lastVisitDate = localStorage.getItem(lastVisitKey);

  // 방문 기록 업데이트
  if (lastVisitDate !== today) {
    todayVisits = 0; // 자정이 지나면 초기화
    localStorage.setItem(lastVisitKey, today);
  }

  todayVisits++;
  totalVisits++;

  // 업데이트된 방문 횟수 저장
  localStorage.setItem(todayKey, todayVisits);
  localStorage.setItem(totalKey, totalVisits);

  // UI 업데이트
  todaySpan.textContent = todayVisits;
  totalSpan.textContent = totalVisits;
});
