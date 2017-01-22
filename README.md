# Cloudpaper.

## Introduction
A webapp for collaborative document viewing designed for students to study
together effectively.

## Demo
[Try it out here!](http://tinyurl.com/cloudpaper2017)

## What it does
Cloud paper provides a onlne platform for collaborative learning. 

Simulate a Study Group Session
	* Real time synchronised PDF page turning
	* Chat box for discussion
	* Drag slides around for organization

Easy sharing of files
	* Drag and drop PDF files to upload


## How we built it
We used Node.JS with Koa2 and Handlebars. PDFs are rendered clientside using Mozilla's
PDF.js. Communication between server and clients is done using socket.io.

## Challenges we ran into
We initially had trouble with the drag and drop functionality, but managed to overcome it.
Settling on a UI that would be optimal was also a challenge, but we were able to settle on a design with feedback from other participants.

## Accomplishments that we're proud of
We used this hackathon as an opportunity to implement things we have not tried before. (Koa, socket.io, PDF.js)
We are proud to have finished the app within the 24 hours allocated and we strongly believe that our app can be helpful for students' learning.

## What we learned
This was a great learning experience in software engineering for all of us.
We learnt that good planning from the start and well allocation and delegation of work load will help us finish the app on time. 

## What's next for Cloudpaper
Annotation of lecture slides
Whiteboard for diagram drawing
Video Support to view lectures together
Voice communication support
## Deployment 

### Connection Guide

```
For Unix-based Operating systems, do ssh <ip-address> -l <username>. Enter the password thereafter.
Once you're done,

do screen -r cloudpaper (If it doesn't work, find the name of the screen by doing screen -ls.)

Once all is good, you should be able to see the node's console. Ctrl + C followed by the following commands:
lsof -i :3000

and finally,

kill -9 <PID>

This allows us to properly kill the node that was previous active.

Last but not least,

git pull

followed by a yarn start.

```
