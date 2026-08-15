import pandas as pd
import numpy as np
import random
import os

def generate_traffic_data(num_samples=1000, output_path='../data/nagpur_traffic_data.csv'):
    """
    Generates synthetic traffic data for Nagpur and saves it to a CSV.
    """
    try:
        # Define categories
        time_of_day = ['Morning Rush', 'Afternoon', 'Evening Rush', 'Night']
        weather_conditions = ['Clear', 'Rainy', 'Foggy', 'Cloudy']
        road_types = ['Highway', 'Arterial', 'Local', 'Intersection']
        
        # Generate random data
        np.random.seed(42) # For reproducibility
        
        data = {
            'Time_of_Day': np.random.choice(time_of_day, num_samples),
            'Weather_Condition': np.random.choice(weather_conditions, num_samples),
            'Road_Type': np.random.choice(road_types, num_samples),
            'Vehicle_Count': np.random.randint(50, 500, num_samples),
            'Historical_Accident_Rate': np.round(np.random.uniform(0.1, 5.0, num_samples), 2)
        }
        
        df = pd.DataFrame(data)
        
        # Define logic for Risk_Score based on features
        # Higher vehicle count, bad weather, night time, and high historical accidents increase risk
        
        # Base risk from accident rate (scaled up)
        risk = df['Historical_Accident_Rate'] * 10
        
        # Weather impact
        weather_impact = {'Clear': 0, 'Cloudy': 5, 'Rainy': 20, 'Foggy': 25}
        risk += df['Weather_Condition'].map(weather_impact)
        
        # Time of day impact
        time_impact = {'Morning Rush': 15, 'Afternoon': 5, 'Evening Rush': 20, 'Night': 10}
        risk += df['Time_of_Day'].map(time_impact)
        
        # Road type impact
        road_impact = {'Highway': 10, 'Arterial': 5, 'Local': 0, 'Intersection': 15}
        risk += df['Road_Type'].map(road_impact)
        
        # Vehicle count impact (normalize and scale to max 20)
        risk += (df['Vehicle_Count'] / 500) * 20
        
        # Add some random noise
        risk += np.random.normal(0, 5, num_samples)
        
        # Clip to 0-100 range
        df['Risk_Score'] = np.clip(risk, 0, 100).round(2)
        
        # Create output directory if it doesn't exist
        os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
        
        # Save to CSV
        df.to_csv(output_path, index=False)
        print(f"Successfully generated {num_samples} rows of synthetic traffic data.")
        print(f"Data saved to: {os.path.abspath(output_path)}")
        
    except Exception as e:
        print(f"An error occurred during data generation: {e}")

if __name__ == "__main__":
    # The script should be run from within the ai_engine/ folder
    # We will resolve the path relative to the script's location to be robust
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_file = os.path.join(script_dir, '..', 'data', 'nagpur_traffic_data.csv')
    generate_traffic_data(num_samples=1000, output_path=output_file)
