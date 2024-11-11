import uuid

fixed = uuid.uuid4()
uuid.uuid4 = lambda: fixed
