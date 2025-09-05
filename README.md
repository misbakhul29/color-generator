# AI Color Palette Generator

An intelligent color palette generator and research tool built with React, TypeScript, Tailwind CSS, and the Google Gemini API. This application empowers designers and developers to create beautiful, harmonious, and accessible color schemes with the help of AI-driven insights.

## Features

- **Harmonious Color Generation**: Automatically generate a secondary color based on a primary color using standard color theory rules (Complementary, Analogous, Triadic, Split-Complementary).
- **10-Step Shade Palettes**: For both primary and secondary colors, the app generates a full 10-step palette (from shade 50 to 900), similar to modern design systems like Tailwind CSS.
- **AI-Powered Research**: Leverage the Google Gemini API to get detailed insights on any color, including its psychological impact, common industry applications, real-world brand examples, and suggested accent colors.
- **Accessibility First**: Includes a built-in WCAG contrast checker to ensure the contrast ratio between your primary and secondary colors meets accessibility standards (AA/AAA).
- **Color Blindness Simulation**: Preview your entire palette as it would appear to users with various types of color vision deficiencies (Protanopia, Deuteranopia, Tritanopia, and Achromatopsia).
- **Live UI Preview**: Instantly visualize how your generated color palette looks when applied to a set of common, interactive UI components like cards, buttons, and forms.
- **Multiple Export Options**: A comprehensive export modal allows you to get your palette in various formats:
    - **PNG Image**: For style guides and presentations.
    - **CSS Variables**: For easy integration into web projects.
    - **JSON**: For sharing or use in style-dictionary workflows.
    - **Tailwind CSS Config**: A ready-to-use snippet for your `tailwind.config.js`.
- **Modern UI/UX**: A sleek, responsive interface with a "glassmorphism" aesthetic, complete with a dark/light mode toggle that respects system preferences.

## Technology Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API (`@google/genai`)
- **Build/Setup**: Vite (or Create React App compatible)

## Project Structure

The project follows a standard React application structure, organizing files by their function.

```
/
├── public/                # Public assets (favicon, etc.)
├── src/
│   ├── components/        # Reusable React components
│   │   ├── ColorPalette.tsx
│   │   ├── ColorSwatch.tsx
│   │   ├── ExportModal.tsx
│   │   ├── Icons.tsx
│   │   ├── Loader.tsx
│   │   └── UIPreview.tsx
│   │
│   ├── services/          # Core application logic
│   │   ├── colorService.ts  # Functions for color math, accessibility, and simulation
│   │   └── geminiService.ts # Logic for interacting with the Gemini API
│   │
│   ├── App.tsx            # Main application component and state management
│   ├── index.tsx          # React application entry point
│   └── types.ts           # Shared TypeScript types and enums
│
├── .env                   # Environment variables (API Key) - MUST be created by you
├── index.html             # Main HTML file
└── README.md              # This documentation file
```

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v18 or later)
- A package manager (npm, yarn, or pnpm)
- A Google Gemini API Key

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ai-color-palette-generator.git
    cd ai-color-palette-generator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    - Create a new file named `.env` in the root of the project.
    - Add your Google Gemini API key to this file. The application is configured to read this key.

    ```
    # .env
    API_KEY=your_gemini_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run start
    ```
    The application should now be running on `http://localhost:3000` (or another port if specified).

## Core Services Explained

### `colorService.ts`

This module is the engine for all color-related calculations. It contains a set of pure functions with no external dependencies, making it highly testable and reliable.
- **Color Conversions**: Handles conversions between HEX, HSL, and RGB color models.
- **Harmony Logic**: Implements the algorithms for generating colors based on the selected harmony rule.
- **Shade Generation**: Creates the 10-step light-to-dark palettes.
- **Accessibility Calculations**: Contains functions to calculate the relative luminance of a color and the contrast ratio between two colors, returning a full WCAG report.
- **Color Blindness Simulation**: Uses transformation matrices to simulate how colors are perceived under different types of color vision deficiency.

### `geminiService.ts`

This module encapsulates all interactions with the Google Gemini API.
- It constructs the prompt sent to the model, asking for specific information about the input color.
- It defines a strict JSON schema that the AI model must adhere to for its response. This ensures that the data returned is predictable and type-safe.
- It handles the API call, parses the JSON response, and includes error handling in case the API call fails or returns malformed data.

## Contributing

Contributions are welcome! If you have an idea for a new feature or have found a bug, please follow these steps:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bugfix (`git checkout -b feature/my-new-feature`).
3.  **Make your changes.**
4.  **Commit your changes** with a clear and descriptive message.
5.  **Push to your branch** (`git push origin feature/my-new-feature`).
6.  **Create a Pull Request** against the `main` branch of the original repository.
