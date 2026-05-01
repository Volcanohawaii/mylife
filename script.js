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
// [전생 식별 엔진] 70인 실존 위인 완벽 맞춤형 서사 로직
// ============================================================================
function getPastLifeData(num, signature, lang, scores) {
    // 1. 점수 예외 처리 (만약 점수가 넘어오지 않았을 경우를 대비한 안전장치)
    const myScores = (scores && scores.length === 5) ? scores : [20, 20, 20, 20, 20];

    // 2. 시대와 지역 데이터 풀 (위인 데이터의 e, r 인덱스와 매칭)
    const erasKo = ["기원전", "1~10세기", "11~14세기", "15세기", "16세기", "17세기", "18세기", "19세기", "20세기 초"];
    const erasEn = ["B.C.", "1st-10th Cent.", "11th-14th Cent.", "15th Cent.", "16th Cent.", "17th Cent.", "18th Cent.", "19th Cent.", "Early 20th Cent."];
    const regsKo = ["조선/한국", "중국/아시아", "인도/중동", "그리스/로마", "이탈리아", "프랑스", "영국", "유럽", "러시아", "북미", "중남미/아프리카"];
    const regsEn = ["Joseon/Korea", "China/Asia", "India/Middle East", "Greece/Rome", "Italy", "France", "UK", "Europe", "Russia", "North America", "Latin America/Africa"];

    // 3. 70인 위인 정밀 데이터베이스 (수식어, 직업, 장문 설명, 과업 100% 개별 맞춤)
    // n: 이름, d: 캡션, j: 수식어+직업, desc: 장문 서사, h: 과업, e: 시대, r: 지역, st: 오행 점수
    const figurePool = {
        "목(木)": [
            { nK: "허준", nE: "Heo Jun", e: 4, r: 0, st: [40,10,20,10,20],
              dK: "병든 백성을 향한 숭고한 치유의 손길", dE: "Noble healing hands for the sick",
              jK: "은은한 달빛 아래 생명의 이치를 탐구하던 애민의 의학자", jE: "Medical Scholar exploring life's principles under moonlight",
              descK: "당신은 신분과 빈부의 격차를 뛰어넘어, 오직 병든 생명을 구하겠다는 따뜻한 헌신으로 평생을 바쳤습니다. 흩어진 의학 지식을 집대성하여 누구든 쉽게 병을 치유할 수 있도록 돕는 위대한 유산을 남겼으며, 그 숭고한 생명력은 뭇사람들의 빛이 되었습니다.",
              descE: "You dedicated your life to saving the sick with warm devotion, breaking class barriers. By compiling medical knowledge, you left a great legacy that helped anyone heal easily.",
              hK: "타인의 아픔을 외면하지 않고, 당신이 가진 지식과 온기로 세상을 치유하는 것입니다.", hE: "Healing the world with your knowledge and warmth without ignoring others' pain." },
            { nK: "세종대왕", nE: "King Sejong", e: 3, r: 0, st: [40,10,20,10,20],
              dK: "모든 백성이 글을 읽게 하리라", dE: "Ensuring all people can read",
              jK: "백성의 눈물을 닦기 위해 문자를 창제한 성군", jE: "Benevolent King who created a script for his people",
              descK: "당신은 만백성이 뜻을 펼치지 못하는 것을 가엾게 여겨, 스스로 고단한 연구의 길을 걸으며 위대한 문자를 창제했습니다. 권위보다 백성을 사랑하는 마음을 우선시했으며, 찬란한 문화와 과학을 꽃피운 절대적인 포용의 리더십을 발휘했습니다.",
              descE: "Pitying the uneducated, you walked a grueling path of research to create a great script. You prioritized love for the people over authority, blossoming brilliant culture and science.",
              hK: "당신의 지식과 재능을 낮은 곳으로 흘려보내 모두가 평등하게 누릴 수 있게 하는 것입니다.", hE: "Sharing your knowledge and talents so everyone can benefit equally." },
            { nK: "정약용", nE: "Jeong Yak-yong", e: 6, r: 0, st: [30,20,30,10,10],
              dK: "백성의 삶을 윤택하게 만드는 지혜", dE: "Wisdom enriching the lives of the people",
              jK: "거친 유배지에서도 실용의 학문을 집대성한 학자", jE: "Scholar compiling practical learning in exile",
              descK: "당신은 기나긴 유배의 고통 속에서도 결코 좌절하지 않고, 오직 백성의 삶을 실질적으로 윤택하게 만들 방법을 고민했습니다. 공허한 이론을 배척하고 땀 흘려 얻은 실용적인 지식으로 낡은 사회를 개혁하려 했던 진정한 실학의 선구자였습니다.",
              descE: "Even in the pain of long exile, you never despaired, focusing only on enriching the people's lives. You were a true pioneer of practical learning, seeking to reform society.",
              hK: "탁상공론에서 벗어나, 현실의 문제를 해결하고 사람들에게 실질적인 도움을 주는 것입니다.", hE: "Providing practical help to solve real-world problems away from empty theories." },
            { nK: "나이팅게일", nE: "F. Nightingale", e: 7, r: 6, st: [40,10,20,10,20],
              dK: "어둠 속 야전병원을 밝힌 희망의 등불", dE: "Lamp of hope in the dark hospital",
              jK: "피비린내 나는 전장에 자비의 등불을 든 천사", jE: "Angel holding the lamp of mercy on a bloody battlefield",
              descK: "당신은 귀족의 안락한 삶을 버리고 끔찍한 절망이 가득한 야전 병원으로 스스로 걸어 들어갔습니다. 흔들리지 않는 희생정신과 체계적인 관리력으로 죽어가는 수많은 생명을 구원했으며, 현대 간호학의 기틀을 다진 위대한 구원자였습니다.",
              descE: "Forsaking a comfortable life, you walked into a despairing field hospital. With unwavering sacrifice and systematic management, you saved countless dying lives.",
              hK: "혼란과 절망의 한가운데서 타인을 위한 든든한 빛과 위로의 안식처가 되어주는 것입니다.", hE: "Becoming a reliable light and comfort for others in the midst of despair." },
            { nK: "슈바이처", nE: "A. Schweitzer", e: 8, r: 10, st: [50,10,10,10,20],
              dK: "생명에 대한 숭고한 경외감", dE: "Noble reverence for life",
              jK: "미지의 밀림 속에 생명의 가치를 심은 성자", jE: "Saint planting the value of life in the unknown jungle",
              descK: "당신은 예술과 학문의 영광이 보장된 길을 내려놓고, 그 누구도 가려 하지 않았던 아프리카의 밀림 속으로 향했습니다. '생명에 대한 외경'이라는 위대한 철학을 바탕으로 국경과 인종을 초월하여 모든 생명체를 평등하게 껴안았습니다.",
              descE: "Leaving behind guaranteed glory, you headed into the African jungle. Based on the philosophy of 'Reverence for Life,' you embraced all living beings across borders.",
              hK: "국경과 조건을 초월하여 모든 생명체의 가치를 존중하고 지켜내는 숭고함을 실천하는 것입니다.", hE: "Respecting and protecting the value of all life beyond borders and conditions." },
            { nK: "안토니 가우디", nE: "Antoni Gaudi", e: 7, r: 7, st: [40,20,20,10,10],
              dK: "곡선 속에 살아 숨 쉬는 신의 창조물", dE: "God's creation breathing in curves",
              jK: "대자연의 숨결을 거대한 돌에 새겨넣은 건축가", jE: "Architect carving nature's breath into giant stones",
              descK: "당신은 자연에는 직선이 없다는 진리를 깨닫고, 숲과 파도, 동물의 뼈에서 영감을 얻어 신이 빚은 듯한 위대한 건축물을 창조해 냈습니다. 끈질긴 장인 정신과 생명을 향한 경외심으로 돌덩이에 영혼과 숨결을 불어넣은 예술가였습니다.",
              descE: "Realizing there are no straight lines in nature, you created divine architecture inspired by forests and waves. You breathed soul into stones with persistent craftsmanship.",
              hK: "자연의 순리를 이해하고, 당신만의 독창적인 감각으로 삭막한 세상을 아름답게 빚어내는 것입니다.", hE: "Making the bleak world beautiful with your unique aesthetic sense based on nature." },
            { nK: "마리아 몬테소리", nE: "M. Montessori", e: 8, r: 4, st: [40,20,10,10,20],
              dK: "아이들 내면의 무한한 우주를 발견하다", dE: "Discovering the infinite universe within children",
              jK: "어린 영혼의 자립심을 틔워준 교육의 선구자", jE: "Pioneer of education awakening the independence of young souls",
              descK: "당신은 어른들의 통제 아래 억압받던 어린아이들 내면에서 스스로 성장하려는 거대한 우주를 발견했습니다. 편견에 맞서며 아이들의 본성과 자유를 존중하는 교육법을 창시하여, 인류의 미래를 밝힐 새로운 씨앗들을 가꿔냈습니다.",
              descE: "You discovered the infinite universe within children repressed under adult control. By fighting prejudice, you created an educational method respecting their true nature and freedom.",
              hK: "타인의 잠재력을 온전히 믿어주고 스스로 기립할 수 있도록 든든한 토양이 되어주는 것입니다.", hE: "Becoming the fertile soil that helps others grow their potential independently." },
            { nK: "그레고어 멘델", nE: "Gregor Mendel", e: 7, r: 7, st: [40,10,30,10,10],
              dK: "수도원 정원에서 생명의 법칙을 찾다", dE: "Finding the laws of life in a monastery garden",
              jK: "조용한 정원에서 생명의 유전 법칙을 해독한 사제", jE: "Priest decoding the laws of heredity in a quiet garden",
              descK: "당신은 화려한 학계가 아닌 고요한 수도원의 정원에서 수만 포기의 완두콩을 기르며 침묵 속에서 진리를 탐구했습니다. 끈질긴 관찰력과 통찰력으로 생명이 이어지는 위대한 유전의 법칙을 발견해 낸 침묵의 개척자였습니다.",
              descE: "You sought truth in silence, cultivating thousands of peas in a quiet monastery garden. With persistent observation, you discovered the great laws of heredity.",
              hK: "눈에 띄지 않는 작은 변화들을 끈기 있게 관찰하여 세상의 거대한 진리를 밝혀내는 것입니다.", hE: "Patiently observing small changes to discover the great truths of the world." },
            { nK: "신농씨", nE: "Shennong", e: 0, r: 1, st: [50,10,20,10,10],
              dK: "대지의 독을 스스로 시험한 자비심", dE: "Compassion testing the earth's poisons",
              jK: "만백성의 굶주림을 달래려 대지를 개척한 농경의 신", jE: "God of agriculture who pioneered the land to feed the people",
              descK: "당신은 백성들이 질병과 기아에 고통받는 것을 가엾게 여겨, 수백 가지 약초와 독초를 직접 입에 넣고 맛보며 생명의 길을 열었습니다. 인류에게 농경과 치유의 뿌리를 전파하기 위해 기꺼이 자신을 희생한 자비의 화신이었습니다.",
              descE: "Pitying the starving people, you personally tasted hundreds of herbs and poisons to open the path of healing. You sacrificed yourself to spread the roots of agriculture.",
              hK: "공동체의 풍요를 위해 낯선 길을 기꺼이 먼저 개척하고 희생을 감내하는 헌신을 발휘하는 것입니다.", hE: "Pioneering unfamiliar paths and enduring sacrifices for the abundance of the community." },
            { nK: "화타", nE: "Hua Tuo", e: 1, r: 1, st: [40,20,10,10,20],
              dK: "침술 하나로 죽어가는 생명을 끌어올리다", dE: "Reviving dying lives with a single needle",
              jK: "신들린 의술로 절망에 빠진 생명을 구원한 명의", jE: "Legendary physician saving despairing lives with divine medicine",
              descK: "당신은 권력에 굴복하지 않고 민초들 곁을 유랑하며 고통받는 이들의 병을 씻어냈습니다. 침과 약초만으로 죽어가던 생명을 살려내는 신출귀몰한 의술을 지녔으며, 의술의 본질이 사랑과 생명 존중에 있음을 행동으로 증명했습니다.",
              descE: "Refusing to bow to power, you wandered among the common people to heal their pain. You proved through action that the essence of medicine is love and respect for life.",
              hK: "절망에 빠진 이들에게 당신이 가진 뛰어난 기술과 재능으로 다시 일어설 힘을 불어넣는 것입니다.", hE: "Empowering those in despair to rise again with your outstanding skills and talents." },
            { nK: "프뢰벨", nE: "F. Fröbel", e: 7, r: 7, st: [40,20,10,10,20],
              dK: "어린이라는 씨앗을 가꾸는 영혼의 정원사", dE: "Spiritual gardener nurturing the seed of children",
              jK: "자연 속의 놀이에서 아이들의 우주를 일깨운 선구자", jE: "Pioneer awakening the universe of children through play",
              descK: "당신은 정원사가 씨앗을 정성껏 가꾸듯, 아이들을 순수한 영혼으로 대하며 놀이를 통해 스스로 성장할 수 있도록 도왔습니다. 세계 최초로 '유치원'이라는 개념을 창시하여, 억압받던 어린이들에게 무한한 창의력과 자유를 선물했습니다.",
              descE: "Like a gardener tending seeds, you treated children as pure souls and helped them grow through play. You created the concept of 'kindergarten,' granting children freedom.",
              hK: "순수한 호기심을 지켜주고, 억압 없는 자유로운 성장의 바탕을 온화하게 만들어주는 것입니다.", hE: "Protecting pure curiosity and creating a foundation for free growth without oppression." },
            { nK: "해리엇 터브먼", nE: "Harriet Tubman", e: 7, r: 9, st: [30,20,20,20,10],
              dK: "어둠을 뚫고 노예들을 구출한 모세", dE: "Moses rescuing slaves through the darkness",
              jK: "위험을 무릅쓰고 자유의 지하철도를 이끈 등불", jE: "Lantern leading the Underground Railroad risking everything",
              descK: "당신은 자신만의 안위를 챙길 수 있었음에도, 혹독한 억압 아래 신음하는 동족들을 구하기 위해 지옥 같은 숲을 수십 번 넘나들었습니다. 어둠 속에서 수백 명의 노예를 자유의 땅으로 인도하며 불굴의 투지와 거대한 인류애를 증명했습니다.",
              descE: "Though you could have secured your own safety, you crossed hellish forests dozens of times to save your people. You guided hundreds of slaves to the land of freedom.",
              hK: "부당한 억압에 맞서 소외된 이들의 손을 굳게 잡고 밝은 곳으로 함께 나아가는 용기를 내는 것입니다.", hE: "Showing the courage to hold the hands of the marginalized and lead them to the light." },
            { nK: "레이첼 카슨", nE: "Rachel Carson", e: 8, r: 9, st: [40,10,20,10,20],
              dK: "침묵의 봄을 경고한 지구의 파수꾼", dE: "Earth's guardian warning of the silent spring",
              jK: "생태계의 파괴를 꿰뚫어 보고 침묵을 깬 생태학자", jE: "Ecologist breaking the silence by foreseeing ecological ruin",
              descK: "당신은 거대 기업과 권력의 핍박 속에서도 결코 물러서지 않고, 무분별한 환경 파괴가 가져올 재앙을 경고했습니다. 만물이 유기적으로 연결되어 있다는 진리를 세상에 일깨우며, 무너져가는 지구의 생명력을 수호하기 위해 평생을 싸웠습니다.",
              descE: "Unfazed by the persecution of giant corporations, you warned of the disaster reckless environmental destruction would bring. You fought to protect the Earth's vitality.",
              hK: "편리함 속에 감춰진 치명적인 진실을 용기 있게 발설하며 세상의 균형을 수호하는 것입니다.", hE: "Courageously exposing the fatal truths hidden in convenience to protect the world's balance." },
            { nK: "제인 애덤스", nE: "Jane Addams", e: 8, r: 9, st: [40,20,20,10,10],
              dK: "가난한 이웃을 보듬어 안은 거대한 품", dE: "Vast embrace comforting poor neighbors",
              jK: "가장 낮은 빈민촌에서 평화와 복지를 싹틔운 어머니", jE: "Mother blooming peace and welfare in the lowest slums",
              descK: "당신은 특권층의 삶을 버리고 악취 나는 빈민촌 한가운데에 터전을 잡았습니다. 버림받은 이민자와 빈민들에게 교육과 쉴 곳을 제공하며 사회적 편견을 씻어내었고, 헐 하우스를 통해 평화와 공존이라는 위대한 숲을 가꾸어 냈습니다.",
              descE: "Abandoning a privileged life, you settled in the slums. You provided education and shelter to immigrants and the poor, blooming a great forest of peace and coexistence.",
              hK: "사회의 차별과 편견을 지우고, 모두가 평등하게 온기를 나눌 수 있는 터전을 온몸으로 닦는 것입니다.", hE: "Erasing discrimination and building a foundation where everyone can share warmth equally." }
        ],
        "화(火)": [
            { nK: "레오나르도 다빈치", nE: "L. da Vinci", e: 3, r: 4, st: [20,40,20,10,10],
              dK: "예술과 과학의 경계를 허문 불꽃 같은 상상력", dE: "Imagination breaking boundaries of art and science",
              jK: "지식의 경계를 넘나들며 우주의 비밀을 스케치한 융합형 천재", jE: "Genius sketching the universe's secrets across boundaries",
              descK: "당신은 하나의 틀에 얽매이기를 거부하고 캔버스와 해부학, 기계 공학을 자유롭게 넘나들었습니다. 끓어오르는 호기심과 영감의 불꽃을 태워 인류 역사상 가장 다재다능하고 압도적인 지적 성취를 이룩한 르네상스의 심장이었습니다.",
              descE: "Refusing to be bound by a single frame, you freely crossed canvas, anatomy, and mechanical engineering. You achieved the most overwhelming intellectual accomplishments in history.",
              hK: "한 분야에 매몰되지 않고, 당신의 끓어오르는 영감으로 세상의 다양한 지식을 연결하여 창조하는 것입니다.", hE: "Connecting various knowledge with your boiling inspiration to create without being trapped in one field." },
            { nK: "빈센트 반 고흐", nE: "Vincent van Gogh", e: 7, r: 7, st: [10,50,10,10,20],
              dK: "밤하늘의 별처럼 소용돌이치는 뜨거운 영혼", dE: "Swirling soul like stars in the night sky",
              jK: "스스로의 영혼을 땔감으로 삼아 불멸의 캔버스를 남긴 화가", jE: "Painter leaving immortal canvases using his soul as fuel",
              descK: "당신은 누구도 알아주지 않는 지독한 고독과 고통 속에서도 예술을 향한 열정의 붓을 꺾지 않았습니다. 요동치는 내면의 에너지를 강렬한 색채와 소용돌이로 화폭에 폭발시켜, 세월이 흘러도 결코 꺼지지 않는 불멸의 예술을 완성했습니다.",
              descE: "Amidst extreme solitude and pain, you never broke your brush of passion for art. You exploded your inner energy onto the canvas with intense colors and swirls.",
              hK: "당신 안의 들끓는 감정을 회피하지 않고, 그것을 가장 창조적인 예술과 에너지로 승화시키는 것입니다.", hE: "Sublimating your boiling emotions into the most creative art and energy without avoiding them." },
            { nK: "잔 다르크", nE: "Joan of Arc", e: 3, r: 5, st: [10,50,10,20,10],
              dK: "신의 목소리를 듣고 전장에 꽂은 불굴의 깃발", dE: "Indomitable flag planted on the battlefield",
              jK: "무너져가는 조국을 구하기 위해 화염처럼 타오른 성녀", jE: "Holy maiden burning like a flame to save her fallen nation",
              descK: "당신은 절망에 휩싸여 패배만을 기다리던 조국을 위해, 일개 소녀의 몸으로 검을 쥐고 전장의 최전선에 섰습니다. 타오르는 신념과 꺾이지 않는 용기로 병사들의 가슴에 거대한 불길을 지펴 마침내 기적 같은 승리를 이끌어 냈습니다.",
              descE: "For a nation awaiting defeat, you stood at the front lines of the battlefield holding a sword. With burning conviction and courage, you ignited a great fire in the soldiers' hearts.",
              hK: "절망적인 상황에서도 자신의 신념을 믿고, 타인의 심장에 행동으로 열정을 지피는 것입니다.", hE: "Believing in your convictions in despairing situations and igniting passion in others through action." },
            { nK: "알렉산드로스 대왕", nE: "Alexander", e: 0, r: 3, st: [10,40,10,30,10],
              dK: "세상의 끝을 보고자 했던 타오르는 야망", dE: "Burning ambition to see the end of the world",
              jK: "두려움 없이 대륙을 가로지르며 동서양을 융합한 대정복자", jE: "Conqueror fusing East and West crossing continents fearlessly",
              descK: "당신은 안락한 궁전을 박차고 나가, 세상의 끝을 보겠다는 맹렬한 야망 하나로 대륙을 질주했습니다. 번개 같은 기동력과 압도적인 통솔력으로 동양과 서양의 경계를 허물고 역사상 유례없는 헬레니즘 제국을 건설한 불꽃의 화신이었습니다.",
              descE: "Driven by a fierce ambition to see the end of the world, you dashed across continents. With lightning mobility, you broke the boundaries of East and West, building the Hellenistic Empire.",
              hK: "안전에 안주하지 않고 두려움 없이 미지의 세계로 돌진하여 당신만의 광활한 영역을 개척하는 것입니다.", hE: "Charging fearlessly into the unknown to pioneer your vast domain instead of settling for safety." },
            { nK: "프리다 칼로", nE: "Frida Kahlo", e: 8, r: 10, st: [20,50,10,10,10],
              dK: "산산조각 난 고통을 생생한 색채로 피워내다", dE: "Blooming shattered pain into vivid colors",
              jK: "온몸이 부서지는 고통 속에서도 붓을 들어올린 초현실주의 예술가", jE: "Surrealist lifting a brush even in shattering pain",
              descK: "당신은 육체를 옭아매는 끔찍한 고통과 처절한 사랑의 상처 앞에서도 결코 생의 의지를 놓지 않았습니다. 자신의 찢겨진 영혼을 가장 원초적이고 생생한 색채로 캔버스에 폭발시키며, 절망마저 위대한 예술로 태워버렸습니다.",
              descE: "Facing horrific physical pain and tragic love, you never let go of the will to live. You exploded your torn soul onto the canvas with vivid colors, turning despair into art.",
              hK: "삶이 주는 고난과 상처를 외면하지 않고, 그것을 당신을 증명하는 가장 강력한 무기로 벼려내는 것입니다.", hE: "Forging the hardships of life into your most powerful weapon without turning away from them." },
            { nK: "모차르트", nE: "W. A. Mozart", e: 6, r: 7, st: [10,40,10,10,30],
              dK: "하늘에서 쏟아지는 듯한 찬란하고 투명한 선율", dE: "Brilliant, transparent melodies pouring from the sky",
              jK: "순수한 열정과 즉흥성으로 신의 음표를 받아 적은 음악의 신동", jE: "Musical prodigy transcribing divine notes with pure passion",
              descK: "당신은 짧은 생애 동안 머릿속에서 솟구치는 찬란한 선율들을 쉴 새 없이 오선지에 쏟아냈습니다. 비극적인 현실과 곤궁함 속에서도 결코 어린아이 같은 순수함을 잃지 않았으며, 인류의 영혼을 정화하는 가장 완벽하고 투명한 음악을 남겼습니다.",
              descE: "During a short life, you endlessly poured out brilliant melodies onto paper. Despite tragic reality, you never lost childlike purity, leaving perfect music that purifies the soul.",
              hK: "세상의 때에 묻지 않은 순수함과 영감을 잃지 않고, 당신이 가진 에너지로 대중에게 기쁨을 전파하는 것입니다.", hE: "Spreading joy with your energy without losing untainted purity and inspiration." },
            { nK: "베토벤", nE: "L. van Beethoven", e: 6, r: 7, st: [20,40,20,10,10],
              dK: "적막의 어둠을 뚫고 폭발하는 환희의 송가", dE: "Ode to Joy exploding through the darkness of silence",
              jK: "청각 상실의 절망을 부수고 운명의 멱살을 쥔 거장", jE: "Maestro who broke the despair of deafness and seized fate",
              descK: "당신은 음악가에게 사형 선고나 다름없는 청각 상실의 비극을 겪으면서도, 내면에서 끓어오르는 창작의 불꽃을 끄지 않았습니다. 혹독한 운명과 피투성이가 되도록 싸운 끝에, 마침내 침묵 속에서 인류 역사상 가장 위대한 환희의 교향곡을 끌어냈습니다.",
              descE: "Despite the tragedy of deafness, you did not extinguish your creative fire. After a bloody fight with harsh fate, you drew out the greatest symphony of joy from silence.",
              hK: "가혹한 운명 앞에서도 결코 무릎 꿇지 않고, 당신 안의 열정으로 기어코 승리를 쟁취해 내는 것입니다.", hE: "Never kneeling before harsh fate and ultimately achieving victory with your inner passion." },
            { nK: "체 게바라", nE: "Che Guevara", e: 8, r: 10, st: [10,50,20,10,10],
              dK: "리얼리스트가 되자, 그러나 가슴 속엔 불가능한 꿈을", dE: "Be a realist, but keep an impossible dream in your heart",
              jK: "안락한 기득권을 버리고 핍박받는 자들을 위해 타오른 혁명가", jE: "Revolutionary burning for the oppressed, abandoning comfort",
              descK: "당신은 보장된 안락한 의사의 길을 미련 없이 버리고, 핍박받는 민중의 고통을 자신의 것으로 끌어안았습니다. 불의에 타협하지 않는 순수한 분노와 불가능한 꿈을 향한 불꽃 같은 투쟁으로 전 세계 청년들의 가슴에 영원한 혁명의 아이콘이 되었습니다.",
              descE: "Abandoning a comfortable doctor's path, you embraced the pain of the oppressed. With pure anger against injustice and a fiery struggle, you became an eternal icon of revolution.",
              hK: "세상의 부조리에 침묵하지 않고, 더 나은 이상을 위해 불꽃처럼 행동하며 실천하는 것입니다.", hE: "Acting and practicing like a flame for a better ideal without staying silent against absurdity." },
            { nK: "이백", nE: "Li Bai", e: 1, r: 1, st: [20,40,10,10,20],
              dK: "달빛을 안고 취해 부른 자유분방한 노래", dE: "Free-spirited song sung while embracing the moonlight",
              jK: "규율을 비웃으며 세상을 바람처럼 유랑한 시선(詩仙)", jE: "Poet Immortal wandering the world like the wind, mocking rules",
              descK: "당신은 벼슬과 세속의 권력에 얽매이기를 거부하고, 바람과 달을 벗 삼아 대륙을 자유롭게 유랑했습니다. 제왕 앞에서도 고개를 숙이지 않는 호연지기를 지녔으며, 낭만적이고 폭발적인 감성을 담아낸 시구들은 뭇사람들의 영혼을 자유롭게 해방시켰습니다.",
              descE: "Refusing to be bound by secular power, you wandered freely with the wind and moon. You possessed a noble spirit, leaving romantic and explosive poetry that liberated souls.",
              hK: "남이 정해준 낡은 규칙에 얽매이지 않고, 영혼이 이끄는 대로 자유롭게 춤추며 살아가는 것입니다.", hE: "Living and dancing freely as your soul guides, unbound by old rules set by others." },
            { nK: "선덕여왕", nE: "Queen Seondeok", e: 1, r: 0, st: [20,40,20,10,10],
              dK: "위기 속에서 피어난 모란의 찬란한 통치", dE: "Brilliant rule of the peony bloomed in crisis",
              jK: "전쟁의 화염 속에서 부드러운 카리스마로 삼국통일의 씨앗을 품은 군주", jE: "Monarch holding the seed of unification with soft charisma",
              descK: "당신은 안팎으로 위기가 몰아치던 전란의 시기에, 여성이라는 깊은 편견을 깨고 당당히 왕좌에 올랐습니다. 예리한 통찰력으로 인재를 적재적소에 배치하고, 화려한 문화의 융성과 강력한 국방을 동시에 이룩하여 삼국통일의 찬란한 불씨를 마련했습니다.",
              descE: "During a time of war and crisis, you broke prejudices and took the throne. With keen insight, you placed talents perfectly, providing the spark for unification and cultural prosperity.",
              hK: "편견의 벽을 부수고, 당신만의 부드러우면서도 단호한 카리스마로 세상의 리더가 되는 것입니다.", hE: "Breaking the wall of prejudice and becoming a leader with your soft yet resolute charisma." },
            { nK: "마리 퀴리", nE: "Marie Curie", e: 7, r: 5, st: [10,40,20,20,10],
              dK: "어둠 속에서 스스로 빛을 내는 치명적인 열정", dE: "Fatal passion shining brightly in the dark",
              jK: "자신의 목숨을 깎아내며 미지의 에너지를 발굴한 과학자", jE: "Scientist unearthing unknown energy at the cost of her life",
              descK: "당신은 열악한 실험실에서 수백 톤의 광석을 손수 녹여가며, 보이지 않는 빛을 향한 맹렬한 집념을 불태웠습니다. 방사능이라는 치명적인 미지의 에너지를 발견하여 인류의 과학사를 송두리째 뒤집었으며, 그 지독한 열정으로 영원히 빛나는 이름을 남겼습니다.",
              descE: "Melting tons of ore in a poor lab, you burned with a fierce tenacity for unseen light. By discovering radioactivity, you overturned the history of science with fatal passion.",
              hK: "미지의 진리를 향해 맹렬하게 파고들며, 어둠을 밝힐 새로운 지식을 발굴하는 집념을 발휘하는 것입니다.", hE: "Fiercely digging into unknown truths and exercising tenacity to unearth knowledge that lights the dark." },
            { nK: "토머스 에디슨", nE: "Thomas Edison", e: 7, r: 9, st: [20,40,20,10,10],
              dK: "실패를 연료로 태워 세상을 밝힌 백열구", dE: "Incandescent bulb lighting the world by burning failure as fuel",
              jK: "어둠을 몰아내기 위해 수만 번의 실패를 불태운 발명왕", jE: "King of inventors burning through thousands of failures",
              descK: "당신은 타고난 천재성보다 99%의 땀과 열정을 믿었습니다. 하나의 발명을 완성하기 위해 수만 번의 실패를 겪으면서도 결코 좌절하지 않았으며, 마침내 인류의 기나긴 밤을 낮으로 바꾸는 찬란한 빛의 기적을 쏘아 올렸습니다.",
              descE: "You believed in 99% perspiration over innate genius. Despite thousands of failures, you never despaired, finally launching the miracle of light that turned humanity's night into day.",
              hK: "수많은 실패를 결코 두려워하지 않고, 그것을 연료 삼아 아이디어를 기어코 현실로 끄집어내는 것입니다.", hE: "Never fearing failure, but using it as fuel to bring your ideas into reality." },
            { nK: "니콜라 테슬라", nE: "Nikola Tesla", e: 7, r: 9, st: [10,40,10,20,20],
              dK: "번개를 손에 쥐고 미래의 에너지를 꿈꾼 마법사", dE: "Wizard dreaming of future energy holding lightning",
              jK: "시대를 너무 일찍 앞서간 고독한 전기의 마법사", jE: "Lonely wizard of electricity who was too far ahead of his time",
              descK: "당신은 머릿속에 번뜩이는 거대한 직관으로 교류 전기와 무선 통신이라는 마법 같은 비전을 설계했습니다. 당대의 상식과 억압적인 자본 논리에 타협하지 않고 오직 인류의 진보를 위한 빛의 에너지를 갈망했던, 시대를 앞서간 진정한 천재였습니다.",
              descE: "With flashing intuition, you designed magical visions like alternating current. You were a true genius ahead of your time, yearning for light energy for humanity's progress.",
              hK: "현재의 상식과 제약에 얽매이지 않고, 먼 미래를 내다보는 획기적인 비전을 과감히 제시하는 것입니다.", hE: "Boldly presenting groundbreaking visions looking far into the future, unconstrained by current norms." },
            { nK: "스파르타쿠스", nE: "Spartacus", e: 0, r: 3, st: [20,40,10,30,0],
              dK: "로마의 억압을 뚫고 솟구친 활화산 같은 분노", dE: "Anger like an active volcano piercing Roman oppression",
              jK: "짐승의 굴레를 거부하고 거대한 제국을 뒤흔든 자유의 검투사", jE: "Gladiator of freedom shaking a giant empire, refusing chains",
              descK: "당신은 오락거리로 목숨을 잃어야 하는 노예의 비참한 운명에 순응하기를 거부했습니다. 심장 깊은 곳에서 솟구치는 거대한 분노를 폭발시켜 로마 최강의 군대에 맞섰으며, 자유를 향한 인간의 뜨거운 존엄성이 무력보다 강함을 역사에 피로 증명했습니다.",
              descE: "Refusing to accept a slave's fate, you exploded your deep anger against Rome's strongest army. You proved with blood that the human dignity for freedom is stronger than force.",
              hK: "당연하게 여겨지는 억압과 부조리에 순응하지 않고, 온몸을 던져 낡은 체제를 뒤흔드는 것입니다.", hE: "Shaking the old system by throwing yourself against taken-for-granted oppression and absurdity." }
        ],
        "토(土)": [
            { nK: "석가모니", nE: "Buddha", e: 0, r: 2, st: [10,10,50,10,20],
              dK: "모든 집착을 내려놓은 거대한 우주의 고요함", dE: "Silence of the vast universe letting go of all attachments",
              jK: "생로병사의 고통을 끊어내고 중도의 평온을 이룬 깨달은 자", jE: "The Enlightened One finding middle-path peace beyond suffering",
              descK: "당신은 세상 모든 부귀영화가 보장된 왕자의 자리를 스스로 버리고, 인간이 겪는 고통의 근원을 찾기 위해 험난한 고행의 길을 걸었습니다. 마침내 모든 탐욕과 집착을 흙으로 돌려보내는 중도의 지혜를 깨달아 우주적인 평온에 도달했습니다.",
              descE: "Abandoning a prince's wealth, you walked a grueling path to find the root of human suffering. You reached cosmic peace by realizing the wisdom of letting go of greed and attachment.",
              hK: "세속적인 소유와 집착의 번뇌에서 벗어나, 영혼의 완전한 평온과 중심을 찾는 것입니다.", hE: "Finding complete peace of soul by freeing yourself from the agony of secular possession and attachment." },
            { nK: "공자", nE: "Confucius", e: 0, r: 1, st: [20,10,50,10,10],
              dK: "어지러운 세상에 뿌리내린 묵직한 도덕과 질서", dE: "Heavy morals and order rooted in a chaotic world",
              jK: "혼란한 춘추전국시대에 인(仁)의 가르침을 세운 철학자", jE: "Philosopher establishing teachings of Benevolence in chaos",
              descK: "당신은 배신과 살육이 난무하던 야만의 시대에, 인간이 인간답게 살기 위한 예의와 도덕의 기틀을 묵묵히 세웠습니다. 어리석은 권력자들에게 끊임없이 외면당하면서도 제자들을 기르며 천하에 흔들리지 않는 질서의 뿌리를 내렸습니다.",
              descE: "In a savage era of betrayal, you silently established the foundations of etiquette and morality. Though ignored by rulers, you nurtured disciples and laid unshakeable roots of order.",
              hK: "이익만 좇는 삭막한 세상 속에서 타인을 어질게 대하며, 공동체에 바른 도리와 질서를 세우는 것입니다.", hE: "Treating others benevolently and establishing correct order in a bleak world chasing only profit." },
            { nK: "마하트마 간디", nE: "Mahatma Gandhi", e: 8, r: 2, st: [10,20,50,10,10],
              dK: "총칼보다 강한 인내와 진실의 맨발", dE: "Bare feet of patience and truth, stronger than guns",
              jK: "폭력을 폭력으로 갚지 않고 거대 제국을 무릎 꿇린 위대한 영혼", jE: "Great Soul bringing an empire to its knees without violence",
              descK: "당신은 총칼로 무장한 세계 최강의 제국에 맞서면서도 결코 피를 흘리지 않는 숭고한 저항을 선택했습니다. 단식을 불사하는 초인적인 인내심과 흔들리지 않는 평화의 의지로 대륙의 마음을 묶어내며, 비폭력이 폭력보다 강하다는 진리를 썼습니다.",
              descE: "Facing an armed empire, you chose noble resistance without shedding blood. With superhuman patience and a firm will for peace, you proved non-violence is stronger than violence.",
              hK: "치밀어 오르는 분노를 배제하고, 흔들림 없는 인내와 평화의 의지로 세상을 변화시키는 것입니다.", hE: "Changing the world with unwavering patience and peaceful will, excluding boiling anger." },
            { nK: "소크라테스", nE: "Socrates", e: 0, r: 3, st: [10,20,40,20,10],
              dK: "스스로의 무지를 일깨우는 날카롭고 단단한 질문", dE: "Sharp, solid questions awakening one's own ignorance",
              jK: "거짓된 지식을 부수고 영혼의 진리를 탐구한 철인", jE: "Philosopher shattering false knowledge to seek the soul's truth",
              descK: "당신은 모두가 스스로 지혜롭다 여기며 오만에 빠져있을 때, 우직하게 거리로 나가 날카로운 문답을 던지며 영혼의 무지를 깨웠습니다. 목숨을 위협받는 재판 앞에서도 자신의 철학을 굽히지 않고 기꺼이 독배를 마시며 진리의 반석이 되었습니다.",
              descE: "When everyone fell into arrogance, you hit the streets to awaken ignorance with sharp questions. You did not bend your philosophy even facing a death sentence, drinking poison willingly.",
              hK: "모두가 '예'라고 할 때 본질을 꿰뚫는 질문을 던지며, 타협 없이 진리를 수호하는 것입니다.", hE: "Protecting the truth without compromise by asking piercing questions when everyone says 'yes'." },
            { nK: "에이브러햄 링컨", nE: "A. Lincoln", e: 7, r: 9, st: [20,10,40,10,20],
              dK: "분열된 대륙을 하나로 꿰맨 너른 포용력", dE: "Broad tolerance sewing a divided continent into one",
              jK: "증오와 내전의 피바람 속에서 노예 해방을 이룬 통합의 지도자", jE: "Leader of unity achieving emancipation amid hatred and civil war",
              descK: "당신은 남과 북이 갈라져 형제끼리 총을 겨누는 참혹한 내전 속에서, 국가의 분열을 막고 흑인 노예들을 쇠사슬에서 해방시켰습니다. 끝없는 정치적 공격과 암살의 위협 속에서도 나와 반대되는 이들마저 내각에 품어 안는 거대한 포용의 바다였습니다.",
              descE: "Amidst a brutal civil war, you prevented national division and freed slaves from chains. Despite attacks, you embraced even your opponents into your cabinet, showing massive tolerance.",
              hK: "나와 반대되는 의견마저 깊이 수용하여, 찢어진 관계와 갈등하는 공동체를 하나로 봉합하는 것입니다.", hE: "Mending torn relationships by deeply embracing even opposing views to unify the community." },
            { nK: "아소카왕", nE: "King Ashoka", e: 0, r: 2, st: [10,10,50,20,10],
              dK: "참혹한 피의 정복을 멈추고 자비를 베풀다", dE: "Stopping bloody conquest to show mercy",
              jK: "살육의 칼을 버리고 평화의 진리로 대륙을 다스린 제왕", jE: "Emperor dropping the sword of slaughter to rule with peace",
              descK: "당신은 젊은 시절 피비린내 나는 참혹한 정복 전쟁으로 대륙을 통일했으나, 수많은 죽음 앞에서 깊은 참회에 빠졌습니다. 이후 폭력의 칼날을 영원히 거두고, 만생명에 대한 자비와 불교의 평화적 진리로 광활한 영토를 자애롭게 보살폈습니다.",
              descE: "Unifying the continent through bloody conquest, you fell into deep repentance facing countless deaths. You permanently put away the sword and ruled with mercy and peaceful truth.",
              hK: "상대를 이겼음에도 결코 군림하려 들지 않고, 패자를 품어 안는 진정한 자비를 실천하는 것입니다.", hE: "Practicing true mercy by embracing the loser, never trying to dominate even when victorious." },
            { nK: "마더 테레사", nE: "Mother Teresa", e: 8, r: 2, st: [20,10,50,10,10],
              dK: "가장 버림받은 이들의 손을 잡아준 따뜻한 흙", dE: "Warm earth holding the hands of the most abandoned",
              jK: "아무도 돌아보지 않는 병자와 빈민의 발을 씻겨준 구원자", jE: "Savior washing the feet of the sick and poor ignored by all",
              descK: "당신은 세상의 화려한 스포트라이트를 철저히 거부하고, 전염병과 굶주림이 창궐하는 가장 지독하고 낮은 빈민굴로 향했습니다. 길거리에 버려져 죽어가는 이들의 손을 묵묵히 잡아주며, 종교를 초월한 무조건적인 아가페의 사랑을 흙처럼 베풀었습니다.",
              descE: "Rejecting the spotlight, you headed to the lowest slums rife with disease. You silently held the hands of the dying on the streets, granting unconditional love like fertile soil.",
              hK: "빛나지 않는 가장 낮은 곳에서, 외롭고 가난한 자들을 위해 묵묵히 온기를 나누어주는 것입니다.", hE: "Silently sharing warmth for the lonely and poor in the lowest, unglamorous places." },
            { nK: "넬슨 만델라", nE: "Nelson Mandela", e: 8, r: 10, st: [20,10,50,10,10],
              dK: "27년의 차가운 옥살이를 녹여낸 뜨거운 용서", dE: "Hot forgiveness melting 27 years of cold imprisonment",
              jK: "인종 차별의 벽을 부수고 증오를 화해로 승화시킨 굳건한 바위", jE: "Solid rock breaking racial walls and sublimating hate into reconciliation",
              descK: "당신은 자유를 갈망하다 27년이라는 기나긴 세월을 차가운 독방에 갇혀 지냈습니다. 그러나 감옥의 철창도 당신의 인간애를 꺾지 못했으며, 권력을 잡은 뒤에도 자신을 가두었던 억압자들을 피로 응징하지 않고 위대한 용서와 화해의 손을 내밀었습니다.",
              descE: "Yearning for freedom, you spent 27 years in a cold solitary cell. When you took power, you did not exact bloody revenge, but extended the hand of great forgiveness and reconciliation.",
              hK: "나를 박해하고 상처 준 자들마저 끌어안음으로써, 폭력과 증오의 악순환을 영원히 끊어내는 것입니다.", hE: "Breaking the vicious cycle of hate by embracing even those who persecuted and hurt you." },
            { nK: "칼 마르크스", nE: "Karl Marx", e: 7, r: 7, st: [10,20,50,10,10],
              dK: "자본주의의 기저를 파헤친 거대한 사상의 지층", dE: "Massive stratum of thought excavating the base of capitalism",
              jK: "표면의 불평등을 넘어 시대의 구조적 모순을 해부한 사상적 거인", jE: "Ideological giant dissecting structural contradictions beyond surface inequality",
              descK: "당신은 화려한 산업혁명의 이면에 가려진 노동자들의 비참한 착취를 외면하지 않았습니다. 거대한 자본주의 시스템이 어떻게 작동하고 무너지는지를 평생의 가난 속에서도 묵직하게 분석해내며, 세계의 역사를 둘로 쪼갠 거대한 사상의 지층을 형성했습니다.",
              descE: "You did not ignore the exploitation of workers behind the industrial revolution. Enduring poverty, you analyzed how capitalism works, forming a massive ideological stratum.",
              hK: "보여지는 현상에 속지 않고, 세상이 굴러가는 거대한 구조와 본질적인 모순을 통찰하는 것입니다.", hE: "Perceiving the massive structures and contradictions of the world without being fooled by phenomena." },
            { nK: "조지 워싱턴", nE: "G. Washington", e: 6, r: 9, st: [20,10,40,20,10],
              dK: "절대 권력을 스스로 내려놓은 굳건한 바위", dE: "Firm rock that voluntarily laid down absolute power",
              jK: "독립 전쟁을 승리로 이끌고 신생국의 토대를 닦은 건국의 아버지", jE: "Founding father who led independence and laid the nation's base",
              descK: "당신은 최악의 악조건 속에서도 흔들리지 않는 뚝심으로 군대를 이끌어 초강대국 영국의 군대를 물리쳤습니다. 더욱 위대한 것은 국왕이 될 수 있는 절대적인 지지와 권력이 주어졌음에도, 민주주의의 기틀을 위해 스스로 권좌에서 물러난 절제력이었습니다.",
              descE: "You defeated Britain with unshakable perseverance. More greatly, you voluntarily stepped down from absolute power to lay the foundation for democracy.",
              hK: "최고의 명예와 권력에 취하지 않고, 박수칠 때 스스로 물러날 줄 아는 무서운 절제력을 보여주는 것입니다.", hE: "Showing the formidable restraint to step down voluntarily when applauded, not drunk on power." },
            { nK: "빅토리아 여왕", nE: "Queen Victoria", e: 7, r: 6, st: [10,10,50,20,10],
              dK: "해가 지지 않는 거대한 대지를 품은 위엄", dE: "Dignity embracing the vast land where the sun never sets",
              jK: "안정감 있는 통치로 대영제국의 최전성기를 이끈 제국의 어머니", jE: "Mother of the empire leading the golden age with stable rule",
              descK: "당신은 흔들리던 왕실의 권위를 굳건히 바로잡고, 도덕성과 엄격한 책임감을 바탕으로 제국을 결속시켰습니다. 화려하게 나서기보다 보이지 않는 곳에서 무게 중심을 잡아주며, 세계 경제와 산업을 주도한 찬란하고 안정적인 빅토리아 시대를 열었습니다.",
              descE: "You firmly restored the monarchy's authority, uniting the empire with morality. Serving as a steady center, you opened the brilliant, stable Victorian era.",
              hK: "조직의 흔들림 없는 묵직한 중심추가 되어, 주변 사람들에게 깊은 안정감과 신뢰의 바탕이 되는 것입니다.", hE: "Becoming an unwavering heavy center, providing deep stability and trust to those around you." },
            { nK: "윈스턴 처칠", nE: "Winston Churchill", e: 8, r: 6, st: [10,20,40,20,10],
              dK: "절망의 폭격 속에서도 무너지지 않은 태산", dE: "Great mountain that did not collapse amid bombings of despair",
              jK: "전쟁의 공포 앞에서도 끝까지 항복을 거부한 불굴의 지도자", jE: "Indomitable leader refusing surrender against the terror of war",
              descK: "당신은 유럽이 나치의 군화발에 짓밟히고 런던이 매일 밤 불타오르던 절망의 순간에도, 피와 땀과 눈물 외에는 바칠 것이 없다며 결사항전을 외쳤습니다. 모두가 포기를 말할 때 묵직한 바위처럼 버텨내어, 마침내 세계 대전의 흐름을 승리로 뒤바꿨습니다.",
              descE: "Even when London burned nightly, you promised only blood, toil, tears, and sweat. When all urged surrender, you stood like a rock, turning the tide of WWII.",
              hK: "모두가 안 된다며 포기하려 할 때, 산처럼 든든히 버티며 끝까지 밀고 나가는 집념을 보여주는 것입니다.", hE: "Standing firm like a mountain and pushing through when everyone else tries to give up." },
            { nK: "마르쿠스 아우렐리우스", nE: "Marcus Aurelius", e: 1, r: 3, st: [10,10,50,10,20],
              dK: "권력의 정점에서 스스로의 내면을 성찰하다", dE: "Reflecting on his inner self at the pinnacle of power",
              jK: "전쟁터의 피바람 속에서도 철학적 진리를 기록한 명상하는 황제", jE: "Meditating emperor recording truth amid the blood of battle",
              descK: "당신은 로마 제국의 가장 막강한 권력을 쥔 황제였으나, 호화로운 궁전 대신 춥고 척박한 최전선의 막사에서 생의 대부분을 보냈습니다. 쏟아지는 업무와 암살의 위협 속에서도 매일 밤 자신의 오만함을 경계하며 내면의 고요함을 찾는 명상록을 남겼습니다.",
              descE: "Holding absolute power, you spent life not in palaces but in frontline tents. Amid war, you wrote Meditations to guard against arrogance and find inner peace.",
              hK: "가장 화려한 성공의 정점에서도 교만하지 않고, 매일 밤 자신의 영혼을 채찍질하며 성찰하는 것입니다.", hE: "Reflecting on your soul every night without arrogance, even at the peak of brilliant success." },
            { nK: "황희", nE: "Hwang Hui", e: 3, r: 0, st: [20,10,50,10,10],
              dK: "네 말도 맞고, 네 말도 맞다", dE: "You are right, and you are right too",
              jK: "너른 포용력과 관용으로 극단적 대립을 조율한 지혜로운 명재상", jE: "Wise chancellor tuning extreme conflicts with broad tolerance",
              descK: "당신은 세종대왕을 보필하며 조선 최고의 태평성대를 이끌었던 주역입니다. 흑백논리로 상대를 베어내는 대신, '네 말도 맞고 네 말도 맞다'며 서로 다른 의견의 충돌을 둥글게 깎아내고 포용하여, 국정이 극단으로 치닫는 것을 막아낸 중용의 달인이었습니다.",
              descE: "Assisting King Sejong, you led Joseon's golden age. Instead of black-and-white logic, you embraced opposing views, preventing state affairs from running to extremes.",
              hK: "극단적이고 날카로운 주장을 배제하고, 갈등을 부드럽게 감싸 안아 상생의 결론을 도출하는 것입니다.", hE: "Excluding extreme claims and smoothly embracing conflicts to derive conclusions of symbiosis." }
        ],
        "금(金)": [
            { nK: "이순신", nE: "Yi Sun-sin", e: 4, r: 0, st: [10,10,10,50,20],
              dK: "절망 속에서도 바다를 지켜낸 강철의 방패", dE: "Iron shield protecting the sea in despair",
              jK: "짙은 안개 속에서도 흔들림 없이 전황을 꿰뚫어 본 무패의 명장", jE: "Undefeated Admiral piercing through fog with unwavering focus",
              descK: "당신은 임금의 버림과 모함으로 백의종군하는 수모를 겪고도 조국을 원망하지 않았습니다. 단 12척의 배로 수백 척의 적군에 맞선 절망적인 상황 속에서, 얼음처럼 차가운 결단력과 치밀한 전술로 기적적인 승리를 이끌어낸 불멸의 영웅입니다.",
              descE: "Despite being abandoned by the king, you did not resent your country. Facing hundreds of ships with only 12, you led a miraculous victory with ice-cold decisiveness.",
              hK: "아무도 불가능하다고 말하는 절망 앞에서도, 흔들리지 않는 원칙과 신념으로 공동체를 지켜내는 것입니다.", hE: "Protecting the community with unshakable principles when everyone says it's impossible." },
            { nK: "칭기즈칸", nE: "Genghis Khan", e: 2, r: 1, st: [10,20,10,50,10],
              dK: "세상의 지도를 다시 그린 매서운 기병의 말굽", dE: "Fierce cavalry hooves redrawing the map of the world",
              jK: "낡은 경계를 단칼에 베어버리고 질주한 대륙의 지배자", jE: "Ruler of the continent slashing old borders and galloping",
              descK: "당신은 배신과 죽음의 위기가 도사리는 초원의 밑바닥에서 시작해, 부족들을 규합하고 강철 같은 기병대를 조련했습니다. 지연과 학연을 타파하고 오직 실력으로만 인재를 기용하는 파격적인 룰을 세워 세계 역사상 가장 거대한 제국을 건설했습니다.",
              descE: "Starting from the bottom of the steppe, you united tribes. Breaking nepotism and hiring purely on merit, you built the largest empire in world history with iron cavalry.",
              hK: "낡은 제약과 한계를 단칼에 베어버리고, 압도적인 스케일과 실력으로 당신의 세계를 확장하는 것입니다.", hE: "Slashing old limits and expanding your world with overwhelming scale and pure skill." },
            { nK: "율리우스 카이사르", nE: "Julius Caesar", e: 0, r: 3, st: [20,20,10,40,10],
              dK: "주사위는 던져졌다, 거침없이 루비콘강을 건넌 자", dE: "The die is cast, the one who relentlessly crossed the Rubicon",
              jK: "모든 기득권을 파괴하고 로마의 기틀을 새로 짠 독재관", jE: "Dictator who destroyed vested interests to rebuild Rome",
              descK: "당신은 부패한 원로원의 귀족 통치에 반기를 들고, 목숨을 건 단호한 결단으로 루비콘 강을 건넜습니다. 탁월한 정치적 쇼맨십과 번개 같은 군사 전술로 낡은 로마 공화정을 무너뜨리고, 거대한 로마 제국의 굳건한 토대를 칼날로 직접 세웠습니다.",
              descE: "Rebelling against a corrupt senate, you crossed the Rubicon. With political showmanship and lightning tactics, you dismantled the old republic to build the Roman Empire.",
              hK: "주저해야 할 때와 결단해야 할 때를 정확히 분별하여, 결정적인 순간에 모든 것을 거는 승부사를 띄우는 것입니다.", hE: "Distinguishing when to hesitate and when to decide, betting everything at the crucial moment." },
            { nK: "나폴레옹", nE: "Napoleon Bonaparte", e: 6, r: 5, st: [10,30,10,40,10],
              dK: "내 사전에 불가능은 없다는 예리한 포병장교", dE: "Sharp artillery officer with 'impossible' not in his dictionary",
              jK: "치밀한 포병 전술로 유럽의 구질서를 산산조각 낸 전쟁의 천재", jE: "War genius shattering Europe's old order with artillery tactics",
              descK: "당신은 코르시카 촌뜨기라는 비웃음을 이겨내고, 천재적인 수학적 두뇌와 대포의 탄도학을 융합하여 전장의 규칙을 재창조했습니다. 불가능이라는 단어를 혐오하며 알프스를 넘어 전 유럽의 낡은 왕정들을 굴복시킨 철혈의 정복자였습니다.",
              descE: "Overcoming mockery, you merged a mathematical brain with ballistics to rewrite war rules. Hating the word 'impossible,' you brought Europe's old monarchies to their knees.",
              hK: "불가능이라는 나약한 변명을 거부하고, 정밀하고 날카로운 전략으로 목표를 완전히 장악하는 것입니다.", hE: "Refusing the weak excuse of impossibility and completely dominating the goal with precise strategy." },
            { nK: "진시황", nE: "Qin Shi Huang", e: 0, r: 1, st: [10,10,20,50,10],
              dK: "분열된 대륙을 하나의 칼날로 통일한 철혈 군주", dE: "Iron-blooded monarch uniting a divided continent with one blade",
              jK: "도량형과 문자를 통일하여 거대한 제국의 규격을 맞춘 최초의 황제", jE: "The First Emperor who set imperial standards by unifying weights and measures",
              descK: "당신은 수백 년간 갈기갈기 찢겨 피 흘리던 중국 대륙을 강력한 법가 사상과 철권통치로 단숨에 집어삼켰습니다. 무자비한 철혈 통치자였으나, 문자와 수레바퀴, 도량형을 하나로 통일하여 제국이 천 년간 유지될 수 있는 단단한 기틀을 찍어냈습니다.",
              descE: "You swallowed a bleeding, divided China with strong legalism and an iron fist. Though ruthless, you unified characters and measurements, molding a foundation that lasted millennia.",
              hK: "어지러운 환경을 하나의 확고하고 단호한 원칙 아래 완벽하게 규격화하고 정리 정돈하는 것입니다.", hE: "Perfectly standardizing and organizing a chaotic environment under one firm, resolute principle." },
            { nK: "오토 폰 비스마르크", nE: "Bismarck", e: 7, r: 7, st: [10,10,20,50,10],
              dK: "철과 피의 원칙으로 제국을 벼려낸 차가운 망치", dE: "Cold hammer forging an empire with iron and blood principles",
              jK: "감정을 배제한 치밀한 외교와 군사력으로 독일을 통일한 재상", jE: "Chancellor unifying Germany with emotionless diplomacy and military",
              descK: "당신은 낭만적인 연설이나 다수결이 아니라, 오직 막강한 군사력(철)과 전쟁(피)만이 시대의 문제를 해결할 수 있다고 믿었습니다. 얼음장같이 냉혹하고 현실적인 외교 체스판을 굴리며 주변국들을 고립시키고, 흩어진 독일 연방을 강력한 통일 국가로 벼려냈습니다.",
              descE: "Believing only military might (iron) and war (blood) resolve issues, you played a cold, realistic diplomatic chess game, isolating rivals to forge a unified Germany.",
              hK: "감성적인 이상에 취하지 않고, 지극히 현실적이고 차가운 논리로 당신의 목적을 달성하는 것입니다.", hE: "Achieving your goal with extremely realistic and cold logic, without getting drunk on emotional ideals." },
            { nK: "안중근", nE: "Ahn Jung-geun", e: 8, r: 0, st: [10,30,10,50,0],
              dK: "조국을 위해 하얼빈에 울려 퍼진 단호한 총성", dE: "Resolute gunshot ringing in Harbin for the fatherland",
              jK: "두려움 없이 적의 심장을 겨누고 대의를 위해 목숨을 던진 독립운동가", jE: "Independence activist aiming at the enemy's heart fearlessly",
              descK: "당신은 빼앗긴 조국의 참상을 목도하고, 침묵하거나 타협하는 대신 스스로 총을 들고 적의 심장부인 하얼빈으로 향했습니다. 서릿발 같은 결단력으로 방아쇠를 당긴 후에도 죽음 앞에서도 당당히 일제의 불법성을 고발한, 얼음처럼 차갑고도 불꽃처럼 뜨거운 영웅입니다.",
              descE: "Witnessing your ruined homeland, you took up a gun instead of compromising. Even after pulling the trigger, you boldly condemned Japanese illegality facing death.",
              hK: "사사로운 안위를 버리고, 오직 올바른 대의와 정의를 위해 단호하게 방아쇠를 당기는 용기를 내는 것입니다.", hE: "Discarding personal safety and showing the courage to resolutely pull the trigger for a greater cause." },
            { nK: "엘리자베스 1세", nE: "Elizabeth I", e: 4, r: 6, st: [10,20,20,40,10],
              dK: "국가와 결혼한 위엄 있고 냉철한 철의 여인", dE: "Dignified, cold-hearted iron lady married to her nation",
              jK: "종교적 감정을 배제하고 냉철한 실리로 무적함대를 수장시킨 강력한 여왕", jE: "Powerful queen sinking the Armada with pragmatic diplomacy",
              descK: "당신은 사형대에 오를 뻔한 수많은 위기를 견뎌내고 잉글랜드의 왕관을 썼습니다. 치명적인 종교 갈등과 외세의 위협 속에서도 절대 감정에 휘둘리지 않았으며, 철저한 실리 외교와 단호한 해전 전술로 무적함대 스페인을 격파하고 대영제국의 기틀을 세웠습니다.",
              descE: "Surviving near-executions, you took the crown. Amidst religious conflict and foreign threats, you relied purely on pragmatic diplomacy, defeating the Spanish Armada.",
              hK: "개인적인 감정과 충동에 휘둘리지 않고, 냉철한 잣대로 조직의 실리와 이익을 쟁취하는 것입니다.", hE: "Securing the organization's practical interests with a cold yardstick, unswayed by emotion." },
            { nK: "살라딘", nE: "Saladin", e: 2, r: 2, st: [10,20,10,40,20],
              dK: "적의 심장마저 매료시킨 고결하고 엄격한 명예", dE: "Noble, strict honor that charmed even the enemy's heart",
              jK: "피바람 속에서도 철저한 규율과 관용을 지켜낸 기사도의 술탄", jE: "Sultan maintaining strict discipline and tolerance in a bloodbath",
              descK: "당신은 십자군과의 치열한 종교 전쟁 속에서도 무의미한 학살을 금지하고 포로들을 자비롭게 대우했습니다. 칼날을 부딪치는 적국의 왕조차 당신의 고결한 명예와 전술적 완벽함에 경의를 표했으며, 예루살렘을 무력이 아닌 품격으로 탈환한 진정한 군주였습니다.",
              descE: "Amidst the Crusades, you forbade senseless slaughter. Even enemy kings respected your noble honor and tactical perfection, reclaiming Jerusalem with dignity.",
              hK: "치열하게 경쟁자와 싸우더라도, 철저한 나만의 룰과 명예를 지키며 품격 있게 승리하는 것입니다.", hE: "Winning with dignity while keeping strict rules and honor, even when fiercely fighting competitors." },
            { nK: "윌리엄 월리스", nE: "William Wallace", e: 2, r: 6, st: [10,40,10,40,0],
              dK: "목이 잘려도 부러지지 않은 스코틀랜드의 긍지", dE: "Scottish pride unbroken even upon decapitation",
              jK: "절대적인 폭력에 맞서 처절하게 자유를 외친 독립의 투사", jE: "Fighter shouting for freedom against absolute violence",
              descK: "당신은 잉글랜드의 가혹한 폭정에 시달리는 스코틀랜드 민중을 이끌고 결연히 봉기했습니다. 압도적인 군사력의 차이 앞에서도 굴복하지 않고 끝까지 큰 칼을 휘둘렀으며, 처형장의 형틀 위에서도 자비를 구하는 대신 '자유'를 외친 꺾이지 않는 칼날이었습니다.",
              descE: "You led a resolute uprising against English tyranny. Refusing to yield to overwhelming odds, you shouted 'Freedom' on the execution block, an unbreakable blade.",
              hK: "나를 억압하려는 모든 부당한 권위와 권력에 맞서, 스스로의 자립과 독립성을 당당히 지켜내는 것입니다.", hE: "Defending your independence against all unjust authorities and powers trying to oppress you." },
            { nK: "도쿠가와 이에야스", nE: "Tokugawa Ieyasu", e: 4, r: 1, st: [10,10,30,40,10],
              dK: "새가 울 때까지 묵묵히 칼을 갈던 차가운 인내", dE: "Cold patience silently sharpening the blade until the bird sings",
              jK: "온갖 굴욕을 참아내고 마침내 천하를 거머쥔 인내의 승부사", jE: "Master of patience who endured humiliation to finally win the realm",
              descK: "당신은 힘이 없을 때는 철저하게 몸을 낮추고, 처자식을 잃는 굴욕 속에서도 감정을 억누르며 때를 기다렸습니다. 화려하게 나서다 쓰러진 영웅들을 뒤로하고, 치밀한 계획과 살이 에이는 인내심으로 끝끝내 살아남아 일본을 통일한 최후의 승리자였습니다.",
              descE: "When weak, you lay low, suppressing emotions even when losing family. Outlasting flashy heroes, you survived through meticulous planning and piercing patience to unify Japan.",
              hK: "섣불리 움직이지 않고, 완벽한 타이밍이 올 때까지 치밀하게 실력을 기르며 버티고 인내하는 것입니다.", hE: "Enduring and building skills meticulously until the perfect timing arrives, without moving rashly." },
            { nK: "함무라비", nE: "Hammurabi", e: 0, r: 2, st: [10,10,30,40,10],
              dK: "눈에는 눈, 가장 명확하고 단호한 정의의 검", dE: "Eye for an eye, the most clear and resolute sword of justice",
              jK: "성문법을 제정하여 제국의 기강을 칼같이 바로잡은 편찬자", jE: "Compiler who strictly restored imperial discipline via written laws",
              descK: "당신은 힘과 폭력이 난무하던 고대 메소포타미아에 '눈에는 눈, 이에는 이'라는 서릿발 같은 성문법을 거대한 비석에 새겨 반포했습니다. 모호한 타협을 배제하고 강자로부터 약자를 보호하는 가장 원초적이고 확실한 법치주의의 기틀을 확립한 통치자입니다.",
              descE: "In violent ancient Mesopotamia, you carved the strict 'eye for an eye' code onto a stela. You established the most primal foundation of the rule of law to protect the weak.",
              hK: "모호한 감정적 타협 대신, 명확한 규칙과 원칙을 세워 공정하고 단호한 심판자가 되는 것입니다.", hE: "Becoming a fair and resolute judge by setting clear rules instead of ambiguous emotional compromises." },
            { nK: "광개토대왕", nE: "Gwanggaeto", e: 1, r: 0, st: [20,30,10,40,0],
              dK: "대륙을 베고 달린 고구려 철갑기병의 칼날", dE: "Blade of Goguryeo iron cavalry slashing through the continent",
              jK: "거침없는 기동력으로 한반도 역사상 최대 영토를 개척한 대정복자", jE: "Great conqueror expanding the largest territory with relentless mobility",
              descK: "당신은 어린 나이에 왕위에 올라 쉴 새 없이 말에 채찍을 가하며 북으로, 남으로 영토를 확장했습니다. 적이 방심한 틈을 파고드는 과감한 전술과 철갑기병의 압도적인 파괴력으로, 그 누구도 막을 수 없는 강철 같은 제국의 위상을 대륙에 새겼습니다.",
              descE: "Ascending the throne young, you expanded territory relentlessly. With bold tactics and the destructive power of iron cavalry, you carved the status of an unstoppable empire.",
              hK: "현실의 벽과 한계 앞에서 머뭇거리지 않고, 당신의 잠재력을 무한히 펼치며 거침없이 돌파하는 것입니다.", hE: "Breaking limits without hesitation and relentlessly unleashing your infinite potential." },
            { nK: "사자심왕 리처드", nE: "Richard the Lionheart", e: 2, r: 6, st: [10,30,10,40,10],
              dK: "가장 앞장서서 적진을 뚫어낸 사자의 심장", dE: "Lion's heart piercing the enemy lines from the very front",
              jK: "정치보다 전투를 사랑하며 솔선수범한 전장의 화신", jE: "Incarnation of battle who loved war over politics and led by example",
              descK: "당신은 안전한 후방에서 명령만 내리는 군주가 아니라, 거대한 전투 도끼를 쥐고 병사들보다 먼저 적진을 향해 돌격하는 진짜 전사였습니다. 압도적인 무력과 사자처럼 맹렬한 용기로 적국마저 두려워하게 만든 중세 기사도의 살아있는 전설이었습니다.",
              descE: "Not a monarch safely giving orders, you charged into enemy lines with a battle axe. With overwhelming force and lion-like courage, you became a living legend of chivalry.",
              hK: "안전한 뒤에 숨어 말만 앞세우지 않고, 가장 먼저 행동으로 앞장서서 위기를 돌파하는 기개를 보이는 것입니다.", hE: "Showing the spirit to break through crises by leading with action instead of hiding safely behind words." }
        ],
        "수(水)": [
            { nK: "크리스토퍼 콜럼버스", nE: "Columbus", e: 3, r: 7, st: [20,10,10,10,50],
              dK: "거친 파도를 두려워하지 않고 수평선을 넘은 항해", dE: "Voyage beyond the horizon without fearing the rough waves",
              jK: "낡은 지도의 끝에서 미지의 신대륙을 상상한 탐험가", jE: "Explorer imagining a new world at the end of old maps",
              descK: "당신은 모든 사람이 바다의 끝은 낭떠러지라 믿던 시대에, 지구가 둥글다는 믿음 하나로 죽음의 바다로 배를 돌렸습니다. 끊임없는 반란과 절망의 파도를 유연한 카리스마로 잠재우며, 인류의 시야를 송두리째 넓힌 대항해시대를 열어젖혔습니다.",
              descE: "When everyone believed the sea ended in a cliff, you sailed into deadly waters believing the Earth was round. Calming mutiny with flexible charisma, you opened the Age of Discovery.",
              hK: "모두가 머무는 익숙하고 안전한 육지를 떠나, 미지의 바다로 과감히 뛰어드는 모험심을 발휘하는 것입니다.", hE: "Exercising the adventurous spirit to leap into unknown seas, leaving the familiar and safe land." },
            { nK: "페르디난드 마젤란", nE: "Magellan", e: 4, r: 7, st: [10,20,10,10,50],
              dK: "바다의 끝은 절벽이 아님을 증명한 끝없는 여정", dE: "Endless journey proving the sea's end is not a cliff",
              jK: "수평선 너머 둥근 지구의 진실을 온몸으로 증명한 항해사", jE: "Navigator physically proving the round Earth beyond the horizon",
              descK: "당신은 끝을 알 수 없는 캄캄한 대양 한가운데서 굶주림과 괴혈병, 선원들의 폭동이라는 지옥을 견뎌냈습니다. 비록 당신의 육신은 항해 도중 쓰러졌으나, 물길을 따라 계속 전진한 당신의 신념은 인류 최초의 세계 일주라는 거대한 원을 완성해 냈습니다.",
              descE: "You endured starvation, scurvy, and mutiny in the middle of a dark ocean. Though you fell during the voyage, your conviction completed humanity's first circumnavigation.",
              hK: "끝을 알 수 없고 앞이 보이지 않는 길이라도, 멈추지 않고 흘러가 결국 거대한 진리를 증명하는 것입니다.", hE: "Flowing endlessly to prove a great truth, even on an unknown and unseen path." },
            { nK: "알베르트 아인슈타인", nE: "A. Einstein", e: 8, r: 7, st: [20,10,10,20,40],
              dK: "시간과 공간마저 유연하게 구부린 심연의 통찰", dE: "Abyssal insight flexibly bending even time and space",
              jK: "고정관념을 깬 유연한 사고 실험으로 우주를 해독한 물리학자", jE: "Physicist decoding the universe with flexible thought experiments",
              descK: "당신은 굳어진 과학의 공식에 얽매이는 것을 거부하고, 빛을 타고 날아가는 상상이라는 바다에서 자유롭게 헤엄쳤습니다. 절대적이라 믿었던 시간과 공간마저 관찰자에 따라 구부러지고 휘어질 수 있다는 상대성의 진리를 깨달은 세기의 천재였습니다.",
              descE: "Refusing to be bound by rigid formulas, you swam in the ocean of imagination. You realized the truth of relativity, showing that even absolute time and space can bend.",
              hK: "기존의 딱딱한 관습과 공식을 과감히 버리고, 상상력이라는 무한한 바다에서 자유롭게 사고하는 것입니다.", hE: "Discarding rigid customs and formulas, and thinking freely in the infinite ocean of imagination." },
            { nK: "아이작 뉴턴", nE: "Isaac Newton", e: 5, r: 6, st: [10,10,20,20,40],
              dK: "떨어지는 사과 속에서 만물을 잇는 중력을 건져내다", dE: "Fishing out gravity connecting all things from a falling apple",
              jK: "고요한 사색 속에서 숨겨진 우주의 원리를 탐구한 과학 혁명의 거장", jE: "Master exploring hidden cosmic principles in quiet reflection",
              descK: "당신은 흑사병을 피해 은둔했던 시골 마을의 깊은 정적 속에서, 떨어지는 사과 하나를 보며 지구와 달을 끌어당기는 거대한 힘의 본질을 깨달았습니다. 누구도 보지 못했던 사물의 이면에 숨겨진 법칙을 수학이라는 유려한 언어로 엮어낸 지성입니다.",
              descE: "In deep rural silence avoiding the plague, you saw a falling apple and realized the essence of gravity. You wove the hidden laws of nature into the elegant language of mathematics.",
              hK: "눈에 보이는 표면적인 현상이 아닌, 보이지 않는 이면의 원리를 끝없이 탐구하는 지적 갈망을 채우는 것입니다.", hE: "Fulfilling intellectual thirst by endlessly exploring unseen principles behind surface phenomena." },
            { nK: "지그문트 프로이트", nE: "S. Freud", e: 7, r: 7, st: [10,10,20,10,50],
              dK: "보이지 않는 인간 마음속 어두운 심연의 해부자", dE: "Anatomist of the dark abyss inside the invisible human mind",
              jK: "억압된 무의식의 흐름을 분석하여 정신의 지도를 그린 탐험가", jE: "Explorer mapping the mind by analyzing repressed unconsciousness",
              descK: "당신은 이성이라는 단단한 껍질 속에 감춰진, 꿈과 욕망이 요동치는 인간의 깊고 어두운 무의식의 바다로 거침없이 잠수했습니다. 금기시되던 인간 본성의 민낯을 낱낱이 해부하며 인류가 스스로의 영혼을 이해하는 새로운 창을 열어젖혔습니다.",
              descE: "You dove boldly into the deep, dark ocean of human unconsciousness hidden beneath reason. By dissecting taboo human nature, you opened a new window to understanding the soul.",
              hK: "타인의 숨겨진 욕망과 내면의 그림자를 두려움 없이 직시하고, 그것을 유연하게 치유하는 것입니다.", hE: "Facing hidden desires and inner shadows without fear, and flexibly healing them." },
            { nK: "칼 융", nE: "Carl Jung", e: 8, r: 7, st: [10,10,30,10,40],
              dK: "인류 집단 무의식의 거대한 바다를 헤엄친 현자", dE: "Sage swimming in the vast ocean of collective unconsciousness",
              jK: "꿈과 상징을 통해 영혼의 보편적 뿌리를 파헤친 분석심리학자", jE: "Psychologist digging roots of the soul through dreams and symbols",
              descK: "당신은 개인의 상처를 넘어 전 인류가 공유하는 '집단 무의식'이라는 거대한 지식의 대양을 발견했습니다. 신화와 연금술, 동양 철학 등 세상의 온갖 상징들을 물처럼 유연하게 흡수하여 인간 내면의 빛과 그림자를 완벽히 통합하려 했던 구도자였습니다.",
              descE: "You discovered the vast ocean of 'collective unconscious' shared by all humanity. Absorbing myths and eastern philosophy, you sought to integrate the light and shadow within the mind.",
              hK: "당신 안에 있는 무한한 우주와 상징의 세계를 탐구하며, 분열된 내면을 지혜롭게 통합하는 것입니다.", hE: "Integrating a divided inner self wisely by exploring your infinite universe and the world of symbols." },
            { nK: "클레오파트라", nE: "Cleopatra", e: 0, r: 10, st: [10,20,10,20,40],
              dK: "물결처럼 유연하고 치명적인 외교의 여왕", dE: "Queen of diplomacy, flexible and fatal like a wave",
              jK: "거대한 로마 제국의 권력자들을 매혹시킨 천재적인 전략가", jE: "Genius strategist who fascinated the powerful men of the Roman Empire",
              descK: "당신은 군사력으로 밀어붙이는 거대 로마 제국 앞에서도 결코 무력하게 굴복하지 않았습니다. 아홉 개 국어를 구사하는 명석한 두뇌와 사람을 꿰뚫어 보는 치명적인 매력으로 적의 심장부로 부드럽게 스며들어, 이집트의 위태로운 생명력을 지켜냈습니다.",
              descE: "Facing the Roman Empire, you did not yield helplessly. With a brilliant mind speaking nine languages and fatal charm, you smoothly permeated the enemy's heart to protect Egypt.",
              hK: "강직하게 부딪혀 부러지기보다, 부드럽게 스며들어 상대를 내 편으로 만들어버리는 지략을 쓰는 것입니다.", hE: "Using strategy to softly permeate and win over opponents rather than clashing rigidly." },
            { nK: "노자", nE: "Laozi", e: 0, r: 1, st: [20,10,20,0,50],
              dK: "최고의 선은 물과 같다(상선약수)를 설파한 은둔자", dE: "Hermit preaching 'Highest good is like water'",
              jK: "억지로 다투지 않고 순리대로 흐르는 도(道)를 깨달은 철학자", jE: "Philosopher realizing the Tao that flows naturally without strife",
              descK: "당신은 권력을 탐하고 부귀를 다투는 춘추전국시대의 어리석음을 등지고 묵묵히 소를 타고 떠났습니다. 막히면 돌아가고 낮은 곳으로 임하는 물의 성질이야말로 세상에서 가장 강한 힘이라는 무위자연의 진리를 통해, 인류에게 최고의 깨달음을 전했습니다.",
              descE: "Leaving behind the foolishness of a warring era, you taught that water's nature—flowing around obstacles and seeking low places—is the strongest force, preaching 'non-action'.",
              hK: "모든 것을 내 뜻대로 통제하려는 욕망을 버리고, 삶의 자연스러운 흐름에 온전히 몸을 맡기는 것입니다.", hE: "Entrusting yourself fully to life's natural flow, abandoning the desire to control everything." },
            { nK: "제갈량", nE: "Zhuge Liang", e: 1, r: 1, st: [20,20,10,10,40],
              dK: "안개와 바람마저 자신의 무기로 다루던 천재", dE: "Genius who handled even fog and wind as his weapons",
              jK: "물의 흐름처럼 변화무쌍한 전술로 열세를 뒤집은 신출귀몰한 지략가", jE: "Brilliant strategist turning the tide with ever-changing tactics",
              descK: "당신은 불리한 전력 속에서도 결코 힘으로 부딪치지 않고, 천문과 지리, 사람의 심리를 꿰뚫어 보는 지략을 펼쳤습니다. 적벽의 화염을 일으키기 위해 동남풍을 부르고 짙은 안개를 이용해 화살을 얻어내며, 지혜만으로 거대한 판도를 완벽하게 뒤집어버렸습니다.",
              descE: "Despite weak forces, you never relied on brute strength. You read astronomy, geography, and psychology to command the winds and fog, flipping the massive board with wisdom alone.",
              hK: "단순한 힘으로 부딪히기보다, 한 발 물러서서 상황 전체의 흐름을 읽고 판을 조종하는 지혜를 내는 것입니다.", hE: "Reading the overall flow and manipulating the board with wisdom, rather than clashing with brute force." },
            { nK: "장보고", nE: "Jang Bogo", e: 1, r: 0, st: [10,20,10,20,40],
              dK: "거친 동아시아의 물길을 하나로 이은 바다의 제왕", dE: "Emperor of the sea uniting rough East Asian water routes",
              jK: "탁월한 해상 지식으로 한중일 무역 네트워크를 장악한 해상왕", jE: "King of the Sea dominating trade networks with maritime knowledge",
              descK: "당신은 천민의 신분으로 태어났으나 바다라는 무한한 가능성 속으로 기꺼이 몸을 던졌습니다. 해적들을 소탕하여 뱃길의 안전을 확보하고, 동아시아의 인적 물적 자원이 거침없이 교류할 수 있는 거대한 해상 제국의 허브를 완벽하게 구축한 선구자였습니다.",
              descE: "Born a commoner, you threw yourself into the infinite possibilities of the sea. By clearing pirates, you built a massive maritime hub for unhindered exchange in East Asia.",
              hK: "고립되고 단절된 사람과 물자들을 유연하게 스며들어 서로 연결해 주는 글로벌 허브 역할을 해내는 것입니다.", hE: "Acting as a global hub that flexibly permeates and connects isolated people and resources." },
            { nK: "찰스 다윈", nE: "Charles Darwin", e: 7, r: 6, st: [20,10,20,10,40],
              dK: "바다 건너 갈라파고스에서 생명의 기원을 엿보다", dE: "Glimpsing the origin of life from the Galapagos across the sea",
              jK: "생명체가 환경에 적응하며 흐르듯 진화한다는 진리를 꿰뚫어 본 아버지", jE: "Father observing that life evolves adaptively like water",
              descK: "당신은 비글호를 타고 전 세계의 거친 대양을 항해하며, 아무도 주목하지 않던 작은 새의 부리와 거북의 등딱지에서 거대한 생명의 비밀을 엿보았습니다. 고정불변이라 믿었던 생명체들이 환경이라는 그릇에 맞춰 물처럼 형태를 바꾸며 진화한다는 것을 증명했습니다.",
              descE: "Sailing rough oceans, you saw the grand secret of life in tiny bird beaks. You proved that life forms change shape and evolve like water adapting to their environment.",
              hK: "빠르게 변화하는 환경을 두려워하지 않고, 물이나 카멜레온처럼 유연하게 변화하며 적응하는 것입니다.", hE: "Adapting flexibly like water or a chameleon, without fearing a rapidly changing environment." },
            { nK: "갈릴레오 갈릴레이", nE: "Galileo Galilei", e: 4, r: 4, st: [10,10,20,20,40],
              dK: "어둠 속 깊은 심연인 우주를 향해 망원경을 돌리다", dE: "Turning the telescope toward the deep abyss of the universe",
              jK: "종교적 탄압 속에서도 객관적 사실의 물결을 지켜낸 관측천문학자", jE: "Astronomer protecting objective facts against religious oppression",
              descK: "당신은 모두가 맹목적인 교리에 갇혀 하늘이 지구를 돈다고 믿을 때, 스스로 만든 망원경으로 우주의 깊은 심연을 들여다보며 지구의 공전을 확인했습니다. 이단의 낙인과 가택 연금이라는 탄압 속에서도 '그래도 지구는 돈다'며 진실의 흐름을 지켜냈습니다.",
              descE: "When all believed the sky revolved around Earth, you looked into the abyss of space. Despite being branded a heretic, you protected the truth, muttering 'And yet it moves.'",
              hK: "세상이 맹신하는 권위에 굴복하지 않고, 스스로 관찰하고 발견한 객관적 진실을 끝까지 탐구하는 것입니다.", hE: "Endlessly exploring the objective truths you have observed without yielding to blind authority." },
            { nK: "벤자민 프랭클린", nE: "Benjamin Franklin", e: 6, r: 9, st: [20,10,20,10,40],
              dK: "그릇의 모양에 따라 자유롭게 형태를 바꾸는 지성", dE: "Intellect changing shape freely according to the vessel",
              jK: "과학과 정치, 외교를 물 흐르듯 넘나들며 국가에 헌신한 다재다능한 융합가", jE: "Versatile innovator flowing through science, politics, and diplomacy",
              descK: "당신은 피뢰침을 발명한 번뜩이는 과학자이자, 인쇄업자, 정치가, 외교관 등 한계 없이 자신의 그릇을 바꾸며 활약했습니다. 특유의 유머 감각과 스펀지 같은 유연한 사교력으로 콧대 높은 프랑스 왕실의 마음을 얻어내며, 미국 독립의 거대한 물꼬를 텄습니다.",
              descE: "You changed your vessel limitlessly as a scientist, printer, politician, and diplomat. With flexible sociability, you won over the French court, opening the path for US independence.",
              hK: "자신의 재능에 어떠한 한계도 규정하지 않고, 수많은 분야를 유연하게 횡단하며 방대한 지식을 엮는 것입니다.", hE: "Weaving vast knowledge by flexibly traversing many fields, without defining limits to your talent." },
            { nK: "헬렌 켈러", nE: "Helen Keller", e: 8, r: 9, st: [30,10,20,0,40],
              dK: "소리도 빛도 없는 적막의 심해에서 진주를 캐내다", dE: "Mining pearls in the silent deep sea with no sound or light",
              jK: "손끝에 닿은 차가운 물의 감각으로 세상과 소통하는 기적을 연 개척자", jE: "Pioneer opening communication through the touch of cold water",
              descK: "당신은 보이지 않고 들리지 않는 캄캄하고 끔찍한 심해의 침묵 속에서 유년기를 보냈습니다. 그러나 손끝에 흐르는 차가운 '물(Water)'의 감각을 통해 언어의 경이로움을 깨달았고, 그 깊은 어둠 속에서 건져 올린 지혜로 전 세계 장애인들에게 희망의 빛이 되었습니다.",
              descE: "Trapped in the dark silence of a lightless, soundless abyss, you grasped language through the feeling of running water. The wisdom you drew from the dark became a beacon of hope.",
              hK: "절대적인 절망과 한계 속에서도 내면 깊은 곳의 빛과 지혜를 길어 올려 세상과 연결되는 것입니다.", hE: "Connecting to the world by drawing out deep inner light and wisdom, even in absolute despair." }
        ]
    };

    // 4. 점수에 맞춰 내 기운(signature) 안에서 가장 비슷한 위인 찾기
    const myPool = figurePool[signature];
    let match = myPool[0];
    let minDiff = Infinity;
    
    for (let i = 0; i < myPool.length; i++) {
        let fig = myPool[i];
        let diff = Math.pow(myScores[0]-fig.st[0], 2) + Math.pow(myScores[1]-fig.st[1], 2) + Math.pow(myScores[2]-fig.st[2], 2) + Math.pow(myScores[3]-fig.st[3], 2) + Math.pow(myScores[4]-fig.st[4], 2);
        if (diff < minDiff) { 
            minDiff = diff; 
            match = fig; 
        }
    }

    // 5. 싱크로율 계산 (85.5% ~ 99.9%)
    let distance = Math.sqrt(minDiff);
    let syncRate = Math.max(85.5, 99.9 - distance * 0.3).toFixed(1);

    // 6. 데이터 조립 (위인의 특성에 완벽하게 맞춰진 값만 리턴)
    const eraText = lang === 'ko' ? `${erasKo[match.e]} ${regsKo[match.r]}` : `${erasEn[match.e]} ${regsEn[match.r]}`;
    const elTraitsKo = { "목(木)": "강한 추진력과 생명력", "화(火)": "발산하는 열정과 에너지", "토(土)": "두터운 중용과 응집력", "금(金)": "예리한 결단과 강직함", "수(水)": "심오한 지혜와 유연함" };
    const elTraitsEn = { "목(木)": "vitality", "화(火)": "passion", "토(土)": "balance", "금(金)": "integrity", "수(水)": "wisdom" };
    const elKeyEn = { "목(木)": "Wood", "화(火)": "Fire", "토(土)": "Earth", "금(金)": "Metal", "수(水)": "Water" }[signature];

    if (lang === 'ko') {
        return {
            dest: eraText,
            name: match.nK,
            nameDesc: match.dK,
            job: match.jK, // 🚨 랜덤 수식어 폐기! 오직 위인 맞춤형 수식어+직업
            desc: `운명공학 분석 결과, 당신은 <b>${signature}</b>의 <b>${elTraitsKo[signature]}</b>이 두드러지는 시그니처를 가졌습니다. 이 에너지는 과거 <b>${match.nK}</b>의 영혼 파동과 <b><span style="color:var(--accent);">${syncRate}%</span></b> 일치합니다.<br><br>${match.descK}`, // 🚨 장문의 전생 서사 포함
            homework: match.hK // 🚨 위인별 맞춤 과업
        };
    } else {
        return {
            dest: eraText,
            name: match.nE,
            nameDesc: match.dE,
            job: match.jE,
            desc: `Based on destiny analysis, your signature is <b>${elKeyEn}</b>, characterized by <b>${elTraitsEn[signature]}</b>. This energy resonates at a <b><span style="color:var(--accent);">${syncRate}%</span></b> sync rate with the soul vibration of <b>${match.nE}</b>.<br><br>${match.descE}`,
            homework: match.hE
        };
    }
}

// ============================================================================
// 4. 내세 (Next Life) 예측 엔진 (100종 데이터 + 근미래/먼미래 시간대 분리)
// ============================================================================
function getNextLifeData(num, signature, lang) {
    // 💡 [데이터 확장] 오행별 20개 (0~9번: 근미래 / 10~19번: 먼 미래) -> 총 100개
    const futurePoolKo = {
        "목(木)": [
            // 근미래 (Near Future)
            { role: "수직 농장 마스터", job: "식량 난을 극복하기 위해 거대 도심형 수직 숲을 통제하는 생태학자" },
            { role: "AI-인간 공생 조율사", job: "인공지능과 인류 사이의 윤리적, 감정적 연결고리를 가꾸는 전문가" },
            { role: "유전자 방주 관리인", job: "기후 위기로 사라져가는 지구 생물들의 유전자 씨앗을 보존하는 파수꾼" },
            { role: "탄소 역행 공학자", job: "대기 중의 탄소를 포집하여 생태계의 비료로 치환하는 환경 설계자" },
            { role: "바이오-메디컬 디자이너", job: "세포 재생 기술로 인류의 질병을 근절하고 수명을 연장하는 선구자" },
            { role: "해양 숲 복원가", job: "산성화된 바다 밑바닥에 거대한 산호 숲을 다시 일구는 해양 생물학자" },
            { role: "도시 신경망 플래너", job: "도시 전체의 에너지가 유기체처럼 순환하도록 돕는 인프라 설계자" },
            { role: "에코 돔 건축가", job: "극한의 기후에서도 자생 가능한 친환경 폐쇄형 돔을 건설하는 공학자" },
            { role: "동물 신경 해독가", job: "동물들의 뇌파를 언어로 번역하여 생태계의 요구를 수용하는 연구원" },
            { role: "바이오닉 의수 공학자", job: "인간의 신경과 완벽히 융합되는 생체 인공 기관을 빚어내는 장인" },
            // 먼 미래 (Distant Future)
            { role: "행성 테라포밍 설계자", job: "황무지 행성의 바이오 돔에서 대기와 생태계를 창조하는 조물주" },
            { role: "뉴럴 플랜트 가디언", job: "인간의 뇌파와 거대 식물군을 연결해 행성의 산소를 통제하는 관리자" },
            { role: "가상 현실 정원사", job: "디지털 공간에 업로드된 영혼들이 안식할 수 있는 자연 지대를 구축하는 자" },
            { role: "은하계 씨앗 보관소장", job: "수많은 행성의 생명 코드를 우주선에 싣고 전파하는 최종 보루" },
            { role: "감정 수목 치유사", job: "사람의 슬픔을 양분 삼아 빛나는 꽃을 피우는 치유의 식물을 기르는 힐러" },
            { role: "양자 생태 학자", job: "서로 다른 차원 간의 생태적 균형을 연구하여 다차원 공존을 돕는 학자" },
            { role: "태초의 숲 전령", job: "지구의 고대 기억을 품은 세계수(Tree)를 새로운 개척지로 운반하는 인도자" },
            { role: "라이프 시퀀스 설계자", job: "외계 행성에 새로운 종의 생명체가 태어날 환경을 완벽하게 세팅하는 설계관" },
            { role: "성운 식물 재배자", job: "성간 가스를 흡수하여 우주 공간에서 자라나는 빛의 식물을 가꾸는 이" },
            { role: "코스믹 DNA 직조공", job: "우주 환경에 적응할 수 있도록 인류의 유전자를 진화시키는 생명 공학자" }
        ],
        "화(火)": [
            // 근미래 (Near Future)
            { role: "핵융합 동력 제어관", job: "인공 태양 발전소에서 무한한 청정 에너지를 생산하고 통제하는 기술자" },
            { role: "홀로그램 총괄 디렉터", job: "증강현실로 대중의 감각을 자극하고 트렌드를 지휘하는 미디어 거장" },
            { role: "성층권 셔틀 파일럿", job: "대기권을 돌파하여 궤도 정거장을 잇는 초고속 항공망의 개척자" },
            { role: "디지털 문화 계몽가", job: "사이버 공간에서 잊혀져 가는 인문학적 열정과 영감을 전파하는 교사" },
            { role: "AI 윤리 철학자", job: "통제력을 잃어가는 기술 발전 속에서 인류의 뜨거운 도덕성을 수호하는 자" },
            { role: "플라즈마 무기 통제관", job: "초고열 에너지를 다루며 국가 방위의 최전선을 지키는 안보 책임자" },
            { role: "군집 드론 안무가", job: "수만 대의 드론으로 밤하늘에 찬란한 예술과 메시지를 수놓는 연출가" },
            { role: "태양광 그리드 마스터", job: "전 지구적 궤도 우산망을 통해 태양 에너지를 분배하는 인프라 수장" },
            { role: "뇌-컴퓨터 인터페이스 디자이너", job: "인간의 생각과 기계를 빛의 속도로 연결하는 감각 설계자" },
            { role: "메타버스 아이돌 제작자", job: "가상과 현실을 넘나들며 대중을 열광시키는 새로운 우상을 빚어내는 프로듀서" },
            // 먼 미래 (Distant Future)
            { role: "에너지 주파수 조율사", job: "다차원 문명의 에너지를 하나로 묶어 거대하게 증폭시키는 전도사" },
            { role: "성운 동력 발굴가", job: "초신성이 폭발할 때 생기는 에너지를 문명의 동력으로 바꾸는 주역" },
            { role: "차원간 빛의 전령", job: "서로 다른 은하계에 메시지를 빛의 속도로 전달하는 통신 전문가" },
            { role: "양자 태양 관리관", job: "스스로 빛을 내지 못하는 외곽 행성에 인공 태양을 띄우는 관리자" },
            { role: "감정 데이터 조각가", job: "인간의 강렬한 열정을 시각적인 빛의 예술로 승화시키는 거장" },
            { role: "초고속 항로 설계자", job: "빛의 굴절과 웜홀을 이용해 성간 이동 시간을 단축하는 네비게이터" },
            { role: "정신 가속 최적화원", job: "초인류의 지능과 직관을 한 단계 업그레이드하는 에너지 관리자" },
            { role: "지성 아카이브 수호자", job: "모든 문명의 찬란한 성취를 소멸하지 않는 빛의 입자로 저장하는 기록관" },
            { role: "은하 연합 홍보대사", job: "압도적인 카리스마와 언변으로 행성 간의 문화적 통합을 이끄는 리더" },
            { role: "항성 코어 추출자", job: "죽어가는 별의 중심핵에서 에너지를 추출해 은하를 밝히는 극한의 모험가" }
        ],
        "토(土)": [
            // 근미래 (Near Future)
            { role: "기후 위기 조정관", job: "극단적인 기상 이변 속에서 국가 간의 자원 분쟁을 묵직하게 중재하는 이" },
            { role: "메가시티 인프라 총장", job: "수천만 명이 거주하는 수직 도시의 물리적, 사회적 기반을 닦는 행정가" },
            { role: "소행성 채굴 기지장", job: "지구 궤도 밖에서 희귀 광물을 캐내어 인류의 경제 기반을 지탱하는 리더" },
            { role: "디지털 유산 보존가", job: "서버 손실에 대비하여 인류의 중요 데이터를 영구적인 매체로 보존하는 자" },
            { role: "기본소득 경제 설계자", job: "노동이 사라진 AI 시대에 인류가 공존할 수 있는 경제 토대를 닦는 학자" },
            { role: "달 식민지 행정관", job: "지구를 떠나 달에 세워진 첫 거주지의 질서와 규칙을 확립하는 지도자" },
            { role: "지구 공학 감독관", job: "망가진 지구의 지각과 해류를 인공적으로 조절하여 생존권을 수호하는 자" },
            { role: "분산 금융(DeFi) 통치자", job: "중앙 은행이 무너진 시대에 신뢰 기반의 새로운 화폐 시스템을 구축하는 이" },
            { role: "합성 식량 배급 책임자", job: "토양이 오염된 시대에 대체 식량을 배양하여 인류의 굶주림을 막는 관리자" },
            { role: "사이버네틱스 복지관", job: "기계 신체를 이식받지 못한 소외 계층을 사회 시스템 안으로 포용하는 구원자" },
            // 먼 미래 (Distant Future)
            { role: "화성 기반 인프라 국장", job: "붉은 먼지 행성의 토양을 안정시키고 견고한 거주 구역을 구축하는 총책임자" },
            { role: "시공간 데이터 보관소장", job: "우주의 방대한 역사 정보를 어떠한 공격에도 뚫리지 않게 지켜내는 관리자" },
            { role: "중력 밸런스 조정관", job: "인공 행성의 중력을 조절하여 인류가 살기 가장 좋은 환경으로 빚어내는 이" },
            { role: "차원 통용 화폐 발행자", job: "은하 연합 전체에서 신뢰받는 절대적인 경제 체계를 구축하는 금융 가이드" },
            { role: "우주 연합 법무 장관", job: "흔들리지 않는 원칙으로 행성 간의 얽힌 법적 갈등을 묵묵히 심판하는 자" },
            { role: "행성간 지각 공학자", job: "붕괴되어 가는 행성의 지질을 결합하여 생명의 기틀을 다시 다지는 자" },
            { role: "지구 유적 보존 관리인", job: "먼 우주 시대에 버려진 고대 지구의 유적을 발굴하고 신성하게 보호하는 이" },
            { role: "안전 거주구 설계자", job: "초신성 폭발이나 우주 재난에도 견딜 수 있는 궁극의 쉘터를 만드는 설계관" },
            { role: "다국적 연합 기록관", job: "모든 행성의 역사를 왜곡이나 사견 없이 공정하고 무겁게 기록하는 역사가" },
            { role: "다이슨 스피어 토대 구축자", job: "항성을 둘러싸는 거대 인공 구조물의 뼈대를 설계하고 완성하는 건축가" }
        ],
        "금(金)": [
            // 근미래 (Near Future)
            { role: "사이버 보안 사령관", job: "국가 인프라를 노리는 치명적인 해킹 공격을 방어하고 역추적하는 파수꾼" },
            { role: "자율 살상 무기 심판관", job: "AI 무기의 사용을 통제하고 생명 윤리의 최종 결정권을 쥔 차가운 집행자" },
            { role: "유전자 조작 감찰관", job: "불법적인 신체 개조와 복제 인간 창조를 단호하게 추적하고 처단하는 수사관" },
            { role: "궤도 폐기물 청소부", job: "위험천만한 우주 쓰레기를 요격하여 궤도의 안전을 지키는 정밀 타격수" },
            { role: "심해 자원 채굴 감독관", job: "가장 차갑고 가혹한 압력 속에서 심해의 자원을 캐내는 냉철한 리더" },
            { role: "알고리즘 편향성 판사", job: "세상을 통제하는 AI의 논리적 오류와 차별을 날카롭게 도려내는 법관" },
            { role: "생체 기계 이식 외과의", job: "인간의 신체를 강철 기계로 완벽하고 오차 없이 결합시키는 정밀 전문의" },
            { role: "나노 로봇 통제관", job: "인체에 투입된 수억 개의 나노 로봇을 지휘하여 질병을 암살하는 의학자" },
            { role: "궤도 엘리베이터 공학자", job: "지구와 우주를 잇는 수만 킬로미터의 강철 케이블을 오차 없이 관리하는 이" },
            { role: "기후 협약 집행관", job: "탄소 배출을 어긴 거대 기업과 국가를 무자비하게 제재하는 철혈의 관리자" },
            // 먼 미래 (Distant Future)
            { role: "행성 방어 시스템 사령관", job: "소행성 충돌과 외계의 위협으로부터 문명의 방어막을 지키는 군사 책임자" },
            { role: "사이버 법률 심판관", job: "가상과 현실을 넘나드는 고도의 범죄를 단호하게 처단하는 정의의 화신" },
            { role: "양자 보안 설계자", job: "어떠한 양자 컴퓨터로도 해킹이 불가능한 단단한 정보 보호 체계를 구축하는 기술자" },
            { role: "희귀 광물 탐사대장", job: "우주 깊은 곳에서 함대의 동력이 될 궁극의 금속을 찾아내는 얼음 같은 탐험가" },
            { role: "안드로이드 윤리 감독", job: "기계 지성이 인간을 넘어서지 못하도록 선을 긋고 감찰하는 엄격한 심판관" },
            { role: "차원 게이트 수호자", job: "허가되지 않은 차원 이동을 빔 무기로 차단하고 우주의 경계를 수호하는 파수꾼" },
            { role: "강철 의지 멘토", job: "초인류가 겪는 정신적 나약함을 파괴적일 만큼 강인한 훈련으로 치유하는 리더" },
            { role: "초전도체 소자 제작자", job: "미래 기술의 심장이 되는 절대 영도의 금속 소자를 정밀하게 빚어내는 장인" },
            { role: "우주 함대 감사관", job: "은하 연합의 모든 시스템 규율 준수 여부를 예리하게 파헤치는 무결점 감사 전문가" },
            { role: "결단력 증폭 훈련관", job: "지휘관들이 가장 치명적인 순간에 주저 없이 결단하도록 돕는 신경 시스템 운영자" }
        ],
        "수(水)": [
            // 근미래 (Near Future)
            { role: "빅데이터 오라클", job: "끝없이 쏟아지는 데이터의 바다에서 인류가 나아갈 미래의 패턴을 읽어내는 예언자" },
            { role: "해저 돔 시티 설계자", job: "해수면 상승으로 물에 잠긴 지구에서 인류의 심해 거주지를 구축하는 건축가" },
            { role: "냉동 수면 해방 치료사", job: "긴 냉동 수면에서 깨어난 자들의 시대적 이질감을 물처럼 부드럽게 치유하는 힐러" },
            { role: "AI 알고리즘 철학자", job: "차가운 데이터 속에 인문학적 지혜와 인간의 본질을 융합하는 사상가" },
            { role: "가상 신분 추적자", job: "디지털 바다에 위장된 채 숨어 있는 사이버 범죄자의 흔적을 잠수함처럼 쫓는 요원" },
            { role: "기억 추출 다이버", job: "범죄나 사고로 훼손된 타인의 기억 속으로 깊이 잠수하여 진실을 건져내는 수사관" },
            { role: "디지털 노마드 허브 관리자", job: "국경이 무너진 시대에 전 세계를 떠도는 지식인들을 유연하게 엮어주는 네트워크 리더" },
            { role: "무의식 치료 상담사", job: "복잡한 현대인의 깊은 내면에 잠긴 트라우마를 유연한 언어로 치유하는 멘토" },
            { role: "액체 컴퓨터 공학자", job: "딱딱한 실리콘을 넘어 자유자재로 형태가 변하는 수냉식 양자 컴퓨터를 다루는 천재" },
            { role: "글로벌 수자원 조율사", job: "극심한 가뭄에 시달리는 국가 간의 물 분쟁을 지혜롭게 해결하는 외교관" },
            // 먼 미래 (Distant Future)
            { role: "뉴럴 링크 정화 전문가", job: "오염된 인류의 거대 무의식 네트워크에 스며들어 악성 코드를 맑게 씻어내는 정화자" },
            { role: "딥스페이스 항해사", job: "누구도 가보지 않은 블랙홀 너머의 물길을 심오한 통찰로 찾아내는 선구적 도선사" },
            { role: "정보 파동 분석가", job: "우주 전체에 파도처럼 흩어진 데이터 입자들을 모아 절대적인 지혜를 완성하는 이" },
            { role: "행성간 수자원 공급망 리더", job: "물이 말라버린 척박한 행성에 얼음 소행성을 끌어와 생수를 공급하는 흐름의 관리자" },
            { role: "꿈의 세계 가이드", job: "인류가 동면하는 동안 거대한 무의식의 바다 속에서 안전하게 유영하도록 돕는 자" },
            { role: "투명성 감사 위원", job: "은하 연합의 모든 정보 흐름이 맑고 막힘없이 유지되는지 감시하는 투명성의 수호자" },
            { role: "데이터 복구 고고학자", job: "사라진 고대 우주선의 서버 잔해를 복구하여 우주가 잃어버린 기억을 찾아내는 이" },
            { role: "유연성 사고 교육가", job: "AI의 완벽함에 지친 인류에게 변칙적이고 창의적인 사고방식을 가르치는 스승" },
            { role: "태초의 진리 전파자", job: "우주의 가장 깊은 심연에서 발견한 생명의 근원적 비밀을 지혜로 승화시켜 전하는 자" },
            { role: "다중 우주 패턴 해독가", job: "평행 우주 간에 미세하게 흘러들어오는 정보의 겹침을 분석하여 멸망을 막는 학자" }
        ]
    };

    const futurePoolEn = {
        "목(木)": [
            // Near Future
            { role: "Vertical Farm Master", job: "Ecologist controlling giant urban forests to overcome food shortages" },
            { role: "AI-Human Symbiosis Coordinator", job: "Expert cultivating ethical and emotional links between AI and humanity" },
            { role: "Genetic Ark Guardian", job: "Sentinel preserving genetic seeds of endangered species against climate crises" },
            { role: "Carbon Reverse Engineer", job: "Environmental designer capturing carbon to fertilize the ecosystem" },
            { role: "Bio-medical Designer", job: "Pioneer eradicating disease and extending lifespans through cell regeneration" },
            { role: "Ocean Forest Restorer", job: "Marine biologist rebuilding massive coral forests on acidified ocean floors" },
            { role: "Urban Neural Network Planner", job: "Infrastructure designer helping city energy flow like an organism" },
            { role: "Eco-dome Architect", job: "Engineer building self-sustaining closed domes in extreme climates" },
            { role: "Animal Neural Decoder", job: "Researcher translating animal brainwaves to accommodate ecological needs" },
            { role: "Bionic Prosthetics Engineer", job: "Artisan forging artificial organs that perfectly fuse with human nerves" },
            // Distant Future
            { role: "Planetary Terraforming Architect", job: "Creator establishing atmospheres and ecosystems in bio-domes on barren planets" },
            { role: "Neural Plant Guardian", job: "Manager controlling planetary oxygen by linking brainwaves with giant flora" },
            { role: "Virtual Reality Gardener", job: "Builder of digital nature zones for uploaded souls to find rest" },
            { role: "Galactic Seed Vault Manager", job: "Final bastion loading and spreading life codes of countless planets" },
            { role: "Emotional Arboretum Healer", job: "Healer growing plants that bloom by feeding on human sorrow" },
            { role: "Quantum Ecologist", job: "Scholar aiding cosmic coexistence by studying ecological balance across dimensions" },
            { role: "Messenger of the Primal Forest", job: "Guide transporting the World Tree, holding Earth's ancient memories, to new frontiers" },
            { role: "Life Sequence Designer", job: "Designer perfectly setting environments for new life forms to be born" },
            { role: "Nebula Flora Cultivator", job: "Cultivator growing plants of light that absorb interstellar gas" },
            { role: "Cosmic DNA Weaver", job: "Bio-engineer evolving human genes to adapt to deep space environments" }
        ],
        "화(火)": [
            // Near Future
            { role: "Fusion Energy Controller", job: "Technician producing and controlling limitless clean energy in artificial suns" },
            { role: "Hologram General Director", job: "Media maestro dictating trends and stimulating senses via augmented reality" },
            { role: "Stratospheric Shuttle Pilot", job: "Pioneer of hyper-speed aviation networks connecting orbital stations" },
            { role: "Digital Culture Evangelist", job: "Teacher spreading fading humanities passion and inspiration in cyberspace" },
            { role: "AI Ethics Philosopher", job: "Defender of human morality amidst uncontrollable technological advancement" },
            { role: "Plasma Weapon Controller", job: "Security chief guarding the frontline of national defense with hyper-thermal energy" },
            { role: "Drone Swarm Choreographer", job: "Director painting the night sky with brilliant art using tens of thousands of drones" },
            { role: "Solar Grid Master", job: "Infrastructure head distributing solar energy through global orbital umbrellas" },
            { role: "Brain-Computer Interface Designer", job: "Sensory designer connecting human thought to machines at the speed of light" },
            { role: "Metaverse Idol Producer", job: "Producer forging new idols that thrill the public across virtual and real worlds" },
            // Distant Future
            { role: "Energy Frequency Tuner", job: "Evangelist amplifying and uniting the energies of multi-dimensional civilizations" },
            { role: "Nebula Power Excavator", job: "Key player converting supernova explosion energy into civilizational power" },
            { role: "Inter-dimensional Light Messenger", job: "Communication expert delivering messages across galaxies at light speed" },
            { role: "Quantum Sun Manager", job: "Manager launching artificial suns on outer planets that lack light" },
            { role: "Emotional Data Sculptor", job: "Master sublimating intense human passion into visual light art" },
            { role: "Hyper-speed Route Designer", job: "Navigator shortening interstellar travel using light refraction and wormholes" },
            { role: "Mental Acceleration Optimizer", job: "Energy manager upgrading post-human intelligence and intuition" },
            { role: "Archivist of Intelligence", job: "Recorder storing brilliant achievements of all civilizations as eternal light particles" },
            { role: "Galactic Union Ambassador", job: "Leader guiding planetary cultural integration with overwhelming charisma" },
            { role: "Stellar Core Extractor", job: "Extreme adventurer extracting energy from dying stars to light the galaxy" }
        ],
        "토(土)": [
            // Near Future
            { role: "Climate Crisis Coordinator", job: "Heavyweight mediator of resource disputes between nations amid extreme weather" },
            { role: "Megacity Infrastructure Chief", job: "Administrator laying the physical and social foundation for vertical cities" },
            { role: "Asteroid Mining Base Commander", job: "Leader sustaining Earth's economy by mining rare minerals in orbit" },
            { role: "Digital Heritage Conservator", job: "Preserver of crucial human data on permanent mediums against server loss" },
            { role: "Universal Basic Income Architect", job: "Scholar building an economic foundation for coexistence in a jobless AI era" },
            { role: "Lunar Colony Administrator", job: "Leader establishing order and rules for the first human settlement on the Moon" },
            { role: "Geo-engineering Supervisor", job: "Protector of survival rights by artificially regulating Earth's crust and currents" },
            { role: "DeFi Ruler", job: "Builder of a new trust-based currency system as central banks collapse" },
            { role: "Synthetic Food Distribution Head", job: "Manager preventing famine by culturing alternative food in polluted eras" },
            { role: "Cybernetics Welfare Officer", job: "Savior embracing the marginalized who cannot afford mechanical body implants" },
            // Distant Future
            { role: "Director of Mars Infrastructure", job: "Head official stabilizing the red planet's soil and building solid habitats" },
            { role: "Spacetime Data Vault Manager", job: "Final manager defending the universe's vast historical data from any attack" },
            { role: "Gravity Balance Coordinator", job: "Creator of optimal living environments by adjusting artificial planetary gravity" },
            { role: "Inter-dimensional Currency Issuer", job: "Financial guide building an absolute economic system trusted across the galaxy" },
            { role: "Cosmic Union Attorney General", job: "Judge silently adjudicating tangled inter-planetary legal conflicts with strict principles" },
            { role: "Inter-planetary Geological Engineer", job: "Restorer of life's foundation by combining the geology of collapsing planets" },
            { role: "Earth Relic Preservationist", job: "Guardian who excavates and protects ancient Earth ruins in the distant cosmic era" },
            { role: "Safe Habitation Zone Designer", job: "Designer creating ultimate shelters capable of withstanding supernova explosions" },
            { role: "Multi-national Union Historian", job: "Historian recording the history of all planets fairly and heavily, without bias" },
            { role: "Dyson Sphere Foundation Builder", job: "Architect designing and completing the skeleton of massive structures enclosing stars" }
        ],
        "금(金)": [
            // Near Future
            { role: "Cyber Security Commander", job: "Sentinel defending and tracking fatal hacking attacks aimed at national infrastructure" },
            { role: "Autonomous Weapon Arbiter", job: "Cold executor holding the final authority over AI weapons and bioethics" },
            { role: "Genetic Modification Inspector", job: "Investigator resolutely tracking and punishing illegal body mods and cloning" },
            { role: "Orbital Debris Cleanser", job: "Precision striker protecting orbital safety by intercepting dangerous space junk" },
            { role: "Deep-sea Resource Extractor", job: "Cold-headed leader mining resources under the most severe pressures" },
            { role: "Algorithm Bias Judge", job: "Judge sharply excising the logical errors and discrimination of controlling AIs" },
            { role: "Bionic Transplant Surgeon", job: "Precision specialist flawlessly combining human bodies with steel machinery" },
            { role: "Nano-robotics Controller", job: "Medical scientist assassinating diseases by commanding billions of nano-robots in the body" },
            { role: "Space Elevator Engineer", job: "Manager flawlessly maintaining tens of thousands of kilometers of steel cables to space" },
            { role: "Climate Treaty Enforcer", job: "Iron-blooded manager ruthlessly sanctioning corporations violating carbon emissions" },
            // Distant Future
            { role: "Planetary Defense Commander", job: "Military head guarding civilization's shield against asteroid impacts and alien threats" },
            { role: "Cyber Law Adjudicator", job: "Embodiment of justice resolutely punishing high-level crimes crossing virtual and reality" },
            { role: "Quantum Security Architect", job: "Technician building ironclad info-protection systems unhackable by any quantum computer" },
            { role: "Rare Mineral Scout Leader", job: "Ice-cold explorer finding the ultimate metal to power fleets in deep space" },
            { role: "Android Ethics Supervisor", job: "Strict judge drawing lines and inspecting so machine intelligence doesn't surpass humanity" },
            { role: "Dimensional Gate Guardian", job: "Sentinel blocking unauthorized dimensional travel with beam weapons to guard borders" },
            { role: "Iron Will Mentor", job: "Leader healing post-human mental fragility through destructively intense training" },
            { role: "Superconductor Component Crafter", job: "Artisan precisely forging absolute-zero metal components for future tech" },
            { role: "Space Fleet Auditor", job: "Flawless audit expert keenly digging into compliance across the Galactic Union" },
            { role: "Decision-making Amplifier Trainer", job: "Neural system operator helping commanders decide without hesitation at critical moments" }
        ],
        "수(水)": [
            // Near Future
            { role: "Big Data Oracle", job: "Prophet reading future patterns for humanity in an endless sea of data" },
            { role: "Deep-sea City Architect", job: "Architect building deep-sea habitats for humanity on an Earth submerged by rising sea levels" },
            { role: "Cryogenic Awakening Therapist", job: "Healer smoothly curing the temporal alienation of those waking from long cryogenic sleep" },
            { role: "AI Algorithm Philosopher", job: "Thinker fusing humanities' wisdom and human essence into cold data" },
            { role: "Virtual Identity Tracker", job: "Agent chasing traces of cybercriminals hidden under disguises like a submarine" },
            { role: "Memory Extraction Diver", job: "Investigator diving deep into damaged memories to salvage the truth" },
            { role: "Digital Nomadic Hub Manager", job: "Network leader flexibly connecting wandering intellectuals in a borderless era" },
            { role: "Subconscious Therapy Counselor", job: "Mentor healing the deep traumas of complex modern people with fluent language" },
            { role: "Liquid Computer Engineer", job: "Genius handling shape-shifting, water-cooled quantum computers beyond rigid silicon" },
            { role: "Global Water Grid Coordinator", job: "Diplomat wisely resolving water disputes between nations suffering severe droughts" },
            // Distant Future
            { role: "Neural Link Purification Specialist", job: "Purifier permeating the polluted subconscious network to wash away malicious code" },
            { role: "Deep Space Navigator", job: "Pioneering pilot finding water routes beyond black holes with profound insight" },
            { role: "Information Wave Analyst", job: "One who completes absolute wisdom by gathering data particles scattered like waves" },
            { role: "Inter-planetary Water Supply Leader", job: "Flow manager delivering fresh water to parched planets by towing ice asteroids" },
            { role: "Dreamworld Guide", job: "One who helps humanity swim safely in the giant sea of the subconscious during hibernation" },
            { role: "Transparency Audit Commissioner", job: "Guardian of transparency monitoring that all info flows in the galaxy remain clear" },
            { role: "Data Recovery Archeologist", job: "One finding the universe's lost memories by recovering servers from ancient shipwrecks" },
            { role: "Flexible Thinking Educator", job: "Teacher imparting erratic, creative thinking to humans exhausted by AI's perfection" },
            { role: "Propagator of Primal Truth", job: "One who sublimates and transmits the fundamental secrets of life found at the universe's edge" },
            { role: "Multiverse Pattern Decoder", job: "Scholar preventing extinction by analyzing subtle information overlaps between parallel universes" }
        ]
    };

    // 💡 [과업 확장] 50개의 다양하고 구체적인 미래 시나리오 (0~24: 근미래풍, 25~49: 먼미래풍)
    const missionsKo = [
        "지구의 마지막 종자 은행을 해킹의 위협으로부터 오차 없이 방어하십시오.",
        "수몰 위기에 처한 해안 도시의 시민들을 지하 돔으로 안전하게 이주시키십시오.",
        "인공지능의 윤리적 편향성을 바로잡기 위한 새로운 헌장을 기안하십시오.",
        "달 기지에서 발생한 원인 불명의 자원 유출 사태를 은밀하게 조사하십시오.",
        "기후 난민들을 수용하기 위한 거대한 부유식 해상 도시를 설계하십시오.",
        "인간의 기억을 데이터로 업로드하는 과정에서 발생하는 영혼의 상실을 치료하십시오.",
        "가상 현실 중독에 빠진 세대에게 아날로그적 삶의 가치를 되찾아 주십시오.",
        "기계 신체를 이식받은 신인류와 순수 구인류 사이의 사회적 갈등을 중재하십시오.",
        "오염된 토양을 스스로 정화하는 나노 박테리아의 대규모 살포 작전을 지휘하십시오.",
        "궤도 엘리베이터 건설 현장에서 발생한 파벌 간의 이권 다툼을 조율하십시오.",
        "국가를 대체할 새로운 다국적 메가 코퍼레이션의 공정 거래 룰을 확립하십시오.",
        "합성 식량의 독점 배급망을 뚫고 굶주린 빈민가에 식량을 분배하십시오.",
        "심해 자원 채굴 중 발견된 미지의 고대 생명체를 연구하고 보호하십시오.",
        "뇌파 해킹으로 타인을 조종하려는 신흥 사이버 테러 조직을 붕괴시키십시오.",
        "방치된 우주 쓰레기를 수거하여 거대한 궤도 발전소로 재활용하십시오.",
        "인간의 감정을 통제하려는 불법적인 칩 이식 시술을 적발하고 금지하십시오.",
        "점점 희미해져 가는 인류의 문학적, 예술적 유산을 디지털 아카이브로 구축하십시오.",
        "초고속 성층권 여객기의 항로 이탈 사고를 막을 새로운 네비게이션을 완성하십시오.",
        "수명 연장 기술의 혜택을 받지 못한 소외 계층을 위한 복지 시스템을 마련하십시오.",
        "무분별한 드론 택배망으로 혼란해진 도심 상공의 교통 질서를 바로잡으십시오.",
        "수질 오염으로 끊어진 국가 간의 식수 파이프라인을 외교적 협상으로 다시 이으십시오.",
        "실업자가 된 인류에게 기본 소득과 삶의 목적을 동시에 제공하는 프로젝트를 이끄십시오.",
        "인공 태양의 제어 코드가 폭주하는 것을 막아 도시의 파멸을 막으십시오.",
        "로봇 경찰의 과잉 진압을 통제할 인간 중심의 사법 감시 기구를 출범시키십시오.",
        "변이 바이러스에 대항할 범지구적 백신 생산 네트워크를 단기간에 통합하십시오.",
        // 먼 미래 시나리오
        "항성 에너지를 빨아들이는 다이슨 스피어의 핵심 코어를 무사히 점화하십시오.",
        "서로 다른 차원의 지성체들이 처음으로 만나는 범우주적 평화 회담을 주재하십시오.",
        "소멸을 앞둔 초신성에서 문명을 지탱할 궁극의 에너지를 추출해 탈출하십시오.",
        "은하 연합의 헌법을 위반하고 독자적 제국을 세우려는 반란 행성을 진압하십시오.",
        "인공 지성이 스스로 신(God)이 되려 하는 것을 막을 윤리적 논리 폭탄을 투입하십시오.",
        "블랙홀의 사건의 지평선 근처에서 실종된 탐사 함대의 블랙박스를 회수하십시오.",
        "테라포밍 중인 행성에서 발생한 돌연변이 식물군의 폭주를 친환경적으로 억제하십시오.",
        "웜홀을 통한 항해 중 찢겨진 시공간의 균열을 양자 접착 기술로 봉합하십시오.",
        "육체를 버리고 데이터로 진화하려는 포스트 휴먼 사회의 철학적 부작용을 경고하십시오.",
        "수만 년 전 멸망한 선지자 종족이 우주 끝에 남긴 진리의 도서관을 개방하십시오.",
        "행성 간 무역로를 위협하는 우주 해적 함대를 압도적인 전술로 소탕하십시오.",
        "중력이 붕괴되어 가는 광산 행성의 노동자들을 타임 리미트 내에 구출하십시오.",
        "태양빛이 닿지 않는 얼음 행성의 심해층에 지열을 이용한 거주 돔을 건설하십시오.",
        "은하계 전역으로 퍼져나가는 치명적인 정신 오염 주파수를 차단하고 정화하십시오.",
        "평행 우주에서 넘어온 도플갱어 범죄자들을 식별하여 차원 밖으로 추방하십시오.",
        "별과 별 사이를 잇는 고차원 텔레파시 네트워크의 데이터 병목 현상을 해결하십시오.",
        "복제 육체로 영생을 누리는 권력자들의 윤리적 타락을 저지할 시스템을 만드십시오.",
        "우주의 근원적인 소리를 해독하여 은하계의 기후 변동을 미리 예측하십시오.",
        "행성의 토착 원시 종족을 착취하려는 거대 자본 함대의 만행을 고발하고 방어하십시오.",
        "수명이 다한 인공 행성을 안전한 구역으로 견인하여 대규모 충돌을 방지하십시오.",
        "에테르 차원에서 흘러나오는 미지의 마력 에너지를 과학적 체계로 흡수하십시오.",
        "은하 의회에 침투한 형체 없는 변형 외계 스파이를 심리전으로 색출하십시오.",
        "소행성대에 거대한 빛의 조각을 띄워 길 잃은 우주선들을 위한 등대를 세우십시오.",
        "차원 이동 포탈의 오류로 뒤섞인 과거와 미래의 시간선을 완벽하게 리셋하십시오.",
        "우주가 수축하기 전, 인류의 모든 기억과 생명 코드를 담은 방주를 띄우십시오."
    ];

    const missionsEn = [
        "Defend Earth's last seed bank from hacking threats without error.", "Safely relocate citizens of coastal cities facing submersion to underground domes.", "Draft a new charter to correct the ethical bias of AI.", "Secretly investigate the unexplained resource leak at the Lunar Base.", "Design a massive floating sea city to accommodate climate refugees.", "Treat the 'loss of soul' occurring when human memories are uploaded as data.", "Restore the value of analog life to a generation addicted to VR.", "Mediate social conflict between pure humans and cyborg-enhanced neo-humans.", "Command a large-scale dispersion of nano-bacteria that purify polluted soil.", "Tune factional rights disputes at the orbital elevator construction site.", "Establish fair trade rules for a new multi-national mega-corporation replacing states.", "Break the monopoly of synthetic food and distribute it to starving slums.", "Research and protect an unknown ancient life form found during deep-sea mining.", "Collapse a cyber-terrorist group trying to control others via brainwave hacking.", "Collect abandoned space debris and recycle it into a giant orbital power plant.", "Detect and ban illegal chip implant procedures aiming to control human emotions.", "Build a digital archive of humanity's fading literary and artistic heritage.", "Complete new navigation to prevent off-route accidents of stratospheric jets.", "Create a welfare system for the marginalized lacking life-extension tech.", "Restore traffic order in urban skies confused by reckless drone deliveries.", "Re-connect international water pipelines severed by pollution via diplomacy.", "Lead a project providing basic income and life purpose to jobless humanity.", "Prevent city ruin by stopping the runaway control codes of the artificial sun.", "Launch a human-centric judicial watchdog to control over-suppression by robot police.", "Rapidly integrate a global vaccine network against mutant viruses.",
        // Distant Future
        "Safely ignite the core of a Dyson Sphere absorbing stellar energy.", "Preside over a cosmic peace summit between extra-dimensional intelligences.", "Extract ultimate energy from a dying supernova to sustain civilization.", "Suppress a rebel planet violating Galactic Union laws to build an empire.", "Deploy an ethical logic bomb to stop artificial intelligence from becoming a God.", "Recover the black box of an exploration fleet lost near a black hole's event horizon.", "Eco-friendly suppress the runaway mutant flora on a terraforming planet.", "Seal spacetime rifts torn during wormhole travel with quantum adhesive.", "Warn against the philosophical side effects of evolving into pure data.", "Open the Library of Truth left at the universe's edge by a fallen ancient race.", "Eradicate space pirate fleets threatening interplanetary trade routes with tactics.", "Rescue workers on a mining planet with collapsing gravity within the time limit.", "Build a geothermal residential dome in the deep sea of an ice planet.", "Block and purify a fatal mental-pollution frequency spreading across the galaxy.", "Identify and deport doppelganger criminals from parallel universes.", "Resolve data bottlenecks in the high-dimensional telepathy network between stars.", "Create a system to stop the ethical corruption of immortals using cloned bodies.", "Predict galactic climate shifts by decoding the primal sounds of the universe.", "Expose and defend against capital fleets exploiting indigenous planetary races.", "Tow an expired artificial planet to a safe zone to prevent a massive collision.", "Absorb unknown magical energy flowing from the ether dimension into science.", "Sniff out formless shapeshifter alien spies infiltrated into the Galactic Senate.", "Erect a lighthouse of giant light shards in the asteroid belt for lost ships.", "Perfectly reset timelines mixed up by errors in dimensional portals.", "Launch an ark containing all human memories and life codes before the universe contracts."
    ];

    const elKeyEn = { "목(木)": "Wood", "화(火)": "Fire", "토(土)": "Earth", "금(金)": "Metal", "수(水)": "Water" }[signature];

    // 💡 [시간대 식별 로직] num % 20을 통해 0~9는 근미래, 10~19는 먼미래로 맵핑
    const roleIndex = num % 20;
    const isDistantFuture = roleIndex >= 10;
    
    // 시대적 배경 수식어 동적 생성
    const timeHorizonKo = isDistantFuture ? "아득히 먼 은하계 시대" : "가까운 근미래";
    const timeHorizonEn = isDistantFuture ? "the distant galactic era" : "the near future";

    const pool = lang === 'ko' ? futurePoolKo[signature] : futurePoolEn[signature];
    const match = pool[roleIndex];
    
    // 미션(과업)도 시간대에 맞춰 매칭 (0~24: 근미래, 25~49: 먼미래)
    // roleIndex가 10 미만(근미래)이면 0~24번 배열에서, 10 이상(먼미래)이면 25~49번 배열에서 랜덤 추출
    const missionBase = isDistantFuture ? 25 : 0;
    const missionIndex = missionBase + (num % 25);
    const mission = lang === 'ko' ? missionsKo[missionIndex] : missionsEn[missionIndex];

    if (lang === 'ko') {
        return {
            job: match.role,
            desc: `운명공학 분석 결과, 당신의 내세는 <b>${signature}</b>의 에너지가 주도합니다. 이 영향으로 다가올 <b>${timeHorizonKo}</b>에 <b>[${match.job}]</b>(으)로 활동할 운명입니다.`,
            mission: mission
        };
    } else {
        return {
            job: match.role,
            desc: `According to the destiny analysis, your afterlife will be driven by <b>${elKeyEn}</b> energy. Under this influence, you are destined to act as <b>[${match.job}]</b> in <b>${timeHorizonEn}</b>.`,
            mission: mission
        };
    }
}
