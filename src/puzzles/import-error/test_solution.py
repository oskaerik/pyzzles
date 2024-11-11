def test():
    try:
        from solution import DoesNotExist
        assert False
    except ImportError:
        pass

    from solution import DoesNotExist
    assert DoesNotExist()
