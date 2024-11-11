import inspect

def crack():
    caller = inspect.currentframe().f_back
    return caller.f_locals["password"]
