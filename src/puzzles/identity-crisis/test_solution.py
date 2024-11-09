from solution import X

def test():
    a = X()
    b = X()

    assert a is not b
    assert id(a) == id(b)