const quizData = [
    { imagePath: 'image/사리분별.png', answer: '사리분별' },
    { imagePath: 'image/소매치기.png', answer: '소매치기' },
    { imagePath: 'image/일본사람.png', answer: '일본사람' },
    { imagePath: 'image/최저임금.png', answer: '최저임금' },
    { imagePath: 'image/개런티.png', answer: '개런티' },
    { imagePath: 'image/블랙타이거새우.png', answer: '블랙타이거새우' },
    { imagePath: 'image/키보드.png', answer: '키보드' },
    { imagePath: 'image/브로콜리.png', answer: '브로콜리' },
    { imagePath: 'image/일간신문.png', answer: '일간신문' },
    { imagePath: 'image/두부한모.gif', answer: '두부한모' },
    // 추가 그림과 정답 추가
];

let quizIndex = 0;
let totalScore = 0;


function loadQuiz() {
    if (quizIndex === quizData.length) {
        alert("모든 그림 퀴즈를 완료했습니다!\n총 점수: " + totalScore);
        return;
    }
//HTML 문서에서 id가 'quiz-image'인 요소를 선택
    const quizImage = document.getElementById('quiz-image');
//quizData 배열에서 quizIndex 위치에 해당하는 객체를 선택, 그 객체의 imagePath 속성을 가져옴    
    quizImage.src = quizData[quizIndex].imagePath;
}

function checkAnswer() {
    //'answer'라는 id를 가진 HTML 요소에서 입력값을 가져와 소문자로 변환
    //toLowerCase()를 사용하여 대소문자를 구분하지 않도록 함
    const userAnswer = document.getElementById('answer').value.toLowerCase();
    //현재 퀴즈 인덱스에 해당하는 퀴즈 데이터에서 정답을 가져와 소문자로 변환한 후 저장
    const correctAnswer = quizData[quizIndex].answer.toLowerCase();
    //만약 정답일 경우
    if (userAnswer === correctAnswer) {
        alert("정답입니다! +10점");
        totalScore += 10;
    //정답이 아닐 경우, 정답 알려줌
    } else {
        alert("틀렸습니다. 정답은 " + quizData[quizIndex].answer + "입니다.");
    }
    
    document.getElementById('total-score').textContent = totalScore; // 총 점수 업데이트
    document.getElementById('answer').value = ''; // 입력 필드 초기화
    quizIndex++;
    loadQuiz();
}

// 페이지 로드시 초기 퀴즈 로딩
window.onload = loadQuiz;