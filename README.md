# TrafficScape
## Members
Nichapat Sirinantanakul 6610545286 Software and Knowledge Engineering, Kasetsart University  
Thanchida Amornpitakwong 6610545812 Software and Knowledge Engineering, Kasetsart University

## Overview
This web application integrates real-time weather data with traffic flow insights from the TomTom API to analyze their correlation. It utilizes machine learning to accurately predict traffic conditions based on weather patterns.

## Features
- Insights (Weather Vs Traffic)
- Statistic (Weather)
- Predict traffic based on weather

## Libraries & Tools

### Backend

- **Python** 3.10+ *(recommended)*
- Django Framework
- Dependencies listed in `backend/requirements.txt`

### Frontend

- **Next.js** 15
- **React** 19
- Tailwind CSS
- Cypress for UI Testing
- Dependencies listed in `frontend/package.json`

## Installation
You can follow this installation guide [here](Installation.md)

## Running the Application
default server is [localhost:3000](http://localhost:3000/)

**Run the Backend Development Server**
1. Navigate to the Backend directory
```commandline
cd backend
```
2. Run Backend server
```commandline
python3 manage.py runserver
```

**Run the Frontend Development Server**
1. Navigate to the Frontend directory
```commandline
cd frontend
```
2. Run Frontend server
```commandline
npm run dev
```

## Project Documents
All project documents are in the [Project Wiki](../../wiki/Home).

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.