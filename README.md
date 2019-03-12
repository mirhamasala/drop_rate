# Drop Rate

## Lars's Instructions

### Features

- Search input with dropdown
- Ping an API per keypress with text from the input
- Display results
- Select a result
- Store result in local storage
- Display result on page
- Option to remove result
- Option to leave rating on a result

### Round 1: Make the Dropdown

- [x] See if you can make the dropdown display a set of random strings as a result
- [x] The dropdown should expand when there’s text inputted
  - The dropdown expands also on "tab"
- [x] The results should update on every keypress
- [x] You should be able to click a result
- [x] The dropdown should close when you click elsewhere on the page
- [x] The dropdown should open again with the last results when the cursor is again entered into the input

### Notes

Everything is plain HTML/CSS/JS, total of 352 lines

In terms of UX it doesn’t make a whole lot of sense, because I used the giphy API it would be better if an image preview was rendered instead of just a text-based list item. But the main point is to illustrate the techniques.

## Look up

- Attribute selectors
- [CSS Forms](https://www.w3schools.com/css/css_form.asp)
- [A Simple Guide to Destructuring and ES6 Spread Operator](https://codeburst.io/a-simple-guide-to-destructuring-and-es6-spread-operator-e02212af5831)
- `suggestions li`
- except `:first-child`, `:last-child`

## Resources

- [Lars's Working Example](https://datene.github.io/droprate/index.html)
- [JavaScript 30, Day 6 · Ajax Type Head](https://javascript30.com/)
- [Add an Emoji Favicon to your site!](https://dev.to/pickleat/add-an-emoji-favicon-to-your-site-co2)