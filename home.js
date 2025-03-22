document.addEventListener("DOMContentLoaded", () => {
  const nicknameInput = document.getElementById("nickname");
  const commentInput = document.getElementById("comment");
  const addCommentBtn = document.getElementById("addComment");
  const commentList = document.getElementById("commentList");

  // 댓글 추가 함수
  function addComment() {
    const nickname = nicknameInput.value.trim();
    const comment = commentInput.value.trim();

    if (nickname === "" || comment === "") {
      alert("닉네임과 댓글을 입력해주세요.");
      return;
    }

    const listItem = document.createElement("li");
    listItem.classList.add("comment-item");
    listItem.innerHTML = `<span><strong>${nickname}:</strong> ${comment}</span>
                          <button class="delete-btn">X</button>`;

    commentList.appendChild(listItem);

    // 삭제 버튼 이벤트
    listItem.querySelector(".delete-btn").addEventListener("click", () => {
      commentList.removeChild(listItem);
    });

    // 입력 필드 초기화
    nicknameInput.value = "";
    commentInput.value = "";
    nicknameInput.focus(); // 닉네임 입력창에 포커스 유지
  }

  // 버튼 클릭 시 댓글 추가
  addCommentBtn.addEventListener("click", addComment);

  // 엔터 키 입력 시 댓글 추가 (comment 입력창에서만)
  commentInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 기본 엔터 동작 방지
      addComment();
    }
  });
});
