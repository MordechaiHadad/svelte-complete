export class ThemeHandler {
    private isDark: boolean;
    private darkThemeButton: HTMLButtonElement;

    constructor(isDark: boolean, button: HTMLButtonElement) {
        this.isDark = isDark;
        this.darkThemeButton = button;
        this.toggle = this.toggle.bind(this);

        this.darkThemeButton.classList.add(this.isDark ? "ti-sun" : "ti-moon");
    }

    toggle() {
        this.isDark = !this.isDark;
        document.documentElement.classList.toggle("dark", this.isDark);

        this.darkThemeButton.classList.remove(this.isDark ? "ti-moon" : "ti-sun");
        this.darkThemeButton.classList.add(this.isDark ? "ti-sun" : "ti-moon");
    }

    getisDark(): boolean {
        return this.isDark;
    }
}
