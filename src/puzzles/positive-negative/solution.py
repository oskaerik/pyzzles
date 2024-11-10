import sys

def trace(frame, *_):
    frame.f_globals["x"] = 1

sys.settrace(trace)
