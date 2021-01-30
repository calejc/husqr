*TODO:*

- Sort posts
- ~~Style profile view with user's data~~
    - ~~Add username and image to header bar~~
    - ~~cards don't go full width?~~
- like/reply button need to update firestore
- style 'close' button on newHusq dialog
- style settings page? 
    - restyle inputs to a more stylish box with a pencil edit button
- Progress spinner
- component lifecycle? router "resolve"?
- friends
<br>
<br>

*COMPLETE:*
- ~~firebase~~
    - ~~add auth check to posting, can only post if logged in!~~
        - ~~new posts show user's data (username, etc)~~
    - ~~decide if we should allow users to create account~~
        - ~~if so, figure this part out~~
        - ~~if not, restyle the login-ui so its only Oauth options~~
    - ~~style login page~~
    - ~~fix redirect~~
- ~~persistent state~~
- ~~show replies under husq~~ 
- ~~refactor posts with just userId. then get user data from user service~~
- ~~union users and post array~~
- ~~make userPosts come through on Profile~~
- ~~Settings page~~
- ~~form validation for registration and settings page~~
- ~~two-way binding on settings page~~
- ~~Show replies on husq card~~
- ~~on account creation, username doc needs to be created~~
- ~~error messages for fire auth methods (email-already-in-use ,, wrong-password)~~
- ~~refactor observableDatabase~~
    - ~~ParentPosts$ and ReplyPosts$, remove AllPosts$~~
- ~~function for collection query with 2 filters~~