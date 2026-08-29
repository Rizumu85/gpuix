---
'@gpuix/native': minor
'@gpuix/react': minor
---

Add native anchored popup windows on Windows.

Windows renderers now share one GPUI application host, allowing a second
renderer to open as an owned popup positioned from a logical anchor rectangle
in its parent. Transparent popup surfaces use DirectComposition alpha rather
than a binary Win32 region, so rounded corners remain anti-aliased. Placement
supports flip, slide, and resize constraints, and the popup is not shown until
its transparent background has been applied.

Use `renderer.getWindowId()` as `anchoredPopup.parentWindowId`, and dismiss a
popup with `renderer.closeWindow()`. Programmatic scrolling is now routed to
the renderer's own `GpuixView`, so scroll handles do not collide between the
parent and popup windows.
