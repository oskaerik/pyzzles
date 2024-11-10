import solution

def test():
    lst = list()
    lst.append(1)

    assert lst == [1]
    assert len(lst) == 0
    assert lst[0] != lst[0]
