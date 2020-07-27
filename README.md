# Fashionista

An e-commerce concept for clothing.

![Images of how the pages look like on desktop and mobile](/public/showoff.jpg)


## Packages

* React
* Redux
* Redux Thunk 
* Redux Persist
* React Router


## Basics

It looks for products on a database (more info about the API below). Once they are gotten, it allows browse and search for items, pick them, select their sizes and add them to a shopping cart. The quantity of a single item can be increasead or decreased, and the item can be removed.


## Routes

 __*/*__ 
> home page, where the full catalog is displayed.

 __*/produto/:product-name*__
> single product page, where is the full info about an item and the 'add to cart' action.



## Folder Structure

```
 /src
 |   /assets
 |   |   /css
 |   |   |   /...
 |   |   /img
 |   |   |   /...
 |   /components
 |   |   /ComponentName
 |   |   |   /ComponentName.css
 |   |   |   /ComponentName.jsx
 |   |   |   /ComponentName.test.js
 |   |   |   /index.jsx
 |   |   /...
 |   /containers
 |   |   /ContainerName
 |   |   |   /ContainerName.css
 |   |   |   /ContainerName.jsx
 |   |   |   /ContainerName.test.js
 |   |   |   /index.jsx
 |   |   /...
 |   /infrastructure
 |   |   /api.js
 |   |   /api.test.js
 |   /routes
 |   |   /RouteName
 |   |   |   /RouteName.jsx
 |   |   |   /RouteName.test.js
 |   |   |   /index.jsx
 |   |   /...
 |   /store
 |   |   /actions.js
 |   |   /actionTypes.js
 |   |   /index.js
 |   |   /reducer.js
 |   |   /store.test.js
 |   /utils
 |   |   /...
 |   App.css
 |   App.js
 |   App.test.js
 |   data.json
 |   index.js
 |   mocks.js

```

## API

This website used to consume a third party API, making only a single request to get all the necessary data, i.e., the products. But the API is no longer available. Hence, for the sake of simplicity, the data is now gotten from a json file in the /src path, what does not affect this project intent.


## Tests

To test the application you can run *npm test*.

The following modules were used:

* Jest
* Jest Dom
* React Testing Library
* Redux Mock Store
* Jest Environment Jsdom Sixteen