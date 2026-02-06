"use client"

export default function GuidePage() {
  const handleClose = () => {
    window.close()
  }

  return (
    <>
      <style jsx global>{`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans KR', sans-serif;
            line-height: 1.6;
            color: #1a202c;
            background: #f5f7fa;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        
        /* 헤더 */
        .main-header {
            background: white;
            border-radius: 12px;
            padding: 40px;
            margin-bottom: 30px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            text-align: center;
        }
        
        .main-header h1 {
            font-size: 28px;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 8px;
        }
        
        .main-header p {
            font-size: 16px;
            color: #718096;
        }
        
        /* 섹션 카드 */
        .section-card {
            background: white;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        
        .section-header {
            background: #2d3748;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 25px;
            font-size: 18px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .section-icon {
            font-size: 24px;
        }
        
        /* URL 박스 */
        .url-container {
            background: #2d3748;
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
            font-family: 'Courier New', monospace;
            font-size: 16px;
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        
        .url-container a {
            color: #68d391;
            text-decoration: none;
        }
        
        .url-container a:hover {
            text-decoration: underline;
        }
        
        /* 2열 그리드 */
        .grid-2 {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin: 20px 0;
        }
        
        /* 박스 카드 */
        .box-card {
            background: #f7fafc;
            border-radius: 8px;
            padding: 20px;
            border-left: 4px solid #48bb78;
        }
        
        .box-card.warning {
            border-left-color: #fc8181;
            background: #fff5f5;
        }
        
        .box-card.info {
            border-left-color: #4299e1;
            background: #ebf8ff;
        }
        
        .box-card h3 {
            font-size: 16px;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .box-card ul {
            list-style: none;
            padding: 0;
        }
        
        .box-card li {
            padding: 8px 0 8px 24px;
            position: relative;
            font-size: 14px;
            color: #4a5568;
        }
        
        .box-card li:before {
            content: "•";
            position: absolute;
            left: 8px;
            color: #48bb78;
            font-weight: bold;
            font-size: 18px;
        }
        
        .box-card.warning li:before {
            color: #fc8181;
        }
        
        /* 프로그레스 바 스타일 */
        .progress-example {
            margin: 20px 0;
            padding: 20px;
            background: #f7fafc;
            border-radius: 8px;
        }
        
        .progress-label {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 600;
            color: #2d3748;
        }
        
        .progress-bar-container {
            width: 100%;
            height: 8px;
            background: #e2e8f0;
            border-radius: 4px;
            overflow: hidden;
        }
        
        .progress-bar {
            height: 100%;
            background: #48bb78;
            transition: width 0.3s ease;
        }
        
        .progress-bar.warning {
            background: #fc8181;
        }
        
        /* 테이블 */
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        thead {
            background: #2d3748;
            color: white;
        }
        
        th {
            padding: 14px 16px;
            text-align: left;
            font-weight: 600;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        td {
            padding: 12px 16px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 14px;
        }
        
        tbody tr:hover {
            background: #f7fafc;
        }
        
        tbody tr:last-child td {
            border-bottom: none;
        }
        
        .table-total {
            background: #edf2f7 !important;
            font-weight: 700;
        }
        
        /* 뱃지 */
        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .badge-success {
            background: #c6f6d5;
            color: #22543d;
        }
        
        .badge-warning {
            background: #fed7d7;
            color: #742a2a;
        }
        
        .badge-info {
            background: #bee3f8;
            color: #2c5282;
        }
        
        .badge-note {
            background: #fef5e7;
            color: #d97706;
        }
        
        /* 제작 흐름도 */
        .flow-container {
            margin: 25px 0;
            padding: 25px;
            background: #f7fafc;
            border-radius: 8px;
        }
        
        .flow-steps {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
        }
        
        .flow-step {
            flex: 1;
            min-width: 100px;
            background: white;
            padding: 16px 12px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            font-weight: 600;
            font-size: 13px;
            color: #2d3748;
            border: 2px solid transparent;
            transition: all 0.2s;
        }
        
        .flow-step:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            border-color: #48bb78;
        }
        
        .flow-step.highlight {
            background: #2d3748;
            color: white;
        }
        
        .flow-arrow {
            font-size: 20px;
            color: #48bb78;
            font-weight: bold;
        }
        
        /* 강조 박스 */
        .highlight-box {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px;
            border-radius: 8px;
            text-align: center;
            margin: 25px 0;
        }
        
        .highlight-box h3 {
            font-size: 20px;
            margin-bottom: 10px;
        }
        
        .highlight-box p {
            font-size: 16px;
            opacity: 0.95;
        }
        
        /* 체크리스트 */
        .checklist {
            background: #f7fafc;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        
        .checklist ul {
            list-style: none;
            padding: 0;
        }
        
        .checklist li {
            padding: 10px 0 10px 32px;
            position: relative;
            font-size: 14px;
            color: #2d3748;
        }
        
        .checklist li:before {
            content: "☐";
            position: absolute;
            left: 0;
            color: #4299e1;
            font-size: 20px;
        }
        
        /* FAQ */
        .faq-item {
            background: #f7fafc;
            padding: 18px;
            border-radius: 8px;
            margin-bottom: 12px;
            border-left: 4px solid #4299e1;
        }
        
        .faq-question {
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 8px;
            font-size: 14px;
        }
        
        .faq-answer {
            color: #4a5568;
            font-size: 14px;
        }
        
        /* 공식 박스 */
        .formula-box {
            background: #edf2f7;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
            border: 2px dashed #4299e1;
            font-family: 'Courier New', monospace;
            font-size: 15px;
            font-weight: 600;
            color: #2d3748;
        }
        
        /* 예시 박스 */
        .example-box {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
        }
        
        .example-label {
            font-weight: 700;
            color: #4299e1;
            margin-bottom: 10px;
            font-size: 13px;
        }

        /* 창닫기 버튼 */
        .close-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            border: none;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
            transition: all 0.2s;
            z-index: 1000;
        }

        .close-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
        }
        
        /* 반응형 */
        @media (max-width: 768px) {
            .grid-2 {
                grid-template-columns: 1fr;
            }
            
            .flow-steps {
                flex-direction: column;
            }
            
            .flow-arrow {
                transform: rotate(90deg);
            }
            
            .container {
                padding: 20px 15px;
            }
            
            .main-header {
                padding: 25px 20px;
            }
            
            .section-card {
                padding: 20px;
            }
            
            table {
                font-size: 12px;
            }
            
            th, td {
                padding: 10px 8px;
            }

            .close-button {
                top: 10px;
                right: 10px;
                padding: 10px 20px;
                font-size: 13px;
            }
        }
        
        @media print {
            body {
                background: white;
            }
            
            .section-card {
                box-shadow: none;
                page-break-inside: avoid;
            }

            .close-button {
                display: none;
            }
        }
      `}</style>

      {/* 창닫기 버튼 */}
      <button onClick={handleClose} className="close-button">
        ✕ 창 닫기
      </button>

      <div className="container">
        {/* 메인 헤더 */}
        <div className="main-header">
          <h1>📝 나레이션 원고 작성 가이드</h1>
          <p>재난영화로 알아보는 직업이야기</p>
        </div>

        {/* 인사말 */}
        <div className="section-card">
          <div className="section-header">
            <span className="section-icon">👋</span>
            안녕하세요, 교수님!
          </div>
          <p>"재난영화로 알아보는 직업이야기" 이러닝 콘텐츠 제작을 위한 <strong>나레이션 원고 작성 사이트</strong>를 개발했습니다.</p>
          <p style={{ marginTop: '10px' }}>효율적인 원고 작성을 위해 아래 가이드를 참고해 주세요.</p>
        </div>

        {/* 사이트 개발 배경 */}
        <div className="section-card">
          <div className="section-header">
            <span className="section-icon">🎯</span>
            사이트 개발 배경
          </div>
          
          <div className="grid-2">
            <div className="box-card warning">
              <h3><span>❌</span>기존 문제점</h3>
              <ul>
                <li>워드/한글 문서로 러닝타임 계산 수작업</li>
                <li>제작 단계에서 분량 초과 발견</li>
                <li>재촬영/재편집으로 시간·비용 손실</li>
                <li>섹션별 시간 관리 어려움</li>
                <li>원고 템플릿 불일치</li>
                <li>후반 작업 지연</li>
              </ul>
            </div>
            
            <div className="box-card">
              <h3><span>✅</span>개발 목적</h3>
              <ul>
                <li>실시간 러닝타임 자동 계산</li>
                <li>작성 중 목표 시간 즉시 확인</li>
                <li>촬영 전 정확한 분량 조절</li>
                <li>통일된 형식의 원고 관리</li>
                <li>PDF 다운로드로 제작팀 공유 용이</li>
                <li>제작 시간과 비용 절감</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 사이트 접속 방법 */}
        <div className="section-card">
          <div className="section-header">
            <span className="section-icon">🌐</span>
            사이트 접속 방법
          </div>
          
          <div className="url-container">
            <a href="https://script-planner2.vercel.app/" target="_blank" rel="noopener noreferrer">
              https://script-planner2.vercel.app/
            </a>
          </div>
          
          <div className="box-card info">
            <ul>
              <li>별도 로그인 없이 바로 사용 가능</li>
              <li>작성한 내용은 브라우저에 임시 저장됨</li>
              <li><strong>반드시 PDF 저장으로 백업 필요!</strong></li>
            </ul>
          </div>
        </div>

        {/* 러닝타임 작성 기준 */}
        <div className="section-card">
          <div className="section-header">
            <span className="section-icon">⏱️</span>
            러닝타임 작성 기준
          </div>
          
          <div className="box-card info" style={{ marginBottom: '20px' }}>
            <h3>📊 자동 계산 기준</h3>
            <div className="formula-box">
              한글 기준 2분당 725자 → 초당 약 6.04자
            </div>
            <p style={{ marginTop: '15px', fontWeight: 600, color: '#2d3748' }}>예시:</p>
            <ul style={{ marginTop: '10px' }}>
              <li>300자 작성 → 약 50초 계산</li>
              <li>600자 작성 → 약 99초 계산</li>
            </ul>
          </div>
          
          <div className="box-card">
            <h3>✅ 적정 분량 기준</h3>
            <p style={{ fontSize: '20px', fontWeight: 700, color: '#48bb78', margin: '15px 0' }}>
              95% ~ 105%
            </p>
            <p style={{ marginBottom: '15px' }}>각 차시별 목표 러닝타임의 95%~105% 범위 내에서 작성하시면 됩니다.</p>
            
            <div className="progress-example">
              <div className="progress-label">
                <span>전체 러닝타임</span>
                <span><span className="badge badge-success">100%</span></span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: '100%' }}></div>
              </div>
            </div>
            
            <p style={{ marginTop: '15px', fontWeight: 600 }}>실시간 피드백:</p>
            <ul style={{ marginTop: '10px' }}>
              <li><span className="badge badge-success">95~105%</span> 적정 분량 (촬영 권장)</li>
              <li><span className="badge badge-warning">105% 초과</span> 원고 줄이기 필요</li>
              <li><span className="badge badge-info">95% 미만</span> 원고 추가 가능</li>
            </ul>
          </div>
        </div>

        {/* 차시별 구조 */}
        <div className="section-card">
          <div className="section-header">
            <span className="section-icon">📺</span>
            차시별 구조 및 러닝타임
          </div>
          
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '15px', color: '#2d3748' }}>1차시 (영화 중심) - 정확히 25분</h3>
          <table>
            <thead>
              <tr>
                <th style={{ width: '50px' }}>#</th>
                <th>섹션명</th>
                <th style={{ width: '100px' }}>목표 시간</th>
                <th style={{ width: '130px' }}>입력 방식</th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>로고영상</td>
                <td><strong>10초</strong></td>
                <td>자동</td>
                <td></td>
              </tr>
              <tr>
                <td>2</td>
                <td>오픈훅(타이틀)</td>
                <td><strong>30초</strong></td>
                <td>키워드 5개</td>
                <td></td>
              </tr>
              <tr>
                <td>3</td>
                <td>강의 시작멘트</td>
                <td><strong>1분</strong></td>
                <td>원고 입력</td>
                <td></td>
              </tr>
              <tr>
                <td>4</td>
                <td>학습목표/학습내용</td>
                <td><strong>20초</strong></td>
                <td>목표/내용</td>
                <td><span className="badge badge-note">디자인 페이지</span></td>
              </tr>
              <tr>
                <td>5</td>
                <td>영화시청 가이드</td>
                <td><strong>2분</strong></td>
                <td>원고 입력</td>
                <td>영화소개</td>
              </tr>
              <tr>
                <td>6</td>
                <td>영화 하이라이트</td>
                <td><strong>15분</strong></td>
                <td>원고 입력</td>
                <td><span className="badge badge-note">AI음성</span></td>
              </tr>
              <tr>
                <td>7</td>
                <td>영화시청 후 분석</td>
                <td><strong>4분 30초</strong></td>
                <td>원고 입력</td>
                <td></td>
              </tr>
              <tr>
                <td>8</td>
                <td>다음차시 예고</td>
                <td><strong>50초</strong></td>
                <td>원고 입력</td>
                <td></td>
              </tr>
              <tr>
                <td>9</td>
                <td>정리하기</td>
                <td><strong>30초</strong></td>
                <td>원고 입력</td>
                <td><span className="badge badge-note">AI음성</span></td>
              </tr>
              <tr>
                <td>10</td>
                <td>로고영상</td>
                <td><strong>10초</strong></td>
                <td>자동</td>
                <td></td>
              </tr>
              <tr className="table-total">
                <td colSpan={2}>전체 합계</td>
                <td><strong>25분</strong></td>
                <td colSpan={2}>95%~105%: 1425초~1575초</td>
              </tr>
            </tbody>
          </table>
          
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '30px 0 15px', color: '#2d3748' }}>2차시 (강의 중심) - 정확히 25분</h3>
          <table>
            <thead>
              <tr>
                <th style={{ width: '50px' }}>#</th>
                <th>섹션명</th>
                <th style={{ width: '100px' }}>목표 시간</th>
                <th style={{ width: '130px' }}>입력 방식</th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>로고영상</td>
                <td><strong>10초</strong></td>
                <td>자동</td>
                <td></td>
              </tr>
              <tr>
                <td>2</td>
                <td>오픈훅(타이틀)</td>
                <td><strong>30초</strong></td>
                <td>키워드 5개</td>
                <td></td>
              </tr>
              <tr>
                <td>3</td>
                <td>강의 시작멘트</td>
                <td><strong>1분</strong></td>
                <td>원고 입력</td>
                <td></td>
              </tr>
              <tr>
                <td>4</td>
                <td>학습목표/학습내용</td>
                <td><strong>20초</strong></td>
                <td>목표/내용</td>
                <td><span className="badge badge-note">디자인 페이지</span></td>
              </tr>
              <tr>
                <td>5</td>
                <td>본강의</td>
                <td><strong>12분</strong></td>
                <td>원고 입력</td>
                <td><span className="badge badge-note">크로마키+PPT</span></td>
              </tr>
              <tr>
                <td>6</td>
                <td>전문가 인터뷰</td>
                <td><strong>8분 20초</strong></td>
                <td>영상내용/출처</td>
                <td></td>
              </tr>
              <tr>
                <td>7</td>
                <td>마무리멘트</td>
                <td><strong>2분</strong></td>
                <td>원고 입력</td>
                <td></td>
              </tr>
              <tr>
                <td>8</td>
                <td>정리하기</td>
                <td><strong>30초</strong></td>
                <td>원고 입력</td>
                <td><span className="badge badge-note">AI음성</span></td>
              </tr>
              <tr>
                <td>9</td>
                <td>로고영상</td>
                <td><strong>10초</strong></td>
                <td>자동</td>
                <td></td>
              </tr>
              <tr className="table-total">
                <td colSpan={2}>전체 합계</td>
                <td><strong>25분</strong></td>
                <td colSpan={2}>95%~105%: 1425초~1575초</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 섹션별 작성 요령 */}
        <div className="section-card">
          <div className="section-header">
            <span className="section-icon">✍️</span>
            섹션별 작성 요령
          </div>
          
          <div className="box-card" style={{ marginBottom: '20px' }}>
            <h3>🎬 오픈훅(타이틀) - 핵심 키워드</h3>
            <p><strong>목적:</strong> 직업의 핵심 특성을 5개 키워드로 표현</p>
            
            <div className="example-box" style={{ marginTop: '15px' }}>
              <div className="example-label">예시 (소방관)</div>
              <ul>
                <li>① 희생정신</li>
                <li>② 고도의 훈련</li>
                <li>③ 강인한 신체능력</li>
                <li>④ 신속한 판단력</li>
                <li>⑤ 팀워크</li>
              </ul>
            </div>
          </div>
          
          <div className="box-card" style={{ marginBottom: '20px' }}>
            <h3>📚 학습목표/학습내용</h3>
            <p><strong>학습목표 (2가지 이상, 각 40자 이내):</strong></p>
            <ul style={{ marginTop: '10px' }}>
              <li>소방관의 역할과 책임을 이해하고 설명할 수 있다.</li>
              <li>영화 속 직업과 실제 직업을 비교 분석할 수 있다.</li>
            </ul>
            <p style={{ marginTop: '15px' }}><strong>학습내용 (2가지 이상):</strong></p>
            <ul style={{ marginTop: '10px' }}>
              <li>1. 소방관의 주요 역할과 업무</li>
              <li>2. 화재 진압 과정과 구조 활동</li>
              <li>3. 소방 장비와 안전 규정</li>
            </ul>
          </div>
          
          <div className="box-card">
            <h3>🎥 전문가 인터뷰 (2차시만 해당)</h3>
            <p><strong>영상내용:</strong> 전문가가 설명하는 내용 요약</p>
            <p style={{ marginTop: '10px' }}><strong>영상출처:</strong> YouTube URL 또는 출처 명시</p>
            <div className="example-box" style={{ marginTop: '10px' }}>
              <code>예) https://www.youtube.com/watch?v=xxxxx</code>
            </div>
          </div>
        </div>

        {/* 작성 팁 */}
        <div className="section-card">
          <div className="section-header">
            <span className="section-icon">💡</span>
            작성 팁
          </div>
          
          <div className="grid-2">
            <div className="box-card warning">
              <h3><span>❌</span>피해야 할 것</h3>
              <ul>
                <li>105% 초과 (재촬영 원인)</li>
                <li>문어체, 딱딱한 표현</li>
                <li>섹션 간 내용 중복</li>
                <li>PDF 저장 없이 브라우저 종료</li>
                <li>너무 빠른 호흡의 문장</li>
                <li>전문 용어 남발</li>
              </ul>
            </div>
            
            <div className="box-card">
              <h3><span>✅</span>해야 할 것</h3>
              <ul>
                <li>섹션별 목표 시간 확인하며 작성</li>
                <li>실시간 러닝타임 체크 (우측 상단 %)</li>
                <li>95~105% 구간 유지</li>
                <li>완성 후 반드시 PDF 다운로드</li>
                <li>자연스러운 구어체 사용</li>
                <li>감정 표현과 억양 고려</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 러닝타임 관리 전략 */}
        <div className="section-card">
          <div className="section-header">
            <span className="section-icon">📊</span>
            러닝타임 관리 전략
          </div>
          
          <div className="grid-2">
            <div className="box-card warning">
              <h3>⚠️ 분량 초과 시 (105% 이상)</h3>
              <ul>
                <li>수식어 제거: "매우 중요한" → "중요한"</li>
                <li>중복 표현 삭제</li>
                <li>부연 설명 축약</li>
                <li>예시 개수 줄이기</li>
                <li>긴 문장 짧게 나누기</li>
                <li>핵심 내용만 남기기</li>
              </ul>
            </div>
            
            <div className="box-card">
              <h3>➕ 분량 부족 시 (95% 미만)</h3>
              <ul>
                <li>구체적 예시 추가</li>
                <li>감정적 표현 강화</li>
                <li>전환 문장 추가</li>
                <li>설명 상세화</li>
                <li>비유와 은유 활용</li>
                <li>청중에게 질문 던지기</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 저장 방법 */}
        <div className="section-card">
          <div className="section-header">
            <span className="section-icon">💾</span>
            저장 방법
          </div>
          
          <div className="box-card info" style={{ marginBottom: '20px' }}>
            <h3>1. 자동 임시 저장</h3>
            <p>작성 중인 내용은 브라우저에 임시 저장됩니다.</p>
            <p style={{ color: '#e53e3e', fontWeight: 600, marginTop: '10px' }}>⚠️ 단, 브라우저 캐시 삭제 시 내용이 소실됩니다!</p>
          </div>
          
          <div className="box-card">
            <h3>2. PDF 다운로드 (필수!)</h3>
            <ul>
              <li>화면 하단 "PDF 다운로드" 버튼 클릭</li>
              <li>파일명: 주차_주차명_차시.pdf</li>
              <li>예) 2주차_소방관_1차시.pdf</li>
              <li>수정 시마다 새로 다운로드</li>
            </ul>
          </div>
        </div>

        {/* 체크리스트 */}
        <div className="section-card">
          <div className="section-header">
            <span className="section-icon">✨</span>
            작성 완료 체크리스트
          </div>
          
          <div className="checklist">
            <ul>
              <li>전체 러닝타임 95~105% 달성</li>
              <li>각 섹션 분량 적정 범위</li>
              <li>학습목표/학습내용 40자 준수</li>
              <li>키워드 5개 가능하면 모두 입력 (1차시와 2차시 동일하게 작성)</li>
              <li>전문가 인터뷰 정보 입력 (2차시)</li>
              <li>PDF 다운로드 완료</li>
              <li>파일명 확인</li>
            </ul>
          </div>
        </div>

        {/* 제작 흐름도 */}
        <div className="section-card">
          <div className="section-header">
            <span className="section-icon">🎬</span>
            제작 흐름도
          </div>
          
          <div className="flow-container">
            <div className="flow-steps">
              <div className="flow-step highlight">원고 작성<br />(이 사이트)</div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">PDF<br />다운로드</div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">제작팀<br />전달</div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">촬영/<br />녹음</div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">영상<br />편집</div>
              <div className="flow-arrow">→</div>
              <div className="flow-step highlight">완성</div>
            </div>
          </div>
          
          <div className="highlight-box" style={{ marginTop: '20px' }}>
            <h3>참고사항</h3>
            <p>사이트를 통해 작성하시면 촬영 전 정확한 분량 확인으로<br />
            제작 기간과 촬영 시간을 크게 절감할 수 있습니다!</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="section-card">
          <div className="section-header">
            <span className="section-icon">❓</span>
            자주 묻는 질문 (FAQ)
          </div>
          
          <div className="faq-item">
            <div className="faq-question">Q. 작성 중 브라우저를 닫아도 되나요?</div>
            <div className="faq-answer">A. 임시 저장은 되지만, 반드시 PDF로 저장하세요!</div>
          </div>
          
          <div className="faq-item">
            <div className="faq-question">Q. 러닝타임이 108%인데 어떻게 하나요?</div>
            <div className="faq-answer">A. 105% 이하로 줄여주세요. (약 3% = 45초 분량)</div>
          </div>
          
          <div className="faq-item">
            <div className="faq-question">Q. 여러 차시를 동시에 작성할 수 있나요?</div>
            <div className="faq-answer">A. 한 화면에서 1차시만 작성 가능합니다. 차시 전환 후 작업하세요.</div>
          </div>
          
          <div className="faq-item">
            <div className="faq-question">Q. PDF가 여러 페이지로 나오는데 정상인가요?</div>
            <div className="faq-answer">A. 네, 분량에 따라 자동으로 페이지가 나뉩니다.</div>
          </div>
        </div>

        {/* 마무리 */}
        <div className="section-card">
          <div className="highlight-box">
            <h3>촬영이 원할하게 진행될 수 있도록 최대한 말씀하시듯이 나레이션을 써주세요!</h3>
            <p>문의사항은 언제든 연락 주세요.</p>
          </div>
        </div>
      </div>
    </>
  )
}
