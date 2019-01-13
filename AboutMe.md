ABOUT ME

I am Karanpreet Singh from Cse branch, IIT Roorkee
I want to describe here my whole experience in building this app.

I first started with short hand knowledge of cross platform mobile development , i came to know about react native , flutter, xamarin.
Reactnative caught my interest so started learning it even before droid wars started.
It was great opportunity for me as learning javascript and knowing the various libraries in reactnative.
I found a course on udemy.com lectures by Stephen Grinder
I spend the first 20 days of vacations learning this.
I was glad to know the droid wars provide an opportunity to build an application in reactnative
I was overwelhmed so i started with WarTube.
First I started with frontend, designing the home page, login page, comments sections.
The problem that i faced was making the api request to fetch the data of the top two channels of youtube.First I had to generate api key which I created using google credentials. I first used axios to make request but caught the error "bad request".
Since i was beginner so got much confused started searching on net/stack overflow.
Then I used youtube-v3-api library of react-native, this time i succeeded.
To make my stats page dynamic I used life cycle method componentWillUpdate
The next challenge was authentication with firebase.Started reading docs of firebase so managed to get through this.I found reactnative provides a library react-fire for integrating with firebase but later got to know the library is not maintained.So integrated manually.
My next challenge was to keep logged in user.For this I read in reactnative docs and found AsyncStorage can be used for this.
Now, I started with posts section integrating with firebase database could complete this section.
In reactnative the ListView completed is now replaced by FlatList/SectionList so I have used FlatList here.
The next problem was navigation  using tabswhich I was using Reactnavigation after removing whole lots of errors. 
Thus basic structure was complete.
So I could now add-ons to my app.
I was able add bar chart using react-native-charts-wrapper library.
My next target to upload and show the image in comments .
I got to know that image as input/output in reactnative in procesed in form of blobs so here RNfetch Blob came to rescue and using this and Image picker accomplished my task.
I tried much to login using facebook and google , however could not achieve this.
So this is my approx. one month journey in completing this app and learning wonderful things.

