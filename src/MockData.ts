export interface University {
  value: string;
  label: string;
}

export const mockUniversities: University[] = [
  { value: "1", label: "Казахский Национальный Университет им. Аль-Фараби" },
  { value: "2", label: "Евразийский Национальный Университет им. Л.Н. Гумилева" },
  { value: "3", label: "Назарбаев Университет" },
  { value: "4", label: "КазНУИ" },
  { value: "5", label: "КБТУ" },
];

export interface MockUser {
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  password: string;
}

export const mockUsers: MockUser[] = [
  {
    firstName: "Мирас",
    lastName: "Тлеусерик",
    email: "tleusserik@miko.kz",
    university: "1",
    password: "mikomiko",
  },
];

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getMockUniversities = async (): Promise<University[]> => {
  await delay(500);
  return mockUniversities;
};

export const mockLogin = async (email: string, password: string) => {
  await delay(500);
  const user = mockUsers.find((u) => u.email === email && u.password === password);
  if (user) {
    return { success: true };
  }
  return { success: false, error: "Неверный email или пароль" };
};

export const mockRegister = async (
  firstName: string,
  lastName: string,
  email: string,
  university: string,
  password: string
) => {
  await delay(500);
  const existingUser = mockUsers.find((u) => u.email === email);
  if (existingUser) {
    return { success: false, error: "Пользователь с таким email уже существует" };
  }
  const newUser: MockUser = { firstName, lastName, email, university, password };
  mockUsers.push(newUser);
  localStorage.setItem("mockUsers", JSON.stringify(mockUsers));
  return { success: true };
};

const savedUsers = localStorage.getItem("mockUsers");
if (savedUsers) {
  mockUsers.length = 0;
  mockUsers.push(...JSON.parse(savedUsers));
}