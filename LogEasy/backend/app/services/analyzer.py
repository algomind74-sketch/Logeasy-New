import pandas as pd
import re

def analyze_logs(log_data):
    """Analyze log content and summarize key insights."""
    # Convert to DataFrame
    df = pd.DataFrame(log_data, columns=["timestamp", "level", "message"])

    total = len(df)
    errors = len(df[df["level"].str.contains("ERROR", case=False)])
    warnings = len(df[df["level"].str.contains("WARN", case=False)])
    infos = len(df[df["level"].str.contains("INFO", case=False)])

    summary = {
        "total_logs": total,
        "errors": errors,
        "warnings": warnings,
        "info": infos,
        "error_rate": round((errors / total) * 100, 2) if total else 0,
    }

    return summary