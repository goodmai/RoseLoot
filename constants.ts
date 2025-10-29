
import { LootBox } from './types';

// A single, high-quality SVG template for the loot box in an isometric projection.
// Colors are placeholders that will be replaced for each box.
export const svgTemplate = `
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Glow Filter -->
    <filter id="magicGlow" x="-150%" y="-150%" width="400%" height="400%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2.5 0" result="glow" />
      <feComposite in="glow" in2="SourceGraphic" operator="over" />
    </filter>
    <filter id="subtleGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" />
    </filter>

    <!-- Gradients for advanced isometric lighting -->
    <linearGradient id="woodSide" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="%%COLOR_MEDIUM%%" />
        <stop offset="100%" stop-color="%%COLOR_DARK%%" />
    </linearGradient>
    <linearGradient id="woodFront" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="%%COLOR_MEDIUM%%" />
        <stop offset="100%" stop-color="%%COLOR_LIGHT%%" />
    </linearGradient>
    <linearGradient id="woodTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%%COLOR_SUPERLIGHT%%" />
        <stop offset="80%" stop-color="%%COLOR_LIGHT%%" />
    </linearGradient>
     <linearGradient id="leatherSide" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="%%LEATHER_DARK%%" />
        <stop offset="100%" stop-color="%%LEATHER_MEDIUM%%" />
    </linearGradient>
     <linearGradient id="leatherFront" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="%%LEATHER_DARK%%" />
        <stop offset="100%" stop-color="%%LEATHER_LIGHT%%" />
    </linearGradient>

    <!-- Updated gradients for mirror-like metal -->
    <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
      <stop offset="25%" stop-color="#B0B0B0" />
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.7" />
      <stop offset="75%" stop-color="#888888" />
      <stop offset="100%" stop-color="#B0B0B0" />
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDE4" />
      <stop offset="30%" stop-color="#E7C000" />
      <stop offset="60%" stop-color="#FFFDE4" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#A48500" />
    </linearGradient>

    <!-- Updated gradient for translucent gem effect -->
    <radialGradient id="gemGlow" cx="50%" cy="50%" r="70%" fx="30%" fy="30%">
      <stop offset="0%" stop-color="%%ACCENT_GLOW%%" stop-opacity="1"/>
      <stop offset="40%" stop-color="%%ACCENT_GLOW%%" stop-opacity="0.85"/>
      <stop offset="75%" stop-color="%%ACCENT_COLOR%%" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="%%COLOR_DARK%%" stop-opacity="0.6"/>
    </radialGradient>

    <!-- NEW, MUCH BOLDER animated fractal pattern -->
    <pattern id="magicFractalRunes" patternUnits="userSpaceOnUse" width="40" height="40">
        <g class="fractal-animate">
            <!-- Bolder, more distinct rune-like shapes -->
            <path d="M 5 5 L 15 15 L 5 25" stroke="%%ACCENT_GLOW%%" stroke-width="2.5" fill="none" opacity="0.9" stroke-linecap="round" />
            <path d="M 25 15 L 35 25 L 25 35" stroke="%%SECONDARY_ACCENT%%" stroke-width="2" fill="none" opacity="0.8" stroke-linecap="round"/>
            <circle cx="30" cy="10" r="3" fill="%%ACCENT_GLOW%%" opacity="0.7" />
        </g>
    </pattern>
    
    <!-- Gradient for reflective surface -->
    <linearGradient id="reflectionOverlay" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="10%" stop-color="white" stop-opacity="0.2" />
        <stop offset="30%" stop-color="white" stop-opacity="0.05" />
        <stop offset="70%" stop-color="white" stop-opacity="0.0" />
        <stop offset="90%" stop-color="white" stop-opacity="0.1" />
    </linearGradient>
  </defs>

  <!-- Base Shadow & Energy -->
  <ellipse cx="100" cy="180" rx="65" ry="12" fill="black" opacity="0.4" filter="url(#subtleGlow)" />
  <g filter="url(#magicGlow)" opacity="0.9">
      <path d="M 35 175 C 55 160, 80 180, 100 175" stroke="%%SECONDARY_ACCENT%%" stroke-width="2.5" fill="none" />
      <path d="M 165 180 C 145 190, 120 165, 100 178" stroke="%%SECONDARY_ACCENT%%" stroke-width="2.5" fill="none" />
  </g>

  <!-- Box Main Body (Isometric) -->
  <g transform="translate(0, -15)">
      <!-- Wood Planks with BOLDER Fractal Stroke -->
      <path d="M 25,73.3 L 95,113.3 L 95,180 L 25,140 Z" fill="url(#woodSide)" stroke="url(#magicFractalRunes)" stroke-width="4" />
      <path d="M 105,113.3 L 175,73.3 L 175,140 L 105,180 Z" fill="url(#woodFront)" stroke="url(#magicFractalRunes)" stroke-width="4" />

      <!-- Lid Group for Animation -->
      <g id="lootbox-lid">
        <!-- Lid -->
        <path d="M 25,70 L 95,110 L 175,70 L 105,30 Z" fill="url(#woodTop)" stroke="%%COLOR_DARK%%" stroke-width="0.5" />
        <!-- NEW Mirror/Reflection Layer -->
        <path d="M 25,70 L 95,110 L 175,70 L 105,30 Z" fill="url(#reflectionOverlay)" />
        <path d="M 23,71 L 93,111 L 173,71 L 103,31 Z" fill="none" stroke="url(#gold)" stroke-width="1.5" />
        
        <!-- Central Core on Lid -->
        <g transform="translate(100, 70)">
          <circle cx="0" cy="0" r="28" fill="url(#gold)" />
          <circle cx="0" cy="0" r="26" fill="%%COLOR_DARK%%" />
          <circle cx="0" cy="0" r="25" filter="url(#magicGlow)" fill="url(#gemGlow)" />
          <path d="M0-18 L18,0 L0,18 L-18,0 Z" transform="rotate(45)" fill="%%ACCENT_COLOR%%" opacity="0.3" />
          <circle cx="0" cy="0" r="8" fill="%%ACCENT_GLOW%%" filter="url(#subtleGlow)" />
          <circle cx="0" cy="0" r="24" fill="none" stroke="%%ACCENT_COLOR%%" stroke-width="1" opacity="0.7"/>
        </g>
      </g>
      
      <!-- Leather Straps -->
      <g stroke="#111" stroke-width="0.5">
          <path d="M 45,88 L 115,128 L 115,164 L 45,124 Z" fill="url(#leatherSide)" />
          <path d="M 155,88 L 85,128 L 85,164 L 155,124 Z" fill="url(#leatherFront)" />
          <!-- Stitches -->
          <path d="M 47,89 L 47,123 M 52,91 L 52,125" stroke="%%LEATHER_LIGHT%%" stroke-width="0.5" />
          <path d="M 153,89 L 153,123 M 148,91 L 148,125" stroke="%%LEATHER_LIGHT%%" stroke-width="0.5" />
      </g>
      
      <!-- Metal Fittings -->
      <g fill="url(#metal)" stroke="#444" stroke-width="0.5">
          <!-- Feet -->
          <path d="M 25,140 L 30,143 L 30,148 L 20,148 L 20,143 Z" transform="translate(-2, 34)" />
          <path d="M 175,140 L 180,143 L 180,148 L 170,148 L 170,143 Z" transform="translate(2, 34)" />
          <path d="M 95,180 L 100,183 L 100,188 L 90,188 L 90,183 Z" transform="translate(0, -2)" />

          <!-- Corner Braces with Fractal Stroke -->
          <path d="M 25,100 L 38,100 L 38,140 L 25,140 Z" transform="skewY(30) translate(-34, -42)" fill="url(#metal)" stroke="url(#magicFractalRunes)" stroke-width="2.5"/>
          <path d="M 175,100 L 162,100 L 162,140 L 175,140 Z" transform="skewY(-30) translate(34, -102)" fill="url(#metal)" stroke="url(#magicFractalRunes)" stroke-width="2.5"/>
          
          <!-- Side Handle -->
          <g transform="translate(48, 110)">
              <path d="M0,0 L 10,6 L 10,18 L 0,12 Z" />
              <circle cx="5" cy="9" r="1.5" fill="#222" />
              <path d="M0,10 C -8,10, -8,-2, 0,0" fill="none" stroke="url(#metal)" stroke-width="2" />
          </g>
      </g>
      
      <!-- Front Lock/Gem -->
      <g transform="translate(100, 145)" filter="url(#magicGlow)">
          <path d="M0-22 L17,0 L0,22 L-17,0 Z" fill="url(#gold)" stroke="#444" stroke-width="0.5"/>
          <path d="M0-20 L15,0 L0,20 L-15,0 Z" fill="%%COLOR_DARK%%" />
          <path d="M0-18 L13,0 L0,18 L-13,0 Z" fill="url(#gemGlow)" />
          <path d="M0-12 L12,0 L0,12 L-12,0 Z" transform="rotate(45)" fill="%%ACCENT_COLOR%%" opacity="0.4"/>
          <circle cx="0" cy="0" r="5" fill="%%ACCENT_GLOW%%" stroke="white" stroke-width="1" />
      </g>
  </g>
</svg>
`;

// Define 9 unique color palettes, including extra shades for isometric lighting and new materials.
export const colorPalettes: { [key: string]: { superlight: string; light: string; medium: string; dark: string; shadow: string; accent: string; accentGlow: string; secondaryAccent: string; leatherLight: string; leatherMedium: string; leatherDark: string; } } = {
  'Ruby Bloom':     { superlight: '#F48A87', light: '#D9534F', medium: '#C9302C', dark: '#A94442', shadow: '#5A2423', accent: '#FF4136', accentGlow: '#FFC48C', secondaryAccent: '#F012BE', leatherLight: '#8D6E63', leatherMedium: '#6D4C41', leatherDark: '#4E342E' },
  'Sapphire Burst': { superlight: '#A1D9EC', light: '#5BC0DE', medium: '#337AB7', dark: '#265A88', shadow: '#153049', accent: '#0074D9', accentGlow: '#B3E5FC', secondaryAccent: '#01FF70', leatherLight: '#616161', leatherMedium: '#424242', leatherDark: '#212121' },
  'Emerald Dream':  { superlight: '#A3D8A3', light: '#5CB85C', medium: '#449D44', dark: '#398439', shadow: '#1E431E', accent: '#2ECC40', accentGlow: '#D4FFCE', secondaryAccent: '#39CCCC', leatherLight: '#689F38', leatherMedium: '#33691E', leatherDark: '#1B5E20' },
  'Amethyst Haze':  { superlight: '#C6BAFF', light: '#9D86FF', medium: '#6E42FF', dark: '#4E21D4', shadow: '#2C1378', accent: '#B10DC9', accentGlow: '#F5B0FF', secondaryAccent: '#7FDBFF', leatherLight: '#7E57C2', leatherMedium: '#5E35B1', leatherDark: '#311B92' },
  'Golden Sun':     { superlight: '#F8D294', light: '#F0AD4E', medium: '#EC971F', dark: '#D58512', shadow: '#784B0A', accent: '#FFDC00', accentGlow: '#FFFFFF', secondaryAccent: '#FF851B', leatherLight: '#A1887F', leatherMedium: '#795548', leatherDark: '#3E2723' },
  'Pink Quartz':    { superlight: '#FFD1E3', light: '#FFACC7', medium: '#FF69B4', dark: '#C71585', shadow: '#7A0D51', accent: '#F012BE', accentGlow: '#FFD6F5', secondaryAccent: '#B10DC9', leatherLight: '#8D6E63', leatherMedium: '#6D4C41', leatherDark: '#4E342E' },
  'Arctic Ice':     { superlight: '#CDEBFA', light: '#A7D7F9', medium: '#66B3E9', dark: '#3486C5', shadow: '#1B4769', accent: '#7FDBFF', accentGlow: '#FFFFFF', secondaryAccent: '#0074D9', leatherLight: '#B0BEC5', leatherMedium: '#78909C', leatherDark: '#455A64' },
  'Volcanic Ember': { superlight: '#FFB88C', light: '#FF851B', medium: '#E64C00', dark: '#B23A00', shadow: '#662100', accent: '#FF4136', accentGlow: '#FFDC00', secondaryAccent: '#F012BE', leatherLight: '#BF360C', leatherMedium: '#D84315', leatherDark: '#870000' },
  'Silver Moon':    { superlight: '#F5F5F5', light: '#DDDDDD', medium: '#B5B5B5', dark: '#888888', shadow: '#444444', accent: '#AAAAAA', accentGlow: '#FFFFFF', secondaryAccent: '#7FDBFF', leatherLight: '#616161', leatherMedium: '#424242', leatherDark: '#212121' },
};


/**
 * Creates a raw SVG string for a loot box.
 * @param palette The color palette to use for the SVG.
 * @returns A string representing the SVG.
 */
const createLootBoxSvgString = (palette: (typeof colorPalettes)[string]): string => {
  const finalSvg = svgTemplate
    .replace(/%%COLOR_SUPERLIGHT%%/g, palette.superlight)
    .replace(/%%COLOR_LIGHT%%/g, palette.light)
    .replace(/%%COLOR_MEDIUM%%/g, palette.medium)
    .replace(/%%COLOR_DARK%%/g, palette.dark)
    .replace(/%%COLOR_SHADOW%%/g, palette.shadow)
    .replace(/%%ACCENT_COLOR%%/g, palette.accent)
    .replace(/%%ACCENT_GLOW%%/g, palette.accentGlow)
    .replace(/%%SECONDARY_ACCENT%%/g, palette.secondaryAccent)
    .replace(/%%LEATHER_LIGHT%%/g, palette.leatherLight)
    .replace(/%%LEATHER_MEDIUM%%/g, palette.leatherMedium)
    .replace(/%%LEATHER_DARK%%/g, palette.leatherDark);
  return finalSvg;
};

// Base data for the loot boxes. The imageUrl will be generated dynamically.
const BOX_DEFINITIONS = [
  { id: 1, name: 'Ruby Bloom', color: 'ruby red', gradient: 'from-red-500 to-red-700', shadow: 'shadow-red-500/50' },
  { id: 2, name: 'Sapphire Burst', color: 'sapphire blue', gradient: 'from-blue-500 to-blue-700', shadow: 'shadow-blue-500/50' },
  { id: 3, name: 'Emerald Dream', color: 'emerald green', gradient: 'from-green-500 to-green-700', shadow: 'shadow-green-500/50' },
  { id: 4, name: 'Amethyst Haze', color: 'amethyst purple', gradient: 'from-purple-500 to-purple-700', shadow: 'shadow-purple-500/50' },
  { id: 5, name: 'Golden Sun', color: 'golden yellow', gradient: 'from-yellow-400 to-yellow-600', shadow: 'shadow-yellow-400/50' },
  { id: 6, name: 'Pink Quartz', color: 'pink quartz', gradient: 'from-pink-400 to-pink-600', shadow: 'shadow-pink-400/50' },
  { id: 7, name: 'Arctic Ice', color: 'icy blue', gradient: 'from-cyan-300 to-cyan-500', shadow: 'shadow-cyan-300/50' },
  { id: 8, name: 'Volcanic Ember', color: 'fiery orange', gradient: 'from-orange-500 to-orange-700', shadow: 'shadow-orange-500/50' },
  { id: 9, name: 'Silver Moon', color: 'silver', gradient: 'from-gray-300 to-gray-500', shadow: 'shadow-gray-300/50' },
];

// Generate the final LOOT_BOXES array with the dynamic SVG images.
export const LOOT_BOXES: LootBox[] = BOX_DEFINITIONS.map(box => {
    const svgString = createLootBoxSvgString(colorPalettes[box.name]);
    return {
        ...box,
        imageUrl: `data:image/svg+xml;base64,${btoa(svgString)}`,
    };
});

export const LOADING_MESSAGES = [
    'Summoning the digital roses...',
    'Rendering petals and thorns...',
    'Polishing the loot box sheen...',
    'This magic can take a few minutes...',
    'Assembling the animation sequence...',
    'Composing a symphony of colors...',
    'Almost there, the roses are about to bloom!',
];