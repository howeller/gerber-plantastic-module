<img src="preview/assets/images/gerber-logo.webp" alt="Gerber" width="50"/>

# Plant-tastic Responsive Hero Module for Gerber.com

[Preview site >>](https://www.campaign.hogarthww.digital/ctus-nestle/gerber-h234231/preview/)

[JIRA >>](https://hogarthdigital.atlassian.net/browse/CTUS-547)

### Dev notes
- The breakpoints are set using the [Include Media](https://eduardoboucas.github.io/include-media/) library.

### Gulp Tasks

Task Name    | What it Does
-------------|-----------
`build` | Runs build.
`clean` | Deletes all files inside  `build/Gerber_Responsive_Hero_Module/` .
`images` | Runs clean, & build tasks and then copies all images from `src/images`.
`minify` | Minifies JS.
`sass` | Compiles all SASS into CSS & autoprefixed.
