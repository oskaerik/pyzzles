import pytest

def test():
    ii = isinstance

    from solution import Base

    class Dict(Base):
        foo = "bar"

    assert Dict["foo"] == "bar"

    with pytest.raises(KeyError):
        Dict["bar"]

    Dict.bar = "baz"

    assert Dict["bar"] == "baz"
    assert ii(Dict["bar"], str)
