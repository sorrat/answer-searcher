# A solution of test task

```
Full Stack Live Coding Exercise

Scenario
Create a python web application with a form that allows a user to enter a search string, queries Stack Exchange to find questions with titles containing that string, and display the results.

Requirements
Display the results in a tabular format showing at least the date of the question, its title and who posted it.
If the question has been answered, use a visual style to differentiate it from unanswered questions.
The displayed item should have a means to navigate to the original question on Stack Exchange.

Expectations
Treat this project as you would any professional task - feel free to ask questions, clarify requirements, and talk about your design and thinking with the team, but as in the real world, time is limited.
You may use any resource, library, example code or documentation you can find on the web.

Documentation
Stackoverflow API
http://api.stackexchange.com/docs/search#order=desc&sort=activity&intitle=java&filter=default&site=stackoverflow&run=true
```

## How to run the project

Language versions:
```
nodejs v6.1.0
python v3.5.1
```

1) Install dependencies:
```
cd client
npm install
```
```
cd server
pip install -r requirements.txt
```

2) Start the server:
```
cd server
uwsgi config.ini
```

3) Open `http://localhost:8020` in browser
