# Wix FED Entry Level Exam

Hi there!  
In this exam you will extend and add new features to a simplified ticketing system.
The task's main purpose is to test your ability to learn new topics and deliver high quality digital products. It combines building UI components and a touch of server development as well.

While no previous background is required to complete this task or to apply to this position, we do recommend getting to a basic level on the following subjects:

- JavaScript
- HTML & CSS
- React
- Node.js

## Getting Started

1. Make sure you have _Node.js_ 10 or higher and _npm_ 6 or higher installed
2. Install the project dependencies by running `npm install` from the project's directory (using a terminal)
3. Run the project by running `npm start`

You should now have the development version running on your computer and accessible via http://localhost:3000

## Tasks

The exam is split into 3 parts. The first part is about adding UI functionality. The second part goes a bit broader into the client-server integration and business logic.
The third part is about creativity and good "big-picture" intuition.
We also have a 4th part that is only expected from those with previous commercial experience.

**Note that 1d and 2c are bonus tasks**

### Part 1 - Ticket item improvements

1a. Our tickets list is only showing the title. Make it show the content as well, as following:  
![content](https://d2x3xhvgiqkx42.cloudfront.net/3d412e82-d97e-487e-b1a3-41a6bd24a05b/b9bd9ddb-c0bf-4b55-888e-747f0d6524c8/2019/09/27/6fec98b0-c9cd-4583-ac9f-eaf8983c4061/6043b7ba-e795-4807-8aca-9f693c0450eb.png)

1b.
Some agents want an option to pin some tickets
Add a pin button or text that will pin to top the tickets from view. Make sure there is an option to restore it as well.
use "pin" and "unpin" as the text for those different states

1c.
Our ticket's data _might_ also contain labels (tags), but we're not making use of them in our UI.
Fix that by adding the labels according to the following design below.
PS: feel free to add more labels to the data (data.json) if you need.
![labels](https://d2x3xhvgiqkx42.cloudfront.net/3d412e82-d97e-487e-b1a3-41a6bd24a05b/b9bd9ddb-c0bf-4b55-888e-747f0d6524c8/2019/09/27/6d307660-953a-4e00-a28d-ffbc48e68fb8/5d422571-d37c-4890-9837-4f786f1e5e10.png)

#### 1D - Bonus Task

d. **Bonus** Step _a_ wasn't enough - some tickets have long content. Add a show more / show less functionality when the content exceeds 3 lines, as following:  
![show more/less](https://d2x3xhvgiqkx42.cloudfront.net/3d412e82-d97e-487e-b1a3-41a6bd24a05b/b9bd9ddb-c0bf-4b55-888e-747f0d6524c8/2019/09/27/fd41c164-d566-471e-9723-e785b313845a/738cbaa0-93e8-4f02-861d-6fab92c608bd.gif)

### Part 2 - List functionality

2a.
Agents are complaining that our search functionality isn't working properly.
They gave the example that when searching for "wix store", the ticket titled "Search bar for my wix store" (id `6860d043-f551-58c8-84d6-f9e6a8cb0cb2`) is not returned.
Checking the data, that ticket does exist...

1.Add a query param `?search=` to the `/tickets` API call and implement it on the server side.
2.Connect your client side search bar to that API call

2b. We're showing only 20 tickets but agents can swear there are more. Solve this problem.  
**Keep in mind the number of tickets is planned to grow exponentially very soon so make sure to think of a proper solution.**

#### 2c - Bonus Task

c. **Bonus** There is a need to find tickets created before/after a certain date, and our designer is on vacation to design proper UI for it. Change the search functionality so that when searching for `after:27/09/2019 api`, only tickets matching the word "api" created _after_ 27/09/2019 will show. Add support for `before:[DATE]` and `from:[EMAIL]` as well.

### Part 3 - Your extra touch

Think of a small addition to this project and make it happen. If you need inspiration, you can check out our real ticketing app at https://wix.com/wixanswers and grab some ideas from there ;)
It should involve adding something to the UI, or server (or both!).
A good rule of thumb for the effort here is that it should not exceed the time that it took you to perform Part 2.  
_Please describe the feature you've added on your email back to us_

_Note:_ this step is also mandatory.

### Part 4 - [Previous experience only] Automated testing

**If you do not have previous experience in web development, you can skip this part.**
Otherwise, it is mandatory.

a. Add at least 3 automated browser tests using puppeteer, testing key features of your choice.
b. Add component tests (using `jest`) to your work from _part 1_.

## General notes

- Test your work well. Think of edge cases. Think of how users will use it, and make sure your work is of high quality
- Stick to the best practices of the libraries used as much as possible
- This task involves both client and server code. Regardless of bonuses and part 3, in the end you should have touched both areas. If you haven't - you probably are not covering all our requirements.
- If you have any questions regarding the task itself or its environment, feel free to ask in the exam's e-mail. For general coding / technology questions, please consult stack overflow, forums and other sources of your choice.

## Submitting

1. Replace `yours@email.com` with your real email address in the `meta.txt` file.
2. Delete any `node_modules` directory from the project.
3. Zip the root directory and send it back to the email you got from us.
4. You can describe your extra touch (part 3), and any general notes you may have.
   Can be anything from challenges to something you feel was not done perfect,
   to something you're specially proud of.

![good luck](https://media.giphy.com/media/12XDYvMJNcmLgQ/giphy.gif)