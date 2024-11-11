def __getattr__(name, accessed=[]):
    if name != "DoesNotExist":
        return

    if not accessed:
        accessed.append(True)
        raise ImportError

    return lambda: True
