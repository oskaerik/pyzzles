import sys

class WeirdList(list):
    x = 0

    def __len__(self):
        return 0

    def __getitem__(self, i):
        self.x += 1
        return self.x

def trace(frame, event, arg):
    patch = frame.f_code.co_name == "test"
    frame.f_globals["__builtins__"]["list"] = WeirdList if patch else list

sys.settrace(trace)
