*TODO:*


- Show replies on husq card
- Style profile view with user's data
    - Add username and image to header bar
- like/reply button need to update firestore
- form validation for registration and settings page
- two-way binding on settings page
- theme service
- should settings page show @username instead of @displayName?
- component lifecycle? router "resolve"?
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