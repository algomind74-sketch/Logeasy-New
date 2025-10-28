# import random
# import datetime
# import os

# LOG_TYPES = ["INFO", "WARNING", "ERROR", "DEBUG"]
# SERVICES = ["payments", "auth", "network", "transactions", "kyc"]

# def generate_log_line():
#     log_type = random.choice(LOG_TYPES)
#     service = random.choice(SERVICES)
#     timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
#     message = f"{service.upper()} {log_type}: Simulated message for {service} service"
#     return f"[{timestamp}] {message}"

# def generate_logs(n=10000, output_file="data/sample_logs/simulated.log"):
#     os.makedirs(os.path.dirname(output_file), exist_ok=True)
#     with open(output_file, "w") as f:
#         for _ in range(n):
#             f.write(generate_log_line() + "\n")
#     print(f"✅ Generated {n} logs in {output_file}")

# if _name_ == "_main_":
#     generate_logs(50000)
#--------------------------
import random
import os
from datetime import datetime

LOG_DIR = "data/sample_logs/"
os.makedirs(LOG_DIR, exist_ok=True)

LEVELS = ["INFO", "WARNING", "ERROR", "DEBUG"]
SERVICES = ["AuthService", "PaymentService", "NetworkService"]

def generate_log_line():
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    level = random.choice(LEVELS)
    service = random.choice(SERVICES)
    message = f"{timestamp} [{level}] {service} - Simulated log message"
    return message

def generate_log_file(filename="simulated.log", num_lines=100):
    path = os.path.join(LOG_DIR, filename)
    with open(path, "w") as f:
        for _ in range(num_lines):
            f.write(generate_log_line() + "\n")
    print(f"Generated log file: {path}")

if __name__ == "__main__":
    generate_log_file()
