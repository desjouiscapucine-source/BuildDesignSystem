# ImageViewer — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- To open larger one of the thumbnails of a **Card `clickable-image`**, and go through the other images of that card.

## When not to use
- For **decorative images**: they carry no information, there is nothing to open.
- For an image **already shown at its useful size**.
- For **content other than images** (text, form, video…): use a dialog instead — not in the design system yet.
- To **go to another page**: use a link or a **Button** instead.

## Usage best practices
- **Open the clicked image**: the viewer opens on the thumbnail that was clicked (its `index`), not on the first image.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Use the viewer to show images larger. | Put text, a form or other content in the viewer. |

## Content guidelines
- **Alternative text (`alt`)**: required for every image. Describe what the image shows ("North facade of the building"), sentence case, not starting with "Image of…".
- No visible text in the viewer: no counter, no caption.
- **Number of images**: no maximum.

## Behavior
- **Close**: close button, or the Escape key.
- **Previous / next**: buttons in the band, or the ← / → keys. Disabled at the first and the last image (no loop).
- **One image**: no band, no previous / next.
- **Loading**: the thumbnail (`thumbnailSrc`) is shown in place of the image until the image is loaded.
- **Error**: no specific behavior (the browser default).
- **Size**: the whole image is visible, scaled down to fit the screen; it is never enlarged beyond its own size.

## Accessibility
- **Keyboard:** Escape closes; ← / → change image; Tab moves between the buttons and stays inside the viewer.
- **Focus:** on opening, focus goes to the close button; on closing, it returns to the thumbnail that opened the viewer. Previous / next: the usual focus ring (`border.focus`, 5.50:1 on the band). Close button: double ring, white inside, brown outside — below 3:1 on light pages under the dimmed background (exception accepted by the Design System Lead, see `spec.md`).
- **Screen reader:** a modal dialog named "Image viewer" (or `label`); the image is announced with its `alt`; buttons "Close the image viewer", "Previous image", "Next image".
- **Contrast:** button icons 6.10:1; buttons on the band 5.50:1.
- **Touch target:** the IconButtons are at least 24×24px.

## Related components
- **Card** (`clickable-image` variant, in progress — B078) — its thumbnails open the viewer.
- **IconButton** — the close, previous and next buttons.
