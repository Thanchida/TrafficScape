import joblib
import os

MODEL_DIR = "traffic_model/models"
SCALER_DIR = "traffic_model/scalers"


def load_model(target):
    model_path = os.path.join(MODEL_DIR, f"{target}_model.pkl")
    return joblib.load(model_path)

def load_scaler():
    scaler_path = os.path.join(SCALER_DIR, "scaler.pkl")
    return joblib.load(scaler_path)

def predict(input_data):
    targets = [
        "current_speed",
        "free_flow_speed",
        "current_travel_time",
        "free_flow_travel_time"
    ]
    scaler = load_scaler()
    X_scaled = scaler.transform(input_data)

    result = {}
    for target in targets:
        model = load_model(target)
        result[target] = round(float(model.predict(X_scaled)[0]), 2)
    return result
