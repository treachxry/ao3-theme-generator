# AO3 Theme Generator

> This project is in the middle of restructuring. Existing functionality of building the site skin locally will be back.

## Installation

### 1. Get skin files

1. Download the [latest release](https://github.com/treachxry/ao3-theme-generator/releases/latest).
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