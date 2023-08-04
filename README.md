# Delictionary - A Recipe Search Web App

![Logo](https://lh3.googleusercontent.com/drive-viewer/AITFw-zdx-LwxRnZ93veuYdJQ_3FtzMNjCS0GmAMW2o9zzuA8HRaDQGlbmdW8TqwQRELshkvIfabbtKU0xVye73ctuSfAnG1Ag=s2560)

[![d-man1212/Delictionary - GitHub](https://gh-card.dev/repos/d-man1212/Delictionary.png?fullname=)](https://github.com/d-man1212/Delictionary)

Delictionary is a comprehensive recipe finder web application designed to simplify your culinary adventures and enhance your cooking experience.

 It uses the Edamam Recipe Search API to fetch recipe data and provides users with a list of recipes along with their details and links to the original recipes.

 
## 🛠️ Edamam API Reference

#### Recipe Search

```http
  GET /api/recipes/v2 
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `query`   | `string` | **Required**. Your query   |
| `app_key` | `string` | **Required**. Your App key |
| `app_id`  | `string` | **Required**. Your App id  |



## 🚀 Demo

Live Demo: 
https://auth---production-b5c12.web.app/

GitHub Pages (Slow Authentication): 
https://d-man1212.github.io/Delictionary/



## ✨ Features

- **User Authentication:** Secure user authentication using Firebase Authentication.

- **Recipe Search:** Easily find recipes based on keywords.

- **Pagination:** Browse through multiple pages of search results effortlessly.

- **Detailed Recipe Information:** View recipe details, including images, calories, and ingredients.

- **Original Recipe Source:** Access links to the original recipe source for detailed instructions.


## 🛠️ Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_FIREBASE_API_KEY`

`VITE_FIREBASE_AUTH_DOMAIN`

`VITE_FIREBASE_PROJECT_ID`

`VITE_FIREBASE_STORAGE_BUCKET`

`VITE_FIREBASE_MESSAGING_SENDER_ID`

`VITE_FIREBASE_APP_ID`

`VITE_EDAMAM_APP_ID`

`VITE_EDAMAM_APP_KEY`

`VITE_INSTAGRAM_URL`

`VITE_GITHUB_URL`

`VITE_LINKEDIN_URL`
## Run Locally

Clone the project

```bash
  git clone https://github.com/d-man1212/Delictionary.git
```

Go to the project directory

```bash
  cd Delictionary
```

Install dependencies

```bash
  npm install
```
Set up the environment variables in a .env file.

Start the server

```bash
  npm run dev
```

The app will be available at `http://localhost:5713`.


## ✨ Future Plans

- **Save Recipes:** Implement user profiles where users can save their favorite recipes, create collections, and share their cooking journey with others.

- **Advanced Search Filters:** Enhance the recipe search functionality with advanced filters such as dietary preferences, cuisine type, cooking time, and more.

- **Social Sharing:** Enable social sharing of recipes, making it easy for users to share their favorite dishes with friends and family.
  
- **Responsive Design:** There are plans to make the web application responsive to ensure it works well on various devices, including mobile phones and tablets. 
