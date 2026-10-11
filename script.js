// 문자 메시지 시나리오
const chatSteps = [
    {
        step: 0,
        bReply: "나 시은인데.",
        aFollowUps: [
            "ㅆㅃ 좀. 뒤질래 진짜"
        ]
    },
    {
        step: 1,
        bReply: "어디야",
        aFollowUps: [
            "내가 먼저 물었잖아.",
            "야",
            "씹냐?",
            "아 개빡치게 진짜",
            "니 새끼 맨날 가는 도서관 앞이니까 빨랑 튀어 나와"
        ]
    }
];

let currentStep = 0;
let currentTypedIndex = 0;
let isPlaying = false;

// 앱 열기 함수
function openApp(appName) {
    document.getElementById('home-screen').classList.remove('active');
    document.getElementById('app-screen').classList.add('active');
    
    const titleElem = document.getElementById('app-title');
    const contentElem = document.getElementById('app-content');

    // 기본 헤더 다시 보이기
    const appHeader = document.querySelector('.app-header');
    if (appHeader) appHeader.style.display = 'flex';

    if (appName === 'naver') {
        if (appHeader) appHeader.style.display = 'none'; // 네이버에서만 숨김
        contentElem.innerHTML = `
            <div class="naver-search-container">
                <div class="naver-top-input-bar">
                    <span class="naver-back-arrow" onclick="goHome()">←</span>
                    <span class="naver-input-placeholder">검색어를 입력해 주세요</span>
                    <span class="naver-search-icon-btn">🔍</span>
                </div>
                <div class="naver-history-header">
                    <span>최근 검색어</span>
                    <span class="naver-clear-all" onclick="alert('전체삭제 되었습니다.')">전체삭제</span>
                </div>
                <div class="naver-history-list">
                    <div class="naver-history-item">
                        <div class="naver-history-left">
                            <span class="naver-clock-icon">🕒</span>
                            <span class="naver-keyword">자연스럽게 말거는법</span>
                        </div>
                        <div class="naver-history-right">
                            <span class="naver-date">10.11.</span>
                            <span class="naver-delete-btn">✕</span>
                        </div>
                    </div>
                    <div class="naver-history-item">
                        <div class="naver-history-left">
                            <span class="naver-clock-icon">🕒</span>
                            <span class="naver-keyword">자연그렂게 말거는법</span>
                        </div>
                        <div class="naver-history-right">
                            <span class="naver-date">10.11.</span>
                            <span class="naver-delete-btn">✕</span>
                        </div>
                    </div>
                    <div class="naver-history-item">
                        <div class="naver-history-left">
                            <span class="naver-clock-icon">🕒</span>
                            <span class="naver-keyword">주말 날씨 예보</span>
                        </div>
                        <div class="naver-history-right">
                            <span class="naver-date">10.11.</span>
                            <span class="naver-delete-btn">✕</span>
                        </div>
                    </div>
                    <div class="naver-history-item">
                        <div class="naver-history-left">
                            <span class="naver-clock-icon">🕒</span>
                            <span class="naver-keyword">근처 편의점</span>
                        </div>
                        <div class="naver-history-right">
                            <span class="naver-date">10.09.</span>
                            <span class="naver-delete-btn">✕</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else if (appName === '캘린더') {
        titleElem.innerText = '캘린더';
        
        let gridHtml = `
            <div class="cal-day-name" style="color:#e74c3c;">일</div>
            <div class="cal-day-name">월</div>
            <div class="cal-day-name">화</div>
            <div class="cal-day-name">수</div>
            <div class="cal-day-name">목</div>
            <div class="cal-day-name">금</div>
            <div class="cal-day-name" style="color:#3498db;">토</div>
        `;

        for(let i=0; i<4; i++) {
            gridHtml += `<div class="cal-cell other-month"></div>`;
        }

        for(let d=1; d<=31; d++) {
            let dayOfWeek = (d + 3) % 7;
            let classList = "cal-cell";
            let holidayText = "";

            if (dayOfWeek === 0) classList += " sun";
            if (dayOfWeek === 6) classList += " sat";

            if (d === 3) {
                classList += " holiday";
                holidayText = "개천절";
            } else if (d === 5) {
                classList += " holiday";
                holidayText = "대체휴일";
            } else if (d === 9) {
                classList += " holiday";
                holidayText = "한글날";
            }

            let eventHtml = "";
            if (d === 23) {
                eventHtml = `<div class="event-dot" title="레포트 제출">레포트 제출</div>`;
            } else if (holidayText) {
                eventHtml = `<div class="event-dot" style="background:#e74c3c;" title="${holidayText}">${holidayText}</div>`;
            }

            gridHtml += `
                <div class="${classList}">
                    <span class="cal-num">${d}</span>
                    ${eventHtml}
                </div>
            `;
        }

        contentElem.innerHTML = `
            <div style="padding:2px; background:#f8f9fa;">
                <div class="cal-header" style="color:#333;">📅 2026년 10월</div>
                <div class="cal-grid">
                    ${gridHtml}
                </div>
            </div>
        `;

    } else if (appName === '에브리타임') {
        titleElem.innerText = ''; 
        renderEverytimeHome();
    } else if (appName === 'Spotify') {
        titleElem.innerText = ''; 
        contentElem.innerHTML = `
            <div class="spotify-player-container">
                <div class="spotify-top-bar">
                    <span style="font-size:11px; color:#aaa;">아티스트에서 재생</span><br>
                    <span style="font-size:12px; font-weight:bold; color:#fff;">박지훈</span>
                </div>
                
                <div class="spotify-album-art-wrap">
                    <div class="spotify-album-box">
                        <div class="inner-album-title">MESSAGE 01</div>
                    </div>
                </div>

                <div class="spotify-lyrics-preview">정말로 네가 내게 온거야</div>

                <div class="spotify-track-info">
                    <div class="track-text">
                        <div class="track-name">MayDay</div>
                        <div class="track-artist">박지훈</div>
                    </div>
                    <div class="track-plus">＋</div>
                </div>

                <div class="spotify-progress-area">
                    <div class="spotify-bar"><div class="spotify-bar-fill" style="width: 5%;"></div></div>
                    <div class="spotify-time"><span>0:05</span><span>3:16</span></div>
                </div>

                <div class="spotify-controls">
                    <span class="ctrl-icon">🔀</span>
                    <span class="ctrl-icon" onclick="audioToggle()">⏮</span>
                    <div class="spotify-play-btn" onclick="audioToggle()">
                        <span id="play-icon">▶</span>
                    </div>
                    <span class="ctrl-icon" onclick="audioToggle()">⏭</span>
                    <span class="ctrl-icon">🔁</span>
                </div>

                <div class="spotify-bottom-menu">
                    <span>📳</span>
                    <span>🔗</span>
                    <span>☰</span>
                </div>

                <div class="spotify-lyrics-bar" onclick="alert('가사 전문 보기')">
                    <div class="lyrics-bar-handle"></div>
                    <div class="lyrics-bar-title">가사 미리 보기</div>
                    <div class="lyrics-bar-text">정말로 네가 내게 온거야</div>
                </div>
            </div>
            <audio id="spotify-audio" src="OnlyMP3.to - MayDay.mp3"></audio>
        `;
    } else if (appName === '넷플릭스') {
        titleElem.innerText = ''; 
        contentElem.innerHTML = `
            <div class="netflix-profiles-container">
                <div class="netflix-title">넷플릭스를 시청할 프로필을 선택하세요.</div>
                <div class="profiles-grid">
                    <div class="profile-card" onclick="openNetflixHome()">
                        <div class="profile-color-box" style="background-color: #3498db;"></div>
                        <span class="profile-name">연시은</span>
                    </div>
                    <div class="profile-card disabled-profile">
                        <div class="profile-color-box" style="background-color: #e74c3c;"></div>
                        <span class="profile-name">안숴</span>
                    </div>
                    <div class="profile-card disabled-profile">
                        <div class="profile-color-box" style="background-color: #f1c40f;"></div>
                        <span class="profile-name">3</span>
                    </div>
                    <div class="profile-card disabled-profile">
                        <div class="profile-color-box" style="background-color: #9b59b6;"></div>
                        <span class="profile-name">이거내거</span>
                    </div>
                </div>
            </div>
        `;
    } else if (appName === '문자') {
        titleElem.innerText = '문자 메시지';
        // 첫 시작 메시지 "어디냐 개새끼야" 가 확실히 나타나도록 렌더링
        contentElem.innerHTML = `
            <div class="chat-container">
                <div class="chat-messages" id="chat-box">
                    <div class="msg received">어디냐 개새끼야</div>
                </div>
                <div class="chat-input-box">
                    <input type="text" id="msg-input" placeholder="아무 키나 누르면 입력됩니다..." readonly onkeydown="handleType(event)" onclick="handleTypeClick()">
                    <button onclick="sendMessage()">전송</button>
                </div>
            </div>
        `;
        currentStep = 0;
        currentTypedIndex = 0;
    }
}

// ---------------- 에브리타임 렌더링 관련 함수 ---------------- //

function renderEverytimeHome() {
    const contentElem = document.getElementById('app-content');
    contentElem.innerHTML = `
        <div class="everytime-container">
            <div class="ev-top-bar">
                <div class="ev-logo-title">
                    <span class="ev-red-text">에브리타임</span>
                    <span class="ev-univ-name">한국대학교</span>
                </div>
                <div class="ev-top-icons">
                    <span>🔍</span>
                    <span>👤</span>
                </div>
            </div>

            <div class="ev-widget-card">
                <div class="ev-widget-title">💡 나만의 채용 일정 관리법</div>
                <div class="ev-widget-desc">인기 공고 확인하고 달력 관리하기</div>
                <div class="ev-widget-btn">자세히 ></div>
            </div>

            <div class="ev-menu-row">
                <div class="ev-menu-item"><div class="ev-icon-circle">🏠</div><span>학교 홈</span></div>
                <div class="ev-menu-item"><div class="ev-icon-circle">🚌</div><span>셔틀버스</span></div>
                <div class="ev-menu-item"><div class="ev-icon-circle">📢</div><span>학사공지</span></div>
                <div class="ev-menu-item"><div class="ev-icon-circle">📅</div><span>학사일정</span></div>
                <div class="ev-menu-item"><div class="ev-icon-circle">📖</div><span>도서관</span></div>
            </div>

            <div class="ev-banner">
                <div class="ev-banner-text">
                    <b>하루 종일 마스크로 성난 피부!</b><br>
                    제때 케어하세요! 30% 빅세일!
                </div>
            </div>

            <div class="ev-section-box">
                <div class="ev-section-header">
                    <span>즐겨찾는 게시판</span>
                    <span class="ev-more" onclick="renderEverytimeBoardList()">더 보기 ></span>
                </div>
                <div class="ev-board-item" onclick="openBoardDetail('자유게시판')">
                    <div class="ev-board-name">자유게시판</div>
                    <div class="ev-board-preview">도서관 앞에 사람 왜이렇게 많냐</div>
                </div>
                <div class="ev-board-item" onclick="openBoardDetail('비밀게시판')">
                    <div class="ev-board-name">비밀게시판</div>
                    <div class="ev-board-preview">서양화과 ㄱㅅㅈ</div>
                </div>
            </div>

            ${getEverytimeBottomTab('home')}
        </div>
    `;
}

function renderEverytimeBoardList() {
    const contentElem = document.getElementById('app-content');
    contentElem.innerHTML = `
        <div class="everytime-container">
            <div class="ev-top-bar">
                <div class="ev-logo-title">
                    <span class="ev-red-text" style="font-size:16px;">게시판</span>
                </div>
                <div class="ev-top-icons">
                    <span>🔍</span>
                </div>
            </div>

            <div class="ev-board-list-box">
                <div class="ev-board-category-title">공식 게시판</div>
                
                <div class="ev-board-list-item" onclick="openBoardDetail('자유게시판')">
                    <span class="board-icon">📌</span>
                    <div class="board-info">
                        <div class="board-title">자유게시판</div>
                        <div class="board-sub">누구나 자유롭게 이야기를 나누는 공간</div>
                    </div>
                </div>

                <div class="ev-board-list-item" onclick="openBoardDetail('비밀게시판')">
                    <span class="board-icon">🔒</span>
                    <div class="board-info">
                        <div class="board-title">비밀게시판</div>
                        <div class="board-sub">익명으로 고민을 나누는 공간</div>
                    </div>
                </div>

                <div class="ev-board-list-item" onclick="openBoardDetail('새내기 게시판')">
                    <span class="board-icon">🐣</span>
                    <div class="board-info">
                        <div class="board-title">새내기 게시판</div>
                        <div class="board-sub">26학번 신입생들을 위한 질문과 소통 공간</div>
                    </div>
                </div>

                <div class="ev-board-category-title" style="margin-top:15px;">학과 게시판</div>

                <div class="ev-board-list-item" onclick="openBoardDetail('경영학과 게시판')">
                    <span class="board-icon">📊</span>
                    <div class="board-info">
                        <div class="board-title">경영학과 게시판</div>
                        <div class="board-sub">경영학과 학생 전용 게시판</div>
                    </div>
                </div>

                <div class="ev-board-list-item" onclick="openBoardDetail('서양화과 게시판')">
                    <span class="board-icon">🎨</span>
                    <div class="board-info">
                        <div class="board-title">서양화과 게시판</div>
                        <div class="board-sub">서양화과 학생 전용 게시판</div>
                    </div>
                </div>
            </div>

            ${getEverytimeBottomTab('board')}
        </div>
    `;
}

function openBoardDetail(boardName) {
    if (boardName === '비밀게시판') {
        const password = prompt("비밀게시판 비밀번호를 입력하세요.\n(힌트: 생일)");
        if (password !== "0515") {
            if (password !== null) {
                alert("비밀번호가 일치하지 않습니다.");
            }
            return;
        }
    }

    const contentElem = document.getElementById('app-content');
    
    let mockPosts = [];
    if (boardName === '자유게시판') {
        mockPosts = [
            { title: "도서관 앞에 사람 왜이렇게 많냐", content: "도서관 입구 쪽에서 사람들 모여있던데 뭔 일 있음?", time: "10분 전", likes: 34, comments: 12 },
            { title: "23일 레포트 제출 기한 몇시까지임?", content: "수업계획서에 시간은 안 적혀있는데 아는 사람?", time: "25분 전", likes: 8, comments: 4 },
            { title: "중앙도서관 열람실 자리 남아?", content: "지금 들어가려는데 열람실 빈자리 있냐", time: "1시간 전", likes: 3, comments: 2 }
        ];
    } else if (boardName === '비밀게시판') {
        mockPosts = [
            { title: "서양화과 ㄱㅅㅈ", content: "걔랑 자본사람?ㅋㅋ 맛평가좀", time: "5분 전", likes: 23, comments: 11 },
            { title: "남잔데 아무나 전화할사람", content: "ㅈㄱㄴ", time: "18분 전", likes: 5, comments: 3 },
            { title: "ㅆㅂㅠㅠ", content: "헤어짐.... 위로주 먹쟈", time: "42분 전", likes: 14, comments: 8 }
        ];
    } else if (boardName === '새내기 게시판') {
        mockPosts = [
            { title: "26학번 경영학과 단톡방 어디로 들어가나요?", content: "합격 인증하고 들어가는 톡방 링크 아시는 분 계신가요?", time: "2시간 전", likes: 15, comments: 9 },
            { title: "학식 보통 몇 시부터 사람 붐벼요?", content: "12시 정각에 가도 자리 있나요?", time: "3시간 전", likes: 5, comments: 3 }
        ];
    } else if (boardName === '경영학과 게시판') {
        mockPosts = [
            { title: "3학년 1학기 재무관리 족보 구합니다 ㅠㅠ", content: "중간고사 필기 자료랑 족보 공유해주실 분 구합니다. 기프티콘 드려요", time: "30분 전", likes: 11, comments: 6 },
            { title: "마케팅원론 팀플 인원 모집 (1/4)", content: "열심히 하실 3학년 분들 댓글 주세요!", time: "1시간 전", likes: 4, comments: 2 }
        ];
    } else if (boardName === '서양화과 게시판') {
        mockPosts = [
            { title: "실기실에 유화 물감 두고 가신 분 찾아요", content: "2실기실 책상 위에 바버 유화물감 두고 가셨네요 과사 맡겨둠", time: "40분 전", likes: 7, comments: 5 },
            { title: "이번 과제 캔버스 100호 사이즈 맞죠?", content: "교수님이 지시하신 과제 규격 다시 확인차 물어봅니다", time: "2시간 전", likes: 9, comments: 4 }
        ];
    }

    let postsHtml = mockPosts.map(p => `
        <div class="ev-post-card view-only">
            <div class="ev-post-title">${p.title}</div>
            <div class="ev-post-body-text">${p.content}</div>
            <div class="ev-post-meta">
                <span>익명 • ${p.time}</span>
                <span class="ev-post-stats">👍 ${p.likes} &nbsp; 💬 ${p.comments}</span>
            </div>
        </div>
    `).join('');

    contentElem.innerHTML = `
        <div class="everytime-container">
            <div class="ev-top-bar">
                <span class="ev-back-btn" onclick="renderEverytimeBoardList()">❮ 게시판 목록</span>
                <span class="ev-univ-name" style="font-size:13px; color:#333;">${boardName}</span>
                <span>🔍</span>
            </div>

            <div class="ev-post-list-wrap">
                ${postsHtml}
            </div>

            ${getEverytimeBottomTab('board')}
        </div>
    `;
}

function renderEverytimeTimetable() {
    const contentElem = document.getElementById('app-content');
    contentElem.innerHTML = `
        <div class="everytime-container" style="background-color: #121212; color: #fff;">
            <div class="ev-top-bar" style="border-bottom: 1px solid #222; padding-bottom: 8px;">
                <div class="ev-logo-title">
                    <span class="ev-red-text">2026년 1학기</span>
                    <span style="font-size:12px; color:#aaa; margin-left:5px;">경영학과 3학년</span>
                </div>
                <div class="ev-top-icons">
                    <span>➕</span>
                    <span>⚙️</span>
                </div>
            </div>

            <div class="ev-timetable-grid">
                <div class="tt-header" style="grid-column: 1; grid-row: 1;"></div>
                <div class="tt-header" style="grid-column: 2; grid-row: 1;">월</div>
                <div class="tt-header" style="grid-column: 3; grid-row: 1;">화</div>
                <div class="tt-header" style="grid-column: 4; grid-row: 1;">수</div>
                <div class="tt-header" style="grid-column: 5; grid-row: 1;">목</div>
                <div class="tt-header" style="grid-column: 6; grid-row: 1;">금</div>

                <div class="tt-time" style="grid-column: 1; grid-row: 2;">9</div>
                <div class="tt-time" style="grid-column: 1; grid-row: 3;">10</div>
                <div class="tt-time" style="grid-column: 1; grid-row: 4;">11</div>
                <div class="tt-time" style="grid-column: 1; grid-row: 5;">12</div>
                <div class="tt-time" style="grid-column: 1; grid-row: 6;">1</div>
                <div class="tt-time" style="grid-column: 1; grid-row: 7;">2</div>
                <div class="tt-time" style="grid-column: 1; grid-row: 8;">3</div>
                <div class="tt-time" style="grid-column: 1; grid-row: 9;">4</div>
                <div class="tt-time" style="grid-column: 1; grid-row: 10;">5</div>

                ${generateGridBackground()}

                <div class="tt-block cell-blue-1" style="grid-column: 2; grid-row: 2 / span 2;">
                    <div class="subj-title">재무관리</div>
                    <div class="subj-room">경영관 301호</div>
                </div>
                <div class="tt-block cell-pink-1" style="grid-column: 2; grid-row: 4 / span 2;">
                    <div class="subj-title">마케팅원론</div>
                    <div class="subj-room">경영관 102호</div>
                </div>

                <div class="tt-block cell-pink-1" style="grid-column: 3; grid-row: 4 / span 2;">
                    <div class="subj-title">마케팅원론</div>
                    <div class="subj-room">경영관 102호</div>
                </div>
                <div class="tt-block cell-mint-1" style="grid-column: 3; grid-row: 7 / span 2;">
                    <div class="subj-title">경영정보시스템</div>
                    <div class="subj-room">경영관 501호</div>
                </div>
                <div class="tt-block cell-purple-2" style="grid-column: 3; grid-row: 9 / span 2;">
                    <div class="subj-title">투자론</div>
                    <div class="subj-room">경영관 303호</div>
                </div>

                <div class="tt-block cell-yellow-1" style="grid-column: 4; grid-row: 4 / span 2;">
                    <div class="subj-title">조직행동론</div>
                    <div class="subj-room">경영관 405호</div>
                </div>
                <div class="tt-block cell-orange-1" style="grid-column: 4; grid-row: 7 / span 2;">
                    <div class="subj-title">기업윤리</div>
                    <div class="subj-room">경영관 201호</div>
                </div>

                <div class="tt-block cell-green-1" style="grid-column: 5; grid-row: 2 / span 2;">
                    <div class="subj-title">생산운영관리</div>
                    <div class="subj-room">경영관 204호</div>
                </div>
                <div class="tt-block cell-purple-1" style="grid-column: 5; grid-row: 4 / span 2;">
                    <div class="subj-title">국제경영학</div>
                    <div class="subj-room">경영관 302호</div>
                </div>
                <div class="tt-block cell-orange-1" style="grid-column: 5; grid-row: 7 / span 2;">
                    <div class="subj-title">기업윤리</div>
                    <div class="subj-room">경영관 201호</div>
                </div>
                <div class="tt-block cell-mint-1" style="grid-column: 5; grid-row: 9 / span 2;">
                    <div class="subj-title">경영정보시스템</div>
                    <div class="subj-room">경영관 501호</div>
                </div>
            </div>

            ${getEverytimeBottomTab('timetable')}
        </div>
    `;
}

function generateGridBackground() {
    let bgHtml = '';
    for (let r = 2; r <= 10; r++) {
        for (let c = 2; c <= 6; c++) {
            bgHtml += `<div class="tt-bg-cell" style="grid-column: ${c}; grid-row: ${r};"></div>`;
        }
    }
    return bgHtml;
}

function getEverytimeBottomTab(activeTab) {
    return `
        <div class="ev-bottom-tab">
            <div class="ev-tab-item ${activeTab === 'home' ? 'active' : ''}" onclick="renderEverytimeHome()">
                <span>🏠</span><span>홈</span>
            </div>
            <div class="ev-tab-item clickable-tab ${activeTab === 'board' ? 'active' : ''}" onclick="renderEverytimeBoardList()">
                <span>💬</span><span>게시판</span>
            </div>
            <div class="ev-tab-item clickable-tab ${activeTab === 'timetable' ? 'active' : ''}" onclick="renderEverytimeTimetable()">
                <span>📅</span><span>시간표</span>
            </div>
            <div class="ev-tab-item">
                <span>🔔</span><span>알림</span>
            </div>
            <div class="ev-tab-item">
                <span>📚</span><span>캠퍼스픽</span>
            </div>
        </div>
    `;
}

// ---------------- 기타 앱 기능 ---------------- //

function openNetflixHome() {
    const contentElem = document.getElementById('app-content');
    contentElem.innerHTML = `
        <div class="netflix-watch-container">
            <div class="watch-title-header">연시은 님이 시청 중인 콘텐츠</div>
            <div class="watch-list">
                <div class="watch-card">
                    <div class="thumbnail bg-content-1">
                        <div class="badge red-badge">최신 등록</div>
                        <div class="content-name">왕과 사는 남자</div>
                    </div>
                    <div class="progress-bar"><div class="progress-fill" style="width: 70%;"></div></div>
                </div>
                <div class="watch-card">
                    <div class="thumbnail bg-content-2">
                        <div class="badge yellow-badge">드라마</div>
                        <div class="content-name">약한영웅 Class 2</div>
                    </div>
                    <div class="progress-bar"><div class="progress-fill" style="width: 40%;"></div></div>
                </div>
                <div class="watch-card">
                    <div class="thumbnail bg-content-3">
                        <div class="badge red-badge">지금 시청하기</div>
                        <div class="content-name">포 핸즈</div>
                    </div>
                    <div class="progress-bar"><div class="progress-fill" style="width: 90%;"></div></div>
                </div>
            </div>
        </div>
    `;
}

function goHome() {
    document.getElementById('app-screen').classList.remove('active');
    document.getElementById('home-screen').classList.add('active');
    
    const appHeader = document.querySelector('.app-header');
    if (appHeader) appHeader.style.display = 'flex';

    const audio = document.getElementById('spotify-audio');
    if (audio) audio.pause();
    isPlaying = false;
}

function audioToggle() {
    const audio = document.getElementById('spotify-audio');
    const playIcon = document.getElementById('play-icon');
    if (!audio) return;

    if (isPlaying) {
        audio.pause();
        playIcon.innerText = "▶";
        isPlaying = false;
    } else {
        audio.play().catch(e => console.log("오디오 재생 대기중"));
        playIcon.innerText = "❚❚";
        isPlaying = true;
    }
}

function handleType(e) {
    e.preventDefault();
    typeNextChar();
}

function handleTypeClick() {
    typeNextChar();
}

function typeNextChar() {
    const input = document.getElementById('msg-input');
    if (!input) return;

    if (currentStep < chatSteps.length) {
        const targetText = chatSteps[currentStep].bReply;
        if (currentTypedIndex < targetText.length) {
            currentTypedIndex++;
            input.value = targetText.substring(0, currentTypedIndex);
        }
    } else {
        input.value = "대화가 완료되었습니다.";
    }
}

function sendMessage() {
    const input = document.getElementById('msg-input');
    const chatBox = document.getElementById('chat-box');

    if (!input || input.value.trim() === '' || currentStep >= chatSteps.length) return;

    const sentMsg = document.createElement('div');
    sentMsg.className = 'msg sent';
    sentMsg.innerText = input.value;
    chatBox.appendChild(sentMsg);

    const currentScript = chatSteps[currentStep];
    input.value = '';
    currentTypedIndex = 0;
    chatBox.scrollTop = chatBox.scrollHeight;

    currentStep++;

    let delay = 600;
    currentScript.aFollowUps.forEach((text, index) => {
        setTimeout(() => {
            const replyMsg = document.createElement('div');
            replyMsg.className = 'msg received';
            replyMsg.innerText = text;
            chatBox.appendChild(replyMsg);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, delay * (index + 1));
    });
}