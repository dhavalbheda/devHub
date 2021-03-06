# `DevHub`
![](https://img.shields.io/badge/Node.js-v12.17.0-green)
![](https://img.shields.io/badge/express-v4.17.1-red)
![](https://img.shields.io/badge/React-v16.13.1-blue)
![](https://img.shields.io/badge/Mongoose-v5.10.7-brightgreen)




[**Click Here To Visit**](https://dhavalbheda.github.io/devHub/) - [**https://dhavalbheda.github.io/devHub/**](https://dhavalbheda.github.io/devHub/)

DevHub Is A Web App. Where, People Can Create Their Profile, Share Posts And Get Help From Other People.

## How To Run

* First Clone Project
  
* Go to Client And Server and Run **npm install**

### `npm install`
It will install all the project's dependancies.

* Go to Server folder and Run **npm run dev**

### `npm run dev`

It will run Server at **5000 Port** Client at **3000 Port**

* Server will run : <span style='color:blue'>http://localhost:5000</span>

* Client will run : <span style='color:blue'>http://localhost:3000</span>



***
**Note**
* Before Perform Above Task,  User Have To Perform Following Step:

* 1. create **config** folder in server dir.
* 2. create default.json file in config folder
* 3. create json object with 4 key

**mongoURI** :- Atlas Connection String

**jwtToken** :- JWT Token Secret

**githubid** :- GitHub OAuth App Client ID (For Showing User Git Repo, Need to Create OAuth App) 

**githubSecret** :- GitHub OAuth App Client Secret

*Example*

* config/default.json 

{
    
    "mongoURI": <Atlas_Connction_String>,
    "jwtToken": "JWT_Token_Secret",
    "githubid": <ClientID>,
    "githubSecret": <ClientSecret>  
    
}