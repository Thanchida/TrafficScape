import os
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from mysite.db import pool

MODEL_DIR = "traffic_model/models"
SCALER_DIR = "traffic_model/scalers"

def get_data():
    with pool.connection() as conn, conn.cursor() as cs:
        cs.execute("""
            SELECT light, temperature, humidity, pm2_5, current_speed, free_flow_speed, current_travel_time, free_flow_travel_time
            FROM test_combine
        """)
        result = cs.fetchall()
        data = {
            "light": [row[0] for row in result],
            "temperature": [row[1] for row in result],
            "humidity": [row[2] for row in result],
            "pm2_5": [row[3] for row in result],
            "current_speed": [row[4] for row in result],
            "free_flow_speed": [row[5] for row in result],
            "current_travel_time": [row[6] for row in result],
            "free_flow_travel_time": [row[7] for row in result]
        }
        return pd.DataFrame(data)

def train_model():
    df = get_data()
    X = df[['pm2_5', 'light', 'humidity', 'temperature']]
    y = df[['current_speed', 'free_flow_speed', 'current_travel_time', 'free_flow_travel_time']]

    os.makedirs(SCALER_DIR, exist_ok=True)
    os.makedirs(MODEL_DIR, exist_ok=True)

    scaler_path = os.path.join(SCALER_DIR, "scaler.pkl")

    if not os.path.exists(scaler_path):
        scaler = MinMaxScaler()
        X_scaled = scaler.fit_transform(X)
        joblib.dump(scaler, scaler_path)
    else:
        scaler = joblib.load(scaler_path)
        X_scaled = scaler.transform(X)

    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

    for target in y.columns:
        print(f"Training model for: {target}")
        model_path = os.path.join(MODEL_DIR, f"{target}_model.pkl")

        if os.path.exists(model_path):
            print(f"{target} already trained. Skipping.")
            continue

        y_train_single = y_train[target]
        y_test_single = y_test[target]

        model = GradientBoostingRegressor(
            n_estimators=200,
            learning_rate=0.1,
            max_depth=5,
            random_state=42
        )
        model.fit(X_train, y_train_single)
        joblib.dump(model, model_path)

        y_pred = model.predict(X_test)
        print(f"{target} MAE: {mean_absolute_error(y_test_single, y_pred):.2f}, "
              f"R²: {r2_score(y_test_single, y_pred):.3f}")
