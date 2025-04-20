## Installation Guide
1. Clone the repository
```commandline
git clone https://github.com/Thanchida/TrafficScape.git
```

### Backend Installation
1. Navigate to the Backend directory
```commandline
cd backend
```

2. Create a virtual environment
```commandline
python3 -m venv env
```

3. Activate the virtual environment
    * On MS Window use
   ```commandline
    \env\Scripts\activate
   ```
   * On macOS and Linux use
   ```commandline
    source env/bin/activate
   ```

4. Install the requirements package
```commandline
pip install -r requirements.txt
```

5. Set value for externalized variable
   * On MS Window use
      ```commandline
       copy sample.env .env
      ```
   * On macOS and Linux use
     ```commandline
      cp sample.env .env
     ```
After that, change the values in the .env file.

6. Run migrations
```commandline
python3 manage.py migrate
```

7. Run the Backend Server
```commandline
python3 manage.py runserver
```

### Frontend Installation
1. Navigate to the Frontend directory
```commandline
cd frontend
```
2. Install Dependencies
```commandline
npm install
```
3. Run the Frontend Development Server
```commandline
npm run dev
```

### Node-RED Flow
#### 1. Import the Flow into Node-RED

1. Open your Node-RED.
2. Click the menu (☰) > **Import**.
3. Paste the contents of `my-node-red-flow.json`.
4. Click **Import** to add the flow to your workspace.

#### 2. Update the Traffic API HTTP Request Node

1. Double-click the **Traffic API** node in the flow.
2. Replace `<api-key>` with your actual API key.
4. Click **Done**, then **Deploy** the flow to apply changes.