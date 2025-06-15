export const mockUsers = [
  {
    email: "kbtu@uni.kz",
    password: "Test1234",
    firstName: "KBTU",
    lastName: "Admin",
    universityCode: "KBTU",
  },
];

export const mockUniversities = [
  {
    id: 1,
    code: "KBTU",
    name_kz: "Қазақ-Британ Техникалық Университеті",
    name_ru: "Казахстанско-Британский Технический Университет",
    abbreviation_kz: "ҚБТУ",
    abbreviation_ru: "КБТУ",
    address: "ул. Толе би 59, Алматы, Казахстан",
    website: "https://kbtu.kz",
    phone: "+7 (727) 272-73-74",
    email: "info@kbtu.kz",
    whatsapp: "+7 (727) 272-73-74",
    status: "частный",
    student_count: 5000,
    ent_score: 100,
    qs_score: "301-350",
    logo_url: "https://via.placeholder.com/60",
    map_point: "43.238949, 76.945127",
    description: "Ведущий технический университет в Казахстане.",
    services: ["общежитие", "бесплатный Wi-Fi", "столовая", "библиотека"],
  },
];

export const mockSpecialties = [
  {
    universityId: 1,
    code: "CS101",
    name: "Computer Science",
    description: "Программа по компьютерным наукам.",
    entScore: 120,
  },
];

export const mockToken = {
  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrYnR1QHVuaS5reiIsInVuaXZlcnNpdHlDb2RlIjoiS0JUVSIsImlhdCI6MTcyOTAxNzI2MCwiZXhwIjoxNzI5MTAzNjYwfQ.dummy_signature",
  refreshToken: "mock_refresh_token",
};

export const mockDecodedToken = {
  sub: "kbtu@uni.kz",
  universityCode: "KBTU",
  iat: 1729017260,
  exp: 1729103660,
};