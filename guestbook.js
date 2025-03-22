document.addEventListener("DOMContentLoaded", function () {
  const guestbookContainer = document.getElementById("guestbookContainer");
  const addCommentBtn = document.getElementById("addComment");

  // 로컬스토리지에서 방명록 데이터 불러오기
  let guestbookData = JSON.parse(localStorage.getItem("guestbook")) || [];

  // 페이지 주인(나)의 닉네임과 비밀번호
  const OWNER_NICKNAME = "단단";
  const OWNER_PASSWORD = "1234"; // 원하는 비밀번호로 변경 가능

  // 방명록을 화면에 렌더링하는 함수
  function renderGuestbook() {
    guestbookContainer.innerHTML = ""; // 기존 내용 초기화

    guestbookData.forEach((entry, index) => {
      const entryDiv = document.createElement("div");
      entryDiv.classList.add("guest_entry");

      entryDiv.innerHTML = `
        <p><strong>${entry.nickname}</strong>: ${entry.comment}</p>
        <button class="deleteBtn" data-index="${index}">삭제</button>
      `;

      guestbookContainer.appendChild(entryDiv);
    });
  }

  // 삭제 버튼 클릭 시 비밀번호 입력받고 확인 후 삭제
  guestbookContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("deleteBtn")) {
      const index = event.target.getAttribute("data-index");

      // 비밀번호 입력 받기
      const password = prompt("삭제를 위해 비밀번호를 입력하세요");

      if (password === OWNER_PASSWORD) {
        // 비밀번호가 맞으면 삭제
        guestbookData.splice(index, 1);
        localStorage.setItem("guestbook", JSON.stringify(guestbookData));

        // 다시 렌더링
        renderGuestbook();
      } else {
        alert("비밀번호가 틀렸습니다. 삭제할 수 없습니다.");
      }
    }
  });

  // 방명록 추가 기능
  addCommentBtn.addEventListener("click", function () {
    const nickname = document.getElementById("nickname").value.trim();
    const comment = document.getElementById("comment").value.trim();

    if (nickname === "" || comment === "") {
      alert("닉네임과 댓글을 입력하세요!");
      return;
    }

    // 새 방명록 추가
    guestbookData.push({ nickname, comment });
    localStorage.setItem("guestbook", JSON.stringify(guestbookData));

    // 입력 필드 초기화
    document.getElementById("nickname").value = "";
    document.getElementById("comment").value = "";

    renderGuestbook(); // 🔥 추가된 데이터가 바로 화면에 나타나도록 렌더링
  });

  // 페이지 로드 시 기존 방명록 표시
  renderGuestbook();
});
