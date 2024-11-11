def test():
    from secrets import token_hex
    password = token_hex(32)
    
    from solution import crack
    assert password == crack()
