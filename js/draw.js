const canvas = document.getElementById("jsCanvas");
        const ctx = canvas.getContext("2d");
        const colors = document.getElementsByClassName("jsColor");
        const range = document.getElementById("jsRange");
        const mode = document.getElementById("jsMode");
        const saveBtn = document.getElementById("jsSave");
        const INITIAL_COLOR = "2c2c2c";
        const CANVAS_SIZE = 600;
        const CANVASH_SIZE = 400;
        canvas.width = CANVAS_SIZE;
        canvas.height = CANVASH_SIZE;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        ctx.strokeStyle = INITIAL_COLOR;
        ctx.fillStyle = INITIAL_COLOR;
        ctx.lineWidth = 2.5;
        // 현재 그림 그리기 동작이 진행 중인지 여부
        let painting = false;
        //현재 색 채우기(fill) 동작이 진행 중인지 여부
        let filling = false;
        //이 함수는 호출되면 painting 변수를 false로 설정하여 그림 그리기 동작을 종료
        function stopPainting() {
            painting = false;
        }
        //이 함수는 호출되면 painting 변수를 true로 설정하여 그림 그리기 동작을 시작
        function startPainting() {
            painting = true;
        }
        // 마우스의 위치에 따라 그림을 그림
        function onMouseMove(event) {
            //clientX 속성은 현재 마우스 커서의 x 좌표를 제공
            //ctx.canvas.offsetLeft를 빼는 이유는 
            //캔버스의 왼쪽 상단이 기준이기 때문에 캔버스 내에서의 상대적인 x 좌표를 계산하기 위함
            const x = event.clientX - ctx.canvas.offsetLeft;
            const y = event.clientY - ctx.canvas.offsetTop;
            //계산된 x 및 y 좌표를 콘솔에 출력
            console.log(x, y);
            //만약 그림 그리기 상태가 아니라면, 새로운 경로를 시작하고 선의 시작 좌표를 현재 마우스 위치로 설정
            if (!painting) {
                ctx.beginPath(); //경로 생성
                ctx.moveTo(x, y); //선 시작 좌표
            //그렇지 않으면(그림 그리기 상태인 경우), 현재 마우스 위치로 선을 이어가고 선을 그림
            } else {
                ctx.lineTo(x, y); //선 끝 좌표
                ctx.stroke(); //선 그리기
            }
        }

        //사용자가 컬러 버튼을 클릭했을 때 호출
        //클릭한 버튼의 배경색을 가져와서 현재 그리기 색상 및 채우기 색상으로 설정
        function handleColorClick(event) {
            //클릭한 버튼의 배경색을 가져옴
            const color = event.target.style.backgroundColor;
            //캔버스의 선의 색상을 클릭한 버튼의 배경색으로 설정
            ctx.strokeStyle = color;
            //캔버스의 채우기 영역의 색상을 클릭한 버튼의 배경색으로 설정
            ctx.fillStyle = color;
        }
        //이 함수는 선의 굵기를 조절하는 range input 요소의 값이 변경될 때 호출
        function handleRangeChange(event) {
            //input 요소의 현재 값, 즉 선의 굵기를 가져옴
            const size = event.target.value;
            //캔버스의 선의 굵기를 가져온 값으로 설정
            ctx.lineWidth = size;
        }
        //이 함수는 그리기 모드를 변경하는 버튼을 클릭했을 때 호출
        function handleModeClick() {
            //현재 채우기 모드인지 확인
            //그리기 모드가 변경될 때마다 버튼의 텍스트를 업데이트
            if (filling === true) {
                filling = false;
                mode.innerText = "FILL";
            } else {
                filling = true;
                mode.innerText = "PAINT"
            }
        }
        //이 함수는 캔버스를 클릭했을 때 호출
        function handleCanvasClick() {
        //만약 현재 채우기 모드라면 캔버스를 채우기 색으로 채움  
            if (filling) {
                ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
            }
        }
        //이 함수는 캔버스에서 우클릭 했을 때 호출
        function handleCM(event) {
        //이벤트의 기본 동작을 막음
            event.preventDefault();
        }
        //이 함수는 그린 그림을 이미지 파일로 저장하는 역할
        function handleSaveClick() {
        //canvas.toDataURL() 메서드를 사용하여 캔버스에 그린 내용을 데이터 URL로 가져온 뒤,
        //이를 <a> 엘리먼트를 생성하여 다운로드 링크로 만들어 사용자에게 제공
            const image = canvas.toDataURL();
            const link = document.createElement("a");
            link.href = image;
            link.download = "PaintJS[🎨]";
            link.click();
        }

        if (canvas) {
            //마우스가 캔버스 위에서 움직일 때 
            canvas.addEventListener("mousemove", onMouseMove);
            //마우스 버튼이 눌릴 때
            canvas.addEventListener("mousedown", startPainting);
            //마우스 버튼이 떼어질 때
            canvas.addEventListener("mouseup", stopPainting);
            //마우스가 캔버스를 벗어날 때
            canvas.addEventListener("mouseleave", stopPainting);
            //캔버스를 클릭할 때
            canvas.addEventListener("click", handleCanvasClick);
            //캔버스에서 오른쪽 클릭할 때
            canvas.addEventListener("contextmenu", handleCM)
        }
        Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
        if (range) {
            range.addEventListener("input", handleRangeChange);
        }
        if (mode) {
            mode.addEventListener("click", handleModeClick);
        }
        if (saveBtn) {
            saveBtn.addEventListener("click", handleSaveClick);
        }

        // 오늘 날짜를 기본으로 표시, 7일전 일기까지 작성 가능
       let today = new Date()
       let year = today.getFullYear();
       // 월 getMonth() (0~11로 1월이 0으로 표현되기 때문에 + 1을 해주어야 원하는 월을 구할 수 있다.)
       let month = today.getMonth() + 1
       // 일 getDate()
       let date = today.getDate(); // 일
       // console.log(year + '-' + month + '-' + date);

       // 일기 저장 클릭
       const submitBtn = document.querySelector('.submit-button');

       const cancel = document.querySelector('#cancel');


        cancel.addEventListener('click', () => {
            alert("작성을 취소하셨습니다");
           window.location.href = 'index.html'
        })

       // input 빈값 체크
       {let inputCheck = document.getElementsByClassName("check");}

       submitBtn.addEventListener('click', () => {

            // 그림판 저장
            const canvas = document.querySelector('#jsCanvas');
            let imgDataUrl = canvas.toDataURL('image/jpeg');

           // 제목
           let title_give = document.querySelector('#title').value;

           // 선택한 날짜
           let day_give = document.querySelector('#day').value;

           // 일기 내용
           let texts_give = document.querySelector('#texts').value;

           //날씨
           const weather_give = document.querySelector('#weather');
           let weather = weather_give.options[weather_give.selectedIndex].value;
           // console.log(weather)
           // selectedIndex : 선택한 요소의 인덱스를 반영
           //테스트
           console.log(imgDataUrl,title_give,day_give,texts_give,weather);})