class b:
    __getitem__ = lambda *_: b"foo"
    __call__ = lambda *_: b"bar"
    __lt__ = lambda *_: b
    __eq__ = lambda *_: b
    __gt__ = lambda *_: True

__builtins__["b"] = \
__builtins__["foo"] = \
__builtins__["bar"] = \
__builtins__["baz"] = \
__builtins__["_"] = b()
