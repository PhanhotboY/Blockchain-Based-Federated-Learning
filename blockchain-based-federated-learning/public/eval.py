import os
import sys
import json
import torch
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from torch.utils.data import DataLoader, TensorDataset
import pandas as pd
from torch import torch, nn


class MalDetModel(nn.Module):
    def __init__(self, input_size):
        super(MalDetModel, self).__init__()
        self.fc1 = nn.Linear(input_size, 128)
        self.fc2 = nn.Linear(128, 64)
        self.fc3 = nn.Linear(64, 2)  # Output: 2 classes (benign or malware)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = self.fc3(x)
        return x


# Example dataset loader, replace this with your test dataset
def get_test_data(test_dir):
    test = pd.read_csv(test_dir)  # Replace with actual file path
    test = test.apply(lambda x: pd.to_numeric(x, errors="coerce")).dropna()

    X_test = test.iloc[:, :-1].values
    y_test = test.iloc[:, -1].values

    X_test_tensor = torch.tensor(X_test, dtype=torch.float32)
    y_test_tensor = torch.tensor(y_test, dtype=torch.long)

    test_dataset = TensorDataset(X_test_tensor, y_test_tensor)

    return DataLoader(test_dataset, batch_size=64, shuffle=False), X_test.shape[1]


# Load the model
def load_model(model_path, input_size):
    model = MalDetModel(input_size)

    # Load the saved model parameters
    model.load_state_dict(torch.load(model_path, weights_only=True))

    # Set the model to evaluation mode (important for inference)
    model.eval()
    return model


# Evaluate the model
def evaluate_model(model, test_loader):
    all_labels = []
    all_preds = []

    with torch.no_grad():  # Turn off gradient calculation for evaluation
        for data in test_loader:
            inputs, labels = data
            outputs = model(inputs)
            _, predicted = torch.max(outputs.data, 1)
            all_labels.extend(labels.tolist())
            all_preds.extend(predicted.tolist())

    # Calculate evaluation metrics
    accuracy = accuracy_score(all_labels, all_preds)
    precision = precision_score(all_labels, all_preds, average="weighted")
    recall = recall_score(all_labels, all_preds, average="weighted")
    f1 = f1_score(all_labels, all_preds, average="weighted")

    return json.dumps(
        {
            "accuracy": accuracy,
            "precision": precision,
            "recall": recall,
            "f1_score": f1,
        }
    )


# Load and evaluate the model
assert len(sys.argv) > 1, "Model file not provided"

model_path = sys.argv[1]  # Path to the downloaded model file
assert os.path.exists(model_path), "Model file not found"
model_path = model_path  # Path to the downloaded model file
test_loader, input_size = get_test_data(
    "public/test/malware.csv"
)  # Path to the test dataset
model = load_model(model_path, input_size)
evaluation_results = evaluate_model(model, test_loader)

print(evaluation_results)
