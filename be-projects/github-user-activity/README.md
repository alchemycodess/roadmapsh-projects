# GitHub User Activity CLI

1. One line description
A simple command-line tool that fetches and displays recent GitHub user activity using the GitHub API

2. Why this project?
- To focus on core backend skills instead of UI
- To understand fetch and its async behavior
- To understand what fetch returns (promises)
- To learn how to handle errors when promises fail and how to handle output
- To learn how to think about edge cases and handle it gracefully
- To understand how APIs work
- To understand how to parse JSON and make it human readable

3. What it does?

- Accepts a GitHub username from the command line
- Fetches the recent activity from GitHub API
- Converts the JSON into human readable output
- Handles errors if the username does not exist

4. How to run it

Prerequisites:
- (Node.js)
Run:
- node script github-activity <username>
Example:
- node script github-activity alchemycodess

5. Example output

if we run:
node script github-activity kamranahmedse
Output:
Starred remorses/playwriter
Starred kamranahmedse/claude-run
Closed an issue in kamranahmedse/developer-roadmap
Closed an issue in kamranahmedse/developer-roadmap

6. Error handling 

- Missing username
output:
Usage: github-activity <username>
- Invalid username
output:
User not found
- API errors are handled gracefully

7. What I learned?

- Fetch and its async behavior and what it returns (a promise)
- How promises work using .then() and .catch()
- How to throw and handle errors
- Another way to use fetch using async/await