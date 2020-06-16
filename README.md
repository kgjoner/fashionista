# Fashionista

An e-commerce frontend for clothing.

![Images of how the pages look like on desktop and mobile](/public/showoff.jpg)


## Packages

* React
* Redux: including redux-thunk and redux-persist
* React Router


## Basics

It consumes the api on *https://5e9935925eabe7001681c856.mockapi.io/api/v1* only to get the products.

Thus, it allows browse and search for items, pick them, select their sizes and add them on a shopping cart. Once there, a single item quantity can be increasead or decreased, and the item can be removed from the cart.


## Routes

> */* --> home page, where the full catalog is displayed.
>
> */produto/:product-name* --> single product page, where is the full info about an item and where it can be added to the cart.


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

```

## Tests

To test the application you can run *npm test*.

The following modules were used:

* Jest
* Jest Dom
* React Testing Library
* Redux Mock Store
* Jest Environment Jsdom Sixteen