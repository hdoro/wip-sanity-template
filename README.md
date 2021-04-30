# Henrique's Sanity starter

🚨🚨🚨 This is unfinished! The studio part is highly functional and very close to my final vision, but the front-end is currently a mess as I'm researching better ways of structuring it. Feel free to skip it entirely :)

I'm skipping documentation while I don't get everything sorted out

## TODO

- [ ] Set-up [Renovatebot](https://github.com/renovatebot/renovate)
- [ ] Set-up Renovatebot for the front-end
  - https://docs.renovatebot.com/
- FE
  - re-do types -> potentially generate with sanity-codegen
  - check preview
  - does Next work with a single locale?
  - does it make sense to provide basic styling?
- Studio
  - Will %THEME_COLOR% break variableOverrides.css?
    - It will! I'm commenting it for the time being
  - Test desk structure
  - Vercel deploy plugin?
    - What about other vendors?
    - Maybe this is a docs chore
- Docs
  - diagram of the whole architecture
  - explain why not use Lerna or yarn workspaces
    - bottom line: only install the packages needed for each environment, speeding up build times
    - provide example of using these?
