# 🎵 클래식 음악 감상 동아리 운영일지 자동화 S/W

* Google Apps Script를 활용하여 Google Sheets 내에서 동아리 운영일지를 손쉽게 작성하고 관리할 수 있도록 개발한 업무 자동화 도구입니다.

---

<br>

<details>
<summary><strong>👨‍💼 비전공자를 위한 프로젝트 설명 (클릭하여 펼치기)</strong></summary>

### 1. 프로젝트 소개
*   **목표**: 동아리 활동 중 감상한 앨범 정보를 수기로 반복 입력하던 불편함을 해결하기 위해, Google 스프레드시트 내에서 '운영일지'를 자동으로 작성해주는 소프트웨어를 개발하였습니다.
*   **의의**: 이 프로젝트를 통해 **업무 자동화 능력**과 **사용자 편의성을 고려한 문제 해결 능력**을 보여드리고자 하였습니다.

### 2. 주요 기능
*   **간편한 UI 제공**: 복잡한 스프레드시트 대신, 친숙한 웹 양식(Form)을 사이드바에 제공하여 누구나 쉽게 일지를 작성할 수 있습니다.
*   **데이터 자동 완성**: 앨범 고유의 'DB 번호'만 입력하면, 미리 구축된 '음반DB' 시트에서 작곡가, 연주자, 앨범명 등 나머지 정보를 자동으로 불러와 채워줍니다.
*   **데이터 유효성 검사**: 날짜, 숫자 등 사용자가 잘못된 형식의 데이터를 입력하는 것을 방지하는 기능을 넣어 데이터의 신뢰도를 높였습니다.
*   **일지 자동 등록**: 작성 완료된 내용은 버튼 클릭 한 번으로 '운영DB' 시트에 차곡차곡 정리되어 쌓입니다.

### 3. 프로젝트를 통해 얻은 역량
*   **문제 해결 능력**: '수작업으로 인한 비효율'이라는 명확한 문제를 발견하고, 이를 해결하기 위한 시스템을 직접 기획하고 개발하는 과정을 통해 실용적인 문제 해결 역량을 길렀습니다.
*   **업무 프로세스 개선**: 기존의 업무 방식을 분석하고, 자동화 스크립트를 도입하여 생산성을 향상시켰습니다.
*   **사용자 중심 사고**: 실제 사용자의 입장에서 어떤 기능이 필요하고 어떻게 만들어야 더 편리할지 고민하며 사용자 친화적인 프로그램을 만드는 역량을 갖추었습니다.

</details>

<br>

<details>
<summary><strong>👩‍💻 전공자를 위한 프로젝트 설명 (클릭하여 펼치기)</strong></summary>

### 1. 프로젝트 개요
본 프로젝트는 Google Apps Script(GAS)를 이용하여 Google 스프레드시트의 기능을 확장한 생산성 도구입니다. GAS의 `SpreadsheetApp` API와 `HtmlService`를 연동하여, 스프레드시트를 데이터베이스처럼 활용하는 웹 애플리케이션의 Front-end(HTML)와 Back-end(GAS)를 모두 구현하였습니다.

### 2. 사용 기술
*   **Platform**: `Google Apps Script`
*   **Language**: `JavaScript` (Server-side, Client-side), `HTML`, `CSS`
*   **Core Logic**: `Google Apps Script`, `HTML Service`
*   **APIs**: `SpreadsheetApp`, `HtmlService`, `google.script.run`

### 3. 시스템 아키텍처 및 처리 흐름
핵심 로직은 `일지작성.gs` (서버)와 `일지작성창.html` (클라이언트) 파일에 구현되어 있으며, 처리 과정은 다음과 같습니다.

1.  **UI 초기화 (Front-end Loading)**
    *   사용자가 스프레드시트 메뉴에서 '일지 작성' 기능을 실행하면, 서버 사이드 `showSidebar_writeLog` 함수가 호출됩니다.
    *   이 함수는 `HtmlService`를 통해 `일지작성창.html` 파일을 읽어와 사용자에게 사이드바(Sidebar) 형태로 UI를 제공합니다.
    *   클라이언트 사이드 JavaScript는 `openTab` 함수를 통해 기본 탭을 열고, 현재 날짜를 자동으로 설정합니다.

2.  **데이터 조회 (Asynchronous Data Fetching)**
    *   사용자가 사이드바의 'DB번호' input에 값을 입력하고 'DB 검색 후 자동 채우기' 버튼을 클릭하면 클라이언트의 `search_DB_autofill` 함수가 실행됩니다.
    *   `google.script.run`을 통해 비동기적으로 서버 사이드의 `search_DB_return_values` 함수를 호출하며, 인자로 'DB번호'를 전달합니다.
    *   서버에서는 '음반DB' 시트를 순회하며 'DB번호'와 일치하는 행을 찾고, 해당 행의 데이터를 객체(Object) 형태로 가공하여 반환합니다.
    *   `withSuccessHandler`를 통해 클라이언트는 반환된 데이터 객체를 수신하고, `readonly` 속성의 input 필드들을 자동으로 채웁니다.

3.  **데이터 등록 (Data Submission & Validation)**
    *   사용자가 모든 정보를 입력하고 '일지 등록' 버튼을 클릭하면 클라이언트의 `enroll_Log` 함수가 호출됩니다.
    *   먼저 `check_input_error_before_enroll` 함수를 통해 날짜의 유효성, 필수값 입력 여부, 데이터 타입(숫자/문자) 등 상세한 클라이언트 사이드 유효성 검사를 수행합니다.
    *   유효성 검사를 통과하면, `enroll_DB` 객체에 모든 폼(Form) 데이터를 담습니다.
    *   `google.script.run`으로 서버의 `enroll_Log` 함수를 호출하며 `enroll_DB` 객체를 전달합니다.
    *   서버에서는 전달받은 객체의 데이터를 '운영DB' 시트의 마지막 행에 순차적으로 `setValue` 하여 새로운 일지를 기록합니다.

### 4. 코드 리뷰 및 고찰

#### 🟢 잘된 점 (Strengths)

1.  **관심사 분리 (Separation of Concerns)**
    UI를 담당하는 `일지작성창.html`과 데이터 처리 로직을 담당하는 `일지작성.gs`로 역할을 명확히 분리하였습니다. 또한, `google.script.run`이라는 명확한 인터페이스를 통해 클라이언트와 서버 간의 통신을 구현하여 유지보수성을 높였습니다.

2.  **견고한 클라이언트 사이드 유효성 검증**
    `check_input_error_before_enroll` 함수 내에서 정규식을 이용한 숫자 판별, 날짜의 논리적 오류(e.g., 2월 30일) 검사 등 상세한 예외 처리를 구현하였습니다. 이를 통해 서버에 불필요한 요청을 보내기 전에 데이터의 정합성을 확보하여 시스템 안정성을 높였습니다.

3.  **비즈니스 로직의 스크립트화**
    '반복적인 데이터 입력'이라는 실제 업무의 비효율을 포착하고, 이를 해결하기 위한 스크립트를 기획부터 구현까지 완료하였습니다.

#### 🟡 프로젝트 회고 및 개선 방향 (Retrospective & Future Improvements)

1.  **API 호출 최적화**
    서버의 `enroll_Log` 함수는 `getRange().setValue()`를 각 컬럼마다 반복 호출하고 있습니다. 이는 여러 번의 API 호출을 유발하여 비효율적입니다. 데이터를 배열(Array)로 만든 후, `getRange(row, col, numRows, numCols).setValues([newRowArray])`를 사용하여 단 한 번의 API 호출로 한 행 전체를 쓰는 방식으로 리팩토링하여 성능을 개선할 수 있습니다.

2.  **매직 넘버(Magic Number) 및 하드코딩 지양**
    `search_DB_return_values`와 `enroll_Log` 함수 내에서 `searched_DB[0][1]`, `sheet_manage_DB.getRange(lastRow + 1, 5)`처럼 특정 열(Column)을 가리키는 숫자(인덱스)가 하드코딩되어 있습니다. 이는 향후 스프레드시트의 열 순서가 변경될 경우 스크립트 전체가 오작동할 수 있는 잠재적 위험 요소입니다. `const COMPOSER_COLUMN_INDEX = 3;` 와 같이 상수로 정의하거나, 맨 윗줄의 헤더를 읽어와 객체 형태로 관리하여 코드의 가독성과 유지보수성을 높일 수 있습니다.

3.  **검색 성능 개선**
    `search_DB_return_values` 함수는 `for` 루프를 사용하여 '음반DB' 시트의 첫 행부터 끝까지 순차적으로 검색(Linear Search)합니다. 데이터가 수천 건 이상으로 많아질 경우 응답 시간이 크게 저하될 것입니다. 스크립트 실행 시 DB 시트 전체를 한 번에 읽어 `Map` 또는 `Object` 형태로 메모리에 올려두고 key-value 탐색을 하거나, DB를 특정 키 값 기준으로 정렬해두고 이진 탐색(Binary Search)을 구현하는 방식으로 성능을 최적화할 수 있습니다.

4.  **서버 사이드 에러 처리**
    현재 서버 로직에는 `try-catch` 구문이 없어, `SpreadsheetApp.getActiveSpreadsheet()` 등 API 호출 중 예외가 발생하였을 때 스크립트가 비정상적으로 중단될 수 있습니다. 서버 사이드 함수들에 `try-catch` 블록을 추가하여 예외 상황을 처리하고, 실패 시 사용자에게 적절한 피드백(e.g., `alert`)을 줄 수 있도록 개선하여야 합니다.

</details>
