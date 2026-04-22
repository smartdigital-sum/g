# GyanPlay Class 2 Educational Games Platform

An interactive web-based learning platform for Class 2 students (ages 7-8) following NCERT and Assam Board curriculum. The platform features 23 educational games across 6 subjects, organized into 3 batches for progressive learning.

## Features

- **Interactive Dashboard**: Visual overview of all games with subject categorization
- **Batch System**: Games organized into 3 batches (7+7+9 games) for structured learning
- **Game Details**: Detailed view of each game with concept explanations and mechanics
- **Search Functionality**: Find games by name, concept, or mechanic
- **Demo Games**: Interactive demos for selected games (Number Market, Punctuation Fixer, Sense Safari)
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Voice Command Hints**: Designed for voice-activated classroom environments

## Project Structure

```
gyanPlay-class2/
├── index.html          # Main dashboard
├── styles.css          # Global styles
├── script.js           # Main application logic
├── package.json        # Project dependencies
├── README.md           # This file
├── number-market-demo.html     # Place value game demo
├── punctuation-demo.html       # Punctuation game demo
└── sense-safari-demo.html      # 5 senses game demo
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Node.js and npm for development server

### Installation
1. Clone or download the project files
2. Open `index.html` in a web browser
3. No build process required - it's a static web application

### Development
To run with live reload (optional):
```bash
npm install
npm start
```
This will start a live-server on port 3000.

## Usage

1. **Select a Batch**: Click on Batch 1, 2, 3, or "View All" to filter games
2. **Browse Subjects**: Games are organized by subject (Maths, English, Science, etc.)
3. **Select a Game**: Click any game card to see details
4. **Play Demo**: For games with demos, click "Try Demo" to open interactive demo
5. **Search**: Use the search box to find specific games

## Game Categories

### Maths (5 games)
- Number Market (Place value up to 999)
- Carry the Coconuts (Addition with carrying)
- Multiplication Pond (Tables 2-5)
- Ruler Race (Measurement in cm/m)
- Clock Tower (Telling time)

### English (4 games)
- Punctuation Fixer (Full stop, question mark, exclamation)
- Noun Town (Common/proper nouns)
- Verb Volcano (Action words)
- Paragraph Builder (Reading comprehension)

### Science (4 games)
- Sense Safari (5 senses)
- Material World (Properties of materials)
- Water Journey (Water cycle)
- Baby Animal Match (Animals and young ones)

### Social Studies (4 games)
- My Neighbourhood (Community places)
- Festival Colours (Indian festivals)
- Food Farm to Fork (Food sources)
- Map Reader (Basic directions)

### Hindi (3 games)
- शब्द बनाओ (Word Weaver - syllable building)
- लिंग खेल (Gender game)
- वचन जादू (Singular to plural)

### Computer (3 games)
- Input or Output? (Device classification)
- Paint Studio (MS Paint tools)
- Internet Explorer Jr. (Internet safety)

## Technical Implementation

- **Frontend**: Pure HTML5, CSS3, and vanilla JavaScript
- **Styling**: CSS custom properties (variables) for theming
- **Responsive Design**: Flexbox and CSS Grid with mobile-first approach
- **Performance**: Debounced search input, efficient DOM updates
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation support

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Deployment

The project is ready for deployment on any static web hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any traditional web server

Simply upload all files to your web server.

## Future Enhancements

Potential improvements for future versions:
- User accounts and progress tracking
- Teacher dashboard for classroom management
- More interactive games with advanced graphics
- Multi-language support
- Offline capability with Service Workers
- Integration with learning management systems

## License

MIT License - see LICENSE file (to be added)

## Credits

Developed by the GyanPlay Team for Class 2 education based on NCERT Marigold/Raindrops and Assam Board curriculum.

## Contact

For questions or feedback, please contact the development team.