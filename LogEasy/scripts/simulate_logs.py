import random
import datetime
import os

LOG_TYPES = ["INFO", "WARNING", "ERROR", "DEBUG"]
SERVICES = ["payments", "auth", "network", "transactions", "kyc"]

def generate_log_line():
    log_type = random.choice(LOG_TYPES)
    service = random.choice(SERVICES)
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    message = f"{service.upper()} {log_type}: Simulated message for {service} service"
    return f"[{timestamp}] {message}"

def generate_logs(n=10000, output_file="data/sample_logs/simulated.log"):
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, "w") as f:
        for _ in range(n):
            f.write(generate_log_line() + "\n")
    print(f"✅ Generated {n} logs in {output_file}")

if _name_ == "_main_":
    generate_logs(50000)