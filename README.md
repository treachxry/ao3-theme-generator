# AO3 Overengineered Skin

AO3 site skin made with way too much effort. This skin replaces the default site skin instead of building on top of it, which gives more freedom for customization, but the installation process becomes much harder than a simple copy and paste.

It would arguably be easier if I could make a public site skin you could use directly, but that's currently impossible due to AO3 removing this option in like 2011, and not touching it ever since. So you'll have to set this up yourself.
Below are the detailed steps on how to do so.

## Installation

### 1. Get skin files

1. Download the [latest release](https://github.com/treachery0/ao3-dark-theme/releases/latest).
2. Unzip the archive.

You likely won't need every file. Here's a short explanation what they do, so you can skip the ones you don't need in the next step.

| File                | Purpose                      | Media                               |
|---------------------|------------------------------|-------------------------------------|
| `media-all.css`     | main styles (mandatory)      | `all` (or leave empty)              |
| `media-midsize.css` | small screens (recommended)  | `only screen and (max-width: 62em)` |
| `media-narrow.css`  | mobile screens (recommended) | `only screen and (max-width: 42em)` |
| `media-aural.css`   | text to speech (optional)    | `speech`                            |
| `media-print.css`   | printing (optional)          | `print`                             |

### 2. Create parent skins

You can't copy and paste all files into a single skin, since some styles are only active in certain conditions, like viewing the page on a phone-sized screen. Repeat these steps for every file you need.

1. Create a new site skin.
2. Copy and paste file contents for CSS.
3. Open advanced skin settings.
4. Set "What it does" to "Replace archive skin entirely".
5. Set "Media" to the correct value from the table above.
6. Create skin.

### 3. Create final skin

1. Create a new site skin.
2. Leave CSS empty, paste `*{}` to deal with the error.
3. Go to advanced settings.
4. Set "What it does" to "Replace archive skin entirely".
5. In "Parent skins", add every other previously created skin in their order in the table above.
6. Create and use skin.

## Features

- Dark theme
- Rounded corners with most borders and shadows removed
- Improved mobile layout
- Rebalanced space between elements
- Extra quality of life changes
    - Hide delete account button
    - Hide unsubscribe buttons in subscriptions page
    - Hide RSS feed button
    - Hide muted users notification
    - Fix footer to bottom

## Customize and build it yourself

If you'd like to modify the skin, change the source files instead of the output CSS. You have easy control over all colors and other variables in `src/theme.css`. To create the output files site skins can use, make sure you have Node.js 22+
installed, then run:

```
npm install
npm run build
```

Outputs are generated in the `dist` folder. You will need to run `npm run build` again each time you make changes.