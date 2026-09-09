export const supportedLocales = ["en", "pl"] as const;
export type Locale = (typeof supportedLocales)[number];

export type Messages = {
  terminal: { welcome: string; prompt: string; commandNotFound: (command: string) => string; suggestionsTitle: string; suggestionsHint: string; showAccessibleView: string; showTerminal: string; reducedMotionOn: string; reducedMotionOff: string; historyEmpty: string; switchLanguage: string; displayOptions: string; motionReduced: string; motionEnabled: string; languageInvalid: string; languageChanged: (locale: string) => string; cursorInvalid: string; cursorChanged: (style: string) => string };
  help: {
    available: string; projects: string; search: string; ls: string; cat: string;
    curl: string; clear: string; theme: string; help: string; history: string; accessible: string; motion: string; cursor: string; lang: string; share: string;
  };
  ls: { about: string; image: string; experience: string; tech: string; contact: string; social: string; cv: string };
  projects: { description: string; source: string };
  search: { usage: string; noResults: (query: string) => string; heading: (query: string) => string; open: string; category: Record<"Experience" | "Skills" | "Projects" | "About", string> };
  captcha: { unavailable: string; tokenError: string };
  cv: { download: string };
  contact: { unavailable: string; error: string };
  about: { greeting: string; name: string; imageAlt: string; summary: (years: number) => string; background: string };
  metadata: { title: string; description: string; keywords: string };
  errors: { fileDownload: (file: string) => string; fileMissing: (file: string) => string; theme: (theme: string) => string };
  accessibility: { title: string; intro: string; experience: string; skills: string; projects: string; contact: string };
};

const english: Messages = {
  terminal: { welcome: "Type 'help' for all available commands.", prompt: "msalaciak >", commandNotFound: (command) => `command not found: ${command}`, suggestionsTitle: "Command menu", suggestionsHint: "Click a command or press Tab to complete it.", showAccessibleView: "Open accessible portfolio view", showTerminal: "Return to terminal view", reducedMotionOn: "Enable motion", reducedMotionOff: "Reduce motion", historyEmpty: "No commands have been run yet.", switchLanguage: "Switch language", displayOptions: "Portfolio display options", motionReduced: "Reduced motion enabled.", motionEnabled: "Motion enabled.", languageInvalid: "Usage: lang en|pl", languageChanged: (locale) => `Language changed to ${locale}.`, cursorInvalid: "Usage: cursor block|bar|underline|pulse", cursorChanged: (style) => `Cursor style changed to ${style}.` },
  help: { available: "Available commands:", projects: "explore portfolio projects", search: "search experience, skills, projects, and about information. Example: search kubernetes", ls: "list directory contents", cat: "concatenate files and print on the standard output. Example: cat [FILE]", curl: "download file. Example: curl [FILE]", clear: "clear console content", theme: "set theme", help: "show available commands", history: "show commands from this session and previous visits", accessible: "show the semantic accessible portfolio view", motion: "set motion mode: motion reduce|on", cursor: "change cursor style: cursor block|bar|underline|pulse", lang: "switch language: lang en|pl", share: "Share a command by adding it to the URL, for example:" },
  ls: { about: "about_me.md", image: "me.jpeg", experience: "experience.md", tech: "tech.md", contact: "contact.md", social: "social.md", cv: "cv.pdf" },
  projects: { description: "Personal portfolio with an interactive terminal, built with Next.js, React, and TypeScript. Includes experience, skills, and a protected CV download.", source: "View source on GitHub" },
  search: { usage: "Usage: search [QUERY]", noResults: (query) => `No results for "${query}".`, heading: (query) => `Search results for "${query}":`, open: "Open", category: { Experience: "Experience", Skills: "Skills", Projects: "Projects", About: "About" } },
  captcha: { unavailable: "CAPTCHA is currently unavailable.", tokenError: "Could not extract recaptcha token" },
  cv: { download: "Download CV" },
  contact: { unavailable: "Email is unavailable", error: "Could not fetch email. Please try again." },
  about: { greeting: "Hello 👋", name: "My name is", imageAlt: "Michał Sałaciak", summary: (years) => `I am a Senior Software Engineer with ${years} years of experience in full-stack development, specializing in microservices and cloud-based solutions.`, background: "My background includes designing and optimizing data-intensive applications within distributed systems, creating CRUD APIs, and collaborating with product owners and domain experts." },
  metadata: { title: "Michał Sałaciak", description: "Michał Sałaciak — Senior Software Engineer portfolio", keywords: "Michał Sałaciak, Senior Software Engineer, TypeScript, React, Kubernetes" },
  errors: { fileDownload: (file) => `cat: fail to download ${file}, supported extensions: .pdf`, fileMissing: (file) => `cat: ${file}: No such file or directory`, theme: (theme) => `theme ${theme}: No such theme. Available themes: light, dark, total-dark, material-light, material-dark, material-ocean, matrix and dracula` },
  accessibility: { title: "Accessible portfolio", intro: "A semantic view of the portfolio content, designed for screen readers and keyboard navigation.", experience: "Experience", skills: "Skills", projects: "Projects", contact: "Contact" },
};

const polish: Messages = {
  terminal: { welcome: "Wpisz 'help', aby zobaczyć dostępne polecenia.", prompt: "msalaciak >", commandNotFound: (command) => `nie znaleziono polecenia: ${command}`, suggestionsTitle: "Menu poleceń", suggestionsHint: "Kliknij polecenie lub naciśnij Tab, aby je uzupełnić.", showAccessibleView: "Otwórz dostępny widok portfolio", showTerminal: "Wróć do widoku terminala", reducedMotionOn: "Włącz animacje", reducedMotionOff: "Ogranicz animacje", historyEmpty: "Nie uruchomiono jeszcze żadnych poleceń.", switchLanguage: "Zmień język", displayOptions: "Opcje wyświetlania portfolio", motionReduced: "Ograniczenie animacji włączone.", motionEnabled: "Animacje włączone.", languageInvalid: "Użycie: lang en|pl", languageChanged: (locale) => `Zmieniono język na ${locale}.`, cursorInvalid: "Użycie: cursor block|bar|underline|pulse", cursorChanged: (style) => `Zmieniono styl kursora na ${style}.` },
  help: { available: "Dostępne polecenia:", projects: "pokaż projekty w portfolio", search: "wyszukaj doświadczenie, technologie, projekty i informacje o mnie. Przykład: search kubernetes", ls: "wyświetl zawartość katalogu", cat: "wyświetl zawartość pliku. Przykład: cat [PLIK]", curl: "pobierz plik. Przykład: curl [PLIK]", clear: "wyczyść konsolę", theme: "ustaw motyw", help: "pokaż dostępne polecenia", history: "pokaż polecenia z tej i poprzednich wizyt", accessible: "pokaż semantyczny widok portfolio", motion: "ustaw animacje: motion reduce|on", cursor: "zmień styl kursora: cursor block|bar|underline|pulse", lang: "zmień język: lang en|pl", share: "Udostępnij polecenie, dodając je do adresu URL, na przykład:" },
  ls: english.ls,
  projects: { description: "Osobiste portfolio z interaktywnym terminalem, stworzone w Next.js, React i TypeScript. Zawiera doświadczenie, umiejętności i chroniony plik CV.", source: "Zobacz kod na GitHub" },
  search: { usage: "Użycie: search [ZAPYTANIE]", noResults: (query) => `Brak wyników dla „${query}”.`, heading: (query) => `Wyniki wyszukiwania dla „${query}”:`, open: "Otwórz", category: { Experience: "Doświadczenie", Skills: "Umiejętności", Projects: "Projekty", About: "O mnie" } },
  captcha: { unavailable: "CAPTCHA jest obecnie niedostępna.", tokenError: "Nie udało się pobrać tokenu reCAPTCHA" },
  cv: { download: "Pobierz CV" },
  contact: { unavailable: "Adres e-mail jest niedostępny", error: "Nie udało się pobrać adresu e-mail. Spróbuj ponownie." },
  about: { greeting: "Cześć 👋", name: "Nazywam się", imageAlt: "Michał Sałaciak", summary: (years) => `Jestem Senior Software Engineer z ${years} latami doświadczenia w tworzeniu aplikacji full-stack. Specjalizuję się w mikroserwisach i rozwiązaniach chmurowych.`, background: "Projektuję i optymalizuję aplikacje przetwarzające duże ilości danych w systemach rozproszonych, tworzę proste API CRUD i współpracuję z właścicielami produktów oraz ekspertami domenowymi." },
  metadata: { title: "Michał Sałaciak", description: "Michał Sałaciak — portfolio Senior Software Engineera", keywords: "Michał Sałaciak, Senior Software Engineer, TypeScript, React, Kubernetes" },
  errors: { fileDownload: (file) => `cat: nie można pobrać ${file}, obsługiwane rozszerzenie: .pdf`, fileMissing: (file) => `cat: ${file}: Nie ma takiego pliku`, theme: (theme) => `theme ${theme}: Nie ma takiego motywu. Dostępne: light, dark, total-dark, material-light, material-dark, material-ocean, matrix i dracula` },
  accessibility: { title: "Dostępne portfolio", intro: "Semantyczny widok treści portfolio przygotowany z myślą o czytnikach ekranu i nawigacji klawiaturą.", experience: "Doświadczenie", skills: "Umiejętności", projects: "Projekty", contact: "Kontakt" },
};

export function resolveLocale(locale?: string): Locale {
  return locale === "pl" ? "pl" : "en";
}

export function getMessages(locale?: string): Messages {
  return resolveLocale(locale) === "pl" ? polish : english;
}
