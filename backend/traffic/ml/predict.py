import joblib
import pandas as pd
from sklearn.preprocessing import MinMaxScaler

def predict(input_data):
    targets = [
        "current_speed",
        "free_flow_speed",
        "current_travel_time",
        "free_flow_travel_time"
    ]

    prediction_result = {}

    for target in targets:
        model = joblib.load(f'models/{target}_model.pkl')
        scaler = MinMaxScaler()
        
        print(input_data)
        df_new_scaled = scaler.fit_transform(input_data)
        print(df_new_scaled)

        prediction = model.predict(df_new_scaled)
        prediction_result[target] = round(prediction[0], 2)
        clean_result = {k: float(v) for k, v in prediction_result.items()}
    return clean_result
