def test():
    from solution import Base

    class Dict(Base):
        foo = "bar"

    assert Dict["foo"] == "bar"

    try:
        Dict["bar"]
        assert False
    except KeyError:
        pass

    Dict.bar = "baz"
    assert Dict["bar"] == "baz"
