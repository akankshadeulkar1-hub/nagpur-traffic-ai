import pandas as pd
import numpy as np
import os
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

def train_and_evaluate_model(data_path, model_output_path):
    """
    Loads traffic data, trains a RandomForestRegressor, evaluates it, and saves the model.
    """
    try:
        if not os.path.exists(data_path):
            print(f"Error: Data file not found at {data_path}")
            print("Please run generate_data.py first.")
            return
        
        print("Loading data...")
        df = pd.DataFrame(pd.read_csv(data_path))
        
        # Define features and target
        X = df.drop('Risk_Score', axis=1)
        y = df['Risk_Score']
        
        # Identify categorical and numerical columns
        categorical_cols = ['Time_of_Day', 'Weather_Condition', 'Road_Type']
        numerical_cols = ['Vehicle_Count', 'Historical_Accident_Rate']
        
        print("Preprocessing data...")
        # Create preprocessing pipelines for numerical and categorical data
        numerical_transformer = StandardScaler()
        categorical_transformer = OneHotEncoder(handle_unknown='ignore')
        
        # Combine preprocessing steps
        preprocessor = ColumnTransformer(
            transformers=[
                ('num', numerical_transformer, numerical_cols),
                ('cat', categorical_transformer, categorical_cols)
            ])
            
        # Create the modeling pipeline
        model = Pipeline(steps=[
            ('preprocessor', preprocessor),
            ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
        ])
        
        # Split data into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        print("Training model (RandomForestRegressor)...")
        # Train the model
        model.fit(X_train, y_train)
        
        print("Evaluating model...")
        # Predict on the test set
        y_pred = model.predict(X_test)
        
        # Calculate metrics
        mse = mean_squared_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)
        
        print("\n--- Model Evaluation ---")
        print(f"Mean Squared Error (MSE): {mse:.2f}")
        print(f"R-squared (R2) Score:     {r2:.2f}")
        print("------------------------\n")
        
        # Save the trained model
        os.makedirs(os.path.dirname(os.path.abspath(model_output_path)), exist_ok=True)
        joblib.dump(model, model_output_path)
        print(f"Model successfully saved to: {os.path.abspath(model_output_path)}")
        
    except Exception as e:
        print(f"An error occurred during model training: {e}")

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    data_file = os.path.join(script_dir, '..', 'data', 'nagpur_traffic_data.csv')
    model_file = os.path.join(script_dir, 'risk_scorer.pkl')
    
    train_and_evaluate_model(data_file, model_file)
