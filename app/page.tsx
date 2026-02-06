"use client"

import { useState, useRef } from "react"
import { Download, FileText } from "lucide-react"

// 2분(120초) 기준 725자 = 초당 약 6.04자
const CHARS_PER_SECOND = 725 / 120

interface Section {
  id: string
  name: string
  target: number
  hasInput: boolean
  hasKeywords?: boolean
  hasObjectives?: boolean
  hasInterview?: boolean
  note?: string
}

const EP1_SECTIONS: Section[] = [
  { id: "logo1", name: "로고영상", target: 10, hasInput: false },
  { id: "hook", name: "오픈훅(타이틀)", target: 30, hasInput: false, hasKeywords: true },
  { id: "intro", name: "강의 시작멘트", target: 60, hasInput: true },
  { id: "objectives", name: "학습목표/학습내용", target: 20, hasInput: false, hasObjectives: true, note: "디자인 페이지" },
  { id: "guide", name: "영화시청 가이드 (영화소개)", target: 120, hasInput: true },
  { id: "movie", name: "영화 하이라이트", target: 900, hasInput: true, note: "줄거리는 AI음성으로 대체" },
  { id: "analysis", name: "영화시청 후 분석", target: 270, hasInput: true },
  { id: "preview", name: "다음차시 예고", target: 50, hasInput: true },
  { id: "summary", name: "정리하기", target: 30, hasInput: true, note: "AI음성" },
  { id: "logo2", name: "로고영상", target: 10, hasInput: false },
]

const EP2_SECTIONS: Section[] = [
  { id: "logo1", name: "로고영상", target: 10, hasInput: false },
  { id: "hook", name: "오픈훅(타이틀)", target: 30, hasInput: false, hasKeywords: true },
  { id: "intro", name: "강의 시작멘트", target: 60, hasInput: true },
  { id: "objectives", name: "학습목표/학습내용", target: 20, hasInput: false, hasObjectives: true, note: "디자인 페이지" },
  { id: "lecture", name: "본강의", target: 720, hasInput: true, note: "크로마키+PPT" },
  { id: "interview", name: "전문가 인터뷰", target: 500, hasInput: false, hasInterview: true },
  { id: "closing", name: "마무리멘트", target: 120, hasInput: true },
  { id: "summary", name: "정리하기", target: 30, hasInput: true, note: "AI음성" },
  { id: "logo2", name: "로고영상", target: 10, hasInput: false },
]

type Scripts = { [key: string]: string }
type Keywords = { [key: string]: string[] }
type Objectives = { [key: string]: { goal: string; content: string } }
type Interview = { [key: string]: { content: string; source: string } }

export default function ScriptPlanner() {
  const [episode, setEpisode] = useState<1 | 2>(1)
  const [weekNumber, setWeekNumber] = useState("")
  const [weekTitle, setWeekTitle] = useState("")
  const [scripts, setScripts] = useState<{ 1: Scripts; 2: Scripts }>({ 1: {}, 2: {} })
  const [keywords, setKeywords] = useState<{ 1: Keywords; 2: Keywords }>({
    1: { hook: ["", "", "", "", ""] },
    2: { hook: ["", "", "", "", ""] },
  })
  const [objectives, setObjectives] = useState<{ 1: Objectives; 2: Objectives }>({
    1: { objectives: { goal: "", content: "" } },
    2: { objectives: { goal: "", content: "" } },
  })
  const [interviews, setInterviews] = useState<{ 1: Interview; 2: Interview }>({
    1: { interview: { content: "", source: "" } },
    2: { interview: { content: "", source: "" } },
  })
  const printRef = useRef<HTMLDivElement>(null)

  const sections = episode === 1 ? EP1_SECTIONS : EP2_SECTIONS

  const calculateDuration = (text: string) => {
    if (!text) return 0
    return Math.ceil(text.replace(/\s/g, "").length / CHARS_PER_SECOND)
  }

  const updateScript = (sectionId: string, text: string) => {
    setScripts((prev) => ({ ...prev, [episode]: { ...prev[episode], [sectionId]: text } }))
  }

  const updateKeyword = (sectionId: string, index: number, value: string) => {
    setKeywords((prev) => ({
      ...prev,
      [episode]: {
        ...prev[episode],
        [sectionId]: prev[episode][sectionId].map((k, i) => (i === index ? value : k)),
      },
    }))
  }

  const updateObjective = (sectionId: string, field: "goal" | "content", value: string) => {
    setObjectives((prev) => ({
      ...prev,
      [episode]: { ...prev[episode], [sectionId]: { ...prev[episode][sectionId], [field]: value } },
    }))
  }

  const updateInterview = (sectionId: string, field: "content" | "source", value: string) => {
    setInterviews((prev) => ({
      ...prev,
      [episode]: { ...prev[episode], [sectionId]: { ...prev[episode][sectionId], [field]: value } },
    }))
  }

  const calculateTotalTime = () => {
    return sections.reduce((total, section) => {
      if (section.hasInput) {
        return total + calculateDuration(scripts[episode][section.id] || "")
      }
      return total + section.target
    }, 0)
  }

  const totalTarget = sections.reduce((sum, s) => sum + s.target, 0)
  const totalActual = calculateTotalTime()
  const totalPercent = Math.round((totalActual / totalTarget) * 100)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const downloadPDF = async () => {
    const html2canvas = (await import("html2canvas")).default
    const { jsPDF } = await import("jspdf")

    if (!printRef.current) return

    const canvas = await html2canvas(printRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    })

    const pdf = new jsPDF("p", "mm", "a4")
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    
    // 페이지 여백 설정 (상하좌우)
    const marginX = 10
    const marginY = 15
    const contentWidth = pdfWidth - marginX * 2
    const contentHeight = pdfHeight - marginY * 2
    
    // 캔버스를 PDF 콘텐츠 영역에 맞게 스케일 계산
    const scale = contentWidth / canvas.width
    const scaledPageHeight = contentHeight / scale
    
    // 빈 줄(흰색 행)을 찾는 함수 - 텍스트가 잘리지 않는 위치 탐색
    const findBestBreakPoint = (targetY: number, searchRange: number): number => {
      const ctx = canvas.getContext("2d")
      if (!ctx) return targetY
      
      // 목표 위치에서 위쪽으로 searchRange 픽셀 범위 내에서 빈 줄 찾기
      const startY = Math.max(0, Math.floor(targetY - searchRange))
      const endY = Math.floor(targetY)
      
      // 아래에서 위로 스캔하여 가장 가까운 빈 줄 찾기
      for (let y = endY; y >= startY; y--) {
        const imageData = ctx.getImageData(0, y, canvas.width, 1)
        const data = imageData.data
        let isWhiteRow = true
        
        // 해당 행의 모든 픽셀이 흰색(또는 거의 흰색)인지 확인
        for (let x = 0; x < canvas.width; x++) {
          const idx = x * 4
          const r = data[idx]
          const g = data[idx + 1]
          const b = data[idx + 2]
          
          // RGB 모두 250 이상이면 흰색으로 간주
          if (r < 250 || g < 250 || b < 250) {
            isWhiteRow = false
            break
          }
        }
        
        if (isWhiteRow) {
          return y
        }
      }
      
      // 빈 줄을 찾지 못하면 원래 위치 반환
      return targetY
    }
    
    // 페이지 분할 위치 계산
    const pageBreaks: number[] = [0]
    let currentY = 0
    
    while (currentY < canvas.height) {
      const nextTargetY = currentY + scaledPageHeight
      
      if (nextTargetY >= canvas.height) {
        // 마지막 페이지
        pageBreaks.push(canvas.height)
        break
      }
      
      // 텍스트가 잘리지 않는 최적의 분할 위치 찾기 (100픽셀 범위 내에서)
      const bestBreakY = findBestBreakPoint(nextTargetY, 100)
      pageBreaks.push(bestBreakY)
      currentY = bestBreakY
    }
    
    // 각 페이지 생성
    for (let i = 0; i < pageBreaks.length - 1; i++) {
      if (i > 0) {
        pdf.addPage()
      }
      
      const sourceY = pageBreaks[i]
      const sourceHeight = pageBreaks[i + 1] - pageBreaks[i]
      
      // 페이지별로 캔버스를 잘라서 새 캔버스 생성
      const pageCanvas = document.createElement("canvas")
      pageCanvas.width = canvas.width
      pageCanvas.height = sourceHeight
      
      const ctx = pageCanvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height)
        ctx.drawImage(
          canvas,
          0, sourceY, canvas.width, sourceHeight,
          0, 0, canvas.width, sourceHeight
        )
      }
      
      const pageImgData = pageCanvas.toDataURL("image/png")
      const imgHeight = sourceHeight * scale
      
      pdf.addImage(pageImgData, "PNG", marginX, marginY, contentWidth, imgHeight)
    }

    pdf.save(`${weekNumber || "원고"}_${weekTitle || ""}_${episode}차시.pdf`)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
<header className="border-b border-neutral-200 bg-white">
  <div className="mx-auto max-w-4xl px-6 py-8">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">나레이션 원고 작성</h1>
        <p className="mt-1 text-sm text-neutral-500">재난영화로 알아보는 직업이야기</p>
      </div>
      
        href="/guide"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border-2 border-neutral-900 bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
      >
        📖 작성가이드 보기
      </a>
    </div>
  </div>
</header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        {/* Week Info */}
        <div className="mb-8 flex gap-3">
          <input
            type="text"
            value={weekNumber}
            onChange={(e) => setWeekNumber(e.target.value)}
            placeholder="주차 (예: 2주차)"
            className="w-32 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-neutral-400"
          />
          <input
            type="text"
            value={weekTitle}
            onChange={(e) => setWeekTitle(e.target.value)}
            placeholder="주차명 (예: 소방관)"
            className="flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-neutral-400"
          />
        </div>

        {/* Episode Tabs */}
        <div className="mb-8 flex gap-2">
          <button
            onClick={() => setEpisode(1)}
            className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${
              episode === 1 ? "bg-neutral-900 text-white" : "bg-white text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            1차시 (25분)
          </button>
          <button
            onClick={() => setEpisode(2)}
            className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${
              episode === 2 ? "bg-neutral-900 text-white" : "bg-white text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            2차시 (25분)
          </button>
        </div>

        {/* Progress */}
        <div className="mb-8 rounded-xl border border-neutral-200 bg-white p-6">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-sm text-neutral-500">전체 러닝타임</p>
              <p className="text-2xl font-semibold text-neutral-900">
                {formatTime(totalActual)} <span className="text-neutral-400">/ {formatTime(totalTarget)}</span>
              </p>
            </div>
            <div
              className={`text-3xl font-bold ${
                totalPercent > 100 ? "text-red-500" : totalPercent >= 95 ? "text-green-500" : "text-neutral-400"
              }`}
            >
              {totalPercent}%
            </div>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
            <div
              className={`h-full transition-all duration-300 ${
                totalPercent > 100 ? "bg-red-500" : totalPercent >= 95 ? "bg-green-500" : "bg-neutral-900"
              }`}
              style={{ width: `${Math.min(totalPercent, 100)}%` }}
            />
          </div>
          {totalPercent > 100 && (
            <p className="mt-3 text-sm text-red-500">{formatTime(totalActual - totalTarget)} 초과</p>
          )}
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => {
            const script = scripts[episode][section.id] || ""
            const duration = section.hasInput ? calculateDuration(script) : section.target
            const percent = Math.round((duration / section.target) * 100)

            return (
              <div key={section.id} className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
                {/* Section Header */}
                <div className="flex items-center justify-between bg-neutral-700 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-neutral-300">#{index + 1}</span>
                    <h3 className="font-bold text-white">{section.name}</h3>
                    {!section.hasInput && !section.hasKeywords && !section.hasObjectives && (
                      <span className="rounded bg-neutral-600 px-2 py-0.5 text-xs text-neutral-200">자동</span>
                    )}
                    {section.note && <span className="text-xs text-neutral-300">{section.note}</span>}
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-sm font-medium ${
                        percent > 100 ? "text-red-400" : percent >= 95 ? "text-green-400" : "text-neutral-300"
                      }`}
                    >
                      {formatTime(duration)} / {formatTime(section.target)} / <span className="font-bold">{percent}%</span>
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-neutral-50">
                  <div
                    className={`h-full transition-all duration-300 ${
                      percent > 100 ? "bg-red-500" : percent >= 95 ? "bg-green-500" : "bg-neutral-300"
                    }`}
                    style={{ width: `${Math.min(percent, 100)}%` }}
                  />
                </div>

                {/* Input Area */}
                {section.hasInput && (
                  <div className="p-5">
                    <textarea
                      value={script}
                      onChange={(e) => updateScript(section.id, e.target.value)}
                      placeholder={`원고를 입력하세요 (목표: ${formatTime(section.target)}, 약 ${Math.round(section.target * CHARS_PER_SECOND)}자)`}
                      className="min-h-32 w-full resize-y rounded-lg border border-neutral-200 p-4 text-sm leading-relaxed outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400"
                    />
                    <div className="mt-2 flex items-center justify-between text-xs text-neutral-400">
                      <span>{script.replace(/\s/g, "").length}자</span>
                      {percent > 100 && <span className="text-red-500">{formatTime(duration - section.target)} 초과</span>}
                      {percent >= 95 && percent <= 100 && <span className="text-green-500">적정</span>}
                    </div>
                  </div>
                )}

                {/* Keywords */}
                {section.hasKeywords && (
                  <div className="border-t border-neutral-100 p-5">
                    <p className="mb-1 text-sm font-medium text-neutral-700">핵심 키워드 (5개)</p>
                    <p className="mb-3 text-xs text-neutral-500">영화에서 중요한 직업의 핵심 특성이나 역량 키워드를 입력하세요.</p>
                    <div className="flex flex-col gap-2">
                      {keywords[episode][section.id]?.map((keyword, idx) => (
                        <input
                          key={idx}
                          type="text"
                          value={keyword}
                          onChange={(e) => updateKeyword(section.id, idx, e.target.value)}
                          placeholder={
                            idx === 0 ? "예: 희생정신" :
                            idx === 1 ? "예: 고도의 훈련" :
                            idx === 2 ? "예: 강인한 신체능력" :
                            idx === 3 ? "예: 신속한 판단력" :
                            "예: 팀워크"
                          }
                          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400"
                        />
                      ))}
                    </div>
                    {keywords[episode][section.id]?.some((k) => k.trim()) && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {keywords[episode][section.id]
                          ?.filter((k) => k.trim())
                          .map((keyword, idx) => (
                            <span key={idx} className="rounded-full bg-neutral-900 px-3 py-1 text-xs text-white">
                              {keyword}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Interview */}
                {section.hasInterview && (
                  <div className="border-t border-neutral-100 p-5">
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-700">영상내용</label>
                        <textarea
                          value={interviews[episode][section.id]?.content || ""}
                          onChange={(e) => updateInterview(section.id, "content", e.target.value)}
                          placeholder="전문가 인터뷰 영상의 주요 내용을 입력하세요."
                          className="min-h-24 w-full resize-y rounded-lg border border-neutral-200 p-3 text-sm leading-relaxed outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-700">영상출처</label>
                        <input
                          type="text"
                          value={interviews[episode][section.id]?.source || ""}
                          onChange={(e) => updateInterview(section.id, "source", e.target.value)}
                          placeholder="영상 출처 링크 (예: https://www.youtube.com/watch?v=...)"
                          className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Objectives */}
                {section.hasObjectives && (
                  <div className="border-t border-neutral-100 p-5">
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-700">학습목표</label>
                        <textarea
                          value={objectives[episode][section.id]?.goal || ""}
                          onChange={(e) => updateObjective(section.id, "goal", e.target.value)}
                          placeholder={`이 차시를 통해 학습자가 달성해야 할 목표를 입력하세요.\n예: 1. 소방관의 역할과 책임을 이해하고, 소방활동의 중요성을 설명할 수 있다.\n2. 영화 속 직업과 실제 직업을 비교하여 설명할 수 있다.`}
                          className="min-h-24 w-full resize-y rounded-lg border border-neutral-200 p-3 text-sm leading-relaxed outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-700">학습내용</label>
                        <textarea
                          value={objectives[episode][section.id]?.content || ""}
                          onChange={(e) => updateObjective(section.id, "content", e.target.value)}
                          placeholder={`이 차시에서 다룰 주요 내용을 입력하세요.\n예: 1. 소방관의 주요 역할과 업무\n2. 화재 진압 과정과 구조 활동\n3. 소방 장비와 안전 규정`}
                          className="min-h-24 w-full resize-y rounded-lg border border-neutral-200 p-3 text-sm leading-relaxed outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Guide */}
        <div className="mt-8 rounded-xl border border-neutral-200 bg-neutral-100 p-6">
          <h3 className="mb-3 text-sm font-medium text-neutral-900">사용 가이드</h3>
          <ul className="space-y-1.5 text-sm text-neutral-600">
            <li><strong>오픈훅 키워드:</strong> 영상 시작 부분에 표현할 직업의 핵심 특성 5가지 이내로 입력하세요</li>
            <li><strong>학습목표/학습내용:</strong> 디자인 페이지에 표시될 학습목표와 학습내용을 입력하세요</li>
            <li><strong>나레이션 원고:</strong> 각 섹션의 목표 시간에 맞춰 원고를 작성하세요</li>
            <li>한글 기준 2분당 725자 (초당 약 6자)로 자동 계산됩니다</li>
            <li>95~100%가 적정 분량이며, 100% 초과 시 원고를 줄여주세요</li>
            <li>실시간으로 러닝타임이 계산되어 촬영 전 정확한 분량 조절이 가능합니다</li>
            <li>작성한 원고는 브라우저에 자동 저장되지 않으니 PDF저장을 통해 별도로 저장해주세요</li>
          </ul>
        </div>

        {/* Download Button */}
        <div className="mt-8 flex flex-col items-center">
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            <Download className="h-4 w-4" />
            PDF 다운로드
          </button>
          <p className="mt-3 text-xs text-neutral-400">다운로드 버튼 클릭 후 약 3초 정도 후에 다운로드가 진행됩니다.</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white mt-12">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div className="text-center text-sm text-neutral-500 leading-relaxed">
            <p>본 사이트에 포함된 모든 콘텐츠의 저작권은 유킷(youkit)에 있으며,</p>
            <p>본 콘텐츠는 대덕대학교 RISE 사업 관련 원고 작성 및 학습 콘텐츠 개발을 위한 목적에 한하여 활용됩니다.</p>
            <p className="mt-4">문의: youkitmedia@naver.com</p>
            <p className="mt-2 text-neutral-400">© 2026 youkit. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Hidden Print Area */}
      <div className="fixed -left-[9999px] top-0">
        <div ref={printRef} className="w-[800px] bg-white p-10 font-sans" style={{ fontFamily: "Noto Sans KR, system-ui, sans-serif" }}>
          <div className="mb-8 border-b border-neutral-200 pb-6">
            <h1 className="text-2xl font-bold text-neutral-900">
              {weekNumber && `${weekNumber} `}{weekTitle && `${weekTitle} `}{episode}차시 원고
            </h1>
            <p className="mt-2 text-neutral-600">
              전체 러닝타임: {formatTime(totalActual)} / {formatTime(totalTarget)} ({totalPercent}%)
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((section, index) => {
              const script = scripts[episode][section.id] || ""
              const duration = section.hasInput ? calculateDuration(script) : section.target

              const sectionPercent = Math.round((duration / section.target) * 100)

              return (
                <div key={section.id} className="border-b border-neutral-100 pb-6">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-lg font-bold text-neutral-900">#{index + 1} {section.name}</span>
                    {section.note && <span className="text-sm text-neutral-500">({section.note})</span>}
                  </div>
                  <p className="mb-3 text-sm text-neutral-500">
                    {formatTime(duration)} / {formatTime(section.target)} / <span className="font-bold">{sectionPercent}%</span>
                  </p>

                  {section.hasKeywords && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-neutral-700">키워드:</p>
                      <p className="text-sm text-neutral-600">
                        {keywords[episode][section.id]?.filter((k) => k.trim()).join(", ") || "-"}
                      </p>
                    </div>
                  )}

                  {section.hasInterview && (
                    <div className="mb-3 space-y-2">
                      <div>
                        <p className="text-sm font-medium text-neutral-700">영상내용:</p>
                        <p className="whitespace-pre-wrap text-sm text-neutral-600">
                          {interviews[episode][section.id]?.content || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-700">영상출처:</p>
                        <p className="whitespace-pre-wrap text-sm text-neutral-600">
                          {interviews[episode][section.id]?.source || "-"}
                        </p>
                      </div>
                    </div>
                  )}

                  {section.hasObjectives && (
                    <div className="mb-3 space-y-2">
                      <div>
                        <p className="text-sm font-medium text-neutral-700">학습목표:</p>
                        <p className="whitespace-pre-wrap text-sm text-neutral-600">
                          {objectives[episode][section.id]?.goal || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-700">학습내용:</p>
                        <p className="whitespace-pre-wrap text-sm text-neutral-600">
                          {objectives[episode][section.id]?.content || "-"}
                        </p>
                      </div>
                    </div>
                  )}

                  {section.hasInput && script && (
                    <div className="rounded bg-neutral-50 p-4">
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-800">{script}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-8 flex items-center gap-2 text-xs text-neutral-400">
            <FileText className="h-3 w-3" />
            <span>재난영화로 알아보는 직업이야기 - 나레이션 원고</span>
          </div>
        </div>
      </div>
    </div>
  )
}
