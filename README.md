# team39

This project utilizes React.js  (https://github.com/facebook/create-react-app). and Express.js(https://github.com/expressjs/express)

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
The UI is divided into 3 main sections alongside the music player bar and the navigation bar
on the bottom and top of the screen respectively.

The center section is the main window which will change contents whenever a user navigates to another view using
the navigation bar. The 2 panes flanking the main window show supporting information and have additional functionality
based on the current view of the main window.

The 2 leftmost buttons on the navigation bar are account options, from left to right they are: user profile and the admin dashboard respectively.
The next 5 buttons are for switching views, from left to right they are: Video mode, Social mode, Album Art mode, Lyric mode
and Musician mode.

The music player bar has 7 buttons, from left to right they are: loop current song, lower volume,
reverse song by 10sec, play/pause, fast forward song by 10sec, increase volume and mute.

### On Startup:
On startup users will be redirected to the login page. Only the default song can be played through the music
player during this time, but no other functionality is accessible by users that are not logged in.

### User Functionality:
To log into a user account use: `USERNAME: user`, `PASSWORD: user`.
Users will have access to all 5 views, their user profile and the music player.

In the user profile, users will be able to change their profile picture, background image, description and current
favourite songs. If a user is viewing another user's profile, they can instead send a friend request. the right and
left panes will be empty in the user profile.

In Video mode users can view the music video of the song they are currently listening to by using the music player
buttons as usual. The left pane will include the current playlist of the user and a search bar in which the user can use to add more songs to their playlist. The right pane will have the info of the current song being played.

In Social mode users can post anonymous comments in a message board-like window specific to the song they
are currently listening to, whilst the background of the window is populated by a wave-visual representation of the
song as it plays (The wave-visual has been disabled due to a difficult known bug that we have been unable to fully remove. More details on the bug can be found here https://bugs.chromium.org/p/chromium/issues/detail?id=429204. Our intentions are to still include this feature in our final product). The left pane will include the friends list of the user where they can see what each of their friends is currently listening to. The right pane will have the info of the current song being played. 

In Album Art mode users can enjoy a minimalist approach to listening to music, with the view being dedicated to
just the cover art of the current song. The left pane and right panes here will be the same as in Video mode.

In Lyric mode users can view the lyrics of the song they are currently listening to onscreen. By clicking on the
'next' and 'previous' buttons, users can cycle through the lyrics of the entire song. The left pane and right panes here will be the same as in Video mode.

In Musician Mode users can view the current chords of the song and they can transpose it to a key that they want to see the song in. The chords will update accordingly to reflect the key change. The left pane and right panes here will be the same as in Video mode.

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
