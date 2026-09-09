export const supportedLocales = ["en", "pl"] as const;
export type Locale = (typeof supportedLocales)[number];

export type Messages = {
  terminal: { welcome: string; prompt: string; commandNotFound: (command: string) => string };
  help: {
    available: string; projects: string; search: string; ls: string; cat: string;
    curl: string; pong: string; clear: string; theme: string; share: string;
  };
  ls: { about: string; image: string; experience: string; tech: string; contact: string; social: string; cv: string };
  projects: { description: string; source: string };
  search: { usage: string; noResults: (query: string) => string; heading: (query: string) => string; open: string; category: Record<"Experience" | "Skills" | "Projects" | "About", string> };
  captcha: { unavailable: string; tokenError: string };
  cv: { download: string };
  contact: { unavailable: string; error: string };
  about: { greeting: string; name: string; imageAlt: string; summary: (years: number) => string; background: string };
  metadata: { title: string; description: string; keywords: string };
  pong: { start: string; paused: string; resume: string; left: string; right: string; space: (action: string) => string; up: string; down: string };
  errors: { fileDownload: (file: string) => string; fileMissing: (file: string) => string; theme: (theme: string) => string };
};

const english: Messages = {
  terminal: { welcome: "Type 'help' for all available commands.", prompt: "msalaciak >", commandNotFound: (command) => `command not found: ${command}` },
  help: { available: "Available commands:", projects: "explore portfolio projects", search: "search experience, skills, projects, and about information. Example: search kubernetes", ls: "list directory contents", cat: "concatenate files and print on the standard output. Example: cat [FILE]", curl: "download file. Example: curl [FILE]", pong: "play Pong game", clear: "clear console content", theme: "set theme", share: "Share a command by adding it to the URL, for example:" },
  ls: { about: "about_me.md", image: "me.jpeg", experience: "experience.md", tech: "tech.md", contact: "contact.md", social: "social.md", cv: "cv.pdf" },
  projects: { description: "Personal portfolio with an interactive terminal, built with Next.js, React, and TypeScript. Includes experience, skills, a protected CV download, and Pong.", source: "View source on GitHub" },
  search: { usage: "Usage: search [QUERY]", noResults: (query) => `No results for "${query}".`, heading: (query) => `Search results for "${query}":`, open: "Open", category: { Experience: "Experience", Skills: "Skills", Projects: "Projects", About: "About" } },
  captcha: { unavailable: "CAPTCHA is currently unavailable.", tokenError: "Could not extract recaptcha token" },
  cv: { download: "Download CV" },
  contact: { unavailable: "Email is unavailable", error: "Could not fetch email. Please try again." },
  about: { greeting: "Hello 👋", name: "My name is", imageAlt: "Michał Sałaciak", summary: (years) => `I am a Senior Software Engineer with ${years} years of experience in full-stack development, specializing in microservices and cloud-based solutions.`, background: "My background includes designing and optimizing data-intensive applications within distributed systems, creating CRUD APIs, and collaborating with product owners and domain experts." },
  metadata: { title: "Michał Sałaciak", description: "Michał Sałaciak — Senior Software Engineer portfolio", keywords: "Michał Sałaciak, Senior Software Engineer, TypeScript, React, Kubernetes" },
  pong: { start: "Press SPACE to start", paused: "PAUSED", resume: "Press SPACE to resume", left: "Left Player: W (up) / S (down)", right: "Right Player: ↑ (up) / ↓ (down)", space: (action) => `Space: ${action}`, up: "up", down: "down" },
  errors: { fileDownload: (file) => `cat: fail to download ${file}, supported extensions: .pdf`, fileMissing: (file) => `cat: ${file}: No such file or directory`, theme: (theme) => `theme ${theme}: No such theme. Available themes: light, dark, total-dark, material-light, material-dark, material-ocean, matrix and dracula` },
};

const polish: Messages = {
  terminal: { welcome: "Wpisz 'help', aby zobaczyć dostępne polecenia.", prompt: "msalaciak >", commandNotFound: (command) => `nie znaleziono polecenia: ${command}` },
  help: { available: "Dostępne polecenia:", projects: "pokaż projekty w portfolio", search: "wyszukaj doświadczenie, technologie, projekty i informacje o mnie. Przykład: search kubernetes", ls: "wyświetl zawartość katalogu", cat: "wyświetl zawartość pliku. Przykład: cat [PLIK]", curl: "pobierz plik. Przykład: curl [PLIK]", pong: "zagraj w Pong", clear: "wyczyść konsolę", theme: "ustaw motyw", share: "Udostępnij polecenie, dodając je do adresu URL, na przykład:" },
  ls: english.ls,
  projects: { description: "Osobiste portfolio z interaktywnym terminalem, stworzone w Next.js, React i TypeScript. Zawiera doświadczenie, umiejętności, chroniony plik CV i grę Pong.", source: "Zobacz kod na GitHub" },
  search: { usage: "Użycie: search [ZAPYTANIE]", noResults: (query) => `Brak wyników dla „${query}”.`, heading: (query) => `Wyniki wyszukiwania dla „${query}”:`, open: "Otwórz", category: { Experience: "Doświadczenie", Skills: "Umiejętności", Projects: "Projekty", About: "O mnie" } },
  captcha: { unavailable: "CAPTCHA jest obecnie niedostępna.", tokenError: "Nie udało się pobrać tokenu reCAPTCHA" },
  cv: { download: "Pobierz CV" },
  contact: { unavailable: "Adres e-mail jest niedostępny", error: "Nie udało się pobrać adresu e-mail. Spróbuj ponownie." },
  about: { greeting: "Cześć 👋", name: "Nazywam się", imageAlt: "Michał Sałaciak", summary: (years) => `Jestem Senior Software Engineer z ${years} latami doświadczenia w tworzeniu aplikacji full-stack. Specjalizuję się w mikroserwisach i rozwiązaniach chmurowych.`, background: "Projektuję i optymalizuję aplikacje przetwarzające duże ilości danych w systemach rozproszonych, tworzę proste API CRUD i współpracuję z właścicielami produktów oraz ekspertami domenowymi." },
  metadata: { title: "Michał Sałaciak", description: "Michał Sałaciak — portfolio Senior Software Engineera", keywords: "Michał Sałaciak, Senior Software Engineer, TypeScript, React, Kubernetes" },
  pong: { start: "Naciśnij SPACJĘ, aby rozpocząć", paused: "PAUZA", resume: "Naciśnij SPACJĘ, aby wznowić", left: "Lewy gracz: W (góra) / S (dół)", right: "Prawy gracz: ↑ (góra) / ↓ (dół)", space: (action) => `Spacja: ${action}`, up: "góra", down: "dół" },
  errors: { fileDownload: (file) => `cat: nie można pobrać ${file}, obsługiwane rozszerzenie: .pdf`, fileMissing: (file) => `cat: ${file}: Nie ma takiego pliku`, theme: (theme) => `theme ${theme}: Nie ma takiego motywu. Dostępne: light, dark, total-dark, material-light, material-dark, material-ocean, matrix i dracula` },
};

export function resolveLocale(locale?: string): Locale {
  return locale === "pl" ? "pl" : "en";
}

export function getMessages(locale?: string): Messages {
  return resolveLocale(locale) === "pl" ? polish : english;
}
