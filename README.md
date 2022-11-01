# react-app

1. Download pgAdmin (https://www.pgadmin.org/download/)
2. Create database react_app_db

![image](https://user-images.githubusercontent.com/63109870/199123581-a916fa24-7147-4bdd-9f35-eb756e6bbfb5.png)

3. Create terminal#1 and go to server folder
4. Run "npm i" and "npm run dev" in command line
5. Create terminal#2 and go to client folder
6. Run "npm i" and "npm start" in command line

Description.  
Server: Node JS, Express  
DataBase: Sequelize, PostgreSQL  
JWT with hash on password (bcrypt)  
Front: React, MobX, Axios, SASS, Webpack

By default Every user has role ADMIN.  
Server checks https://lifehacker.com/rss for new posts every 10 min.  

Main Page:  
 * Search input makes search by post title.  
 * "Select category" filters posts list by category.  
 * Posts list has pagination.  
 * By click on post user goes to Post Page.   

Post Page:  
 * Page has back button.  
 * By click on category user goes to list of posts with that category.  
 * Post full info.     

Admin Page:  
 * Page has modals for creating categories and posts.  
 * Tables for categories and posts with delete buttons.  
 * Posts table has pagination.  

Screenshots:
![image](https://user-images.githubusercontent.com/63109870/199132559-70eb2fa7-810c-4678-a522-53aed0319b14.png)
![image](https://user-images.githubusercontent.com/63109870/199131342-1baa5457-67c0-4ce8-81f1-7049443873d6.png)

