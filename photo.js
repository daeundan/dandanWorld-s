const photosPerPage = 6;
let currentPage = 1;
let photos = [
  {
    src: "./contents/iu.jpg",
    title: "아이유는 참 이쁘다,,",
    detail: "오늘 아이유 노래 너무 좋더라",
  },
  {
    src: "./contents/snow.jpeg",
    title: "3월인데 눈이 왔어",
    detail: "와 이제는 3월에도 눈이 오는구나",
  },
  {
    src: "./contents/zzal.png",
    title: "취업하고싶다",
    detail: "열심히 일 할 자신 있는데",
  },
];

function renderPhotos() {
  const container = document.getElementById("photoContainer");
  const pagination = document.getElementById("pagination");
  container.innerHTML = "";
  pagination.innerHTML = "";

  const startIndex = (currentPage - 1) * photosPerPage;
  const selectedPhotos = photos.slice(startIndex, startIndex + photosPerPage);

  selectedPhotos.forEach((photo, index) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("photoWrapper");

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = `photo-${index}`;
    img.classList.add("photo_thumnail");

    img.onclick = () => editPhoto(startIndex + index);

    const title = document.createElement("div");
    title.classList.add("photo_title");
    title.innerText = photo.title;

    const detail = document.createElement("div");
    detail.classList.add("photo_detail");
    detail.innerText = photo.detail;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "삭제";
    deleteBtn.onclick = () => deletePhoto(startIndex + index);

    wrapper.appendChild(img);
    wrapper.appendChild(title);
    wrapper.appendChild(detail);
    wrapper.appendChild(deleteBtn);

    container.appendChild(wrapper);
  });

  const totalPages = Math.ceil(photos.length / photosPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.innerText = i;
    pageBtn.classList.add("page-btn");
    if (i === currentPage) pageBtn.classList.add("active");
    pageBtn.onclick = () => changePage(i);
    pagination.appendChild(pageBtn);
  }
}

function addPhoto() {
  const fileInput = document.getElementById("photoUpload");
  const titleInput = document.getElementById("photoTitle");
  const detailInput = document.getElementById("photoDetail");

  if (
    fileInput.files.length === 0 ||
    titleInput.value.trim() === "" ||
    detailInput.value.trim() === ""
  ) {
    alert("사진, 제목, 설명을 모두 입력하세요.");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    // 사진, 제목, 설명을 함께 저장
    photos.push({
      src: e.target.result,
      title: titleInput.value,
      detail: detailInput.value,
    });
    titleInput.value = "";
    detailInput.value = "";
    fileInput.value = "";
    renderPhotos(); // 사진 목록을 다시 렌더링
  };
  reader.readAsDataURL(file); // 파일을 데이터 URL로 변환
}

function deletePhoto(index) {
  photos.splice(index, 1); // 해당 사진을 배열에서 제거
  renderPhotos(); // 사진 목록을 다시 렌더링
}

function editPhoto(index) {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.onchange = function () {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      photos[index].src = e.target.result;
      renderPhotos(); // 사진 목록을 다시 렌더링
    };
    reader.readAsDataURL(file); // 새 사진으로 업데이트
  };
  fileInput.click(); // 파일 선택 창 열기
}

function changePage(page) {
  currentPage = page;
  renderPhotos(); // 페이지 변경 후 사진 목록을 렌더링
}

renderPhotos(); // 초기 렌더링
