# 🕒 JavaScript + CSS Analog Clock

An accessible, animated analog clock built using HTML, CSS, and JavaScript. It features smooth transitions, hour markers, a digital fallback time display, and ARIA support for screen readers.

## 🌟 Features

- 🕰️ Real-time analog clock with hour, minute, and second hands
- 🧭 Hour markers including quarter-hour highlights
- 🖥️ Digital time display (for screen readers and fallback)
- ♿ ARIA roles and live region for accessibility
- 💡 Responsive to page visibility (pauses updates when tab is inactive)
- ⌨️ Keyboard interaction (`R` key to refresh time manually)
- 🚫 Transition glitch prevention for second-hand reset
- 🧼 Graceful error handling and auto-recovery

## 📁 Project Structure

```
clock-project/
├── index.html        # Main HTML file (provided in this project)
├── styles.css        # CSS styles for the clock (must be linked in HTML)
└── README.md         # This file
```

## 📦 Getting Started

1. Clone or download the project.
2. Open `index.html` in your web browser.
3. Enjoy the ticking analog clock!

## 🎨 Customization

You can modify the clock's appearance or behavior by editing:
- **CSS** (`styles.css`) – customize hand colors, sizes, shadows, or background.
- **JavaScript** – change update frequency, transition effects, or add new features.

## 🔒 Accessibility Notes

- The analog clock is wrapped in a `role="img"` with `aria-label` to describe it.
- A live digital time (`aria-live="polite"`) is updated every minute to help screen reader users.
- Keyboard support: Press **`R`** to refresh the time manually.

## 🧪 Compatibility

Tested and works on:
- Chrome
- Firefox
- Edge
- Safari

No external libraries or frameworks are used.

## 📃 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). You are free to use, modify, and distribute it.

---

Built with ❤️ using HTML, CSS, and vanilla JavaScript.
