---
'@gpuix/native': minor
---

Decode `data:` URL sources in `<img>`.

`<img>` sent every `src` straight to `PathBuf` and `gpui::img(path)`, so a `data:`
URL became a path that never exists and the element painted its "img: load
failed" placeholder. `<svg>` already decoded `data:image/svg+xml`; raster sources
had no equivalent.

`ImgElement` now resolves its `src` into an `ImgSource` that is either a path or
an `Arc<gpui::Image>` built with `gpui::Image::from_bytes`. `decode_image_data_url`
reads the mime type through `gpui::ImageFormat::from_mime_type` and decodes either
base64 or percent escapes, so a host application can hand image bytes to the UI
without writing a temporary file first.

HTTP(S) sources are deliberately not included. A host that needs request headers
(Bilibili's image CDN requires a `Referer`) has to keep fetching the bytes itself,
and `gpui::SharedUri` cannot carry headers.
