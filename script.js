// ============================================================================
// 1. 공통 필수 변수 및 오행 계산용 도구 (심장부)
// ============================================================================
const elements = ["목(木)", "화(火)", "토(土)", "금(金)", "수(水)"];

const hangulElements = { 'ㄱ':'목(木)','ㄲ':'목(木)','ㄴ':'화(火)','ㄷ':'화(火)','ㄸ':'화(火)','ㄹ':'화(火)','ㅁ':'토(土)','ㅂ':'토(土)','ㅃ':'토(土)','ㅅ':'금(金)','ㅆ':'금(金)','ㅇ':'토(土)','ㅈ':'금(金)','ㅉ':'금(金)','ㅊ':'금(金)','ㅋ':'목(木)','ㅌ':'화(火)','ㅍ':'토(土)','ㅎ':'토(土)' };
const alphabetElements = { 'A':'목(木)','B':'목(木)','C':'화(火)','D':'화(火)','E':'토(土)','F':'토(土)','G':'금(金)','H':'금(金)','I':'수(水)','J':'수(水)','K':'목(木)','L':'목(木)','M':'화(火)','N':'화(火)','O':'토(土)','P':'토(土)','Q':'금(金)','R':'금(金)','S':'수(水)','T':'수(水)','U':'목(木)','V':'목(木)','W':'화(火)','X':'화(火)','Y':'토(土)','Z':'토(土)' };

// [정밀화된 60갑자 일주(日柱) 계산기 - 점수 계산을 위해 필수!]
function getIlju(year, month, day) {
    const stems = [
        { name: "갑(甲)", el: "목(木)", id: "gap" }, { name: "을(乙)", el: "목(木)", id: "eul" },
        { name: "병(丙)", el: "화(火)", id: "byeong" }, { name: "정(丁)", el: "화(火)", id: "jeong" },
        { name: "무(戊)", el: "토(土)", id: "mu" }, { name: "기(己)", el: "토(土)", id: "gi" },
        { name: "경(庚)", el: "금(金)", id: "gyeong" }, { name: "신(辛)", el: "금(金)", id: "sin" },
        { name: "임(壬)", el: "수(水)", id: "im" }, { name: "계(癸)", el: "수(水)", id: "gye" }
    ];
    const branches = [
        { name: "자(子)", id: "ja" }, { name: "축(丑)", id: "chuk" },
        { name: "인(寅)", id: "in" }, { name: "묘(卯)", id: "myo" },
        { name: "진(辰)", id: "jin" }, { name: "사(巳)", id: "sa" },
        { name: "오(午)", id: "o" }, { name: "미(未)", id: "mi" },
        { name: "신(申)", id: "shin" }, { name: "유(酉)", id: "yu" },
        { name: "술(戌)", id: "sul" }, { name: "해(亥)", id: "hae" }
    ];
    
    const baseDate = new Date(Date.UTC(1900, 0, 1));
    const targetDate = new Date(Date.UTC(year, month - 1, day));
    const diffDays = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
    
    let iljuIndex = (diffDays + 10) % 60;
    if (iljuIndex < 0) iljuIndex += 60;
    
    const stem = stems[iljuIndex % 10];
    const branch = branches[iljuIndex % 12];
    
    return {
        stemName: stem.name, stemId: stem.id, el: stem.el,
        branchName: branch.name, branchId: branch.id,
        iljuName: stem.name[0] + branch.name[0]
    };
}


// ============================================================================
// 2. 시대 및 지역, 이름 생성 데이터 (시간과 공간 서랍)
// ============================================================================
const syllableKo1 = ["서", "지", "도", "민", "시", "유", "승", "주", "태", "건", "규", "진", "현", "재", "은", "하", "단", "온", "윤", "이", "아", "채", "소", "해", "다", "루", "리", "겸", "담", "설", "결", "알", "엘", "렌", "벤", "켈", "멜", "제", "카", "피", "샨", "레", "미", "데", "세", "벨", "테", "로", "마", "클", "플"];
const syllableKo2 = ["준", "훈", "우", "아", "윤", "하", "은", "수", "연", "희", "빈", "율", "찬", "린", "솜", "봄", "겸", "담", "람", "결", "재", "진", "솔", "늘", "환", "영", "호", "토", "라", "나", "리", "엘", "온", "로", "스", "넬", "드", "테", "샤", "루", "니", "벨", "룬", "안", "엔", "오", "타", "데", "미", "칸", "얀"];
const nameRootEn = ["Al", "El", "Lu", "Val", "Kor", "Syr", "Fen", "Gal", "Mor", "Aza", "Ze", "Kae", "Quin", "Rhys", "Syl", "Ny", "Xan", "Vyr", "Cae", "Dae", "Jae", "Kael", "Lor", "Or", "Thal", "Oli", "Eme", "Ar", "No", "Ma", "Ili"];
const nameTailEn = ["bert", "cia", "rion", "dor", "lis", "th", "wyn", "x", "z", "us", "ia", "en", "is", "a", "o", "mir", "dred", "vyn", "ra", "las", "mus", "n", "sa", "el", "ron", "via", "cas", "line", "cus", "an", "thor"];

const eraPastKo = ["서기 250년경", "기원전 1350년경", "서기 1050년경", "서기 1650년경", "서기 1450년경", "서기 850년경", "서기 1510년경", "기원전 1750년경", "기원전 450년경", "서기 1900년경", "서기 1150년경", "서기 1780년경", "서기 650년경", "기원전 510년경", "서기 1490년경", "서기 950년경", "서기 1250년경", "서기 450년경", "기원전 2500년경", "서기 750년경"];
const regionPastKo = ["로마 제국 콜로세움 인근", "고대 이집트 나일강 하류", "중국 송나라 낙양 성내", "일본 에도 막부 교토 인근", "아즈텍 제국 테노치티틀란", "북유럽 스칸디나비아 해안", "르네상스 이탈리아 피렌체", "메소포타미아 바빌론 정원", "고대 그리스 아테네 광장", "대한제국 한양 육조거리", "고려 왕조 개경 저잣거리", "조선 시대 한양 도성", "마야 문명 유카탄 정글", "페르시아 제국 페르세폴리스", "잉카 제국 마추픽추 인근", "비잔티움 제국 콘스탄티노플", "중세 프랑스 파리 센강변", "고대 인도 갠지스 강가", "수메르 문명 우루크 신전", "신라 서라벌 중심지"];
const eraPastEn = ["Around 250 AD", "Around 1350 BC", "Around 1050 AD", "Around 1650 AD", "Around 1450 AD", "Around 850 AD", "Around 1510 AD", "Around 1750 BC", "Around 450 BC", "Around 1900 AD", "Around 1150 AD", "Around 1780 AD", "Around 650 AD", "Around 510 BC", "Around 1490 AD", "Around 950 AD", "Around 1250 AD", "Around 450 AD", "Around 2500 BC", "Around 750 AD"];
const regionPastEn = ["Near the Colosseum, Roman Empire", "Lower Nile, Ancient Egypt", "Inside Luoyang, Song Dynasty", "Near Kyoto, Edo Shogunate", "Tenochtitlan, Aztec Empire", "Scandinavian Coast, Northern Europe", "Florence, Renaissance Italy", "Gardens of Babylon, Mesopotamia", "Athens Square, Ancient Greece", "Yukjo-geori, Korean Empire", "Gaegyeong Market, Goryeo Dynasty", "Hanyang Fortress, Joseon Dynasty", "Yucatan Jungle, Mayan Civilization", "Persepolis, Persian Empire", "Near Machu Picchu, Inca Empire", "Constantinople, Byzantine Empire", "Seine Riverbank, Medieval Paris", "Ganges Riverside, Ancient India", "Uruk Temple, Sumerian Civilization", "Seorabeol Center, Silla Kingdom"];

const eraNextKo = ["은하 연합 시대", "네오-서울 자치국", "화성 개척 시대", "에테르 차원기", "해저 돔 시티", "공중 부유섬 시대", "사이버펑크 암흑기", "성간 식민지 시대", "포스트-휴먼 시대", "디지털 클라우드기", "안드로메다 연맹", "양자 도약 시대", "테라포밍기"];
const regionNextKo = ["섹터 7", "중앙 허브", "올림푸스 기지", "차원 게이트 00", "아쿠아리스", "클라우드-9", "네온 스트리트", "타이탄 정거장", "안드로메다 게이트", "제 4 거주구역", "뉴 런던 Hub", "가상현실 그리드", "심해 캡슐"];
const eraNextEn = ["Galactic Alliance Era", "Neo-Seoul Sovereign State", "Mars Frontier Era", "Ether Dimension Era", "Underwater Dome City", "Floating Sky Island Era", "Cyberpunk Dark Age", "Interstellar Colony Era", "Post-Human Era", "Digital Cloud Era", "Andromeda Federation", "Quantum Leap Era", "Terraforming Era"];
const regionNextEn = ["Sector 7", "Central Hub", "Olympus Base", "Dimension Gate 00", "Aquarius", "Cloud-9", "Neon Street", "Titan Station", "Andromeda Gate", "Residential Zone 4", "New London Hub", "VR Grid", "Deep Sea Capsule"];

// 이름 생성 함수들
function makePastNameKo(num, strong, lack, month) { return syllableKo1[(num + month) % syllableKo1.length] + syllableKo2[(num + 7) % syllableKo2.length]; }
function makePastNameEn(num, strong, lack, month) { return nameRootEn[(num + month) % nameRootEn.length] + nameTailEn[(num + 5) % nameTailEn.length]; }
function makeNextLifeNameKo(num, strong, lack, month) { return syllableKo1[(num + strong.length + month) % syllableKo1.length] + syllableKo2[(num + 15) % syllableKo2.length]; }
function makeNextLifeNameEn(num, strong, lack, month) { return nameRootEn[(num + strong.length + month) % nameRootEn.length] + nameTailEn[(num + 25) % nameTailEn.length]; }


// ============================================================================
// 3. 전생 (Past Life) 식별 엔진
// ============================================================================
function getPastLifeData(num, signature, lang) {
    const jobPoolKo = {
        "목(木)": [
            { job: "황실 정원사", desc: "생명을 피워내는 에너지가 강해 제국의 비원을 설계했습니다." },
            { job: "약초 치유사", desc: "생명 존중의 기운으로 험준한 산맥을 누비며 병자를 돌봤습니다." },
            { job: "비밀 건축가", desc: "성장의 기운을 담아 세상에 없던 신비로운 사원을 세웠습니다." },
            { job: "고대 서예가", desc: "붓 끝에 생명력을 담아 황제의 칙서를 기록하던 문장가였습니다." },
            { job: "비단길 직조공", desc: "유연한 결을 다스려 대륙을 잇는 가장 아름다운 비단을 짰습니다." },
            { job: "산맥의 수호자", desc: "거대한 숲의 기운을 받아 멸종해가는 영물들을 지켜냈습니다." },
            { job: "마을의 훈장", desc: "교육의 기운으로 어린 인재들을 키워 나라의 기틀을 닦았습니다." },
            { job: "목조 조각가", desc: "나무에 혼을 불어넣어 살아 움직이는 듯한 신상을 깎았습니다." },
            { job: "유랑 약재상", desc: "대지의 생명력을 찾아 대륙 곳곳에 치유의 뿌리를 전했습니다." },
            { job: "종이 제작자", desc: "지식의 바탕이 되는 종이를 만들어 문명의 전승을 도왔습니다." }
        ],
        "화(火)": [
            { job: "광야의 예언자", desc: "타오르는 지성으로 대중의 갈 길을 비추는 등불이 되었습니다." },
            { job: "유리 세공사", desc: "불의 기운으로 빛을 가두어 세상에서 가장 투명한 예술을 했습니다." },
            { job: "유랑극단 단장", desc: "발산하는 에너지로 민중의 슬픔을 축제로 바꾼 예술가였습니다." },
            { job: "태양의 사제", desc: "하늘의 열기를 빌려 가뭄을 막고 풍요를 기원하던 영적 리더였습니다." },
            { job: "궁정 요리사", desc: "불을 자유자재로 다스려 황제의 입맛을 사로잡은 연금술사였습니다." },
            { job: "전장의 신호수", desc: "치솟는 불꽃으로 아군의 사기를 높이고 승리의 길을 알렸습니다." },
            { job: "등대지기", desc: "어둠 속에서 꺼지지 않는 불을 지켜 길 잃은 배들을 구원했습니다." },
            { job: "불꽃놀이 장인", desc: "밤하늘에 찬란한 꽃을 피워 백성들에게 찰나의 기쁨을 주었습니다." },
            { job: "제련소 감독관", desc: "거대한 용광로의 열기를 조율하여 문명의 도구들을 만들어냈습니다." },
            { job: "화려한 무희", desc: "빛의 궤적처럼 움직이는 춤사위로 신전의 제사를 주관했습니다." }
        ],
        "토(土)": [
            { job: "제국의 법관", desc: "묵직한 중용의 기운으로 만인의 시시비비를 공정히 가렸습니다." },
            { job: "고대 서지학자", desc: "방대한 지식을 집대성하여 도서관의 기틀을 닦은 기록가였습니다." },
            { job: "황금도시 통치자", desc: "포용의 리더십으로 흩어진 부족들을 하나로 묶은 지도자였습니다." },
            { job: "도자기 장인", desc: "대지의 흙에 숨결을 불어넣어 천 년의 가치를 지닌 기물을 빚었습니다." },
            { job: "성벽 설계자", desc: "흔들리지 않는 견고함으로 침략으로부터 제국을 지킨 공학자였습니다." },
            { job: "대륙의 거상", desc: "신용과 무게감을 바탕으로 동서양의 물자를 연결한 무역가였습니다." },
            { job: "역사 기록관", desc: "변치 않는 흙의 성질처럼 사실만을 기록하여 후대에 전했습니다." },
            { job: "산소 파수꾼", desc: "조상의 안식처를 돌보며 가문의 뿌리와 예법을 수호했습니다." },
            { job: "곡식 저장관", desc: "풍요로운 대지의 결실을 관리하여 기근으로부터 백성을 구했습니다." },
            { job: "사막의 길잡이", desc: "모래바람 속에서도 대지의 방향을 읽어 상단을 인도했습니다." }
        ],
        "금(金)": [
            { job: "전설적 대장장이", desc: "강직한 의지로 어떠한 악도 뚫지 못할 보검을 벼려냈습니다." },
            { job: "비밀 정보관", desc: "예리한 판단력으로 적의 음모를 파헤치던 그림자 파수꾼이었습니다." },
            { job: "심판의 사자", desc: "단호한 결단력으로 흐트러진 질서를 바로잡던 엄격한 관리였습니다." },
            { job: "보석 감정사", desc: "투명한 통찰로 원석 속에 숨겨진 가치를 찾아내던 전문가였습니다." },
            { job: "왕실 호위대장", desc: "강철 같은 충성심으로 황제의 안위를 지켜낸 최후의 보루였습니다." },
            { job: "화폐 주조관", desc: "제국의 경제를 지탱하는 금속의 가치를 다루던 재무관이었습니다." },
            { job: "철갑 기사", desc: "부러지지 않는 신념으로 전장의 최전선을 지키던 용사였습니다." },
            { job: "금속 활자공", desc: "단단한 금속에 지식을 새겨 문명의 기록을 영원히 남겼습니다." },
            { job: "암벽 등반가", desc: "가장 높은 곳의 정기를 받기 위해 험준한 바위산을 올랐습니다." },
            { job: "조각 칼잡이", desc: "차가운 금속으로 부드러운 예술을 빚어낸 반전의 예술가였습니다." }
        ],
        "수(水)": [
            { job: "심해의 항해사", desc: "유연한 지성으로 거친 바다를 다스리며 신대륙을 발견했습니다." },
            { job: "신비주의 철학자", desc: "심오한 통찰로 세상의 근원적 질문에 답을 찾던 현자였습니다." },
            { job: "비밀 전령사", desc: "물처럼 어디든 스며들어 차단된 소식을 전하던 정보원이었습니다." },
            { job: "음유 시인", desc: "흐르는 노래에 세상의 지혜를 담아 마을마다 전파했습니다." },
            { job: "수정구 점술가", desc: "투명한 물에 비친 미래의 잔상을 읽어내던 신비가였습니다." },
            { job: "안개 속 자객", desc: "소리 없이 다가가 정의를 집행하던 물결 같은 존재였습니다." },
            { job: "운하 설계자", desc: "물의 흐름을 바꾸어 메마른 대지에 생명력을 공급했습니다." },
            { job: "심연의 잠수부", desc: "깊은 바닷속에 가라앉은 고대의 보물을 발굴하는 탐험가였습니다." },
            { job: "달빛의 화가", desc: "밤의 감성을 화폭에 담아 영혼을 치유하던 예술가였습니다." },
            { job: "지혜의 차사", desc: "생과 사의 강을 건너는 영혼들을 안내하던 신비로운 가이드였습니다." }
        ]
    };

    const jobPoolEn = {
        "목(木)": [
            { job: "Royal Gardener", desc: "possessed strong vital energy and designed the secret gardens of the Empire." },
            { job: "Herbal Healer", desc: "traversed rugged mountains to treat the sick with the energy of life and compassion." },
            { job: "Secret Architect", desc: "built mysterious temples that never existed before, fueled by growth energy." },
            { job: "Ancient Calligrapher", desc: "was a master who recorded imperial decrees with life in every brushstroke." },
            { job: "Silk Road Weaver", desc: "wove the most beautiful silks connecting continents by mastering flexible grains." },
            { job: "Mountain Guardian", desc: "protected endangered spiritual creatures with the vast energy of the forest." },
            { job: "Village Schoolmaster", desc: "laid the foundation of the nation by nurturing young talents with educational energy." },
            { job: "Wood Sculptor", desc: "carved statues that seemed alive by breathing soul into the timber." },
            { job: "Wandering Herbalist", desc: "delivered healing roots across the continent, seeking the life force of the earth." },
            { job: "Paper Maker", desc: "aided the transmission of civilization by producing the paper that became the base of knowledge." }
        ],
        "화(火)": [
            { job: "Prophet of the Wilderness", desc: "became a beacon of light for the masses with your radiant and burning intelligence." },
            { job: "Glass Artisan", desc: "practiced the most transparent art by capturing light through the power of fire." },
            { job: "Troupe Leader", desc: "was an artist who turned the sorrow of the people into a festival with your explosive energy." },
            { job: "Solar Priest", desc: "was a spiritual leader who prayed for abundance and prevented drought by harnessing celestial heat." },
            { job: "Court Chef", desc: "was an alchemist who captured the Emperor's palate by freely controlling the flames." },
            { job: "Battlefield Signaler", desc: "boosted the morale of allies and signaled the path to victory with soaring flares." },
            { job: "Lighthouse Keeper", desc: "saved lost ships by guarding the unquenchable fire in the deep darkness." },
            { job: "Fireworks Master", desc: "gave momentary joy to the people by blooming brilliant flowers in the night sky." },
            { job: "Smeltery Supervisor", desc: "created the tools of civilization by tuning the heat of a massive furnace." },
            { job: "Brilliant Dancer", desc: "presided over temple rituals with movements that traced the trajectory of light." }
        ],
        "토(土)": [
            { job: "Imperial Judge", desc: "fairly judged the rights and wrongs of all people with a heavy sense of moderation." },
            { job: "Ancient Bibliographer", desc: "was a recorder who laid the foundation for libraries by compiling vast amounts of knowledge." },
            { job: "Golden City Ruler", desc: "was a leader who united scattered tribes through your inclusive leadership." },
            { job: "Ceramic Artisan", desc: "crafted vessels of thousand-year value by breathing life into the clay of the earth." },
            { job: "Fortress Architect", desc: "was an engineer who protected the empire from invasion with unshakable sturdiness." },
            { job: "Continental Merchant", desc: "connected the goods of the East and West based on trust and a weighty presence." },
            { job: "History Recorder", desc: "passed down facts to future generations, as constant as the nature of the soil." },
            { job: "Ancestral Guardian", desc: "protected the roots and etiquette of the family by tending to ancestral resting places." },
            { job: "Grain Manager", desc: "saved the people from famine by managing the fruits of the fertile earth." },
            { job: "Desert Guide", desc: "led caravans by reading the direction of the earth even amidst sandstorms." }
        ],
        "금(金)": [
            { job: "Legendary Blacksmith", desc: "forged legendary swords that no evil could pierce, based on your iron will." },
            { job: "Secret Agent", desc: "was a shadow sentinel who uncovered the plots of enemies with sharp judgment." },
            { job: "Messenger of Judgment", desc: "was an upright official who restored broken order with decisive resolve." },
            { job: "Gem Appraiser", desc: "was an expert who found hidden value within raw stones through transparent insight." },
            { job: "Royal Guard Captain", desc: "was the final bastion who protected the Emperor's safety with iron-clad loyalty." },
            { job: "Currency Minter", desc: "was a financial officer who handled the value of metals supporting the empire's economy." },
            { job: "Ironclad Knight", desc: "was a warrior who guarded the front lines of the battlefield with unbreakable faith." },
            { job: "Movable Type Printer", desc: "permanently left records of civilization by engraving knowledge into hard metal." },
            { job: "Rock Climber", desc: "scaled rugged stone mountains to receive the spirit of the highest peaks." },
            { job: "Carving Master", desc: "was an artist who crafted soft art out of cold metal, a master of irony." }
        ],
        "수(水)": [
            { job: "Deep Sea Navigator", desc: "discovered new continents by commanding the rough seas with flexible intelligence." },
            { job: "Mystic Philosopher", desc: "was a sage who sought answers to the fundamental questions of the world through deep insight." },
            { job: "Secret Messenger", desc: "was an informant who delivered blocked news by permeating everywhere like water." },
            { job: "Bard", desc: "spread the wisdom of the world to every village through songs that flowed like a river." },
            { job: "Crystal Ball Diviner", desc: "was a mystic who read the residues of the future reflected in transparent water." },
            { job: "Shadow Assassin", desc: "was a wave-like presence who approached silently to execute justice." },
            { job: "Canal Designer", desc: "supplied life to the parched earth by changing the flow of water." },
            { job: "Deep Sea Diver", desc: "was an explorer who excavated ancient treasures submerged in the deep ocean." },
            { job: "Painter of Moonlight", desc: "was an artist who healed souls by capturing the sensitivity of the night on canvas." },
            { job: "Guide of Wisdom", desc: "was a mysterious guide who led souls crossing the river of life and death." }
        ]
    };

    const elTraitsKo = { "목(木)": "강한 추진력과 생명력", "화(火)": "발산하는 열정과 에너지", "토(土)": "두터운 중용과 응집력", "금(金)": "예리한 결단과 강직함", "수(水)": "심오한 지혜와 유연함" };
    const elTraitsEn = { "목(木)": "vitality", "화(火)": "passion", "토(土)": "balance", "금(金)": "integrity", "수(水)": "wisdom" };
    const elKeyEn = { "목(木)": "Wood", "화(火)": "Fire", "토(土)": "Earth", "금(金)": "Metal", "수(水)": "Water" }[signature];

    const pool = lang === 'ko' ? jobPoolKo[signature] : jobPoolEn[signature];
    const match = pool[num % 10];
    
    const modsKo = ["달빛 아래 기도를 올리던", "금기된 고서를 해석하던", "별의 궤적을 쫓던", "침묵 속에 칼날을 갈던", "자비로운 마음으로 생명을 품던", "안개 너머 진실을 보던", "거친 파도를 잠재우던", "운명의 실타래를 풀던", "비밀스러운 전설을 기록하던", "정의로운 신념으로 맞서던"];
    const modsEn = ["Praying under the moonlight", "Decoding forbidden scrolls", "Chasing starlight", "Sharpening blades", "Embracing life", "Seeing the truth", "Calming the waves", "Unraveling fate", "Recording legends", "Standing righteous"];
    const mod = lang === 'ko' ? modsKo[num % 10] : modsEn[num % 10];

    const homeworksKo = [
        "지식을 자비로 바꾸어 세상에 베푸는 것이었습니다.", "소유에 대한 집착을 버리고 내면의 평온을 찾는 일이었습니다.", "타인의 고통을 자신의 것처럼 느끼는 공감을 익히고자 했습니다.",
        "자신의 천부적 재능을 공동체의 이익으로 환원하는 것이었습니다.", "고독을 정체성으로 받아들이고 세상과 당당히 소통하는 것이었습니다.", "권위보다 덕과 진심으로 사람을 이끄는 법을 연마했습니다.",
        "과거의 기억에서 벗어나 오직 '현재'의 소중함을 깨닫는 과정이었습니다.", "물질적 가치를 넘어 정신적 완성의 기쁨을 증명하는 생이었습니다.", "내면의 들끓는 분노를 다스리고 용서의 미덕을 배웠습니다.",
        "자신의 한계를 인정하고 낮은 곳으로 임하는 겸손을 닦았습니다.", "눈에 보이지 않는 진실된 가치를 위해 끝까지 인내했습니다.", "진정한 정신적 독립과 자아의 중심을 잡는 과정이었습니다.",
        "갈등이 가득한 세상 속에서 중재자로 평화를 수호했습니다.", "모든 편견을 내려놓고 세상을 맑게 바라보는 법을 배웠습니다.", "가진 것을 아낌없이 나눔으로써 공생의 진리를 실현했습니다.",
        "침묵을 깨고 진실을 말하는 용기를 통해 영혼의 자유를 얻었습니다.", "집착을 끊어내고 흐르는 물처럼 유연하게 사는 지혜를 익혔습니다.", "모든 생명을 평등하게 존중하고 보호하는 의무를 다했습니다.",
        "기나긴 인내의 세월을 견뎌 마침내 영광의 결실을 맺었습니다.", "타인의 잠재력을 끌어올리고 그 안에서 자신의 보람을 찾았습니다.",
        "진정한 사랑의 의미를 정의하고 이를 실천하는 삶이었습니다.", "창조적인 영감을 기록으로 남겨 인류에게 영원한 선물을 주었습니다.", "두려움을 극복하고 미지의 영역에 발을 들이는 용기를 증명했습니다.",
        "복잡한 이해관계를 명쾌하게 풀이하여 상생의 길을 열었습니다.", "자신의 약점을 강점으로 승화시켜 불가능을 가능케 했습니다.",
        "내면의 빛을 발견하고 어두운 세상을 비추는 등대가 되었습니다.", "말보다는 행동으로 자신의 가치를 증명하는 묵직한 삶이었습니다.", "자연의 순리를 깨닫고 인간과 자연의 다리가 되었습니다.",
        "흔들리지 않는 평정심으로 극도의 혼란을 잠재웠습니다.", "자신의 명예보다는 타인의 안위를 먼저 살피는 고결함을 갖췄습니다."
    ];
    const homeworksEn = [
        "The mission was to turn knowledge into compassion.", "Devoted life to letting go of greed and finding inner peace.", "Sought to master true empathy for the suffering of others.",
        "Tasked with returning personal talents back to social values.", "The challenge was to overcome solitude and communicate with the world.", "Refined leadership through virtue rather than mere authority.",
        "Focused on healing past wounds and staying in the present.", "Pursued spiritual completion over material wealth.", "Strived to control inner anger and learn forgiveness.",
        "Aim was to acknowledge personal limits and remain humble.", "Practiced believing in invisible values and enduring to the end.", "In the process of establishing true independence and identity.",
        "Took the role of mediating conflicts and protecting peace.", "Cultivated the wisdom to see the world without prejudice.", "Realizing the value of symbiosis by sharing what you possessed.",
        "Sought freedom of the soul through the courage to tell the truth.", "Learned the wisdom of living like flowing water without obsession.", "Fulfilled the noble duty of respecting and protecting all life.",
        "Proved how to bear glorious fruits through long endurance.", "Found personal value while empowering others' growth.",
        "Defined the true meaning of love and practiced it.", "Left an eternal gift to humanity by recording divine inspirations.", "Proved the courage to step into the unknown by overcoming fear.",
        "Opened the path of symbiosis by solving complex interests.", "Sublimated weaknesses into strengths to make the impossible possible.",
        "Became a lighthouse shining in a dark world by finding inner light.", "Lived a weighty life proving value through action rather than words.", "Became a bridge between humans and nature by realizing natural laws.",
        "Quieted extreme chaos with an unshakable composure.", "Attained nobility by prioritizing others' safety over personal honor."
    ];
    const homework = lang === 'ko' ? homeworksKo[num % 30] : homeworksEn[num % 30];

    if (lang === 'ko') {
        return {
            job: `${mod} ${match.job}`,
            desc: `운명공학 분석 결과, 당신은 <b>${signature}</b>의 <b>${elTraitsKo[signature]}</b>이 두드러지는 시그니처를 가졌습니다. 이로 인해 과거 생애에서 ${match.desc}`,
            homework: homework
        };
    } else {
        return {
            job: `${mod} ${match.job}`,
            desc: `Based on the destiny analysis, your signature energy is <b>${elKeyEn}</b>, characterized by <b>${elTraitsEn[signature]}</b>. Consequently, in your past life, you ${match.desc}`,
            homework: homework
        };
    }
}

// ============================================================================
// 4. 내세 (Next Life) 예측 엔진
// ============================================================================
function getNextLifeData(num, signature, lang) {
    const futurePoolKo = {
        "목(木)": [
            { role: "행성 테라포밍 설계자", job: "개척 행성의 바이오 돔에서 멸종 위기종을 복원하는 전문가" },
            { role: "뉴럴 플랜트 가디언", job: "인간의 뇌파와 식물을 연결해 산소를 생성하는 시스템 관리자" },
            { role: "가상 현실 정원사", job: "디지털 세계에 영혼이 안식할 수 있는 자연 지대를 구축하는 자" },
            { role: "바이오 나노 공학자", job: "세포의 재생 능력을 극대화하여 인류의 수명을 연장하는 선구자" },
            { role: "대기 정화 기술자", job: "오염된 지구의 대기를 숲의 기운으로 다시 정화하는 임무" },
            { role: "은하계 씨앗 보관소장", job: "모든 행성의 생명 코드를 보관하고 전파하는 최종 보루" },
            { role: "감정 수목 치유사", job: "사람의 슬픔을 양분 삼아 꽃을 피우는 식물을 기르는 힐러" },
            { role: "양자 생태 학자", job: "차원 간의 생태적 균형을 연구하여 우주 공존을 돕는 학자" },
            { role: "태초의 숲 전령", job: "지구의 기억을 품은 나무를 개척지로 운반하는 인도자" },
            { role: "라이프 시퀀스 설계자", job: "새로운 생명체가 태어날 환경을 완벽하게 세팅하는 설계관" }
        ],
        "화(火)": [
            { role: "에너지 주파수 조율사", job: "다차원 문명의 에너지를 하나로 묶어 증폭시키는 전도사" },
            { role: "홀로그램 계몽가", job: "빛의 파동으로 잊혀진 인류의 지혜를 전파하는 미래의 교사" },
            { role: "성운 동력 발굴가", job: "별이 폭발할 때 생기는 에너지를 문명의 동력으로 바꾸는 주역" },
            { role: "차원간 빛의 전령", job: "서로 다른 차원에 메시지를 빛의 속도로 전달하는 통신 전문가" },
            { role: "양자 태양 관리관", job: "스스로 빛을 내지 못하는 행성에 인공 태양을 띄우는 관리자" },
            { role: "감정 데이터 조각가", job: "인간의 열정을 시각적인 빛의 예술로 승화시키는 거장" },
            { role: "초고속 항로 설계자", job: "빛의 굴절을 이용해 성간 이동 시간을 단축하는 네비게이터" },
            { role: "정신 가속 최적화원", job: "인류의 지능을 한 단계 업그레이드하는 에너지 관리자" },
            { role: "지성 아카이브 수호자", job: "모든 문명의 찬란한 성취를 빛의 입자로 저장하는 기록관" },
            { role: "은하 연합 홍보대사", job: "화려한 카리스마로 행성 간의 문화적 통합을 이끄는 리더" }
        ],
        "토(土)": [
            { role: "화성 기반 인프라 국장", job: "개척지의 토양을 안정시키고 거주 구역을 구축하는 총책임자" },
            { role: "시공간 데이터 보관소장", job: "우주의 방대한 정보를 묵직하게 지켜내는 최종 관리자" },
            { role: "중력 밸런스 조정관", job: "행성의 중력을 조절하여 인류가 살기 가장 좋은 환경을 만드는 이" },
            { role: "차원 통용 화폐 발행자", job: "은하 전체에서 신뢰받는 경제 체계를 구축하는 금융 가이드" },
            { role: "우주 연합 법무 장관", job: "흔들리지 않는 원칙으로 행성 간의 법적 갈등을 심판하는 자" },
            { role: "행성간 지각 공학자", job: "죽어가는 행성의 지질을 안정시켜 생명의 기틀을 다시 다지는 자" },
            { role: "지구 유적 보존 관리인", job: "미래 문명 속에서 고대 지구의 유적을 발굴하고 보호하는 이" },
            { role: "안전 거주구 설계자", job: "어떤 우주 재난에도 견딜 수 있는 견고한 쉘터를 만드는 설계관" },
            { role: "다국적 연합 기록관", job: "모든 행성의 역사를 왜곡 없이 공정하게 기록하는 역사가" },
            { role: "대륙간 수직도시 관리자", job: "지구의 좁은 영토를 극대화하여 평화로운 거주지를 관리하는 이" }
        ],
        "금(金)": [
            { role: "행성 방어 시스템 사령관", job: "정밀한 판단으로 외부의 위협으로부터 문명을 지키는 파수꾼" },
            { role: "사이버 법률 심판관", job: "가상과 현실 사이의 범죄를 단호하게 처단하는 정의의 화신" },
            { role: "양자 보안 설계자", job: "해킹이 불가능한 단단한 정보 보호 체계를 구축하는 기술자" },
            { role: "희귀 광물 탐사대장", job: "우주 깊은 곳에서 문명의 동력이 될 금속을 찾아내는 탐험가" },
            { role: "안드로이드 윤리 감독", job: "기계 지성이 넘지 말아야 할 선을 결정하고 감찰하는 심판관" },
            { role: "차원 게이트 수호자", job: "허가되지 않은 차원 이동을 차단하고 경계를 수호하는 파수꾼" },
            { role: "강철 의지 멘토", job: "인류가 겪는 정신적 나약함을 강한 정신력으로 치유하는 리더" },
            { role: "초전도체 소자 제작자", job: "미래 기술의 핵심이 되는 금속 소자를 정밀하게 빚는 장인" },
            { role: "우주 함대 감사관", job: "모든 시스템의 규율 준수 여부를 예리하게 파악하는 감사 전문가" },
            { role: "결단력 증폭 훈련관", job: "중요한 순간의 결단력을 높여주는 신경 훈련 시스템 운영자" }
        ],
        "수(水)": [
            { role: "뉴럴 링크 정화 전문가", job: "오염된 인류의 무의식 네트워크를 맑게 씻어내는 정화자" },
            { role: "딥스페이스 항해사", job: "심오한 통찰로 블랙홀 너머의 길을 찾아내는 선구적 도선사" },
            { role: "정보 파동 분석가", job: "우주 전체에 흩어진 데이터 입자들을 모아 지혜를 완성하는 이" },
            { role: "무의식 치료 상담사", job: "사람의 깊은 내면에 잠긴 트라우마를 유연하게 치유하는 힐러" },
            { role: "행성간 수자원 조율사", job: "물 부족 행성에 수자원을 공급하는 거대 흐름의 관리자" },
            { role: "꿈의 세계 가이드", job: "인류가 잠든 사이 무의식 속에서 안전하게 유영하도록 돕는 자" },
            { role: "투명성 감사 위원", job: "정보의 흐름이 막힘없이 맑게 유지되는지 감시하는 투명성 수호자" },
            { role: "데이터 복구 고고학자", job: "사라진 고대 지구의 서버를 복구하여 잃어버린 기억을 찾는 이" },
            { role: "고차원의 교육가", job: "고정관념을 깨고 창의적인 사고를 흐르게 하는 미래의 스승" },
            { role: "심연의 진리 전파자", job: "우주의 끝에서 발견한 근원적 비밀을 지혜로 승화시켜 전하는 이" }
        ]
    };

    const futurePoolEn = {
        "목(木)": [
            { role: "Planetary Terraforming Architect", job: "specialist restoring endangered species in bio-domes on frontier planets" },
            { role: "Neural Plant Guardian", job: "system manager connecting human brainwaves with plants to generate oxygen" },
            { role: "Virtual Reality Gardener", job: "creator of natural zones in the digital world for souls to find rest" },
            { role: "Bio-Nano Engineer", job: "pioneer extending human lifespan by maximizing cellular regeneration" },
            { role: "Atmospheric Purification Technician", job: "expert purifying Earth's polluted air with the essence of forests" },
            { role: "Galactic Seed Vault Manager", job: "the final bastion preserving and distributing life codes across all planets" },
            { role: "Emotional Arboretum Healer", job: "healer growing plants that bloom by feeding on human sorrow" },
            { role: "Quantum Ecologist", job: "scholar studying ecological balance between dimensions to aid cosmic coexistence" },
            { role: "Messenger of the Primal Forest", job: "guide carrying trees possessing Earth's memories to new frontiers" },
            { role: "Life Sequence Designer", job: "designer perfectly setting the environment for new life forms to be born" }
        ],
        "화(火)": [
            { role: "Energy Frequency Tuner", job: "evangelist who unites and amplifies the energies of multi-dimensional civilizations" },
            { role: "Hologram Enlightener", job: "future teacher spreading forgotten human wisdom through light waves" },
            { role: "Nebula Power Excavator", job: "key player converting the energy from exploding stars into civilizational power" },
            { role: "Inter-dimensional Messenger of Light", job: "communication expert delivering messages between dimensions at the speed of light" },
            { role: "Quantum Sun Manager", job: "manager launching artificial suns on planets that cannot produce their own light" },
            { role: "Emotional Data Sculptor", job: "master who sublimates human passion into visual light art" },
            { role: "Hyper-speed Route Designer", job: "navigator shortening interstellar travel time using light refraction" },
            { role: "Mental Acceleration Optimizer", job: "energy manager upgrading human intelligence to the next level" },
            { role: "Archivist of Intelligence", job: "recorder storing the brilliant achievements of all civilizations as light particles" },
            { role: "Galactic Union Ambassador", job: "leader guiding cultural integration between planets with brilliant charisma" }
        ],
        "토(土)": [
            { role: "Director of Mars Infrastructure", job: "head official in charge of stabilizing soil and building residential zones" },
            { role: "Spacetime Data Vault Manager", job: "final manager who heavily protects the vast information of the universe" },
            { role: "Gravity Balance Coordinator", job: "one who creates the best environment for humanity by adjusting planetary gravity" },
            { role: "Inter-dimensional Currency Issuer", job: "financial guide building a trusted economic system across the galaxy" },
            { role: "Cosmic Union Attorney General", job: "judge who adjudicates legal conflicts between planets with unshakable principles" },
            { role: "Inter-planetary Geological Engineer", job: "one who restabilizes the geology of dying planets to lay the foundation for life" },
            { role: "Earth Relic Preservationist", job: "one who excavates and protects ancient Earth relics within future civilizations" },
            { role: "Safe Habitation Zone Designer", job: "designer creating robust shelters that can withstand any cosmic disaster" },
            { role: "Multi-national Union Historian", job: "historian who fairly records the history of all planets without distortion" },
            { role: "Continental Vertical City Manager", job: "manager overseeing peaceful residences by maximizing Earth's narrow territory" }
        ],
        "금(金)": [
            { role: "Planetary Defense Commander", job: "sentinel protecting civilization from external threats with precise judgment" },
            { role: "Cyber Law Adjudicator", job: "embodiment of justice who resolutely punishes crimes between virtual and reality" },
            { role: "Quantum Security Architect", job: "technician building an unhackable, iron-clad information protection system" },
            { role: "Rare Mineral Scout Leader", job: "explorer finding metals in deep space that will power civilization" },
            { role: "Android Ethics Supervisor", job: "judge deciding and monitoring the lines that machine intelligence must not cross" },
            { role: "Dimensional Gate Guardian", job: "sentinel blocking unauthorized dimensional travel and guarding the borders" },
            { role: "Iron Will Mentor", job: "leader healing human mental weakness with strong willpower" },
            { role: "Superconductor Component Crafter", job: "artisan precisely forging the metal components at the heart of future tech" },
            { role: "Space Fleet Auditor", job: "audit expert who keenly identifies whether all systems comply with regulations" },
            { role: "Decision-making Amplifier Trainer", job: "operator of neural training systems that enhance decision-making in critical moments" }
        ],
        "수(水)": [
            { role: "Neural Link Purification Specialist", job: "purifier who cleanses the polluted subconscious networks of humanity" },
            { role: "Deep Space Navigator", job: "pioneering pilot finding paths beyond black holes with profound insight" },
            { role: "Information Wave Analyst", job: "one who completes wisdom by gathering data particles scattered across the universe" },
            { role: "Subconscious Therapy Counselor", job: "healer who flexibly treats trauma submerged in the deep psyche" },
            { role: "Inter-planetary Water Coordinator", job: "manager of massive flows supplying water resources to parched planets" },
            { role: "Dreamworld Guide", job: "one who helps humanity swim safely through their subconscious while asleep" },
            { role: "Transparency Audit Commissioner", job: "guardian of transparency monitoring the flow of information remains clear" },
            { role: "Data Recovery Archeologist", job: "one finding lost memories by recovering ancient Earth servers" },
            { role: "Flexible Thinking Educator", job: "future teacher who breaks stereotypes and lets creative thinking flow" },
            { role: "Propagator of Primal Truth", job: "one who sublimates the ultimate secrets found at the edge of the universe into wisdom" }
        ]
    };

    const missionsKo = [
        "지구의 멸종 위기 식물 유전자를 행성 X로 이식하십시오.", "화성의 물 부족 현상을 해결할 결빙 핵 기술을 전달하십시오.", "분열된 달 거주지들 사이의 평화 조약을 체결하십시오.",
        "인공지능과 인류 사이의 감정적 갈등을 중재하고 화해시키십시오.", "100년 전 손실된 인류의 디지털 기억을 복구하십시오.", "신개척 행성에 세워질 첫 번째 도서관의 책을 선별하십시오.",
        "지구 자기장의 불균형을 막아 대기 붕괴를 저지하십시오.", "미래 세대를 위한 완벽한 산소 공급 시스템을 설계하십시오.", "행성 간 이동 중 발생하는 시공간 멀미를 치료하는 주파수를 찾으십시오.",
        "안드로이드들에게 '인간의 따스함'을 가르치는 교육 프로그램을 완성하십시오.", "지구 바다의 오염된 나노 입자들을 정화하는 임무를 수행하십시오.", "달의 먼지를 이용해 거대한 에너지 패널을 건설하십시오.",
        "다른 은하계에서 온 미지의 조난 신호를 최초로 수신하십시오.", "인류의 마지막 남은 천연 숲을 보존하는 파수꾼이 되십시오.", "우주 정거장의 노후된 중력 발생 장치를 교체하십시오.",
        "지구형 행성 탐사대의 정신적 안정을 돕는 상담 시스템을 운영하십시오.", "행성 간 무역에서 발생하는 불공정 거래를 감시하십시오.", "사라진 미래 도시 'New-뉴욕'의 지도를 다시 그리십시오.",
        "시공간 가속 장치의 과부하를 막아 차원의 균형을 지키십시오.", "인류가 거주할 새로운 지하 도시의 광원 시스템을 설치하십시오.", "외계 지성체와의 최초의 문화 교류 축제를 기획하십시오.",
        "화성 토양에 자랄 수 있는 하이브리드 종자를 배양하십시오.", "우주의 모든 소리를 수집하여 지구의 옛 노래를 복원하십시오.", "환생 시스템의 데이터 오류를 수정하여 영혼들을 구제하십시오.",
        "성운의 에너지를 모아 인공 태양을 점화하는 작업에 참여하십시오.", "미래의 인류가 겪을 지독한 고독을 치유할 콘텐츠를 제작하십시오.", "스스로 빛을 내지 못하는 개척지에 지혜의 빛을 전하십시오.",
        "우주의 끝에서 날아오는 정체불명의 방사능을 차단하십시오.", "감정의 불균형으로 무너지는 돔 도시의 정신을 재건하십시오.", "영원한 평화와 공존의 시나리오를 완성하십시오."
    ];

    const missionsEn = [
        "Transplant endangered Earth plant genes to Planet X.", "Deliver ice-core technology to solve water shortages on Mars.", "Sign a peace treaty between divided Lunar colonies.",
        "Mediate emotional conflicts between AI and humanity.", "Recover human digital memories lost 100 years ago.", "Select books for the first library on a newly colonized planet.",
        "Prevent atmospheric collapse by stabilizing Earth's magnetic field.", "Design a perfect oxygen supply system for future generations.", "Find frequencies to cure spacetime sickness during travel.",
        "Teach androids the 'warmth of humanity' through education.", "Purify polluted nano-particles in Earth's oceans.", "Construct giant energy panels using lunar dust.",
        "Receive the first distress signal from a distant galaxy.", "Guard Earth's last remaining natural forests.", "Replace outdated gravity generators on the space station.",
        "Operate counseling systems for planetary explorers' mental health.", "Monitor unfair trade in interplanetary commerce.", "Redraw the map of the lost city 'New-New York'.",
        "Block unauthorized dimensional interference to protect the balance.", "Install light systems for new underground cities.", "Organize the first cultural exchange festival with extraterrestrials.",
        "Cultivate hybrid seeds that can grow in Martian soil.", "Restore ancient Earth songs by collecting cosmic sounds.", "Correct data errors in the reincarnation system.",
        "Participate in igniting an artificial sun using nebula energy.", "Create content to heal the profound loneliness of future humans.", "Deliver the flame of wisdom to dark colonies.",
        "Block unidentified radiation coming from the edge of space.", "Rebuild the spirit of dome cities collapsing from emotional imbalance.", "Complete the cycle of eternal life."
    ];

    const elKeyEn = { "목(木)": "Wood", "화(火)": "Fire", "토(土)": "Earth", "금(金)": "Metal", "수(水)": "Water" }[signature];

    const pool = lang === 'ko' ? futurePoolKo[signature] : futurePoolEn[signature];
    const match = pool[num % 10];
    const mission = lang === 'ko' ? missionsKo[num % 30] : missionsEn[num % 30];

    if (lang === 'ko') {
        return {
            job: match.role,
            desc: `운명공학 분석 결과, 당신의 내세는 <b>${signature}</b>의 에너지가 주도합니다. 이 영향으로 <b>${match.job}</b>(으)로 활동할 운명입니다.`,
            mission: mission
        };
    } else {
        return {
            job: match.role,
            desc: `According to the destiny analysis, your afterlife will be driven by <b>${elKeyEn}</b> energy. Under this influence, you will be <b>${match.job}</b>.`,
            mission: mission
        };
    }
}
