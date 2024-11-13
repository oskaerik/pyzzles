def test():
    from solution import Base

    class Dict(Base):
        foo = 1
        bar = 2

    assert Dict["foo"] == 1
    assert Dict["bar"] == 2
