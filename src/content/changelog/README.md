# Changelog Customization Guide

You can customize changelog entries by creating markdown files in `src/content/changelog/`. This directory is configured as an Astro content collection with proper type safety and asset resolution.

## Quick Start

1. **Create a markdown file** named after the release version:

   ```
   src/content/changelog/v1.0.0.md
   ```

2. **Add frontmatter** with customization options:

   ```markdown
   ---
   mode: "prefix"
   image: "../../assets/changelog/v1.0.0-hero.png"
   imageAlt: "Orbit 1.0.0 Release"
   ---

   Your custom markdown content here...
   ```

## Frontmatter Options

### `mode` (string)

Controls how your custom content interacts with GitHub release notes:

- **`"prefix"`** (default): Adds your content BEFORE GitHub notes

  ```markdown
  ---
  mode: "prefix"
  ---

  🎉 **Special announcement about this release!**
  ```

- **`"suffix"`**: Adds your content AFTER GitHub notes

  ```markdown
  ---
  mode: "suffix"
  ---

  ---

  ## Additional Resources

  - [Migration Guide](...)
  ```

- **`"replace"`**: Completely replaces GitHub content with yours

  ```markdown
  ---
  mode: "replace"
  ---

  Your complete custom release notes...
  ```

- **`"extend"`**: Merges both with a separator

  ```markdown
  ---
  mode: "extend"
  ---

  ## Highlights

  Brief overview...

  <!-- GitHub notes will appear below after a separator -->
  ```

### `image` (string, optional)

**Relative path** to a hero image for this release. Use a relative path from the markdown file to the asset:

```markdown
---
image: "../../assets/changelog/v2.0.0-hero.png"
imageAlt: "Orbit 2.0.0 Major Update"
---
```

The image will be:

- Automatically optimized by Astro
- Type-checked at build time
- Displayed prominently at the top of the release entry

**Important**: Always use relative paths starting from the markdown file (e.g., `../../assets/changelog/...`). This enables Astro's image optimization and type safety.

### `imageAlt` (string, optional)

Alternative text for the image. Defaults to `"{version} banner"` if not provided.

## Image Asset Guidelines

### Recommended Structure

```
src/
├── assets/
│   └── changelog/
│       ├── v1.0.0-hero.png
│       ├── v2.0.0-hero.png
│       └── ...
└── content/
    └── changelog/
        ├── v1.0.0.md
        ├── v2.0.0.md
        └── README.md
```

### Using Images

Always use relative paths from the markdown file to the asset:

```markdown
---
image: "../../assets/changelog/v1.0.0-hero.png"
---
```

This gives you:

- ✅ Automatic image optimization
- ✅ Build-time validation
- ✅ TypeScript type safety
- ✅ Proper responsive images

## Examples

### Example 1: Add Context to a Major Release

```markdown
---
mode: "prefix"
image: "../../assets/changelog/v1.0.0-hero.png"
imageAlt: "Orbit 1.0.0 - Our biggest release yet"
---

🎉 **Major Milestone Release**

After months of development and testing, we're thrilled to announce Orbit 1.0.0!

### Why This Matters

This release represents a complete rewrite of our search engine, bringing:

- 50% faster search results
- 90% more accurate OCR
- Support for 20+ new file formats

---

**What follows are the technical details from our GitHub release:**
```

### Example 2: Replace Entirely with Custom Content

```markdown
---
mode: "replace"
image: "../../assets/changelog/v2.0.0-announce.png"
---

# Orbit 2.0: The Future of Screen Recording

We've reimagined Orbit from the ground up.

## 🚀 New Features

### AI-Powered Search

Our new ML model understands context, not just text. Search for "that email about the deadline" and Orbit knows what you mean.

### Timeline View

Visualize your entire day at a glance. Scrub through hours of recordings in seconds.

### Smart Collections

Orbit now automatically organizes your recordings into projects, making it easy to find related content.

## 💨 Performance

- 3x faster indexing
- 50% smaller database
- Real-time search (no more waiting)

## 🎨 Design

Completely redesigned UI with:

- Dark mode that actually looks good
- Keyboard shortcuts for everything
- Customizable workspace layouts

[Read the full blog post →](https://blog.reachorbit.app/v2.0.0)
```

### Example 3: Add Suffix for Migration Info

```markdown
---
mode: "suffix"
---

---

## ⚠️ Breaking Changes

This release includes breaking changes. Please review the [migration guide](https://docs.reachorbit.app/migration/v3) before updating.

### Action Required

1. Back up your database (Settings → Backup)
2. Update to v3.0.0
3. Follow the one-time migration prompts

Need help? [Contact support](mailto:support@reachorbit.app)
```

### Example 4: Extend with Additional Context

```markdown
---
mode: "extend"
image: "../../assets/changelog/v1.5.0-beta.png"
---

## 🧪 Beta Features

This release includes experimental features that you can enable in Settings → Labs:

- **Smart Folders**: Automatically organize recordings by project
- **Export Collections**: Share curated collections with your team
- **Voice Commands**: Control Orbit hands-free

These features are still being refined. [Share your feedback →](https://forms.reachorbit.app/beta-feedback)
```
