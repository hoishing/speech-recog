# Speech Recognition

![chrome-only] [![alpine-badge]][alpine] [![uno-badge]][uno] ![mit]

<p><img src="https://i.imgur.com/WB76vDS.png" width='600'/></p>

> free, accurate and unlimited speech recognition web app powered by Google's Web Speech API

[🚀 launch app][launch]

[mit]: https://img.shields.io/github/license/hoishing/speech-recog
[uno-badge]: https://img.shields.io/badge/css-UnoCSS-blue
[alpine-badge]: https://img.shields.io/badge/front--end-Alpine.js-success
[chrome-only]: https://img.shields.io/badge/browser-chrome%20only-red

## Motivation

In around 2016, the built-in voice recognition support for Cantonese in both Windows and macOS were not available yet. Even for Mandarin, the quality of recognition in both OS were far below Google. So I created this little webapp, harnessing Google web speech API, to serve my daily voice recognition need.

To speed up the operation, I added auto copy to clipboard and shortcut key feature afterwards. It then became a handy always-on utility on my computer.

Now, in 2022, the built-in voice recognition for both OS are mature enough that I can rely on them over 90% of time. However, the recognition quality of Google is still much better, especially in Cantonese. So I still come back to this tool when the OS fail to recognize those less common phases or slang.

## Features

demo 🎬 https://youtu.be/D2NwsPozwFw

- auto copy recognition results to clipboard
- multilingual
- hotkey: space bar to toggle start / stop recognition
- [PWA][pwa]: installable on desktop / mobile like native app

## Usage

- grant microphone and clipboard permission in Chrome
- space bar: toggle start / stop recognition
- recognition results will be displayed and copied to the clipboard

## Tech Details

🔗 [source code][source]

It started with a single HTML file with internal css and javascript. As the project evolve I want to keep it simple and don't want to mess with bundler. This lead to the following tech stack selection:

- [UnoCSS][uno]: small, fast and flexible [tailwindcss][tailwind] alternative that support CDN
- [Alpine.js][alpine]: lightweight javaScript framework with CDN

### Platform

It uses Google's `webkitSpeechRecognition` api so it only works on Chrome OS / browser.

## Need Help?

Open a [github issue](https://github.com/hoishing/speech-recog/issues) or ping me on [Twitter](https://twitter.com/hoishing) ![](https://api.iconify.design/logos/twitter.svg?width=20)

[pwa]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
[uno]: https://github.com/unocss/unocss
[tailwind]: https://tailwindcss.com
[alpine]: https://alpinejs.dev
[source]: https://github.com/hoishing/speech-recog
[launch]: https://hoishing.github.io/speech-recog
