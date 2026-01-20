# Hero Section Images Required

The Hero Section has been updated to use a two-layer image system with a color-changing sheep.

## Required Images

### 1. `minecraft-landscape.png`
- **Description:** Minecraft grass/landscape background
- **Location:** `/static/assets/images/minecraft-landscape.png`
- **Requirements:**
  - Aspect ratio: 16:9 (landscape)
  - Recommended size: 1920x1080px or higher
  - Should be a scenic Minecraft landscape with grass blocks
  - Can include sky, trees, terrain

### 2. `minecraft-sheep.png`
- **Description:** White Minecraft Sheep (transparent background)
- **Location:** `/static/assets/images/minecraft-sheep.png`
- **Requirements:**
  - **MUST be a WHITE sheep** (the code applies color filters)
  - **MUST have transparent background** (PNG with alpha channel)
  - Recommended size: 800x800px or similar
  - Should be centered and facing forward or at 3/4 angle
  - High resolution for crisp display

## How It Works

1. The background image displays as-is
2. The white sheep is placed on top
3. On every page refresh, a random `hue-rotate()` filter (0-360 degrees) is applied to the sheep
4. This makes the sheep appear in different colors (red, blue, green, purple, etc.)
5. The background remains unchanged

## Image Sources

You can get these images from:
- Official Minecraft assets
- Minecraft Wiki (https://minecraft.wiki/)
- Create custom renders using tools like:
  - Blockbench
  - Blender with Minecraft models
  - Minecraft structure/schematic viewers

## Temporary Solution

Until you add the real images, placeholder images will be shown (or broken image icons).
