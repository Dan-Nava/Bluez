
## To run the application

### Start the backend server

`cd express-app`

`npm install`

`npm start`

### Start the frontend

`cd react-app`

`npm install`

`npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Backend will be on [http://localhost:5000](http://localhost:5000)


# Application utilization instructions

### UI Description:
The UI is divided into 3 main sections: The left side is used to display the current playlist with a search bar to populate the playlist with new songs. The right side displays information about the current song that is playing if there is indeed a song playing at the moment. The center section is a multi-function display thart is used to show information based on what "mode" the user is in. 

The modes of the app can be navigated between once the user has logged into the application. The four modes are album art mode, where the user can simply view the album art that is play similar to the basic function of most streaming apps; video mode, which plays the music video of the currently playing song; lyric mode, where the user can view the lyrics scroll by in real time with the playing of the song; and chords mode, where the user can view the chords of the currently playing song so that they can play along on an instrument while the song is playing. Navigation between the modes is done by using the tabs with the respective names on the bottom bar of the screen.

The progress bar is located at the bottom of the screen and updates to show the user where they are in the song. Playback control buttons allow the user to play, pause, seek forwards and backwards, change the volume, and loop the current song. 

The two buttons located at the top right of the screen show the log in and log out buttons. If the user logged in with "user" credentials, then the account button will take them to their profile. If the user logged in with "admin" options, then the same button will show them admin options. The log out button logs the user/admin out of the current session.

### On Startup:
On startup users will be redirected to the login page. Upon logging in with user credentials, the user will be allowed to perform all the functionalities as described above. Upon loggin in with admin credentials, admin functionality will be shown. 

### User Functionality:
To log into a user account use: `USERNAME: user`, `PASSWORD: user`.
Users will have access to all 4 views and their user profile which is accessible from the top right account button. 

In Album Art mode users can enjoy a minimalist approach to listening to music, with the view being dedicated to
just the cover art of the current song. The left pane and right panes here will be the same as in Video mode.

In Video mode users can view the music video of the song they are currently listening to by using the music player
buttons as usual. The left pane will include the current playlist of the user and a search bar in which the user can use to add more songs to their playlist. The right pane will have the info of the current song being played.

In Lyric mode users can view the lyrics of the song they are currently listening to onscreen and see it scroll across the screen synced to the speed of the song.

In Musician Mode users can view the current chords of the song and see it scroll in real time with the song. 

### Admin Functionality:
To log into an admin account use: `USERNAME: admin`, `PASSWORD: admin`. 
Admins have access to all general user functionality with the added bonus of being able to access the Admin Dashboard
through the navigation menu.

Upon navigating to the admin dashboard, an admin can select manage users or manage music.

For managing users admins can use the search function to look for specific users based on names, which is a good way to
find any users with potentially offensive names. In addition admins can ban other user accounts, rendering those accounts
unable to be logged into until the ban is reversed. Admins can also edit user accounts and change the user's username, password and current profile picture.

For managing music admins will be able to look through their current database of songs and filter through them using the search bar.
For existing songs admins can delete them which will completely remove them from the database, or edit them which will let admins change all the basic information of a song including the cover art.
Admins can also add new songs by selecting the ADD SONG button, here they will be taken to a new menu where they must input all the basic information for the song and upload the cover art, sound file and lyric file.

# Express Routes

## Authentication

`POST /login` takes in a JSON object with attributes `username` and `password`. i.e. `{username:string, password:string}`. Returns `{token:string}` upon successful login. The token will be used for user specific infomation access.

`POST /logout` takes in  `{username:string, token:string}` to logout a user.

`POST /isLoggedIn` takes in  `{username:string, token:string}` to check if a user is logged in.

`GET /accessLevel?token=token` returns the access level of a user: -1:banned, 0:regular, 1:admin.

## Registration

`POST /register` takes in `{username:string, password:string}` to register a user. If the user name is already registered, `{message: 'Username already taken'}` will be returned with a status code of 4000.

## Admin

** For admin endpoints, the token provided must be associated with an admin account. i.e. Access level == 1 b**

`GET /admin/users?token=token` returns all users. 

`POST /admin/ban` takes in `{username:string, token:string}` to ban a user. i.e. change the access level of that user to -1

`POST /admin/restore` takes in `{username:string, token:string}` to unban or downgrade an admin to a regular user.

`POST /admin/add` takes in  `{username:string, token:string}` to make an user admin.

## Account

`GET /account/:attr` takes in one of the attributes: info, avatar, hero, playlist, favorites. Return the corresponding info.

`POST /account/update` takes in `{token:string, newValues:{newValues}}` to update an account based on the provided newValues

## Music

`GET /music/all` return all music names

`GET /music/info?name=name` return a music's info

`GET /music/lyrics?name=name` return a music's lyrics

`GET /music/chords?name=name` return a music's chords

`GET /music/audio?name=name` return a music's audio

`GET /music/video?name=name` return a music's video

`GET /music/albumArt?name=name` return a music's albumArt



