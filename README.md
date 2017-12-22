# Mutably Starter Project
For goal #383

## To get this project running
1. `npm install`
1. `npm start` to run (uses nodemon)


## Specs
- [x] Your repo is a fork of mutably-starter.
- [x] Your repo has a README with instructions for how to run your project.
- [x] Your app is SPA (single page app). All CRUD actions take place on the same page, preferably the root (/) route.
- [ ] All interaction with the API happens with the fetch API
 - [ ] don't submit data via forms.
 - [ ]  You can use form html tags, but do all your form submission in your js.
 - [ ]  Make use of jQuery's event.preventDefault().
- [ ] A user can read and display all the data for a resource.
- [ ] A user can create a new item via a create form.
 - [ ] that item should either get appended to the page or all the items should get re-retrieved in the js. No full page refresh.
- [ ] A user can update an existing item.
 - [ ] Updating happens inline
 - [ ] there is an edit button next to each item  
 - [ ] when clicked, causes the item text to be replaced with a pre-populated, editable input field.
 - [ ] the edit button becomes a save button.
 - [ ] Once the save button is clicked a success message comes back from the server, then the input gets replaced with the updated text.
 - [ ] No page refresh.
  For example, this:
  https://cloud.githubusercontent.com/assets/3010270/25974508/4ac57980-365e-11e7-8b1f-6cf9eefaac22.png
  becomes:
  https://cloud.githubusercontent.com/assets/3010270/25974512/5024433e-365e-11e7-802f-c60afacddecd.png
  When the user clicks the edit button.
- [ ] A user can delete an existing item via a delete button next to each item. No page refresh.
- [ ] Use a UI library to make your site look nice.
- [ ] The artifact produced is properly licensed, preferably with the MIT license.
- [ ] App is deployed on Heroku.
