![RiSStenUP](https://user-images.githubusercontent.com/51678140/71005169-2dec9100-20b1-11ea-86c5-586b0c1e22e6.png)

# RiSStenUP!

## Description
The RiSStenUP program is a web application program that allows users to pull up the latest articles on the professional sports teams in Charlotte, NC and allows the option of having these articles read aloud to them by the device they are using. These teams are the Carolina Panthers (NFL), the Charlotte Hornets (NBA) and the Charlotte Knights (Triple A Baseball).

Demo: https://fast-ravine-51004.herokuapp.com/

![RiSStenUPpage](https://user-images.githubusercontent.com/51678140/71005282-68562e00-20b1-11ea-87d1-f93b92fe4c38.jpg)

## How it Works

First you must Log In, or create a Log In (register) using your email address if you have not already done so. Then choose the team you wish to get the latest information for using the list on the left side of the screen. The application will pull in the latest articles from the team web site when the team name is clicked. These articles will be updated anytime the page is refreshed. Then click on the article of your choice. The print version of the article will appear in the box on the right of the web page. You can simply read the article or you can choose to use the audio version by clicking on the text of the article. This will trigger the computer audio to read the article aloud for you. The program uses the RSS feed from the team web site to do this. Ideal if you are in a situation where reading the article is not possible due to other activities.

## Registration Page

![RissReg](https://user-images.githubusercontent.com/51678140/72665691-dce5fa80-39d8-11ea-8beb-1905d91436f0.jpg)

## Log In Page

![RissLog](https://user-images.githubusercontent.com/51678140/72665724-09017b80-39d9-11ea-91c0-7fc2d5619e2d.png)

## Programs

RisstenUP is a React based program that also uses Mongoose, Javascript, HTML, CSS, JSON, Bootstrap, Axios, Express, and Cheerio (as well as a few others).

## Bugs

Need to add a 'Play', 'Pause' and 'Stop' to the audio. Currently no way to stop audio from finishing reading the article.
