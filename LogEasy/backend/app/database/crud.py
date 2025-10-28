def insert_log_entry(db, service, level, message, timestamp):
    new_log = Log(service=service, level=level, message=message, timestamp=timestamp)
    db.add(new_log)
    db.commit()