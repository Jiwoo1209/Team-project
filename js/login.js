document.addEventListener("DOMContentLoaded", function () {
    var menuButton = document.querySelector(".menu-button");
    var menuContainer = document.getElementById("menuContainer");
//마우스 커서가 해당 요소를 떠났을 때 발생
    menuButton.addEventListener("mouseleave", function () {
        menuContainer.style.display = "none";
    });
});


const correctPassword = "2022"; // 여기에 정확한 비밀번호를 입력하세요
        const button = document.getElementById('button');
        const passwordInput = document.getElementById('password');
        function toggleMenu() {
            var menuContainer = document.getElementById('menuContainer');
            //조건이 참이면 'block'을, 거짓이면 'none'을 반환
            //menuContainer의 현재 상태에 따라 보이거나 숨겨지게끔 하는 토글(toggle) 역할
            menuContainer.style.display = (menuContainer.style.display === 'none' || menuContainer.style.display === '') ? 'block' : 'none';
 
        }
        function submitForm() {
          // 여기에 비밀번호 검증 또는 다른 필요한 로직 추가 가능
        }
        //버튼 클릭했을 때 발생
        button.addEventListener('click', () => {
            const enteredPassword = passwordInput.value;

            if (enteredPassword === correctPassword) {
                // 비밀번호가 맞으면 페이지 전환
                window.location.href = 'draw.html';
            } 
            else {
                // 비밀번호가 틀리면 알림창 표시
                alert('비밀번호가 틀렸습니다. 다시 확인해주세요.');
                // 입력 필드 초기화
                passwordInput.value = '';
            }
});