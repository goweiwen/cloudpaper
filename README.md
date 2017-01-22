# Cloudpaper.

## Introduction
A webapp for collaborative document viewing designed for students to study
together effectively.

## Inspiration
Ever faced the problem where you're desparately trying to direct a friend to a diagram found on your lecture slides?
//my bs fail



## What it does
Cloud paper provides a onlne platform for collaborative learning. 

Simulate a Study Group Session
	Real time update of slide number
	Chat box for discussion
	Drag slides around for organization

Easy sharing of files
	Drag and drop PDF files to upload


## How we built it

## Challenges we ran into
We had trouble with the drag and drop functionality but managed to overcome it eventually.
Settling on a UI that would be most optimal was also a challenge but with the feedback from other hackathon participants we were able to settle on a design.


## Accomplishments that we're proud of
We took this hackathon as an opportunity to implement things we have not tried before. (koa-frameworks, socket.io, PDF.js)
We are proud to have finished the app given the 24 hr timing and we strongly believe that our app can be helpful for student's learning.


## What we learned
As mentioned, this was a learning experience for all of us in terms of software engineering.
We learnt that good planning at the start and well allocation of work load has helped us finish the app on time. 

## What's next for Cloudpaper

Annotation of lecture slides
Whiteboard for diagram drawing
Video Support to view lectures together

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
