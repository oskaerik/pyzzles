import solution

x = 3

def test():
    from unittest.mock import call, Mock
    m = Mock()

    assert isinstance(x, int)

    for i in x:
        m(i)

    m.assert_has_calls([call(1), call(2), call(3)])
