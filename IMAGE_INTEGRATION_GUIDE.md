# 🧩 StyleSync 이미지-코드 결합 가이드

## 📍 6개 이미지 부품의 정확한 매칭

| # | 이미지 파일명 | 저장 경로 | 코드 내 역할 | 나타나는 시점 | HTML 코드 위치 |
|---|---|---|---|---|---|
| **01** | `01_hair_hero.png` | `public/assets/` | 메인 헤어 카드 배경 | 앱을 켰을 때 가장 먼저 보이는 화보 | Line ~75: Screen 1 (Home) |
| **02** | `02_profile_base.png` | `public/assets/` | 프로필 입력 화면 배경 | 키/몸무게를 입력할 때의 은은한 배경 | Line ~122: Screen 2 (Profile) |
| **03** | `03_face_scan.png` | `public/assets/` | 스캔 화면 가상 카메라 | AI가 내 얼굴을 분석하고 있을 때의 이미지 | Line ~165: Screen 3 (Scan) |
| **04** | `04_solution_base.png` | `public/assets/` | 기본 아바타 (이너웨어) | 스캔 직후, 추천 옷을 입기 전의 모습 | Line ~205: Screen 4 (Solution) |
| **05** | `05_final_look.png` | `public/assets/` | 최종 완성 아바타 | 아이템을 선택하여 코디가 끝난 최종 모습 | Line ~305 (JavaScript): updateFinalLook() |
| **06** | `06_thelook_bridge.png` | `public/assets/` | 쇼핑몰 전환 배경 | 'THE LOOK' 버튼을 눌러 결제하러 갈 때 | Line ~235: Screen 5 (Checkout) |

---

## ⚙️ 이미지 폴더 구조

```
/personal-stylist
├── public/
│   ├── index.html              ← 메인 앱 파일 (6개 이미지 경로 포함)
│   ├── assets/                 ← 이미지 저장 폴더
│   │   ├── 01_hair_hero.png
│   │   ├── 02_profile_base.png
│   │   ├── 03_face_scan.png
│   │   ├── 04_solution_base.png
│   │   ├── 05_final_look.png
│   │   └── 06_thelook_bridge.png
└── ...
```

---

## 🔗 코드 내 이미지 경로 참조

### Screen 1: Home (01_hair_hero.png)
```html
<!-- Line ~75 -->
<div class="image-container">
    <img src="./assets/01_hair_hero.png" alt="Winter Soft Layers Hair Style" />
</div>
```
**설명**: 앱 시작 시 사용자가 보는 첫 번째 화보. 추천된 겨울 헤어 스타일을 보여줍니다.

---

### Screen 2: Profile (02_profile_base.png)
```html
<!-- Line ~122 -->
<div class="absolute inset-0 image-container opacity-30">
    <img src="./assets/02_profile_base.png" alt="Profile background" />
</div>
```
**설명**: 키와 몸무게를 입력하는 화면의 배경. 은은한 투명도(opacity: 0.3)로 표시됩니다.

---

### Screen 3: Scan (03_face_scan.png)
```html
<!-- Line ~165 -->
<div class="image-container">
    <img src="./assets/03_face_scan.png" alt="Face scan visualization" />
</div>
```
**설명**: AI가 얼굴을 인식 중일 때의 가상 카메라 영상. 원형 프레임 안에 표시됩니다.

---

### Screen 4: Solution (04_solution_base.png → 05_final_look.png)
```html
<!-- Line ~205 -->
<div class="image-container">
    <img src="./assets/04_solution_base.png" alt="Foundation base avatar" />
</div>
```
**설명**: 
- **초기**: `04_solution_base.png` 표시 (기본 아바타 상태)
- **선택 후**: JavaScript의 `updateFinalLook()` 함수가 `05_final_look.png`로 자동 전환

```javascript
// Line ~305
function updateFinalLook() {
    const img = document.querySelector('#final-look-image img');
    img.style.opacity = '0';
    img.style.filter = 'blur(15px)';
    setTimeout(() => {
        img.src = './assets/05_final_look.png';  // ← 이미지 동적 변경
        img.style.opacity = '1';
        img.style.filter = 'blur(0px)';
        img.style.transition = 'all 0.6s ease-out';
    }, 300);
}
```

---

### Screen 5: Checkout (06_thelook_bridge.png)
```html
<!-- Line ~235 -->
<div class="absolute inset-0 image-container">
    <img src="./assets/06_thelook_bridge.png" alt="The LOOK bridge" class="opacity-70" />
</div>
```
**설명**: THE LOOK 쇼핑몰로 넘어가는 전환 화면의 배경. 럭셔리 검은색 톤의 배경 이미지입니다.

---

## 🚀 배포 및 실행

### 1단계: 이미지 파일 준비
각 이미지를 다음 경로에 정확히 저장하세요:
```
/Users/sono/Desktop/personal-stylist/public/assets/
├── 01_hair_hero.png
├── 02_profile_base.png
├── 03_face_scan.png
├── 04_solution_base.png
├── 05_final_look.png
└── 06_thelook_bridge.png
```

### 2단계: 로컬 서버 실행
```bash
cd /Users/sono/Desktop/personal-stylist/public
python3 -m http.server 8000
```

### 3단계: 브라우저에서 확인
```
http://localhost:8000
```

---

## ✅ 확인 체크리스트

- [ ] `public/assets/` 폴더가 존재하는가?
- [ ] 6개 이미지 파일이 모두 정확한 파일명으로 저장되어 있는가?
- [ ] `public/index.html`이 최신 버전인가?
- [ ] 로컬 서버가 정상 실행되는가?
- [ ] 각 화면에서 이미지가 정상 표시되는가?

---

## 🔧 문제 해결

### 이미지가 표시되지 않음 (X 표시)
**원인**: 파일 경로가 잘못되었거나 파일이 없음
**해결**: 
1. 파일명이 정확히 맞는지 확인 (대소문자 구분)
2. `public/assets/` 폴더에 파일이 있는지 확인
3. 브라우저 개발자 도구 (F12) → Network 탭에서 404 에러 확인

### 이미지가 늘어나거나 찌그러짐
**원인**: `object-fit: cover` 설정이 이미지 비율과 맞지 않음
**해결**: 이미지를 원래 비율로 저장 (권장 비율은 코드의 aspect-ratio 주석 참고)

---

## 📋 이미지 사양 권장사항

| 화면 | 권장 해상도 | 비율 | 파일 크기 |
|---|---|---|---|
| 01_hair_hero | 600×800 | 4:5 | < 500KB |
| 02_profile_base | 1000×1500 | 2:3 | < 400KB |
| 03_face_scan | 800×800 | 1:1 | < 300KB |
| 04_solution_base | 600×800 | 3:4 | < 500KB |
| 05_final_look | 600×800 | 3:4 | < 500KB |
| 06_thelook_bridge | 1080×1500 | 9:12 | < 600KB |

---

## 🎯 최종 결과

모든 6개 이미지가 정확히 배치되면:
- ✨ 빈 상자(X)들이 사라짐
- ✨ 화려한 하이엔드 이미지들이 각 화면에 자동으로 표시됨
- ✨ StyleSync의 진정한 프리미엄 외관이 완성됨

---

**파일 생성일**: 2026년 1월 27일  
**버전**: 1.0 (Final with 6 Image Integration)  
**상태**: ✅ 배포 준비 완료
