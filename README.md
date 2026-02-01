# Be My Valentine? 💕

A cute, interactive "Will You Be My Valentine?" website with a playful twist - the "No" button runs away when you try to click it!

## Features

- 🐻 Adorable animated mascot character
- 💌 Personalized Valentine's question
- 🎯 "No" button that escapes when hovered
- 📈 "Yes" button grows bigger with each "No" attempt
- 🎉 Confetti celebration when they say Yes
- 🔗 Shareable links with encoded names (no plain text in URL)
- 📱 Fully responsive design

## Demo

1. Visit the site without parameters to create your personalized Valentine
2. Enter your special someone's name
3. Share the generated link with them
4. Watch them try (and fail) to click "No"!

## Tech Stack

- React 19
- Vite
- Framer Motion (animations)
- Canvas Confetti (celebration effects)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

Deploy the `dist` folder to any static hosting:

- **Netlify**: Connect repo or drag & drop `dist` folder
- **Vercel**: Connect repo for automatic deploys
- **GitHub Pages**: Use `gh-pages` branch

## Customization

The celebration message can be customized when creating a Valentine. Use `{name}` as a placeholder to include their name in your message.

## License

MIT - Feel free to use this for your Valentine! 💕
