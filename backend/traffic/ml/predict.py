import joblib
import os

MODEL_DIR = "traffic_model/models"
SCALER_DIR = "traffic_model/scalers"

def predict(input_data):
    targets = [
        "current_speed",
        "free_flow_speed",
        "current_travel_time",
        "free_flow_travel_time"
    ]

    prediction_result = {}
    scaler_path = os.path.join(SCALER_DIR, "scaler.pkl")
    scaler = joblib.load(scaler_path)
    for target in targets:
        model_path = os.path.join(MODEL_DIR, f"{target}_model.pkl")
        model = joblib.load(model_path)
        df_new_scaled = scaler.transform(input_data)
        prediction = model.predict(df_new_scaled)
        prediction_result[target] = round(prediction[0], 2)
        clean_result = {k: float(v) for k, v in prediction_result.items()}
    return clean_result
