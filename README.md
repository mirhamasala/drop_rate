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
- [x] The results should update on every keypress
- [x] You should be able to click a result
- [x] The dropdown should close when you click elsewhere on the page
- [x] The dropdown should open again with the last results when the cursor is again entered into the input

### Round 2

When you have an `overflow: scroll;` it’s nice if there’s a “below the fold” indication.

Basically what I mean is that you can see there’s more content, so for example you can make the `max-height` of the `ul` a factor and a half of the height of an `li`, so for example `5.5 * height` of `li`.

- [x] Get API results using fetch
- [x] Display API results in dropdown
- [x] Add event listener on dropdown links
- [x] Display item on the page
- [ ] Store items in localstorage
- [ ] Load items from localstorage on pageload
- [ ] Display items in grid

It doesn’t really matter which API you use, you can also use a recipes API if you’d like, whatever works and makes sense for you.

This is a list of public API’s, you might know it already <https://github.com/toddmotto/public-apis>

Although, be careful with any API keys that have no domain restrictions. The giphy API key I had to include in my project is tricky, people can take it but it will just stop working if it’s abused. For some services it will start generating costs.

### Q & A

*Q: I’m having a hard time getting the flow right, and knowing where to call which method, and how to pass it the arguments it needs.*

*I’m trying to wrap my `fetch` into a function `getResults()` But I don’t know what to do with my eventlisteners then.*

---

You can also push the entire result into the set.

There’s several ways to go about this, I recommend using the cookbook way. Instead of appending an element on the page you just re-render the entire set\

The flow would be:
- [x] on each keypress => ping the API
- [x] render the results in the dropdown
- [x] add event listeners to the individual results
- [ ] when clicking a result that result should be added to a dataset
- [ ] whenever a result is added to the dataset, call a method that re-renders all the elements in the dataset. In my case these are the giphies in the grid
- [ ] update the dataset in local storage

You’re working with the `ketoFoods` constant, you can use a spread operator to push the results into the constant `ketoFoods.push(...data.Search)`
Then you just need to update your other methods to use `foodName.title` instead of `foodName`
You could merge your `displayMatches` and `getResults` method, but that’s another way to tackle it. The way I see you’re doing it now is that you’re using `fetch` to update the dataset and then `displayMatches` to separately render it to the page. I rendered stuff on fetch directly, but I like your approach.

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
- [What is the difference between `auto-fill` and `auto-fit`](https://stackoverflow.com/questions/46226539/what-is-the-difference-between-auto-fill-and-auto-fit)
- [A JavaScript-Free Frontend](https://dev.to/winduptoy/a-javascript-free-frontend-2d3e)