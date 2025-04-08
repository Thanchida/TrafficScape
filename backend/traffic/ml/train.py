import os
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from mysite.db import pool


def get_data():
    with pool.connection() as conn, conn.cursor() as cs:
        try:
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
            df = pd.DataFrame(data)
            print(df)
            return df
        except KeyError:
            print("can't fetch data from database")


def train_model():
    df = get_data()
    X = df[['pm2_5', 'light', 'humidity', 'temperature']]
    y = df[['current_speed', 'free_flow_speed', 'current_travel_time', 'free_flow_travel_time']]

    scaler = MinMaxScaler()
    X_scaled = scaler.fit_transform(X)
    print('check: ', X_scaled)

    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

    target_columns = y.columns
    models = {}
    predictions = {}

    if not os.path.exists('scalers'):
            os.makedirs('scalers')

    if not os.path.exists('scalers/scaler.pkl'):
        joblib.dump(scaler, 'scalers/scaler.pkl')

    for target in target_columns:
        print(f"Training model for: {target}")
        y_train_single = y_train[target]
        y_test_single = y_test[target]

        model = GradientBoostingRegressor(
            n_estimators=200,
            learning_rate=0.1,
            max_depth=5,
            random_state=42
        )
        model.fit(X_train, y_train_single)
        y_pred = model.predict(X_test)

        mae = mean_absolute_error(y_test_single, y_pred)
        mse = mean_squared_error(y_test_single, y_pred)
        r2 = r2_score(y_test_single, y_pred)

        print(f"--- {target} ---")
        print(f"MAE: {mae:.2f}")
        print(f"MSE: {mse:.2f}")
        print(f"R²: {r2:.3f}\n")

        models[target] = model
        predictions[target] = y_pred

        if not os.path.exists('models'):
            os.makedirs('models')

        if not os.path.exists(f'models/{target}_model.pkl'):
            model.fit(X_train, y_train_single)
            joblib.dump(model, f'models/{target}_model.pkl')
        else:
            print(f"Model for {target} already exists, skipping training.")


