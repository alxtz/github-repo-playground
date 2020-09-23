# Read First

1. The site is not deployed on heroku or github pages, please clone it and run `yarn && yarn start`
2. Screenshot
   ![](https://i.imgur.com/pJfc595.png)
3. The webpack template is cloned from my other frequently reused boilerplates

# Test Cases

- [ ] When entering new characters in the search input, there should be a dropdown that's showing
      ![](https://i.imgur.com/z8HqgEi.png)
- [ ] When the user hasn't been entering new characters for 1500ms (prevent frequent API calls, debouncing), call API to suggest keywords to be used
- [ ] When clicking on any of the suggestions, use that keyword to search and render the infinite scroll view
      ![](https://i.imgur.com/2axE6ti.png)
- [ ] When manually clicking the search icon, use the current input to search and render the infinite scroll view
      ![](https://i.imgur.com/6xY27mM.png)
- [ ] The initial search would render the first 10 items of the collection, each time scrolling to the bottom, it would trigger another set of API calls to retreive more results
      ![](https://i.imgur.com/Z8W6lPI.png)
- [ ] When searching/scrolling too frequently and being blocked by the API rate limit, display a count down and retry button for the user to manually see the results again
      ![](https://i.imgur.com/CRs1vG1.png)

# Implementation

1. Using ES6+ JS, React & TS
2. Styling with Emotion
3. folder structure

- src/App for the main UI components
- src/assets for shrable images
- src/store for all the state management related
- cypress for basic E2E testing setup
  ![](https://i.imgur.com/o7jDMym.png)
  ![](https://i.imgur.com/wjSKjpr.png)
