<p align="center">
  <img src="https://user-images.githubusercontent.com/70671308/138619899-f3b6b4c6-4561-4d2b-a728-1d0d96ed0fbe.png" style="width: 35%">
</p>

<p align="center">Best souvenir stories from across the world</p>



<!-- <br></br> -->

https://user-images.githubusercontent.com/70671308/138626519-dbc33dc3-f91a-4c27-b93a-a9db604f741d.gif

## 🔖 About The Project
Best souvenir stories from travellers across the world.

> "A thing that is kept as a reminder of a person, place, or event"

### 🧰 Built with
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>React.Js</li>
  <li>Node.Js</li>
  <li>Express</li>
  <li>MongoDB</li>
  <li>React Mapbox</li>
  <li>styled-components</li>
</ul>

## 📲 Usage

### Frontend

- [x] Upload an image.
- [x] Post a story(title, description).
- [x] View profile page.
- [x] Update profile image, username, email and password.
- [x] User sign-up, sign-in and sign-out.
- [x] View all posts and pins in the database.
- [x] Pin on the map, add a title and a rating.

### Backend
- [x] RESTful.
- [x] User can sign-in via bcrypt.
- [x] Data saved on MongoDB.
- [x] Provide the FE with the required data in a succinct and organized way.

### Stretch Goals

- [x] User can edit and delete post(s).
- [x] Scroll to top of the page.
- [ ] Create a delete profile button
- [ ] Create a share button

## 📊 About the Data
Here's some of the data from MongoDB.

### Pin
```json
{
  "_id": {
    "$oid": "615f475dd99dc71a3407580a"
  },
  "username": "April",
  "title": "New York",
  "rating": {
    "$numberInt": "5"
  },
  "lat": {
    "$numberDouble": "41.07746661624368"
  },
  "long": {
    "$numberDouble": "-74.25950423478662"
  },
  "createdAt": {
    "$date": {
      "$numberLong": "1633634141721"
    }
  },
  "updatedAt": {
    "$date": {
      "$numberLong": "1633634141721"
    }
  },
  "__v": {
    "$numberInt": "0"
  }
}
```

### Post
```json
{
  "_id": {
    "$oid": "617610c59f377659e5f0fb87"
  },
  "title": "New York",
  "desc": "I love the energy and vibrancy that comes with living in one of the world's greatest cities.",
  "photo": "1635127493328new-york.jpg",
  "username": "April",
  "createdAt": {
    "$date": {
      "$numberLong": "1635127493383"
    }
  },
  "updatedAt": {
    "$date": {
      "$numberLong": "1635127706233"
    }
  },
  "__v": {
    "$numberInt": "0"
  }
}
```

### Username
```json
{
  "_id": {
    "$oid": "615f46e2d99dc71a340757fa"
  },
  "username": "April",
  "email": "april@gmail.com",
  "password": "$2b$10$yyRmp9NQt5mJm2YYWeJFb.JW2olz84RhYKXBgEDzxc15RKBDUVo2G",
  "profileAvatar": "1633634054292april.jpeg",
  "createdAt": {
    "$date": {
      "$numberLong": "1633634018833"
    }
  },
  "updatedAt": {
    "$date": {
      "$numberLong": "1633634054463"
    }
  },
  "__v": {
    "$numberInt": "0"
  }
}
```

## 🗂 Project management tool
I used [Notion](https://www.notion.so/a18d357aa6534296b7261ebf01777ded?v=26c531ba78d24c069762ee14d8d0c1a3) because I was already familiar with it and been using it for a while now.
<div>
  <kbd>
  <img width="100%" border="1px solid red" alt="Screen Shot 2021-10-25 at 1 43 33 AM" src="https://user-images.githubusercontent.com/70671308/138640651-c7bad759-3021-4cd5-9ee4-69aff9d405b7.png">
    </kbd>
</div>

## 📄 License
Distributed under the MIT License. See ``LICENSE.md`` for more information.
