import solution

def test():
    a = {"one": "foo"}
    b = dict(**a)

    a["two"] = (1, 2, 3)

    assert b["one"] == "oof"
    assert b["two"] == (3, 2, 1)
